import type { DetailCopy } from '../detail-types';

export const detail: DetailCopy = {
  nav: { market: "Ishlatilgan buyumlar", tax: "Soliq qaytarish", telecom: "Telefon va tariflar" },
  featuresLabel: "Asosiy imkoniyatlar",
  forWhoLabel: "Quyidagilar uchun qulay",

  services: {
    market: {
      eyebrow: "Ishlatilgan buyumlar · Ko'chish oldidan sotuv",
      headline: "Keraksiz buyumlarni yengil tarzda o'tkazing, kerakli narsani esa yaqin atrofdan toping",
      desc: "Chet ellik ishchilar va talabalar uchun ishlatilgan buyumlar savdosi, bepul berish va Koreyadan ketishdan oldingi ko'chish sotuvi maydoni. Yotoqxona va universitet yaqinida yuzma-yuz uchrashib savdo qiling, til bir xil bo'lmasa AI tarjimasidan foydalaning.",
      features: [
        { icon: 'globe', title: "AI tarjima yordami", text: "Mahsulot tavsifi va xabarlar o'z tilingizga tarjima qilinadi, shuning uchun tillar turlicha bo'lsa ham kelishuvni tushunib olasiz." },
        { icon: 'gift', title: "Bepul berish va ko'chish sotuvi", text: "Ishlatmaydigan buyumlaringizni bepul bering yoki uyga qaytishdan oldin maishiy texnika va mebelni ko'chish sotuvi bo'limida birdaniga sotib yuboring." },
        { icon: 'map', title: "Yaqin atrofda bevosita savdo", text: "Xaritada joylashuv va radiusni belgilab, yaqin atrofdagi buyumlarni toping, so'ng uchrashuv joyi va vaqtini kelishib oling." },
        { icon: 'shield', title: "Shaxsni tekshirish va firibgarlik haqida ogohlantirish", text: "Chet el fuqarosi guvohnomasi rasmini aniqlash va SMS tasdiqlash ro'yxatdan o'tishni tekshirishga yordam beradi, oldindan to'lov yoki boshqa messenjerga o'tishga undash kabi shubhali iboralar haqida ogohlantirish beriladi." },
        { icon: 'users', title: "Mahalla yangiliklari va hayotiy maslahatlar", text: "Mahalla doskasi hamda turmush va soliq blogida Koreyadagi hayot uchun kerakli ma'lumotlarni o'qing, shuningdek, uni bosh ekranga o'rnatib, ilova kabi ishlating." },
      ],
      forWho: ["Yotoqxona yoki sanoat zonasi yaqinida yashaydigan ishchilar", "Koreyadan ketishdan oldin buyumlarini yig'ishtirayotganlar", "Maishiy texnika yoki mebel kerak bo'lgan yangi kelganlar", "Talabalar"],
    },
    tax: {
      eyebrow: "Soliq qaytarish",
      headline: "Soliqni qaytarish jarayonini o'z tilingizda bosqichma-bosqich o'rganing",
      desc: "Koreyada ishlab to'lagan daromad solig'ingizni qaytarib olish imkoningiz borligini tekshirish va ariza berish jarayoni o'z tilingizda tushuntiriladi. Taxminiy summani hisoblashdan hujjatlarni kiritish, elektron imzo va jarayon holatini kuzatishgacha hammasi bir izchil oqimda amalga oshadi, deklaratsiya topshirish esa hamkor soliq maslahatchisi orqali bajariladi.",
      features: [
        { icon: 'calc', title: "Taxminiy qaytim summasini hisoblash", text: "Ish davri, maosh va viza turini kiritib, qaytarilishi mumkin bo'lgan summani oldindan hisoblab ko'rishingiz mumkin." },
        { icon: 'camera', title: "Guvohnoma rasmi orqali kiritish", text: "Chet el fuqarosi guvohnomasini suratga olsangiz, AI ma'lumotlarni o'qib, qo'lda kiritishni kamaytiradi. Noto'g'ri o'qilgan joylarni o'zingiz tuzatishingiz mumkin." },
        { icon: 'file', title: "Ekranning o'zida elektron imzo", text: "Vakolat va shartnoma imzosini barmog'ingiz bilan to'g'ridan-to'g'ri ekranda qo'ying, qog'oz hujjat tayyorlash shart emas." },
        { icon: 'bell', title: "Jarayon holati haqida SMS xabar", text: "Holat o'zgarganda o'z tilingizda SMS xabar keladi, shuningdek, Telegram, WhatsApp, Facebook yoki KakaoTalk orqali maslahatni davom ettirishingiz mumkin." },
        { icon: 'support', title: "Maslahatchi menejer va qo'llanmalar", text: "Qiyinchilik tug'ilsa, AI maslahatchi menejerdan so'rashingiz mumkin, zarur bo'lsa administrator o'zi javob beradi. Tez-tez beriladigan savollar va yoshlar daromad solig'i imtiyozi bo'yicha qo'llanma ham mavjud." },
      ],
      forWho: ["Koreyada daromad solig'i to'lagan chet ellik ishchilar", "Avval qaytarish imkoniyatini tekshirib ko'rmoqchi bo'lganlar", "Koreyscha soliq atamalari qiyin tuyuladiganlar"],
    },
    telecom: {
      eyebrow: "Telefon va tariflar",
      headline: "Telefon, tarif va internetni o'z tilingizda bir joydan ko'rib chiqing",
      desc: "Smartfon, tarif va internet/IPTV mahsulotlarini o'z tilingizda ko'rib chiqing va ulanish uchun so'rov qoldiring. So'rov yuborganingizdan so'ng xodim siz bilan bog'lanib, shaxsingizni tasdiqlash va ulanishda yordam beradi.",
      features: [
        { icon: 'globe', title: "17 tilda mavjud", text: "Tariflar, qurilmalar, aksiyalar va tez-tez beriladigan savollar 17 tilda ko'rsatiladi." },
        { icon: 'phone', title: "Tarif va qurilmalarni ko'rib chiqish", text: "Tariflar va telefon mahsulotlari haqidagi ma'lumotlarni ko'rishingiz mumkin. Narxlar va shartlar yakuniy maslahat vaqtida tasdiqlanadi." },
        { icon: 'file', title: "Onlayn ulanish so'rovi", text: "Yangi raqam yoki raqamni ko'chirish, aloqa operatori hamda USIM yoki eSIM kabi variantlarni tanlab, so'rov yuboring. So'rov shaklida chet el fuqarosi guvohnomasi raqami so'ralmaydi." },
        { icon: 'sim', title: "eSIM bo'yicha qo'llanma", text: "eSIM nima ekanini va undan qanday foydalanishni qo'llanma sahifasida oldindan bilib olishingiz mumkin." },
        { icon: 'chat', title: "AI maslahatchi menejer", text: "Tariflar va telefonlar haqida o'z tilingizda so'rashingiz mumkin. Uning javoblari katalog doirasi bilan cheklangan va narxlar yoki tekshiruv natijalarini o'zidan to'qimaydigan qilib sozlangan." },
      ],
      forWho: ["Koreyada birinchi marta raqam olayotganlar", "Tarif variantlaridan adashayotganlar", "Xonasiga internet yoki IPTV kerak bo'lganlar"],
    },
  },

  intentTitle: "Qaysi xizmat sizga mos?",
  intentSub: "Hozir sizga kerak bo'lgan narsaga eng yaqin jumlani bosing.",
  intents: [
    { text: "Ishlatilgan maishiy texnika va mebelni sotmoqchiman yoki qidirmoqchiman", service: 'market' },
    { text: "Koreyadan ketishdan oldin buyumlarimni yig'ishtirmoqchiman", service: 'market' },
    { text: "Koreyada to'lagan soliqimni qaytarib olish mumkinligini bilmoqchiman", service: 'tax' },
    { text: "Telefon va tariflarni o'z tilimda ko'rib chiqmoqchiman", service: 'telecom' },
    { text: "Xonamga internet yoki IPTV kerak", service: 'telecom' },
  ],

  howTitle: "Qanday foydalaniladi",
  steps: [
    { title: "Tilni tanlang", text: "17 tildan birini tanlang. Manzil /vi kabi o'zgaradi va xizmatga o'tganda ham o'sha til davom etadi. Xizmat qo'llab-quvvatlamaydigan tillar ingliz tiliga yo'naltiriladi." },
    { title: "Xizmatni tanlang", text: "Ishlatilgan buyumlar, soliq qaytarish yoki telefon va tariflardan hozir kerakli bo'limni bossangiz, tegishli xizmat saytiga o'tasiz." },
    { title: "Xizmatning o'zida davom eting", text: "Hubda ro'yxatdan o'tish yoki tizimga kirish yo'q. Ro'yxatdan o'tish va arizalar har bir xizmatning o'zida amalga oshiriladi." },
  ],

  faqTitle: "Tez-tez beriladigan savollar",
  faq: [
    { q: "Hubda ro'yxatdan o'tish kerakmi?", a: "Yo'q. Hub xizmatlarni tanishtiradigan va ularga yo'naltiradigan ma'lumot sahifasi bo'lgani uchun ro'yxatdan o'tish yoki tizimga kirish yo'q. Ro'yxatdan o'tish va ariza berish har bir xizmatning o'zida amalga oshiriladi." },
    { q: "Uchala xizmat bitta akkauntga bog'langanmi?", a: "Hozirda hub tizimga kirishni qabul qilmaydi, akkauntlar va arizalar har bir xizmatda alohida yuritiladi." },
    { q: "Qaysi tillar qo'llab-quvvatlanadi?", a: "Hub 17 tilni qo'llab-quvvatlaydi. Har bir xizmatning qo'llab-quvvatlaydigan tillari o'zinikidir, masalan, Korea Tax Refund Service 15 tilda ishlaydi (yapon va rus tillari yo'q). Qo'llab-quvvatlanmaydigan tillar ingliz tiliga yo'naltiriladi." },
    { q: "Narxi qancha?", a: "Hubdan foydalanish bepul. Har bir xizmatning narxi va shartlari bilan shu xizmatdagi ma'lumotlar orqali tanishing." },
    { q: "Maslahatchi menejer insonmi?", a: "Korea Tax Refund Service va K-Telecom'da maslahatchi menejer avval AI yordamida javob beradi. Korea Tax Refund Service'da zarur bo'lsa administrator ham o'zi javob berishi mumkin." },
    { q: "Hub qanday ma'lumotlarni yozib oladi?", a: "Faqat tashrif statistikasi uchun anonim tashrif buyuruvchi ID raqami va qaysi yo'l bilan kirganingiz (masalan, reklama tegi) yoziladi. Ismingiz yoki aloqa ma'lumotlaringiz yig'ilmaydi." },
  ],

  disclaimer: "Xizmat mazmuni, narxlar va qo'llab-quvvatlanadigan tillar har bir xizmatga qarab o'zgarishi mumkin. Yakuniy shartlarni har bir xizmatning o'zida tekshiring.",
};
