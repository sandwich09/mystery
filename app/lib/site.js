const canonicalSiteUrl = "https://tarot.mangmeeplus.com";
const fallbackSiteUrl = canonicalSiteUrl;

function normalizeSiteUrl(value) {
  try {
    return new URL(value).origin;
  } catch {
    return fallbackSiteUrl;
  }
}

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || fallbackSiteUrl;
const normalizedSiteUrl = normalizeSiteUrl(rawSiteUrl);

export const siteConfig = {
  name: "Veilbound Arcana",
  title: "Veilbound Arcana | ดูดวงไพ่ทาโรต์ฟรี",
  description:
    "เปิดไพ่ทาโรต์ออนไลน์ฟรี รับคำทำนายภาษาไทย อังกฤษ และจีน พร้อมเรื่องเล่าลึกลับจาก Major Arcana",
  url: normalizedSiteUrl,
  host: new URL(normalizedSiteUrl).host,
  ogImage: "/assets/cards/samples/card-back.png",
  ogImageWidth: 1024,
  ogImageHeight: 1536,
  locale: "th_TH",
  alternateLocales: ["en_US", "zh_CN"],
  languages: ["th", "en", "zh-Hans"],
  keywords: [
    "Veilbound Arcana",
    "tarot.mangmeeplus.com",
    "ดูดวงฟรี",
    "ดูดวงไพ่ทาโรต์",
    "ดูดวงไพ่",
    "ดูดวงออนไลน์ฟรี",
    "ไพ่ทาโรต์ฟรี",
    "ไพ่ทาโรต์ออนไลน์",
    "เปิดไพ่ทาโรต์",
    "เปิดไพ่ฟรี",
    "คำทำนายไพ่ทาโรต์",
    "ดูดวงรายวัน",
    "ดูดวงความรัก",
    "ทำนายอนาคต",
    "ดูดวง AI",
    "ไพ่ Major Arcana",
    "tarot reading",
    "free tarot reading",
    "online tarot reading",
    "AI tarot reading",
    "online oracle",
    "Major Arcana",
    "塔罗牌",
    "塔罗牌占卜"
  ]
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: siteConfig.name,
  alternateName: ["ดูดวงไพ่ทาโรต์ฟรี", "Free Tarot Reading"],
  url: siteConfig.url,
  description: siteConfig.description,
  image: absoluteUrl(siteConfig.ogImage),
  applicationCategory: "EntertainmentApplication",
  operatingSystem: "Any",
  inLanguage: siteConfig.languages,
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  genre: ["Tarot", "Oracle card reading", "Reflection"],
  audience: {
    "@type": "Audience",
    audienceType: "Tarot readers and self-reflection users"
  }
};
