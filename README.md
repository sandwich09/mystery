# Veilbound Arcana

เว็บดูดวงเปิดไพ่ทาโรต์ด้วย Next.js มีหน้าอ่านไพ่, API route สำหรับ AI reading และ fallback local เมื่อยังไม่ได้ตั้งค่า provider

## สิ่งที่มีในต้นแบบ

- ใส่ชื่ออะไรก็ได้ ไม่ต้องเป็นชื่อจริง
- สุ่มไพ่ Major Arcana 1 ใบ
- เล่าเป็น story สั้นแบบนิทาน 1 ตอน
- แยกคำทำนายเป็น การงาน การเงิน โชคลาภ ความรัก สุขภาพ และเรื่องที่เกิดขึ้นช่วงนี้
- เปิดไพ่เพิ่มสำหรับอนาคตอันใกล้ได้ 1 ครั้ง
- ปุ่มล้างและเริ่มใหม่
- ธีมลึกลับ แนว occult mystery พร้อม animation ไพ่
- มีภาพไพ่ Major Arcana ครบ 22 ใบใน `public/assets/cards/major/`
- มีข้อความแนะนำว่าควรดูวันละครั้ง

## วิธีรัน

```bash
npm install
npm run dev
```

จากนั้นเปิด `http://localhost:3000`

## SEO / Search

- ตั้งค่า `NEXT_PUBLIC_SITE_URL` เป็นโดเมนจริงตอน deploy เช่น `https://your-domain.com`
- หน้าเว็บมี title/description, canonical URL, Open Graph/Twitter metadata, JSON-LD structured data, `robots.txt` และ `sitemap.xml`
- ถ้าเปลี่ยนโดเมนหรือชื่อเว็บ ให้แก้ค่า SEO กลางที่ `app/lib/site.js`

## โฮสต์ฟรีที่เหมาะ

1. Cloudflare Pages
   - เหมาะสำหรับ deploy ผ่าน Next adapter หรือ static export ถ้าปิดฟีเจอร์ server-side
   - ต่อ GitHub แล้ว deploy จากโฟลเดอร์นี้ได้
   - ถ้าจะใช้ AI API แบบไม่เปิดเผย key ให้เพิ่ม Cloudflare Workers/Pages Functions

2. Netlify
   - ใช้ได้ผ่าน Netlify Next.js runtime
   - มี Netlify Functions สำหรับซ่อน API key

3. Vercel
   - เหมาะกับโปรเจกต์ Next.js โดยตรง
   - มี Serverless Functions สำหรับเรียก AI ฝั่ง server

## AI ฟรีหรือฟรีเทียร์ที่ควรลอง

ตัวเลือกแรก: Gemini API ผ่าน Google AI Studio และ fallback ไป Groq API

- ใช้โมเดลตระกูล Flash/Flash-Lite สำหรับข้อความภาษาไทย
- มี endpoint ฝั่ง server ที่ `/api/reading`
- ลำดับการยิงคือ Gemini ก่อน แล้ว fallback ไป Groq จากนั้น fallback สุดท้ายเป็น static reading
- static fallback พร้อมสำหรับไทย, English และ中文 โดย story ยึดภาษาไทยเป็นฐานความยาว 600+ ตัวอักษร แล้วแปลเป็นอังกฤษและจีนในโทนเดียวกัน พร้อม 6 หมวดคำทำนายครบทุกภาษา
- ถ้ายังไม่ใส่ key หรือ provider ล่มทั้งหมด หน้าเว็บยังแสดงคำทำนายได้ผ่าน static/template fallback
- ห้ามใส่ API key ใน browser JavaScript โดยตรง
- ตั้งค่า env โดยคัดลอกจาก `.env.example` เป็น `.env.local`

```bash
GEMINI_API_KEY=your_gemini_key
GEMINI_MODEL=gemini-2.5-flash

GROQ_API_KEY=your_groq_key
GROQ_MODEL=llama-3.1-8b-instant
```

- ถ้าต้องการใช้แค่ Gemini หรือแค่ Groq ให้ใส่เฉพาะ key ของ provider นั้นได้
- instruction agent ที่แนะนำ:

```text
คุณคือ AI agent ที่เป็นทั้งหมอดูไพ่ทาโรต์และนักเล่าเรื่องลึกลับ
โทนเสียง: สุภาพ ลึกลับ อบอุ่น เหมือนผู้บันทึกเรื่องราวในเมืองหมอก
หน้าที่:
1. รับชื่อสมมติของผู้ดู ไพ่ที่เปิดได้ และลำดับการเปิดไพ่
2. แต่งเรื่องสั้นเป็นนิทานจบ 1 ตอน ถ้าเป็นไพ่ใบที่สองให้เลือกว่าจะต่อเรื่องเดิมหรือเปิดเรื่องใหม่ตามความหมายไพ่
3. แยกคำทำนายเป็น การงาน การเงิน โชคลาภ ความรัก สุขภาพ เรื่องที่เกิดขึ้นช่วงนี้
4. ถ้าเป็นไพ่อนาคตอันใกล้ ให้เน้นสิ่งที่ควรระวังและโอกาสใน 7-14 วัน
5. ห้ามทำนายแบบฟันธงเรื่องการแพทย์ กฎหมาย การเงินลงทุน หรือความตาย
6. ปิดท้ายด้วยคำแนะนำสั้นๆ ที่ให้ผู้ดูมีสติและรับผิดชอบการตัดสินใจเอง
```

## แผนต่อยอด

- เพิ่มภาพ Minor Arcana ให้ครบ 56 ใบใน art style เดียวกัน
- เพิ่ม daily lock ด้วย `localStorage` เพื่อเตือนเมื่อเปิดซ้ำในวันเดียวกัน
- เพิ่ม backend function เรียก Gemini แล้ว fallback เป็น template local แบบใน `app/lib/static-reading.js`
- เพิ่มแชร์ผลลัพธ์เป็นภาพ PNG
