"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createStaticReading } from "./lib/static-reading";

const majorImageSlugs = {
  "00": "the-fool",
  "01": "the-magician",
  "02": "high-priestess",
  "03": "the-empress",
  "04": "the-emperor",
  "05": "the-hierophant",
  "06": "the-lovers",
  "07": "the-chariot",
  "08": "strength",
  "09": "the-hermit",
  "10": "wheel-of-fortune",
  "11": "justice",
  "12": "the-hanged-man",
  "13": "death",
  "14": "temperance",
  "15": "the-devil",
  "16": "the-tower",
  "17": "the-star",
  "18": "the-moon",
  "19": "the-sun",
  "20": "judgement",
  "21": "the-world"
};

const tarotDeck = [
  ["00", "The Fool", "คนพเนจร", "✦", "การเริ่มต้น", "เด็กหนุ่มถือโคมเดินเข้าเมืองที่ไม่มีแผนที่ เขาไม่รู้ว่าประตูบานใดปลอดภัย แต่เสียงระฆังบอกว่าโลกจะเปิดทางให้คนที่กล้าเริ่ม"],
  ["01", "The Magician", "นักเล่นแร่แปรธาตุ", "☉", "การลงมือ", "นักแปรธาตุวางเหรียญ ดาบ ถ้วย และคทาลงบนโต๊ะไม้เก่า เขาพบว่าปาฏิหาริย์ไม่ได้เกิดจากเวทมนตร์ล้วนๆ แต่เกิดจากมือที่ยอมเริ่มทำ"],
  ["02", "The High Priestess", "นักบวชหญิงแห่งม่านหมอก", "☾", "สัญชาตญาณ", "ใต้หอสมุดต้องห้าม มีหญิงผู้เฝ้าประตูอ่านจดหมายที่ยังไม่ถูกส่ง เธอยิ้ม เพราะความจริงบางอย่างไม่ได้หายไป แค่รอให้ใจนิ่งพอจะได้ยิน"],
  ["03", "The Empress", "จักรพรรดินีสวนลับ", "✿", "การเติบโต", "เมล็ดสีทองตกลงกลางสวนที่เคยแห้งแล้ง ไม่มีใครเชื่อว่ามันจะงอก แต่ผู้เฝ้าสวนรดน้ำทุกคืน จนรุ่งเช้าวันหนึ่งทั้งเมืองได้กลิ่นดอกไม้"],
  ["04", "The Emperor", "ราชันหอคอยหิน", "♜", "โครงสร้าง", "ราชันสร้างสะพานข้ามเหวด้วยก้อนหินทีละก้อน เขาไม่ได้รีบชนะพายุ แต่สร้างสิ่งที่พายุทำลายได้ยาก"],
  ["05", "The Hierophant", "ผู้จารึกพิธี", "⚚", "บทเรียน", "นักจารึกพบตำราเก่าที่ขอบไหม้ เขาอ่านไม่ครบทุกหน้า แต่เข้าใจว่ากฎบางข้อมีไว้ปกป้องเรา และบางข้อมีไว้ให้เราเติบโตจนข้ามมัน"],
  ["06", "The Lovers", "คำสัญญาใต้ดาว", "♡", "การเลือก", "สองเงายืนตรงทางแยกที่ดาวตกผ่านฟ้า พวกเขารู้ว่าความรักไม่ใช่แค่การจับมือ แต่คือการเลือกทางที่ไม่ทรยศหัวใจของตนเอง"],
  ["07", "The Chariot", "รถม้าเงาจันทร์", "♞", "แรงขับ", "รถม้าดำแล่นผ่านถนนเปียกฝน คนขับไม่เห็นปลายทางชัดนัก แต่เขาจับบังเหียนมั่นคงพอให้ความกลัววิ่งตามไม่ทัน"],
  ["08", "Strength", "ผู้ปลอบสิงห์", "∞", "พลังใจ", "หญิงคนหนึ่งไม่ได้ชนะสัตว์ร้ายด้วยดาบ เธอนั่งลงข้างมันและพูดเบาๆ จนมันหลับ นั่นคือวันที่เมืองรู้ว่าความอ่อนโยนก็เป็นอำนาจ"],
  ["09", "The Hermit", "ฤาษีโคมดาว", "✧", "การทบทวน", "ฤาษีปีนขึ้นบันไดวนเพื่อจุดโคมบนยอดหอ เขาไม่ได้หนีผู้คน เพียงต้องการเห็นทางก่อนกลับไปบอกคนอื่น"],
  ["10", "Wheel of Fortune", "วงล้อโชคชะตา", "◎", "จังหวะเปลี่ยน", "วงล้อทองคำหมุนในห้องใต้ดิน ทุกครั้งที่มันหยุด โลกเล็กๆ ของใครบางคนเปลี่ยนทิศ แต่คนที่ยืนมั่นจะใช้แรงหมุนนั้นเป็นทางขึ้น"],
  ["11", "Justice", "ตุลาการกระจก", "⚖", "ความสมดุล", "ผู้พิพากษายื่นกระจกแทนคำตัดสิน ใครมองเข้าไปจะเห็นทั้งความผิดพลาดและความกล้าหาญของตัวเอง พร้อมคำถามว่าอยากแก้สิ่งใดก่อน"],
  ["12", "The Hanged Man", "ผู้กลับหัวในโบสถ์เก่า", "⇵", "มุมมองใหม่", "ชายผู้ถูกแขวนกลับหัวเห็นแผนที่เมืองเป็นครั้งแรก ทางตันที่เคยทำให้เขาหมดหวัง กลับเป็นหลังคาของทางลับอีกเส้นหนึ่ง"],
  ["13", "Death", "ผู้เก็บเกี่ยวรุ่งสาง", "✝", "การสิ้นสุด", "เมื่อรถม้าของผู้เก็บเกี่ยวผ่านทุ่งเก่า ต้นไม้ไม่ได้ตายทั้งหมด บางกิ่งเพียงยอมทิ้งใบ เพื่อเก็บแรงไว้ผลิดอกฤดูหน้า"],
  ["14", "Temperance", "นักผสมแสง", "♒", "การปรับสมดุล", "นักผสมแสงเทน้ำจากถ้วยเงินสู่ถ้วยแก้วอย่างไม่รีบ เขารู้ว่าของแรงเกินไปต้องเจือจาง และของจางเกินไปต้องเติมไฟ"],
  ["15", "The Devil", "ขุนนางเงา", "♆", "พันธนาการ", "ขุนนางเงามอบกุญแจทองให้คนทั้งเมือง แต่กุญแจนั้นเปิดได้เพียงกรงของตัวเอง ใครอยากเป็นอิสระต้องกล้าถามว่าใครเป็นคนถือโซ่จริงๆ"],
  ["16", "The Tower", "หอคอยฟ้าผ่า", "⌁", "การปลดล็อก", "ฟ้าผ่าหอคอยที่สร้างทับบ่อน้ำเก่า ผู้คนตกใจเมื่อกำแพงพัง แต่หลังฝุ่นจาง พวกเขาพบน้ำใสที่ถูกซ่อนมานาน"],
  ["17", "The Star", "ดาราในบ่อน้ำ", "☆", "ความหวัง", "เด็กหญิงโยนดาวกระดาษลงบ่อน้ำและขอพรอย่างเงียบๆ คืนนั้นบ่อน้ำสะท้อนท้องฟ้าทั้งผืน เหมือนบอกว่าความหวังเล็กๆ ก็มีจักรวาลหนุนหลัง"],
  ["18", "The Moon", "ทางเดินหมาป่า", "☽", "ความคลุมเครือ", "หมาป่าสองตัวเฝ้าถนนใต้จันทร์เต็มดวง นักเดินทางไม่ได้รู้ว่าเงาใดจริง แต่เขารู้ว่าเช้าจะมา ถ้าเขาไม่หลงตามเสียงลวง"],
  ["19", "The Sun", "สุริยันหลังม่าน", "☀", "ความชัดเจน", "เด็กเปิดม่านโรงละครร้างแล้วพบแสงอาทิตย์ท่วมเวที สิ่งที่เคยดูน่ากลัวในความมืด กลายเป็นฉากไม้ธรรมดาเมื่อแสงมาถึง"],
  ["20", "Judgement", "ระฆังปลุกวิญญาณ", "♬", "การตื่นรู้", "ระฆังโบราณดังขึ้นทั้งที่ไม่มีใครตี คนที่หลับใหลกับคำแก้ตัวสะดุ้งตื่น และพบว่ายังมีเวลาพอจะตอบรับชีวิตใหม่"],
  ["21", "The World", "ประตูโลกครบวง", "◉", "การสำเร็จ", "นักเดินทางกลับมาที่ประตูเดิมพร้อมฝุ่นบนรองเท้า เขาไม่ได้เป็นคนเดิมอีกแล้ว และประตูก็ไม่ใช่ทางออก แต่เป็นวงกลมที่เริ่มบทต่อไป"]
].map(([number, english, thai, symbol, essence, story]) => {
  const slug = majorImageSlugs[number] ?? english.toLowerCase().replace(/\s+/g, "-");
  return {
    number,
    english,
    thai,
    symbol,
    essence,
    story,
    image: `/assets/cards/major/major-${number}-${slug}.png`,
    fallbackImage: `/assets/cards/samples/major-${number}-${slug}.png`
  };
});

const donationJokes = [
  {
    th: "อยากโดเนทหรอ โดนหลอกแล้ว ไพ่ใบนี้ชื่อ The Fool และมันยิ้มเหมือนรู้จักคุณดี",
    en: "Wanted to donate? You have been tricked. This card is The Fool, and it is smiling like it knows you.",
    zh: "想打赏吗？你被逗到了。这张牌叫愚者，而且笑得像很了解你。"
  },
  {
    th: "กดปุ่มนี้แล้วโชคดีขึ้นไหม ไม่แน่ใจ แต่ความสงสัยของคุณเพิ่งเสียค่าเทิร์นหนึ่งครั้ง",
    en: "Did this button improve your luck? Unclear. Your curiosity did spend one turn, though.",
    zh: "按这个按钮会变好运吗？不确定。但你的好奇心刚刚花掉了一回合。"
  },
  {
    th: "ไพ่บอกให้เก็บเงินไว้ก่อน แต่ปุ่มบอกให้กดอีกที ใครกันแน่ที่น่าเชื่อ",
    en: "The cards say save your money. The button says click again. Which oracle do you trust?",
    zh: "牌说先存钱，按钮说再点一次。你到底相信哪位占卜师？"
  },
  {
    th: "คุณพบหีบสมบัติปลอม ข้างในมีแค่ใบเสร็จจากโชคชะตา",
    en: "You found a fake treasure chest. Inside: one receipt from destiny.",
    zh: "你发现了一个假宝箱。里面只有一张命运开的收据。"
  },
  {
    th: "The Magician เสก QR ไม่ออก เพราะคุณกดผิดตำแหน่ง",
    en: "The Magician cannot summon the QR because you clicked the wrong place.",
    zh: "魔术师召唤不出二维码，因为你点错地方了。"
  },
  {
    th: "The High Priestess กระซิบว่า QR จริงไม่ได้อยู่ที่นี่ แล้วทำหน้าเหมือนไม่ได้พูด",
    en: "The High Priestess whispers that the real QR is not here, then pretends she said nothing.",
    zh: "女祭司悄悄说真正的二维码不在这里，然后假装自己没说过。"
  },
  {
    th: "The Tower ยังไม่พัง แต่ความตั้งใจโดเนทของคุณเริ่มสั่น",
    en: "The Tower has not fallen yet, but your donation intention is wobbling.",
    zh: "高塔还没塌，但你想打赏的意志已经开始晃了。"
  },
  {
    th: "Wheel of Fortune หมุนแล้วหยุดที่ช่อง 'ลองอีกที'",
    en: "The Wheel of Fortune spun and landed on 'try again.'",
    zh: "命运之轮转了一圈，停在“再试一次”。"
  },
  {
    th: "Death บอกว่าจบแล้ว จบที่คุณโดนมุกนี้หลอก",
    en: "Death says it is over. Specifically, your escape from this joke is over.",
    zh: "死神说结束了。准确地说，是你逃过这个玩笑的机会结束了。"
  },
  {
    th: "The Moon บอกว่าสิ่งที่เห็นอาจไม่ใช่ QR และก็ใช่ มันคือมุก",
    en: "The Moon says what you see may not be a QR. Correct. It is a joke.",
    zh: "月亮说你看到的也许不是二维码。没错，这是一个玩笑。"
  },
  {
    th: "Justice ชั่งน้ำหนักแล้ว คุณเสียเวลา 0.7 วินาที แต่ได้เสียงหัวเราะคืน",
    en: "Justice weighed the case: you lost 0.7 seconds, but gained one small laugh.",
    zh: "正义衡量后认为：你失去了 0.7 秒，但得到了一点笑意。"
  },
  {
    th: "The Devil ไม่ได้ล่อลวงคุณ ปุ่มนี้ต่างหาก",
    en: "The Devil did not tempt you. This button did.",
    zh: "诱惑你的不是恶魔，是这个按钮。"
  },
  {
    th: "Temperance บอกให้สมดุล: ครึ่งหนึ่งอยากช่วย ครึ่งหนึ่งอยากรู้ว่ามุกต่อไปคืออะไร",
    en: "Temperance asks for balance: half generous, half curious about the next joke.",
    zh: "节制要求平衡：一半想支持，一半想知道下个笑话是什么。"
  },
  {
    th: "The Star ให้ความหวังว่า QR จริงมีอยู่ แต่อยู่หลังแว่นตา",
    en: "The Star offers hope: the real QR exists, but it hides behind the monocle.",
    zh: "星星给你希望：真正的二维码存在，只是藏在单片眼镜后面。"
  },
  {
    th: "The Sun ส่องความจริง: ปุ่มนี้เป็นแค่ละครเวที",
    en: "The Sun reveals the truth: this button is only theater.",
    zh: "太阳照出真相：这个按钮只是舞台剧。"
  },
  {
    th: "The Hermit เปิดโคมดูแล้วพบว่าคุณหลงทางใน support panel",
    en: "The Hermit raised his lantern and found you lost inside the support panel.",
    zh: "隐士举起灯，发现你迷路在支持面板里。"
  },
  {
    th: "The Lovers ให้เลือก: ใจกว้าง หรือกดสุ่มมุกต่อแบบเนียนๆ",
    en: "The Lovers offer a choice: be generous, or smoothly roll another joke.",
    zh: "恋人给出选择：慷慨一下，或者继续若无其事地抽笑话。"
  },
  {
    th: "Judgement ดังระฆังตัดสิน: คุณเป็นคนดี แต่กดผิดปุ่ม",
    en: "Judgement rings the bell: you are a good person, but you pressed the wrong button.",
    zh: "审判敲响钟声：你是好人，但按错按钮了。"
  },
  {
    th: "The World ยืนยันว่าการโดนหลอกครั้งนี้ครบวงจรแล้ว",
    en: "The World confirms that this playful scam has completed its full cycle.",
    zh: "世界确认：这次温柔被骗已经完整闭环。"
  },
  {
    th: "The Emperor ออกกฎว่า QR ต้องอยู่ใน modal เท่านั้น ขอโทษด้วยราชโองการ",
    en: "The Emperor decrees that QR codes must live in modals only. Royal apology.",
    zh: "皇帝下令：二维码只能住在弹窗里。以王命向你道歉。"
  },
  {
    th: "The Chariot พาคุณมาถึง...มุก ไม่ใช่หน้าจ่ายเงิน",
    en: "The Chariot brought you to... a joke, not a checkout page.",
    zh: "战车把你带到了……一个笑话，不是付款页。"
  },
  {
    th: "อมุนด์ปรับแว่นแล้วบอกว่า QR จริงอยู่ขวาบน คุณเชื่อคนใส่แว่นตาขาเดียวไหม",
    en: "Amund adjusts the monocle and says the real QR is at the top right. Do you trust a monocle?",
    zh: "阿蒙德扶了扶单片眼镜，说真正的二维码在右上角。你相信单片眼镜吗？"
  }
];

const languages = [
  { code: "th", label: "TH", name: "ไทย" },
  { code: "en", label: "EN", name: "English" },
  { code: "zh", label: "中文", name: "中文" }
];

const footerDisclaimer = {
  th: "Fan-made oracle ที่ได้รับแรงบันดาลใจจากบรรยากาศของ Lord of Mysteries โดย Cuttlefish That Loves Diving โปรเจกต์นี้ไม่มีความเกี่ยวข้อง ไม่เป็นทางการ และไม่ได้มีเจตนาคัดลอกหรือทดแทนผลงานต้นฉบับ",
  en: "Fan-made oracle inspired by the atmosphere of Lord of Mysteries by Cuttlefish That Loves Diving. This project is unaffiliated, unofficial, and not intended to copy or replace the original work.",
  zh: "受爱潜水的乌贼所著《诡秘之主》的氛围启发而制作的粉丝占卜项目。本项目与原作无关联，非官方作品，也无意复制或取代原作。"
};

const footerLabel = {
  th: "คำชี้แจงโปรเจกต์แฟนเมด",
  en: "Fan project disclaimer",
  zh: "粉丝项目声明"
};

const footerTextDirection = {
  th: "ltr",
  en: "ltr",
  zh: "ltr"
};

const footerLang = {
  th: "th",
  en: "en",
  zh: "zh-Hans"
};

const uiText = {
  th: {
    htmlLang: "th",
    intro: "ใส่ชื่ออะไรก็ได้ แล้วเปิดไพ่ 1 ใบเพื่อรับเรื่องเล่าจากผู้ทำนายแห่งหมอก",
    languageLabel: "ภาษา",
    nameLabel: "ชื่อสำหรับพิธีเปิดไพ่",
    placeholder: "เช่น นักเดินทาง, Moonchild, A",
    startButton: "เริ่มเปิดไพ่",
    dailyNote: "คำแนะนำ: ควรดูเพียงวันละครั้ง เพื่อให้คำทำนายมีน้ำหนักและไม่รบกวนสัญชาตญาณของตัวเอง",
    futureButton: "เปิดไพ่เพิ่ม: อนาคตอันใกล้",
    resetButton: "ล้างและเริ่มใหม่",
    nameless: "นักเดินทางไร้นาม",
    deckStatus: "รอเสียงเรียกจากชื่อของคุณ",
    mainReading: "คำทำนายหลัก",
    nearFuture: "อนาคตอันใกล้",
    zoomCard: "ขยายไพ่",
    closeCard: "ปิดภาพไพ่",
    aiLoadingTitle: "กำลังรอคำตอบจากผู้มีอำนาจเหนือสายหมอก",
    aiLoadingCopy: () => "ผู้ทำนายกำลังเรียบเรียงคำทำนาย",
    donateTitle: "Support",
    donateSubtitle: "PayPal / True Wallet",
    donateJokeButton: "สุ่มมุก Support",
    ritualFirst: (seeker) => [`${seeker} วางชื่อไว้หน้าโต๊ะหิน`, "ผู้ทำนายสับไพ่ผ่านหมอก", "สัญลักษณ์หนึ่งใบกำลังตอบรับ"],
    ritualSecond: () => ["หมอกเดิมเปิดทางต่อ", "ไพ่ใบที่สองขยับใต้แสงทอง", "อนาคตอันใกล้กำลังพลิกหน้า"],
    story: (cardName, essence, seeker, sequence, cardStory) => {
      const prefix = sequence === 1
        ? `${seeker} ถูกเรียกเข้าไปในเมืองหมอก เมื่อประตูทองแดงเปิดออก ไพ่ ${cardName} พลิกขึ้นบนโต๊ะหิน`
        : `เมื่อ ${seeker} เปิดประตูถัดไป หมอกเดิมแยกออกเป็นทางใหม่ ไพ่ ${cardName} จึงปรากฏเหมือนตอนต่อของคำทำนาย`;
      return `${prefix}. ${cardStory} แก่นของไพ่ใบนี้คือ "${essence}" จึงบอกให้คุณอ่านสัญญาณรอบตัวอย่างใจเย็น และเลือกก้าวที่ทำให้ตัวเองเบาขึ้นกว่าวันก่อน.`;
    }
  },
  en: {
    htmlLang: "en",
    intro: "Enter any name and draw 1 card to receive a story from the oracle in the mist.",
    languageLabel: "Language",
    nameLabel: "Name for the reading",
    placeholder: "Traveler, Moonchild, A",
    startButton: "Begin Reading",
    dailyNote: "Suggestion: draw once per day so the reading keeps its weight and does not drown out your intuition.",
    futureButton: "Draw one more: near future",
    resetButton: "Clear and restart",
    nameless: "nameless traveler",
    deckStatus: "Waiting for your name to call the deck",
    mainReading: "Main reading",
    nearFuture: "Near future",
    zoomCard: "Zoom card",
    closeCard: "Close card image",
    aiLoadingTitle: "Awaiting an answer from the authority beyond the mist",
    aiLoadingCopy: () => "The oracle is shaping the reading",
    donateTitle: "Support",
    donateSubtitle: "PayPal / True Wallet",
    donateJokeButton: "Random support joke",
    ritualFirst: (seeker) => [`${seeker} places a name before the stone table`, "The oracle shuffles through the mist", "One symbol is answering the call"],
    ritualSecond: () => ["The old mist opens another path", "A second card moves under golden light", "The near future is turning its face"],
    story: (cardName, essence, seeker, sequence) => {
      const prefix = sequence === 1
        ? `${seeker} is called into the city of mist. As the bronze door opens, ${cardName} turns face-up on the stone table`
        : `When ${seeker} opens the next door, the same mist parts into a new path and ${cardName} appears as the next chapter of the omen`;
      return `${prefix}. The heart of this card is "${essence}". Read the signs around you calmly, then choose the step that makes you lighter than yesterday.`;
    }
  },
  zh: {
    htmlLang: "zh-Hans",
    intro: "输入任意名字，抽一张牌，接收迷雾中占卜者给你的讯息。",
    languageLabel: "语言",
    nameLabel: "占卜使用的名字",
    placeholder: "例如 旅人、Moonchild、A",
    startButton: "开始抽牌",
    dailyNote: "建议每天只抽一次，让讯息保持分量，也避免盖过自己的直觉。",
    futureButton: "再抽一张：近期未来",
    resetButton: "清除并重新开始",
    nameless: "无名旅人",
    deckStatus: "等待你的名字唤醒牌组",
    mainReading: "主要占卜",
    nearFuture: "近期未来",
    zoomCard: "放大牌面",
    closeCard: "关闭牌面",
    aiLoadingTitle: "正在等待雾上权柄的回应",
    aiLoadingCopy: () => "占卜者正在组织讯息",
    donateTitle: "Support",
    donateSubtitle: "PayPal / True Wallet",
    donateJokeButton: "随机支持笑话",
    ritualFirst: (seeker) => [`${seeker} 将名字放在石桌前`, "占卜者在迷雾中洗牌", "一枚符号正在回应"],
    ritualSecond: () => ["旧日迷雾打开新的道路", "第二张牌在金色微光中移动", "近期未来正在翻面"],
    story: (cardName, essence, seeker, sequence) => {
      const prefix = sequence === 1
        ? `${seeker}被召入迷雾之城。铜门开启时，${cardName}在石桌上翻开`
        : `当${seeker}推开下一扇门，同一片迷雾分成新的道路，${cardName}像预言的下一章一样出现`;
      return `${prefix}。这张牌的核心是「${essence}」。请安静阅读身边的信号，然后选择一个让自己比昨天更轻的步伐。`;
    }
  }
};

const localizedCardData = {
  en: {
    "00": { name: "The Fool", essence: "new beginnings" },
    "01": { name: "The Magician", essence: "focused action" },
    "02": { name: "The High Priestess", essence: "intuition" },
    "03": { name: "The Empress", essence: "growth" },
    "04": { name: "The Emperor", essence: "structure" },
    "05": { name: "The Hierophant", essence: "lessons" },
    "06": { name: "The Lovers", essence: "choice" },
    "07": { name: "The Chariot", essence: "momentum" },
    "08": { name: "Strength", essence: "inner courage" },
    "09": { name: "The Hermit", essence: "reflection" },
    "10": { name: "Wheel of Fortune", essence: "turning timing" },
    "11": { name: "Justice", essence: "balance" },
    "12": { name: "The Hanged Man", essence: "a new perspective" },
    "13": { name: "Death", essence: "necessary endings" },
    "14": { name: "Temperance", essence: "adjusted balance" },
    "15": { name: "The Devil", essence: "bindings" },
    "16": { name: "The Tower", essence: "release" },
    "17": { name: "The Star", essence: "hope" },
    "18": { name: "The Moon", essence: "uncertainty" },
    "19": { name: "The Sun", essence: "clarity" },
    "20": { name: "Judgement", essence: "awakening" },
    "21": { name: "The World", essence: "completion" }
  },
  zh: {
    "00": { name: "愚者", essence: "新的开始" },
    "01": { name: "魔术师", essence: "行动与显化" },
    "02": { name: "女祭司", essence: "直觉" },
    "03": { name: "皇后", essence: "成长" },
    "04": { name: "皇帝", essence: "结构" },
    "05": { name: "教皇", essence: "课题" },
    "06": { name: "恋人", essence: "选择" },
    "07": { name: "战车", essence: "推进力" },
    "08": { name: "力量", essence: "内在勇气" },
    "09": { name: "隐士", essence: "反思" },
    "10": { name: "命运之轮", essence: "时机转动" },
    "11": { name: "正义", essence: "平衡" },
    "12": { name: "倒吊人", essence: "新的视角" },
    "13": { name: "死神", essence: "必要的结束" },
    "14": { name: "节制", essence: "调和" },
    "15": { name: "恶魔", essence: "束缚" },
    "16": { name: "高塔", essence: "释放" },
    "17": { name: "星星", essence: "希望" },
    "18": { name: "月亮", essence: "不确定" },
    "19": { name: "太阳", essence: "清晰" },
    "20": { name: "审判", essence: "觉醒" },
    "21": { name: "世界", essence: "完成" }
  }
};

function getCardText(card, language) {
  const englishName = card.english || localizedCardData.en[card.number]?.name || card.thai;

  if (language === "th") {
    return { name: englishName, essence: card.essence, title: englishName };
  }

  const localized = localizedCardData[language]?.[card.number] ?? localizedCardData.en[card.number];
  return { ...localized, name: englishName, title: englishName };
}

function pickCard(openedCards) {
  const available = tarotDeck.filter((card) => !openedCards.some((reading) => reading.card.number === card.number));
  const pool = available.length ? available : tarotDeck;
  return pool[Math.floor(Math.random() * pool.length)];
}

function getSeekerName(name, language) {
  return name.trim() || uiText[language].nameless;
}

function pickDonationJokeIndex(previousIndex) {
  if (donationJokes.length < 2) return 0;
  const nextIndex = Math.floor(Math.random() * donationJokes.length);
  return nextIndex === previousIndex ? (nextIndex + 1) % donationJokes.length : nextIndex;
}

function waitForMinimumDuration(startedAt, duration) {
  const remaining = duration - (Date.now() - startedAt);
  return remaining > 0
    ? new Promise((resolve) => window.setTimeout(resolve, remaining))
    : Promise.resolve();
}

function createReading(card, seeker, sequence, language) {
  const cardText = getCardText(card, language);
  const staticReading = createStaticReading({ card, seeker, sequence, language });

  return {
    id: `${sequence}-${card.number}-${Date.now()}`,
    card,
    sequence,
    language,
    label: sequence === 1 ? uiText[language].mainReading : uiText[language].nearFuture,
    title: `${cardText.name}: ${cardText.essence}`,
    story: staticReading.story,
    forecasts: staticReading.forecasts
  };
}

async function createAiReading(card, seeker, sequence, language) {
  const localReading = createReading(card, seeker, sequence, language);

  try {
    const response = await fetch("/api/reading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        seeker,
        sequence,
        language,
        card: {
          number: card.number,
          english: card.english,
          thai: card.thai,
          essence: card.essence,
          story: card.story
        }
      })
    });

    if (!response.ok) return localReading;

    const aiReading = await response.json();
    const aiForecasts = new Map(
      Array.isArray(aiReading.forecasts)
        ? aiReading.forecasts.map((item) => [item.key, item.text])
        : []
    );

    return {
      ...localReading,
      story: typeof aiReading.story === "string" && aiReading.story.trim()
        ? aiReading.story.trim()
        : localReading.story,
      provider: aiReading.provider,
      model: aiReading.model,
      forecasts: localReading.forecasts.map((item) => ({
        ...item,
        text: aiForecasts.get(item.key) || item.text
      }))
    };
  } catch {
    return localReading;
  }
}

function TarotFace({ card, imageSrc, language, className = "" }) {
  const cardText = getCardText(card, language);

  return (
    <div
      className={`card-face ${imageSrc ? "has-art" : ""} ${className}`}
      style={{ backgroundImage: imageSrc ? `url("${imageSrc}")` : undefined }}
    >
      <div className="arcana-symbol">{card.symbol}</div>
      <div className="card-number">Major Arcana {card.number}</div>
      <div className="card-title">{cardText.title}</div>
    </div>
  );
}

function TarotCard({ card, language, onZoom }) {
  const [imageSrc, setImageSrc] = useState(card.image);
  const text = uiText[language];
  const cardText = getCardText(card, language);

  return (
    <button
      className="tarot-card card-zoom-trigger protected-card"
      type="button"
      aria-label={`${text.zoomCard} ${cardText.title}`}
      onClick={() => onZoom(card, imageSrc, language)}
    >
      <TarotFace card={card} imageSrc={imageSrc} language={language} />
      <img
        className="preload-card-art"
        src={imageSrc}
        alt=""
        onError={() => {
          if (imageSrc !== card.fallbackImage) setImageSrc(card.fallbackImage);
        }}
      />
    </button>
  );
}

function DonatePanel({ language }) {
  const [jokeIndex, setJokeIndex] = useState(null);
  const text = uiText[language];
  const currentJoke = jokeIndex === null ? "" : donationJokes[jokeIndex][language];

  return (
    <section className="donate-panel" aria-label={text.donateTitle}>
      <button
        className="donate-joke-button"
        type="button"
        aria-label={text.donateJokeButton}
        onClick={() => setJokeIndex((current) => pickDonationJokeIndex(current))}
      >
        <span>{text.donateTitle}</span>
        <small>{text.donateSubtitle}</small>
        {currentJoke && <strong className="donate-joke" aria-live="polite">{currentJoke}</strong>}
      </button>
      {currentJoke && (
        <span
          className="monocle-button"
          aria-hidden="true"
        >
          <span className="amund-icon">
            <span className="amund-hat"></span>
            <span className="crystal-monocle">
              <span className="monocle-chain"></span>
              <span className="monocle-lens"></span>
              <span className="monocle-stem"></span>
            </span>
          </span>
        </span>
      )}
    </section>
  );
}

function AiWaitLoader({ language }) {
  const text = uiText[language];

  return (
    <div id="ai-wait-loader" className="ai-wait-loader" role="status" aria-live="polite">
      <div className="ai-wait-ring" aria-hidden="true">
        <span></span>
        <i></i>
      </div>
      <div>
        <strong>{text.aiLoadingTitle}</strong>
        <p>{text.aiLoadingCopy()}</p>
      </div>
      <div className="ai-wait-dots" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default function Home() {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("th");
  const [readings, setReadings] = useState([]);
  const [ritual, setRitual] = useState({ active: false, message: uiText.th.deckStatus });
  const [isReadingPending, setIsReadingPending] = useState(false);
  const [pendingCard, setPendingCard] = useState(null);
  const [modalCard, setModalCard] = useState(null);
  const [modalImage, setModalImage] = useState("");
  const [modalLanguage, setModalLanguage] = useState("th");
  const ritualTimer = useRef();
  const readingListRef = useRef(null);

  const text = uiText[language];
  const canOpenFuture = readings.length === 1 && !ritual.active && !isReadingPending;
  const deckStatus = ritual.message;

  const beginRitual = (sequence, onComplete) => {
    window.clearTimeout(ritualTimer.current);
    const seeker = getSeekerName(name, language);
    const messages = sequence === 1
      ? text.ritualFirst(seeker)
      : text.ritualSecond();
    let index = 0;

    setRitual({ active: true, message: messages[index] });

    const tick = () => {
      index += 1;
      if (index >= messages.length) {
        setRitual({ active: false, message: text.deckStatus });
        onComplete();
        return;
      }
      setRitual({ active: true, message: messages[index] });
      ritualTimer.current = window.setTimeout(tick, 520);
    };

    ritualTimer.current = window.setTimeout(tick, 520);
  };

  const openReading = (sequence) => {
    if (ritual.active || isReadingPending) return;
    beginRitual(sequence, async () => {
      const seeker = getSeekerName(name, language);
      const card = pickCard(readings);
      setPendingCard(card);
      setIsReadingPending(true);
      const aiCallStartedAt = Date.now();
      try {
        const reading = await createAiReading(card, seeker, sequence, language);
        await waitForMinimumDuration(aiCallStartedAt, 1400);
        setReadings((current) => [...current, reading]);
      } finally {
        setIsReadingPending(false);
        setPendingCard(null);
      }
    });
  };

  const resetReading = () => {
    window.clearTimeout(ritualTimer.current);
    setReadings([]);
    setIsReadingPending(false);
    setPendingCard(null);
    setRitual({ active: false, message: text.deckStatus });
    setName("");
  };

  const openCardModal = (card, imageSrc, cardLanguage) => {
    setModalCard(card);
    setModalImage(imageSrc);
    setModalLanguage(cardLanguage);
  };

  const closeCardModal = () => {
    setModalCard(null);
    setModalImage("");
    setModalLanguage(language);
  };

  const modalAccent = useMemo(() => {
    if (!modalCard) return undefined;
    return `var(--arcana-${Number(modalCard.number) % 6})`;
  }, [modalCard]);

  useEffect(() => {
    return () => window.clearTimeout(ritualTimer.current);
  }, []);

  useEffect(() => {
    if (readings.length) {
      readingListRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [readings.length]);

  useEffect(() => {
    document.documentElement.lang = text.htmlLang;
    if (!ritual.active) {
      setRitual((current) => ({ ...current, message: text.deckStatus }));
    }
  }, [language, ritual.active, text.deckStatus, text.htmlLang]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", Boolean(modalCard));

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [modalCard]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeCardModal();
      }
    };
    const preventProtectedActions = (event) => {
      if (event.target.closest(".protected-card, .deck-card, .deck-art")) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", preventProtectedActions);
    document.addEventListener("dragstart", preventProtectedActions);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", preventProtectedActions);
      document.removeEventListener("dragstart", preventProtectedActions);
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <>
      <main className="app-shell">
        <section className="oracle-panel" aria-labelledby="app-title">
          <div className="brand-mark" aria-hidden="true">
            <span></span>
            <i></i>
          </div>
          <p className="kicker">Tarot Reading Agent</p>
          <h1 id="app-title">
            <span>Veilbound</span>
            <span>Arcana</span>
          </h1>
          <p className="intro">
            {text.intro}
          </p>

          <div className="language-control" aria-label={text.languageLabel}>
            <span>{text.languageLabel}</span>
            <div className="language-options">
              {languages.map((item) => (
                <button
                  className={language === item.code ? "is-active" : ""}
                  type="button"
                  key={item.code}
                  aria-pressed={language === item.code}
                  title={item.name}
                  onClick={() => setLanguage(item.code)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <form
            className="entry-form"
            onSubmit={(event) => {
              event.preventDefault();
              if (!readings.length) openReading(1);
            }}
          >
            <label htmlFor="seeker-name">{text.nameLabel}</label>
            <div className="form-row">
              <input
                id="seeker-name"
                name="seekerName"
                maxLength={32}
                autoComplete="off"
                placeholder={text.placeholder}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <button type="submit" disabled={ritual.active || isReadingPending || readings.length > 0}>{text.startButton}</button>
            </div>
            <p className="daily-note">{text.dailyNote}</p>
          </form>

          {readings.length > 0 && (
            <div className="control-row">
              <button
                id="future-button"
                className="secondary-button"
                type="button"
                disabled={!canOpenFuture}
                onClick={() => openReading(2)}
              >
                {text.futureButton}
              </button>
              <button
                id="reset-button"
                className="ghost-button"
                type="button"
                disabled={isReadingPending}
                onClick={resetReading}
              >
                {text.resetButton}
              </button>
            </div>
          )}

          <DonatePanel language={language} />
          <div className="panel-footer">
            <span>Veilbound Arcana</span>
            <small>For reflection and entertainment.</small>
          </div>
        </section>

        <section className="reading-stage" aria-live="polite" aria-busy={isReadingPending}>
          {ritual.active && (
            <div id="ritual-veil" className="ritual-veil">
              <div className="ritual-sigil" aria-hidden="true">☾</div>
              <p id="ritual-message">{ritual.message}</p>
            </div>
          )}

          {!readings.length && (
            <div id="deck-placeholder" className="deck-placeholder">
              <div className={`deck-card back-card ${ritual.active ? "is-shuffling" : ""}`}>
                <img className="deck-art" src="/assets/cards/samples/card-back.png" alt="" draggable="false" />
                <div className="sigil">☾</div>
                <div className="deck-lines"></div>
                <p className="deck-status">{deckStatus}</p>
              </div>
            </div>
          )}

          {isReadingPending && <AiWaitLoader card={pendingCard} language={language} />}

          <div id="reading-list" className="reading-list" ref={readingListRef}>
            {readings.map((reading) => (
              <article
                className="reading-card"
                key={reading.id}
                style={{
                  animationDelay: `${Math.min(reading.sequence - 1, 2) * 90}ms`,
                  "--arcana-accent": `var(--arcana-${Number(reading.card.number) % 6})`
                }}
              >
                <TarotCard card={reading.card} language={reading.language} onZoom={openCardModal} />
                <div className="reading-copy">
                  <p className="reading-label">{reading.label}</p>
                  <h2>{reading.title}</h2>
                  <p className="story">{reading.story}</p>
                  <div className="forecast-grid">
                    {reading.forecasts.map((item) => (
                      <div className="forecast-item" key={item.key}>
                        <strong>{item.label}</strong>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer" aria-label={footerLabel[language]} lang={footerLang[language]} dir={footerTextDirection[language]}>
        <p>{footerDisclaimer[language]}</p>
      </footer>

      {modalCard && (
        <div id="card-modal" className="card-modal" aria-labelledby="modal-card-title" aria-modal="true" role="dialog">
          <button className="modal-backdrop" type="button" aria-label={text.closeCard} onClick={closeCardModal}></button>
          <div className="modal-panel">
            <button id="modal-close" className="modal-close" type="button" aria-label={text.closeCard} onClick={closeCardModal}>x</button>
            <div className="modal-card-shell protected-card" style={{ "--arcana-accent": modalAccent }}>
              <TarotFace card={modalCard} imageSrc={modalImage} language={modalLanguage} className="modal-card-face" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
