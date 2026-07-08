import { createHash, createPrivateKey, createPublicKey, generateKeyPairSync, sign, verify } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const siteConfig = {
  name: process.env.ASSET_PROVENANCE_ISSUER || "Veilbound Arcana",
  url: process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://tarot.mangmeeplus.com"
};
const privateDir = path.join(rootDir, ".asset-provenance");
const privateKeyPath = process.env.ASSET_PROVENANCE_PRIVATE_KEY_PATH || path.join(privateDir, "ed25519-private.pem");
const publicProvenanceDir = path.join(rootDir, "public", "assets", "provenance");
const publicKeyPath = path.join(publicProvenanceDir, "ed25519-public.pem");
const manifestPath = path.join(publicProvenanceDir, "manifest.json");
const assetsRoot = path.join(rootDir, "public", "assets", "cards");
const manifestPublicPath = "/assets/provenance/manifest.json";
const publicKeyPublicPath = "/assets/provenance/ed25519-public.pem";
const provenanceKeyword = "veilbound.provenance";
const schema = "veilbound-asset-provenance/v1";
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const crcTable = new Uint32Array(256);
for (let index = 0; index < 256; index += 1) {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  crcTable[index] = value >>> 0;
}

function usage() {
  console.log(`Usage:
  npm run assets:keygen          Create a local Ed25519 key pair if missing
  npm run assets:sign            Sign card PNGs, embed metadata, and write the static manifest
  npm run assets:verify          Verify all assets in the manifest
  npm run assets:verify -- FILE  Verify a specific downloaded PNG against the manifest

Private key:
  ${path.relative(rootDir, privateKeyPath)}
`);
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function base64url(buffer) {
  return Buffer.from(buffer).toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/u, "");
}

function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((item) => stableStringify(item)).join(",")}]`;

  return `{${Object.keys(value).sort().map((key) => (
    `${JSON.stringify(key)}:${stableStringify(value[key])}`
  )).join(",")}}`;
}

async function pathExists(filePath) {
  try {
    await readFile(filePath);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function ensureKeyPair({ force = false } = {}) {
  await mkdir(privateDir, { recursive: true });
  await mkdir(publicProvenanceDir, { recursive: true });

  const hasPrivateKey = await pathExists(privateKeyPath);
  if (hasPrivateKey && !force) {
    const privateKeyPem = await readFile(privateKeyPath, "utf8");
    const publicKeyPem = createPublicKey(privateKeyPem).export({
      type: "spki",
      format: "pem"
    });
    await writeFile(publicKeyPath, publicKeyPem);
    return { privateKeyPem, publicKeyPem };
  }

  const { privateKey, publicKey } = generateKeyPairSync("ed25519");
  const privateKeyPem = privateKey.export({
    type: "pkcs8",
    format: "pem"
  });
  const publicKeyPem = publicKey.export({
    type: "spki",
    format: "pem"
  });

  await writeFile(privateKeyPath, privateKeyPem, { mode: 0o600 });
  await writeFile(publicKeyPath, publicKeyPem);
  return { privateKeyPem, publicKeyPem };
}

async function readExistingManifest() {
  try {
    return JSON.parse(await readFile(manifestPath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function collectPngFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries
    .filter((entry) => !entry.name.startsWith("."))
    .sort((left, right) => left.name.localeCompare(right.name))
    .map(async (entry) => {
      const currentPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectPngFiles(currentPath);
      return entry.isFile() && entry.name.toLowerCase().endsWith(".png") ? [currentPath] : [];
    }));

  return files.flat();
}

function parsePng(buffer) {
  if (buffer.length < pngSignature.length || !buffer.subarray(0, pngSignature.length).equals(pngSignature)) {
    throw new Error("Not a PNG file");
  }

  const chunks = [];
  let offset = pngSignature.length;
  while (offset < buffer.length) {
    if (offset + 12 > buffer.length) throw new Error("Invalid PNG chunk boundary");
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString("latin1");
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    const crcEnd = dataEnd + 4;
    if (crcEnd > buffer.length) throw new Error(`Invalid PNG chunk length for ${type}`);

    chunks.push({
      type,
      data: buffer.subarray(dataStart, dataEnd),
      raw: buffer.subarray(offset, crcEnd)
    });
    offset = crcEnd;
    if (type === "IEND") break;
  }

  if (!chunks.some((chunk) => chunk.type === "IEND")) throw new Error("PNG is missing IEND chunk");
  return chunks;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const typeBuffer = Buffer.from(type, "latin1");
  const output = Buffer.alloc(12 + data.length);
  output.writeUInt32BE(data.length, 0);
  typeBuffer.copy(output, 4);
  data.copy(output, 8);
  output.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 8 + data.length);
  return output;
}

function getTextKeyword(chunk) {
  if (!["tEXt", "iTXt", "zTXt"].includes(chunk.type)) return "";
  const separator = chunk.data.indexOf(0);
  if (separator <= 0) return "";
  return chunk.data.subarray(0, separator).toString("latin1");
}

function isProvenanceChunk(chunk) {
  return getTextKeyword(chunk) === provenanceKeyword;
}

function serializePng(chunks) {
  return Buffer.concat([
    pngSignature,
    ...chunks.map((chunk) => chunk.raw || createChunk(chunk.type, chunk.data))
  ]);
}

function stripProvenanceChunks(buffer) {
  const chunks = parsePng(buffer);
  return serializePng(chunks.filter((chunk) => !isProvenanceChunk(chunk)));
}

function readPngProvenance(buffer) {
  const chunk = parsePng(buffer).find(isProvenanceChunk);
  if (!chunk) return null;
  const separator = chunk.data.indexOf(0);
  if (separator <= 0) return null;
  return JSON.parse(chunk.data.subarray(separator + 1).toString("utf8"));
}

function embedPngProvenance(canonicalBuffer, provenance) {
  const chunks = parsePng(canonicalBuffer).filter((chunk) => !isProvenanceChunk(chunk));
  const iendIndex = chunks.findIndex((chunk) => chunk.type === "IEND");
  if (iendIndex < 0) throw new Error("PNG is missing IEND chunk");

  const data = Buffer.concat([
    Buffer.from(provenanceKeyword, "latin1"),
    Buffer.from([0]),
    Buffer.from(JSON.stringify(provenance), "utf8")
  ]);
  chunks.splice(iendIndex, 0, {
    type: "tEXt",
    data,
    raw: createChunk("tEXt", data)
  });

  return serializePng(chunks);
}

function getAssetId(publicPath) {
  return publicPath.replace(/^\//u, "").replace(/\.[^.]+$/u, "").replace(/[^a-zA-Z0-9]+/gu, "-").replace(/^-|-$/gu, "");
}

function createPayload({ publicPath, canonicalSha256, issuedAt }) {
  return {
    version: 1,
    assetId: getAssetId(publicPath),
    path: publicPath,
    mediaType: "image/png",
    canonicalSha256,
    issuer: siteConfig.name,
    source: siteConfig.url,
    manifest: manifestPublicPath,
    issuedAt
  };
}

function signPayload(privateKeyPem, payload) {
  const signature = sign(null, Buffer.from(stableStringify(payload)), createPrivateKey(privateKeyPem));
  return base64url(signature);
}

function verifyPayload(publicKeyPem, payload, signature) {
  return verify(
    null,
    Buffer.from(stableStringify(payload)),
    createPublicKey(publicKeyPem),
    Buffer.from(signature.replaceAll("-", "+").replaceAll("_", "/"), "base64")
  );
}

async function signAssets() {
  const { privateKeyPem, publicKeyPem } = await ensureKeyPair();
  const existingManifest = await readExistingManifest();
  const existingByPath = new Map((existingManifest?.assets || []).map((entry) => [entry.path, entry]));
  const files = await collectPngFiles(assetsRoot);
  const now = new Date().toISOString();
  const assets = [];

  for (const filePath of files) {
    const originalBuffer = await readFile(filePath);
    const canonicalBuffer = stripProvenanceChunks(originalBuffer);
    const canonicalSha256 = sha256(canonicalBuffer);
    const publicPath = `/${path.relative(path.join(rootDir, "public"), filePath).split(path.sep).join("/")}`;
    const existing = existingByPath.get(publicPath);
    const issuedAt = existing?.canonicalSha256 === canonicalSha256 && existing?.signedPayload?.issuedAt
      ? existing.signedPayload.issuedAt
      : now;
    const signedPayload = createPayload({ publicPath, canonicalSha256, issuedAt });
    const signature = signPayload(privateKeyPem, signedPayload);
    const provenance = {
      schema,
      signedPayload,
      signature
    };
    const signedBuffer = embedPngProvenance(canonicalBuffer, provenance);

    if (!signedBuffer.equals(originalBuffer)) {
      await writeFile(filePath, signedBuffer);
    }

    assets.push({
      assetId: signedPayload.assetId,
      path: publicPath,
      mediaType: signedPayload.mediaType,
      bytes: signedBuffer.length,
      canonicalSha256,
      fileSha256: sha256(signedBuffer),
      signature,
      signedPayload
    });
  }

  const manifest = {
    schema,
    generatedAt: now,
    issuer: siteConfig.name,
    source: siteConfig.url,
    manifest: manifestPublicPath,
    publicKey: {
      algorithm: "Ed25519",
      path: publicKeyPublicPath,
      sha256: sha256(Buffer.from(publicKeyPem)),
      pem: publicKeyPem
    },
    hash: {
      algorithm: "SHA-256",
      canonicalization: `PNG bytes with ${provenanceKeyword} text chunks removed`
    },
    assets
  };

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  await writeFile(publicKeyPath, publicKeyPem);
  console.log(`Signed ${assets.length} PNG assets`);
  console.log(`Manifest: ${path.relative(rootDir, manifestPath)}`);
  console.log(`Public key: ${path.relative(rootDir, publicKeyPath)}`);
  console.log(`Private key: ${path.relative(rootDir, privateKeyPath)}`);
}

async function verifyFileAgainstManifest(filePath, manifest, publicKeyPem) {
  const buffer = await readFile(filePath);
  const canonicalBuffer = stripProvenanceChunks(buffer);
  const canonicalSha256 = sha256(canonicalBuffer);
  const metadata = readPngProvenance(buffer);
  const publicPath = filePath.startsWith(path.join(rootDir, "public"))
    ? `/${path.relative(path.join(rootDir, "public"), filePath).split(path.sep).join("/")}`
    : metadata?.signedPayload?.path;
  let entry = publicPath
    ? manifest.assets.find((asset) => asset.path === publicPath)
    : null;
  entry ||= manifest.assets.find((asset) => asset.assetId === metadata?.signedPayload?.assetId);
  entry ||= manifest.assets.find((asset) => asset.canonicalSha256 === canonicalSha256);

  if (!entry) {
    return { ok: false, filePath, reason: "No matching manifest entry" };
  }

  const payload = metadata?.signedPayload || entry.signedPayload;
  const signature = metadata?.signature || entry.signature;
  const checks = [
    ["canonicalSha256", canonicalSha256 === entry.canonicalSha256 && canonicalSha256 === payload.canonicalSha256],
    ["signature", verifyPayload(publicKeyPem, payload, signature)],
    ["path", payload.path === entry.path],
    ["assetId", payload.assetId === entry.assetId]
  ];

  if (metadata) {
    checks.push(
      ["metadataSignature", metadata.signature === entry.signature],
      ["fileSha256", sha256(buffer) === entry.fileSha256]
    );
  }

  const failed = checks.filter(([, ok]) => !ok).map(([name]) => name);
  return {
    ok: failed.length === 0,
    filePath,
    assetPath: entry.path,
    metadataPresent: Boolean(metadata),
    failed
  };
}

async function verifyAssets(targetFile) {
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const publicKeyPem = manifest.publicKey?.pem || await readFile(path.join(rootDir, "public", manifest.publicKey.path), "utf8");
  const files = targetFile
    ? [path.resolve(rootDir, targetFile)]
    : manifest.assets.map((asset) => path.join(rootDir, "public", asset.path));
  const results = [];

  for (const filePath of files) {
    results.push(await verifyFileAgainstManifest(filePath, manifest, publicKeyPem));
  }

  const failures = results.filter((result) => !result.ok);
  for (const result of results) {
    const label = path.relative(rootDir, result.filePath);
    if (result.ok) {
      console.log(`OK ${label} -> ${result.assetPath}${result.metadataPresent ? "" : " (matched without metadata)"}`);
    } else {
      console.error(`FAIL ${label}: ${result.reason || result.failed.join(", ")}`);
    }
  }

  if (failures.length) {
    process.exitCode = 1;
    return;
  }

  console.log(`Verified ${results.length} PNG asset${results.length === 1 ? "" : "s"}`);
}

async function main() {
  const [command, maybeFile] = process.argv.slice(2);

  if (command === "keygen") {
    const force = process.argv.includes("--force");
    await ensureKeyPair({ force });
    console.log(`Key pair ready: ${path.relative(rootDir, privateKeyPath)}`);
    return;
  }

  if (command === "sign") {
    await signAssets();
    return;
  }

  if (command === "verify") {
    await verifyAssets(maybeFile);
    return;
  }

  usage();
  process.exitCode = command ? 1 : 0;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
