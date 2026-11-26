import type { Lang } from '@/lib/langs';

// 하단 사업자 정보: KTRS 마켓(k-market) 하단과 같은 내용 (전화번호는 넣지 않는다).
// 법적 표기(상호·대표·번호·주소)는 번역하지 않고 한국어 원문 그대로 둔다. 바꿀 때는 이 파일만 고치면 됩니다.
export const COMPANY = {
  name: '더윤컴퍼니',
  ceo: '김홍일',
  bizNumber: '105-12-78126',
  salesNumber: '제 2023-진접오남-0680호',
  address: '경기도 남양주시 부평로 48번길 140, 107-1102',
  email: 'zkfnth01@naver.com',
};

export interface CompanyLabels {
  name: string;
  ceo: string;
  bizNumber: string;
  salesNumber: string;
  address: string;
  email: string;
}

/** 항목 이름 17개국어 (케이마켓 하단 번역과 같은 표현) */
export const COMPANY_LABELS: Record<Lang, CompanyLabels> = {
  ko: { name: '상호', ceo: '대표', bizNumber: '사업자등록번호', salesNumber: '통신판매업 번호', address: '주소', email: '이메일' },
  en: { name: 'Company', ceo: 'CEO', bizNumber: 'Business Registration Number', salesNumber: 'Mail-order Business Number', address: 'Address', email: 'Email' },
  ja: { name: '商号', ceo: '代表者', bizNumber: '事業者登録番号', salesNumber: '通信販売業番号', address: '住所', email: 'メール' },
  ru: { name: 'Компания', ceo: 'Руководитель', bizNumber: 'Регистрационный номер бизнеса', salesNumber: 'Номер лицензии интернет-магазина', address: 'Адрес', email: 'Эл. почта' },
  vi: { name: 'Công ty', ceo: 'Đại diện', bizNumber: 'Mã số đăng ký kinh doanh', salesNumber: 'Số đăng ký bán hàng từ xa', address: 'Địa chỉ', email: 'Email' },
  zh: { name: '公司名称', ceo: '法定代表人', bizNumber: '营业执照注册号', salesNumber: '通信销售业编号', address: '地址', email: '电子邮箱' },
  th: { name: 'ชื่อบริษัท', ceo: 'ผู้แทน', bizNumber: 'เลขทะเบียนธุรกิจ', salesNumber: 'เลขทะเบียนพาณิชย์อิเล็กทรอนิกส์', address: 'ที่อยู่', email: 'อีเมล' },
  uz: { name: 'Kompaniya', ceo: 'Rahbar', bizNumber: "Biznes ro'yxat raqami", salesNumber: 'Onlayn savdo raqami', address: 'Manzil', email: 'Email' },
  km: { name: 'ក្រុមហ៊ុន', ceo: 'តំណាង', bizNumber: 'លេខចុះបញ្ជីអាជីវកម្ម', salesNumber: 'លេខចុះបញ្ជីពាណិជ្ជកម្មអេឡិចត្រូនិក', address: 'អាសយដ្ឋាន', email: 'អ៊ីមែល' },
  mn: { name: 'Компани', ceo: 'Захирал', bizNumber: 'Бизнесийн бүртгэлийн дугаар', salesNumber: 'Цахим худалдааны бүртгэлийн дугаар', address: 'Хаяг', email: 'И-мэйл' },
  ne: { name: 'कम्पनी', ceo: 'प्रतिनिधि', bizNumber: 'व्यापार दर्ता नम्बर', salesNumber: 'अनलाइन व्यापार दर्ता नम्बर', address: 'ठेगाना', email: 'इमेल' },
  id: { name: 'Perusahaan', ceo: 'Direktur', bizNumber: 'Nomor Registrasi Bisnis', salesNumber: 'Nomor Bisnis Penjualan Jarak Jauh', address: 'Alamat', email: 'Email' },
  my: { name: 'ကုမ္ပဏီ', ceo: 'ကိုယ်စားလှယ်', bizNumber: 'လုပ်ငန်းရှင် မှတ်ပုံတင်နံပါတ်', salesNumber: 'အွန်လိုင်းရောင်းချသူ မှတ်ပုံတင်နံပါတ်', address: 'လိပ်စာ', email: 'အီးမေးလ်' },
  si: { name: 'සමාගම', ceo: 'නියෝජිත', bizNumber: 'ව්‍යාපාර ලියාපදිංචි අංකය', salesNumber: 'දුරකථනගත වෙළඳ ව්‍යාපාර අංකය', address: 'ලිපිනය', email: 'ඊමේල්' },
  kk: { name: 'Компания', ceo: 'Басшы', bizNumber: 'Бизнес тіркеу нөмірі', salesNumber: 'Онлайн-сауда тіркеу нөмірі', address: 'Мекенжай', email: 'Эл. пошта' },
  bn: { name: 'কোম্পানি', ceo: 'প্রতিনিধি', bizNumber: 'ব্যবসায়িক নিবন্ধন নম্বর', salesNumber: 'মেইল-অর্ডার ব্যবসা নম্বর', address: 'ঠিকানা', email: 'ইমেল' },
  ur: { name: 'کمپنی', ceo: 'نمائندہ', bizNumber: 'کاروباری رجسٹریشن نمبر', salesNumber: 'میل آرڈر بزنس نمبر', address: 'پتہ', email: 'ای میل' },
};
