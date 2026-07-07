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
].map(([number, english, thai, symbol, essence, story]) => ({ number, english, thai, symbol, essence, story }));

const categoryText = {
  work: ["การงาน", ["มีงานใหม่หรือโจทย์ใหม่เรียกให้ขยับ อย่ารอให้มั่นใจเต็มร้อย เริ่มจากชิ้นเล็กแล้วภาพใหญ่จะเผยตัว", "งานต้องการระบบและการจัดลำดับใหม่ สิ่งที่ดูช้าอาจกำลังสร้างฐานให้มั่นคง", "ใช้สัญชาตญาณกับคนและจังหวะการคุย จะเห็นประตูที่คนอื่นมองข้าม"]],
  money: ["การเงิน", ["มีรายจ่ายที่ควรแยกจำเป็นกับอยากได้ให้ชัด แต่ยังมีช่องให้เก็บกลับมาทีละน้อย", "เงินเข้าจากความสามารถหรือของที่มีอยู่แล้ว ใช้ทรัพยากรเดิมให้คุ้มก่อนเพิ่มภาระ", "ระวังข้อตกลงที่ดูสวยเกินจริง อ่านเงื่อนไขให้ครบก่อนรับปาก"]],
  luck: ["โชคลาภ", ["โชคอยู่ในจังหวะพบคนหรือข้อมูลโดยบังเอิญ เปิดตาไว้กับเรื่องเล็กที่ซ้ำๆ กัน", "โชคมาแบบช้าแต่ชัวร์ ไม่ใช่ก้อนใหญ่ทันที แต่เป็นทางเลือกที่ดีขึ้น", "เลข เวลา หรือสถานที่เดิมๆ อาจเป็นสัญญาณให้กลับไปตรวจบางเรื่อง"]],
  love: ["ความรัก", ["ความสัมพันธ์ต้องการบทสนทนาที่จริงใจ ถ้าโสด คนที่เข้ามาอาจเริ่มจากความคุ้นเคยเรียบง่าย", "อย่าให้ความกลัวเก่าเป็นคนตอบแทนหัวใจ ปรับความคาดหวังแล้วความอบอุ่นจะชัดขึ้น", "มีแรงดึงดูด แต่ต้องแยกเสน่ห์ออกจากความพร้อมในการดูแลกัน"]],
  health: ["สุขภาพ", ["ร่างกายขอพักเป็นช่วงๆ โดยเฉพาะการนอน น้ำ และสายตา อย่าฝืนจนสัญญาณเล็กกลายเป็นเสียงดัง", "สมดุลคือคำหลัก ลดสิ่งสุดโต่งและกลับมาเช็กกิจวัตรพื้นฐาน", "อารมณ์สะสมส่งผลต่อกาย หาเวลาปล่อยความเครียดแบบไม่ต้องพิสูจน์อะไร"]],
  current: ["เรื่องที่เกิดขึ้นช่วงนี้", ["คุณกำลังยืนหน้าประตูที่ยังไม่มีป้ายชื่อ ความไม่แน่ใจไม่ใช่ลางร้าย แต่เป็นหมอกก่อนเห็นเส้นทาง", "เรื่องเก่ากำลังขอให้จัดระเบียบใหม่ ถ้ากล้าตัดสิ่งรกออก จะเห็นคำตอบเร็วขึ้น", "มีคนหรือเหตุการณ์สะท้อนบางอย่างกลับมา เพื่อให้คุณเลือกด้วยใจที่โตขึ้นกว่าเดิม"]]
};

const form = document.querySelector("#reading-form");
const nameInput = document.querySelector("#seeker-name");
const readingList = document.querySelector("#reading-list");
const placeholder = document.querySelector("#deck-placeholder");
const template = document.querySelector("#reading-template");
const controlRow = document.querySelector(".control-row");
const futureButton = document.querySelector("#future-button");
const resetButton = document.querySelector("#reset-button");

let openedCards = [];

function pickCard() {
  const available = tarotDeck.filter((card) => !openedCards.includes(card.number));
  const pool = available.length ? available : tarotDeck;
  return pool[Math.floor(Math.random() * pool.length)];
}

function pickLine(key, card, seeker, sequence) {
  const lines = categoryText[key][1];
  const seed = `${card.number}-${seeker}-${sequence}-${key}`.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return lines[seed % lines.length];
}

function buildStory(card, seeker, sequence) {
  const prefix = sequence === 1
    ? `${seeker} ถูกเรียกเข้าไปในเมืองหมอก เมื่อประตูทองแดงเปิดออก ไพ่ ${card.thai} พลิกขึ้นบนโต๊ะหิน`
    : `เมื่อ ${seeker} เปิดประตูถัดไป หมอกเดิมแยกออกเป็นทางใหม่ ไพ่ ${card.thai} จึงปรากฏเหมือนตอนต่อของคำทำนาย`;
  return `${prefix}. ${card.story} แก่นของไพ่ใบนี้คือ "${card.essence}" จึงบอกให้คุณอ่านสัญญาณรอบตัวอย่างใจเย็น และเลือกก้าวที่ทำให้ตัวเองเบาขึ้นกว่าวันก่อน.`;
}

function renderReading(card, seeker, sequence) {
  openedCards.push(card.number);
  placeholder.hidden = true;
  controlRow.hidden = false;
  if (sequence > 1) futureButton.disabled = true;

  const node = template.content.cloneNode(true);
  const article = node.querySelector(".reading-card");
  article.style.animationDelay = `${Math.min(sequence - 1, 2) * 90}ms`;
  node.querySelector(".arcana-symbol").textContent = card.symbol;
  node.querySelector(".card-number").textContent = `Major Arcana ${card.number}`;
  node.querySelector(".card-title").textContent = `${card.english} / ${card.thai}`;
  node.querySelector(".reading-label").textContent = sequence === 1 ? "คำทำนายหลัก" : "อนาคตอันใกล้";
  node.querySelector("h2").textContent = `${card.thai}: ${card.essence}`;
  node.querySelector(".story").textContent = buildStory(card, seeker, sequence);

  const grid = node.querySelector(".forecast-grid");
  Object.entries(categoryText).forEach(([key, [label]]) => {
    const item = document.createElement("div");
    item.className = "forecast-item";
    item.innerHTML = `<strong>${label}</strong><p>${pickLine(key, card, seeker, sequence)}</p>`;
    grid.appendChild(item);
  });

  readingList.appendChild(node);
  readingList.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function getSeekerName() {
  return nameInput.value.trim() || "นักเดินทางไร้นาม";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (openedCards.length) return;
  renderReading(pickCard(), getSeekerName(), 1);
});

futureButton.addEventListener("click", () => {
  if (!openedCards.length || openedCards.length > 1) return;
  renderReading(pickCard(), getSeekerName(), 2);
});

resetButton.addEventListener("click", () => {
  openedCards = [];
  readingList.innerHTML = "";
  placeholder.hidden = false;
  controlRow.hidden = true;
  futureButton.disabled = false;
  nameInput.value = "";
  nameInput.focus();
});
