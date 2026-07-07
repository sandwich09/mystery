import { NextResponse } from "next/server";

const canonicalHost = "tarot.mangmeeplus.com";
const localHosts = new Set(["localhost", "127.0.0.1", "::1"]);

export function middleware(request) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const host = request.headers.get("host")?.split(":")[0];
  if (!host || host === canonicalHost || localHosts.has(host)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.host = canonicalHost;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets).*)"]
};
