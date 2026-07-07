export const staticCategoryKeys = ["work", "money", "luck", "love", "health", "current"];
export const staticReadyLanguages = ["th", "en", "zh"];

export const staticCategoryNames = {
  work: { th: "การงาน", en: "Work", zh: "工作" },
  money: { th: "การเงิน", en: "Money", zh: "金钱" },
  luck: { th: "โชคลาภ", en: "Luck", zh: "运势" },
  love: { th: "ความรัก", en: "Love", zh: "感情" },
  health: { th: "สุขภาพ", en: "Health", zh: "健康" },
  current: { th: "เรื่องที่เกิดขึ้นช่วงนี้", en: "Current energy", zh: "当前状态" }
};

const staticNameless = {
  th: "นักเดินทางไร้นาม",
  en: "nameless traveler",
  zh: "无名旅人"
};

const staticCategoryLines = {
  th: {
    work: [
      "งานกำลังเรียกให้คุณเริ่มจากชิ้นเล็กที่จับต้องได้ อย่ารอให้ทุกอย่างชัดครบก่อนค่อยขยับ เพราะความคืบหน้าจะเปิดทางให้เอง ช่วงนี้เหมาะกับการจัดโต๊ะ เคลียร์งานค้าง และเลือกหนึ่งเรื่องที่ควรทำให้เสร็จจริง ๆ ก่อนกระจายพลังไปหลายทาง",
      "จังหวะงานต้องการระเบียบและการเลือกสิ่งสำคัญก่อน สิ่งที่ดูช้าในตอนนี้อาจเป็นฐานที่ทำให้ก้าวต่อไปมั่นคงกว่าเดิม ถ้ามีคนกดดันหรือมีงานซ้อน ให้ตอบด้วยแผนที่ชัด ไม่ใช่อารมณ์ที่รีบจนเกินไป",
      "คำตอบเรื่องงานซ่อนอยู่ในบทสนทนาหรือสัญญาณเล็ก ๆ รอบตัว ฟังให้มากขึ้นแล้วคุณจะเห็นประตูที่เหมาะกับตัวเอง อย่ามองข้ามคำแนะนำจากคนที่ไม่ได้เสียงดังที่สุด เพราะบางครั้งทางออกอยู่ในประโยคธรรมดาที่ผ่านหูไปเร็ว"
    ],
    money: [
      "การเงินควรแยกของจำเป็นกับของที่ใจอยากได้ให้ชัด ยังมีทางจัดสมดุลกลับมาได้ถ้าค่อย ๆ เก็บรอยรั่วเล็ก ๆ เริ่มจากรายจ่ายประจำที่ถูกลืม เช่น subscription ของเล็ก หรือของที่ซื้อเพราะเหนื่อยใจมากกว่าจำเป็นจริง",
      "เงินหรือโอกาสอาจมาจากทักษะและทรัพยากรเดิมที่คุณมีอยู่แล้ว ใช้สิ่งที่อยู่ในมือให้คุ้มก่อนรับภาระใหม่ ถ้าจะหารายได้เพิ่ม ให้เริ่มจากสิ่งที่คุณทำได้เร็วและไม่ทำให้พลังชีวิตรั่วจนต้องจ่ายคืนด้วยสุขภาพ",
      "ระวังข้อตกลงที่ดูหวานเกินจริง อ่านเงื่อนไขและเวลาผูกมัดให้ครบก่อนตัดสินใจ ไพ่ไม่ได้ห้ามเสี่ยงทั้งหมด แต่เตือนให้คุณดูตัวเลขจริง ระยะเวลา และผลที่ตามมาถ้าแผนไม่เป็นไปตามหวัง"
    ],
    luck: [
      "โชคมาในรูปของข้อมูล คน หรือเหตุบังเอิญที่สะกิดใจ ให้สังเกตสิ่งที่ปรากฏซ้ำมากกว่ารอปาฏิหาริย์ใหญ่ ถ้ามีเรื่องเดิมกลับมาสองสามครั้งในวันเดียวกัน ให้ถือว่าเป็นสัญญาณให้หยุดดู ไม่ใช่เรื่องบังเอิญที่ควรมองข้าม",
      "จังหวะดีจะมาแบบค่อยเป็นค่อยไป ไม่ใช่ของที่ตกใส่มือทันที แต่เป็นทางเลือกที่เริ่มชัดเมื่อคุณพร้อมเดิน โชคของช่วงนี้ชอบคนที่เตรียมตัวไว้ก่อน ดังนั้นการจัดข้อมูล เอกสาร หรือแผนเล็ก ๆ จะช่วยเปิดประตูได้มากกว่าแค่รอ",
      "เลข เวลา หรือสถานที่ที่วนกลับมาอาจเป็นเครื่องหมายให้ตรวจบางเรื่องซ้ำอีกครั้งก่อนปล่อยผ่าน ถ้าจะเสี่ยงโชค ให้เสี่ยงอย่างเบามือและไม่ฝากความหวังทั้งหมดไว้ตรงนั้น เพราะไพ่ชี้ว่าโชคจริงอยู่กับการอ่านจังหวะให้ทัน"
    ],
    love: [
      "ความสัมพันธ์ต้องการถ้อยคำที่จริงและอ่อนโยน ถ้าโสด ความอบอุ่นอาจเริ่มจากความคุ้นเคยธรรมดาที่ไม่กดดัน อย่าเร่งให้ทุกอย่างต้องมีชื่อเรียกทันที บางความสัมพันธ์ต้องการพื้นที่เล็ก ๆ เพื่อพิสูจน์ว่าความสบายใจอยู่ได้นานแค่ไหน",
      "อย่าให้ความกลัวเก่าเป็นคนตอบแทนหัวใจของคุณ ปรับความคาดหวังให้พอดีแล้วความรู้สึกจะอ่านง่ายขึ้น ถ้ามีเรื่องค้างคา ให้พูดจากความต้องการจริง ไม่ใช่จากบทสรุปที่สร้างขึ้นตอนใจไม่ปลอดภัย",
      "มีแรงดึงดูดหรือความคิดถึงบางอย่าง แต่ควรแยกเสน่ห์ออกจากความพร้อมในการดูแลกันจริง ๆ ไพ่ชวนให้ดูการกระทำซ้ำ ๆ มากกว่าคำพูดครั้งเดียว เพราะความรักที่ดีไม่ควรทำให้คุณต้องเดาตลอดเวลา"
    ],
    health: [
      "ร่างกายขอให้คุณกลับมาดูพื้นฐานอย่างการพัก น้ำ อาหาร และสายตา สัญญาณเล็ก ๆ ไม่ควรถูกมองข้าม ถ้าวันนี้รู้สึกหนักหัว เพลีย หรือหายใจไม่เต็มอิ่ม ให้เริ่มจากลดสิ่งกระตุ้นและคืนเวลาสงบให้ตัวเองก่อน",
      "สมดุลคือคำสำคัญ ลดสิ่งสุดโต่งลงสักนิด แล้วให้กิจวัตรธรรมดาช่วยพยุงทั้งกายและใจ ไม่ต้องเปลี่ยนชีวิตทั้งชุดในวันเดียว แค่เลือกหนึ่งนิสัยที่ทำให้ร่างกายขอบคุณคุณมากขึ้นก็พอ",
      "ความเครียดสะสมอาจทำให้พลังตก หาเวลาปล่อยใจโดยไม่ต้องพิสูจน์อะไรกับใคร ไพ่ไม่ได้ชี้ให้กังวล แต่ชวนให้ฟังร่างกายตั้งแต่เสียงยังเบา และขอความช่วยเหลือจากผู้เชี่ยวชาญเมื่อมีอาการที่น่าห่วงหรือยืดเยื้อ"
    ],
    current: [
      "ช่วงนี้คุณเหมือนยืนหน้าประตูที่ยังไม่มีป้ายชื่อ ความไม่แน่ใจไม่ใช่ลางร้าย แต่เป็นหมอกก่อนเห็นทาง อย่าบังคับตัวเองให้ตอบทุกคำถามทันที ให้เก็บข้อมูลเพิ่มและดูว่าความรู้สึกสงบลงตรงทางเลือกไหน",
      "เรื่องเก่ากำลังขอให้จัดระเบียบใหม่ ถ้ากล้าตัดสิ่งรกออก คำตอบที่ซ่อนอยู่จะปรากฏเร็วขึ้น สิ่งที่ควรทำตอนนี้คือแยกอดีตที่เป็นบทเรียนออกจากอดีตที่ยังดึงคุณไว้ด้วยความเสียดาย",
      "บางคนหรือบางเหตุการณ์กำลังสะท้อนสิ่งสำคัญกลับมา เพื่อให้คุณเลือกด้วยใจที่โตขึ้นกว่าเดิม ถ้ามีเรื่องเดิมเกิดซ้ำ ไพ่ชวนให้ถามว่า ครั้งนี้คุณจะตอบแบบเดิม หรือจะลองเลือกด้วยขอบเขตที่ชัดขึ้น"
    ]
  },
  en: {
    work: [
      "Work is asking you to begin with one practical piece that can truly be finished. Do not wait until every part of the map is clear before moving, because the first bit of progress will reveal the next door. This is a good time to clear your table, close old tasks, and choose one matter to complete before scattering your strength in too many directions.",
      "Your work rhythm needs order and the courage to choose what matters first. The part that feels slow right now may be the foundation that makes the next step steadier than before. If pressure rises or tasks overlap, answer with a clear plan rather than with an emotion that rushes faster than the situation requires.",
      "The answer about work is hidden in a conversation or in a small signal around you. Listen more carefully and you will begin to see the door that suits you. Do not overlook advice from the person who speaks the least loudly, because sometimes the way out is tucked inside an ordinary sentence that passes by quickly."
    ],
    money: [
      "Your money asks you to separate what is necessary from what the heart merely wants. Balance can still return if you patiently close the small leaks, starting with forgotten recurring expenses, tiny purchases, or things bought from emotional fatigue rather than real need.",
      "Money or opportunity may come from skills and resources you already possess. Use what is in your hands well before accepting a new burden. If you want extra income, begin with something you can do quickly and safely, without draining your life force so much that your health must later pay the bill.",
      "Be careful with agreements that look sweeter than they really are. Read the conditions and the binding timeline before deciding. The card does not forbid all risk, but it asks you to look at the real numbers, the duration, and the result if the plan does not unfold as hoped."
    ],
    luck: [
      "Luck arrives as information, a person, or a coincidence that quietly catches your attention. Notice what repeats instead of waiting for a grand miracle. If the same matter returns two or three times in one day, treat it as a signal to pause and look, not as a coincidence to dismiss.",
      "The fortunate rhythm comes gradually, not as something that falls into your hand all at once, but as an option that becomes clearer when you are ready to walk. Luck in this period favors the prepared, so organizing information, documents, or a small plan may open more doors than waiting alone.",
      "A number, a time, or a place that circles back may be asking you to check something once more before letting it pass. If you take a chance, do it lightly and do not place all your hope there, because the card says real luck is found in reading the timing well."
    ],
    love: [
      "Relationships need words that are both honest and gentle. If you are single, warmth may begin from ordinary familiarity that carries no pressure. Do not rush everything into a name at once; some connections need a little room to prove how long comfort can truly remain.",
      "Do not let an old fear answer on behalf of your heart. Adjust your expectations to a human size and the feeling in front of you will become easier to read. If something remains unresolved, speak from your real need, not from a conclusion built while your heart felt unsafe.",
      "There may be attraction or a certain longing here, but separate charm from the genuine readiness to care for one another. The card asks you to watch repeated actions more than a single beautiful sentence, because good love should not force you to keep guessing all the time."
    ],
    health: [
      "Your body asks you to return to the basics: rest, water, food, and care for your eyes. Small signals should not be ignored. If today brings heaviness in the head, fatigue, or shallow breathing, begin by lowering stimulation and giving yourself a quiet interval before pushing onward.",
      "Balance is the important word. Reduce extremes a little and let ordinary routines support both body and mind. You do not need to change your whole life in one day; choosing one habit that makes your body thank you is enough for now.",
      "Accumulated stress may be lowering your energy. Make time to let the heart loosen without needing to prove anything to anyone. The card is not asking you to worry; it asks you to hear the body while its voice is still soft, and to seek professional help if any concerning symptom persists."
    ],
    current: [
      "At this moment you are standing before a door with no nameplate. Uncertainty is not a bad omen; it is the mist before the road appears. Do not force yourself to answer every question immediately. Gather more information and notice which choice allows your feelings to become calmer.",
      "An old matter is asking to be reorganized. If you dare to cut away what has become clutter, the hidden answer will appear sooner. What matters now is to separate the past that has become a lesson from the past that still holds you only through regret.",
      "Someone or some event is reflecting something important back to you so you can choose with a heart that has grown. If the same pattern repeats, the card asks whether you will answer in the old way again, or try choosing with clearer boundaries this time."
    ]
  },
  zh: {
    work: [
      "工作正在要求你从一个能真正完成的小步骤开始。不要等所有事情都完全清楚才行动，因为进展本身会替你打开下一扇门。这段时间适合整理桌面、清掉旧任务，并先选择一件最该完成的事，不要把力量同时分散到太多方向。",
      "工作的节奏需要秩序，也需要先选择重要之事的勇气。此刻看似缓慢的部分，可能正是让下一步更稳的基础。若有人施压，或任务层层叠来，请用清楚的计划回应，而不是让急躁的情绪替你开口。",
      "工作上的答案藏在某次谈话，或藏在身边一个细小的反复信号里。多听一点，你会看见更适合自己的门。不要忽略那个并不大声的人给出的建议，因为有时候出口就藏在一句平常到几乎擦肩而过的话中。"
    ],
    money: [
      "财务上需要你先分清真正必要的东西，和只是内心想要的东西。只要耐心补上那些小小的漏洞，平衡仍会慢慢回来。可以先检查被遗忘的固定支出、小额订阅，或那些因为疲惫而买下、却未必真正需要的东西。",
      "金钱或机会可能来自你原本就拥有的能力与资源。先把手里的东西用好，再接受新的负担。若想增加收入，请从自己能较快完成、又不会过度消耗生命力的事情开始，别让健康在事后替收入付账。",
      "请留意那些看起来过分甜美的协议。决定之前，要读清条件和被绑定的时间。牌并不是禁止你承担所有风险，而是提醒你看见真实数字、期限，以及计划若没有如愿发生时会带来的后果。"
    ],
    luck: [
      "好运会以资讯、某个人，或一次轻轻触动你的巧合出现。请观察反复出现的东西，而不是只等待巨大的奇迹。若同一件事在一天之内回来两三次，就把它当成需要停下来查看的信号，不要轻易当作普通巧合忽略。",
      "好的时机正在一点一点到来，不是突然掉进手里的礼物，而是当你准备迈步时逐渐清楚的选择。这段时间的好运偏爱提前准备的人，所以整理资料、文件或一个小计划，往往比单纯等待更能打开门。",
      "某个数字、时间，或不断绕回来的地点，可能在提醒你重新确认一件事之后再放手。若要试试运气，请轻一点，不要把所有希望都押在那里，因为牌指出，真正的好运来自你能否读懂时机。"
    ],
    love: [
      "关系需要真实而温柔的话语。若你单身，温暖可能从一种普通、熟悉、没有压力的相处开始。不要急着立刻给所有关系一个名字；有些连接需要一点空间，来证明安心感是否真的能停留得久。",
      "不要让过去的恐惧替你的心回答。把期待调回合适的大小，眼前的感受就会更容易被读懂。若有悬而未决的事，请从真实需要出发去说，而不是从心里不安全时预先做出的结论出发。",
      "这里也许有吸引，也许有某种想念，但你需要把魅力和真正照顾彼此的准备分开。牌邀请你看反复出现的行动，而不是只听一次漂亮的话，因为好的爱不该让你一直猜测。"
    ],
    health: [
      "身体正在请求你回到基础：休息、饮水、饮食，以及眼睛的放松。细小信号不该被忽略。若今天有头重、疲惫，或呼吸不够舒展的感觉，请先减少刺激，把一点安静的时间还给自己。",
      "关键词是平衡。稍微减少极端，让普通的日常习惯托住身体和心。你不必在一天之内改变整个人生，只要选择一个会让身体感谢你的习惯，就已经足够。",
      "累积的压力可能正在让能量下沉。请给心一个松开的时间，不需要向任何人证明什么。牌并不是要你担心，而是邀请你在身体的声音还轻时就倾听；若有令人担忧或持续不退的症状，也要寻求专业帮助。"
    ],
    current: [
      "这段时间，你像站在一扇没有名牌的门前。不确定并不是坏预兆，而是道路显现前的雾。不要强迫自己立刻回答所有问题，请再多收集一点资讯，并观察哪一个选择会让内心逐渐安静下来。",
      "旧事正在请求你重新整理。若你愿意剪去那些变得杂乱的部分，隐藏的答案会更快出现。此刻重要的是，把已经成为教训的过去，和仍用遗憾拉住你的过去分开。",
      "某个人或某个事件正在把重要的东西映照回来，让你用比从前更成熟的心来选择。若同样的模式再次出现，牌会问你：这一次还要用旧方式回应，还是尝试用更清楚的边界来选择？"
    ]
  }
};

const localizedCards = {
  en: {
    "00": { name: "The Fool", essence: "new beginnings", story: "A young traveler carries a lamp toward a city without a map. The unknown is not empty; it is waiting for the first brave step." },
    "01": { name: "The Magician", essence: "focused action", story: "Tools lie on the old table, but they are only ordinary objects until a willing hand begins to use them." },
    "02": { name: "The High Priestess", essence: "intuition", story: "Behind the quiet curtain, an unread message waits. The truth has not disappeared; it is asking for stillness." },
    "03": { name: "The Empress", essence: "growth", story: "A golden seed falls into tired soil. Patient care turns what looked empty into a place of fragrance and life." },
    "04": { name: "The Emperor", essence: "structure", story: "Stone by stone, a bridge is built across a difficult gap. Strength comes from what can keep standing after the weather changes." },
    "05": { name: "The Hierophant", essence: "lessons", story: "A scorched book opens to an unfinished page. Some rules protect you, while others wait for you to outgrow them wisely." },
    "06": { name: "The Lovers", essence: "choice", story: "Two paths meet under falling light. Love is not only closeness; it is choosing without betraying the deeper self." },
    "07": { name: "The Chariot", essence: "momentum", story: "A dark carriage crosses a rain-bright street. The destination is not fully visible, but the hands on the reins are steady." },
    "08": { name: "Strength", essence: "inner courage", story: "A fierce force softens before patience. Real power appears when gentleness remains steady instead of turning away." },
    "09": { name: "The Hermit", essence: "reflection", story: "A lamp is lifted at the top of a spiral stair. Solitude is not escape when it helps you return with clearer sight." },
    "10": { name: "Wheel of Fortune", essence: "turning timing", story: "A golden wheel turns below the floor. When timing shifts, the steady heart can use the motion as a way upward." },
    "11": { name: "Justice", essence: "balance", story: "A mirror is offered instead of a verdict. It shows both the mistake and the courage needed to repair it." },
    "12": { name: "The Hanged Man", essence: "a new perspective", story: "The world turns upside down, and a dead end becomes the roof of a hidden passage. A changed angle changes the answer." },
    "13": { name: "Death", essence: "necessary endings", story: "At dawn, old leaves fall from a tired branch. Not everything is lost; some things are released so life can return." },
    "14": { name: "Temperance", essence: "adjusted balance", story: "Light is poured from one cup into another without haste. What is too strong softens, and what is too faint receives fire." },
    "15": { name: "The Devil", essence: "bindings", story: "A golden key is offered, but it opens only the familiar cage. Freedom begins by asking who has been holding the chain." },
    "16": { name: "The Tower", essence: "release", story: "Lightning breaks the wall that covered an old spring. The collapse is startling, yet it reveals what had been hidden." },
    "17": { name: "The Star", essence: "hope", story: "A small wish is lowered into a deep well. The water answers by reflecting a whole sky back to the hands that dared to ask." },
    "18": { name: "The Moon", essence: "uncertainty", story: "A silver road bends through shadow. Not every shape is true, but morning will come if you do not follow every whisper." },
    "19": { name: "The Sun", essence: "clarity", story: "Curtains open on an abandoned stage, and daylight fills the room. What looked frightening in darkness becomes ordinary wood." },
    "20": { name: "Judgement", essence: "awakening", story: "An ancient bell rings without a visible hand. Old excuses wake up, and a new answer becomes possible." },
    "21": { name: "The World", essence: "completion", story: "The traveler returns to the first gate with dust on their shoes. The ending is also a circle opening into the next beginning." }
  },
  zh: {
    "00": { name: "愚者", essence: "新的开始", story: "年轻的旅人提着灯走向没有地图的城市。未知并不是空白，而是在等待第一个勇敢的脚步。" },
    "01": { name: "魔术师", essence: "行动与显化", story: "旧桌上放着各种工具，但在愿意开始的手出现之前，它们都只是普通之物。" },
    "02": { name: "女祭司", essence: "直觉", story: "安静的帘幕后，有一封尚未被读懂的信。真相没有消失，只是在请求你安静下来。" },
    "03": { name: "皇后", essence: "成长", story: "金色的种子落进疲惫的土壤。耐心的照料，会让看似空无的地方重新有香气和生命。" },
    "04": { name: "皇帝", essence: "结构", story: "一块石头接着一块石头，桥梁横跨困难的裂缝。真正的力量来自风雨之后仍能站住的结构。" },
    "05": { name: "教皇", essence: "课题", story: "被火痕染过的书翻到未完成的一页。有些规则保护你，有些规则则等待你成熟后温柔地越过。" },
    "06": { name: "恋人", essence: "选择", story: "两条路在坠落的光下相遇。爱不只是靠近，也是在不背叛内心的前提下做选择。" },
    "07": { name: "战车", essence: "推进力", story: "深色车影穿过雨光闪烁的街道。目的地还不完全清楚，但握住方向的手已经足够稳定。" },
    "08": { name: "力量", essence: "内在勇气", story: "强烈的力量在耐心面前慢慢柔和。真正的强大，是温柔仍然能够稳定地留下。" },
    "09": { name: "隐士", essence: "反思", story: "一盏灯在旋梯尽头被举起。独处并非逃离，若它能让你带着更清楚的眼光回来。" },
    "10": { name: "命运之轮", essence: "时机转动", story: "金色的轮在地面之下转动。当时机改变，稳定的心能把变化变成向上的路。" },
    "11": { name: "正义", essence: "平衡", story: "递来的不是判决，而是一面镜子。它同时映出错误，也映出修复错误所需的勇气。" },
    "12": { name: "倒吊人", essence: "新的视角", story: "世界倒转之后，原本的死路成了隐藏通道的屋顶。角度改变，答案也会改变。" },
    "13": { name: "死神", essence: "必要的结束", story: "黎明时，旧叶从疲惫的枝头落下。并非一切都失去，有些东西被放下，是为了让生命回来。" },
    "14": { name: "节制", essence: "调和", story: "光从一个杯子缓缓倒向另一个杯子。过强的会被柔化，过淡的会重新得到火光。" },
    "15": { name: "恶魔", essence: "束缚", story: "金色钥匙被递到眼前，却只能打开熟悉的笼子。自由始于你愿意询问是谁握着锁链。" },
    "16": { name: "高塔", essence: "释放", story: "闪电击开遮住旧泉的墙。崩塌令人惊讶，却也显露了长期被隐藏的东西。" },
    "17": { name: "星星", essence: "希望", story: "一个小小的愿望被放进深井。水面用整片天空回应那双仍敢请求的手。" },
    "18": { name: "月亮", essence: "不确定", story: "银色道路在阴影中弯曲。不是每个形状都是真的，但只要不追随每个耳语，清晨终会到来。" },
    "19": { name: "太阳", essence: "清晰", story: "帘幕在废弃舞台上打开，日光充满房间。黑暗中可怕的东西，在光里只是普通的木板。" },
    "20": { name: "审判", essence: "觉醒", story: "古老的钟声在无人敲响时响起。旧借口被唤醒，而新的回答也变得可能。" },
    "21": { name: "世界", essence: "完成", story: "旅人带着鞋上的尘土回到最初的门前。结束也是一个圆，正在打开下一段开始。" }
  }
};

function normalizeLanguage(language) {
  return ["th", "en", "zh"].includes(language) ? language : "th";
}

function normalizeSequence(sequence) {
  return Number(sequence) === 2 ? 2 : 1;
}

function safeSeekerName(seeker, language) {
  const trimmed = typeof seeker === "string" ? seeker.trim() : "";
  return trimmed || staticNameless[language];
}

function getStaticCardText(card = {}, language) {
  const englishName = card.english || localizedCards.en[card.number]?.name || card.thai || "Nameless Card";

  if (language === "th") {
    return {
      name: englishName,
      essence: card.essence || "สัญญาณจากหมอก",
      story: card.story || "ไพ่ใบนี้เปิดขึ้นเหมือนหน้าต่างเล็ก ๆ ให้คุณเห็นสิ่งที่ใจรู้อยู่แล้วแต่ยังไม่ได้พูดออกมา"
    };
  }

  const localized = localizedCards[language]?.[card.number] || localizedCards.en["00"];
  return {
    name: englishName,
    essence: localized.essence,
    story: localized.story
  };
}

export function buildThaiStory(card, seeker, sequence) {
  const cardText = getStaticCardText(card, "th");
  const opening = sequence === 1
    ? `${seeker} ถูกเรียกเข้าไปในเมืองหมอก เมื่อประตูทองแดงเปิดออก ไพ่ “${cardText.name}” พลิกขึ้นบนโต๊ะหินกลางห้องพิธี`
    : `เมื่อ ${seeker} เปิดประตูถัดไป หมอกเดิมแยกออกเป็นทางใหม่ ไพ่ “${cardText.name}” จึงปรากฏเหมือนตอนต่อของคำทำนาย`;
  const sequenceMeaning = sequence === 1
    ? "ไพ่ใบนี้เป็นเสียงหลักของวันนี้ มันกางบรรยากาศให้เห็นว่าใจคุณกำลังยืนอยู่ตรงไหน"
    : "ไพ่ใบนี้เป็นเสียงจากอนาคตอันใกล้ ช่วง 7-14 วันข้างหน้า ให้สังเกตการตอบสนองของตัวเอง";

  return `${opening}. ${cardText.story}

แก่นของไพ่ใบนี้คือ “${cardText.essence}” ${sequenceMeaning} ผู้ทำนายไม่ได้ขอให้เชื่อแบบตายตัว แต่ชวนให้ฟังสัญญาณรอบตัวอย่างสงบ งานควรเริ่มจากสิ่งเล็กที่ทำเสร็จได้จริง เงินควรแยกจำเป็นออกจากอยากได้ ความรักให้ดูการกระทำซ้ำๆ มากกว่าคำพูดครั้งเดียว สุขภาพให้กลับมาดูพื้นฐานก่อนมองหาคำตอบไกลตัว และเรื่องที่เกิดขึ้นช่วงนี้อาจเป็นกระจกที่สะท้อนสิ่งเดิม เพื่อให้คุณเลือกใหม่ด้วยสติที่มากขึ้น

ให้มองคำทำนายนี้เหมือนแผนที่ในหมอก ไม่ใช่คำสั่งสุดท้าย สัญญาณที่สำคัญที่สุดคือความรู้สึกหลังอ่านว่าตรงไหนทำให้ใจสงบ ตรงไหนทำให้ใจเกร็ง และตรงไหนเรียกให้คุณรับผิดชอบชีวิตของตัวเองมากขึ้น หากวันนี้ยังลังเล อย่าเร่งตัดสินทั้งชีวิตในครั้งเดียว ให้เลือกหนึ่งก้าวที่ทำให้ใจเบาขึ้น ซื่อสัตย์กับตัวเองมากขึ้น และไม่ทำร้ายขอบเขตของใคร ไพ่เปิดทางให้เห็นจังหวะ แต่ผู้เดินยังเป็นคุณเสมอ`;
}

function buildEnglishStory(card, seeker, sequence) {
  const cardText = getStaticCardText(card, "en");
  const opening = sequence === 1
    ? `${seeker} is called into the city of mist. As the bronze door opens, ${cardText.name} turns face-up on the stone table at the center of the ritual room`
    : `When ${seeker} opens the next door, the old mist divides into a new path, and ${cardText.name} appears like the next chapter of the omen`;
  const sequenceMeaning = sequence === 1
    ? "This card is the main voice of today; it spreads the atmosphere wide enough for you to see where your heart is standing"
    : "This card speaks from the near future, especially the next 7-14 days, and asks you to notice your own responses as events move";

  return `${opening}. ${cardText.story}

The heart of this card is "${cardText.essence}". ${sequenceMeaning}. The oracle is not asking you to believe in a fixed fate. It is inviting you to read the signs around you with a calm mind. Work should begin with something small enough to finish for real. Money asks you to separate what is necessary from what merely wants to be comforted. In love, watch repeated actions more closely than one beautiful sentence. For health, return to the basics before searching for distant answers. What is happening around you now may be a mirror of an old pattern, returning so you can choose again with greater awareness.

Treat this reading as a map held inside fog, not as a final command. The most important signal is the feeling that remains after you read it: where your heart softens, where it tightens, and where it asks you to take more responsibility for your own life. If you are still unsure today, do not force one decision to carry your entire future. Choose one step that makes you lighter, more honest with yourself, and kinder to the boundaries of others. The card can reveal the rhythm, but the person who walks the path is still you.`;
}

function buildChineseStory(card, seeker, sequence) {
  const cardText = getStaticCardText(card, "zh");
  const opening = sequence === 1
    ? `${seeker}被召入迷雾之城。铜门开启时，${cardText.name}在仪式室中央的石桌上翻开`
    : `当${seeker}推开下一扇门，旧日迷雾分成新的道路，${cardText.name}像预言的下一章一样出现`;
  const sequenceMeaning = sequence === 1
    ? "这张牌是今日的主要声音，它展开一层氛围，让你看见自己的心正站在什么位置"
    : "这张牌来自近期未来，尤其是接下来7到14天，它提醒你观察自己面对事件时的反应";

  return `${opening}。${cardText.story}

这张牌的核心是「${cardText.essence}」。${sequenceMeaning}。占卜者并不要求你把命运当成固定不变的答案来相信，而是邀请你带着安静的心，阅读身边正在出现的信号。工作应从一件小而真实、能够完成的事情开始；金钱需要先分清必要之物和只是想被安慰的欲望；感情要多看反复出现的行动，而不是只被一句漂亮的话牵动；健康则要先回到休息、饮水、饮食与呼吸这些基础。此刻发生的事，也许是一面镜子，把旧模式再次映照回来，让你能用更多觉察重新选择。

请把这段解读看成雾中的地图，而不是最终命令。真正重要的信号，是你读完之后心里留下的感觉：哪里变得安静，哪里忽然收紧，哪里又提醒你该为自己的生活承担更多责任。若今天仍然迟疑，不必逼自己用一次决定背负整段未来。先把注意力放在三个层面：当下能处理的一件小事、最需要被保护的一条边界，以及未来几天反复出现的细节。若同样的话语、地点、时间或情绪再次回来，请先停下观察，再决定是否行动。若答案仍然不清楚，就把问题写下来，等情绪退潮后再读一次；真正适合你的道路，通常不会只靠焦虑逼你立刻选择。也请把选择放回现实，用可以执行的行动、可以说出口的话、可以照顾身体的节奏来验证。只要选择一个让心更轻、更诚实，也更尊重他人边界的步伐就好。牌可以揭示节奏，但走在路上的人，始终还是你自己。`;
}

function buildStaticStory(card, seeker, sequence, language) {
  if (language === "th") {
    return buildThaiStory(card, seeker, sequence);
  }

  if (language === "en") {
    return buildEnglishStory(card, seeker, sequence);
  }

  if (language === "zh") {
    return buildChineseStory(card, seeker, sequence);
  }

  return buildThaiStory(card, seeker, sequence);
}

function pickStaticLine(key, card, seeker, sequence, language) {
  const lines = staticCategoryLines[language][key];
  const seed = `${card?.number || "00"}-${seeker}-${sequence}-${key}`
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return lines[seed % lines.length];
}

export function createStaticReading({ card, seeker, sequence, language }) {
  const normalizedLanguage = normalizeLanguage(language);
  const normalizedSequence = normalizeSequence(sequence);
  const normalizedSeeker = safeSeekerName(seeker, normalizedLanguage);

  return {
    provider: "static",
    model: "local-static-v1",
    story: buildStaticStory(card, normalizedSeeker, normalizedSequence, normalizedLanguage),
    forecasts: staticCategoryKeys.map((key) => ({
      key,
      label: staticCategoryNames[key][normalizedLanguage],
      text: pickStaticLine(key, card, normalizedSeeker, normalizedSequence, normalizedLanguage)
    }))
  };
}

export function isStaticReadingReady(language) {
  return staticReadyLanguages.includes(normalizeLanguage(language));
}
