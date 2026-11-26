import type { Lang } from '@/lib/langs';

// 하단 사업자 정보: 상호는 더윤컴퍼니, 대표·주소·이메일은 K-Telecom(k-telecom.vercel.app) 푸터와 같은 내용 (전화번호는 제외).
// 법적 표기는 번역하지 않고 한국어 원문 그대로 둔다. 바꿀 때는 이 파일만 고치면 됩니다.
export const COMPANY = {
  name: '더윤컴퍼니',
  ceo: '김홍일',
  address: '경기도 남양주시 부평로 48번길 140, 107-1102',
  email: 'zkfnrh01@naver.com',
};

export interface CompanyLabels {
  name: string;
  ceo: string;
  address: string;
  email: string;
}

/** 항목 이름 (상호·대표·주소·이메일) 17개국어 */
export const COMPANY_LABELS: Record<Lang, CompanyLabels> = {
  ko: { name: '상호', ceo: '대표', address: '주소', email: '이메일' },
  en: { name: 'Company', ceo: 'CEO', address: 'Address', email: 'Email' },
  ja: { name: '商号', ceo: '代表者', address: '住所', email: 'メール' },
  ru: { name: 'Компания', ceo: 'Руководитель', address: 'Адрес', email: 'Эл. почта' },
  vi: { name: 'Công ty', ceo: 'Đại diện', address: 'Địa chỉ', email: 'Email' },
  zh: { name: '公司名称', ceo: '法定代表人', address: '地址', email: '电子邮箱' },
  th: { name: 'ชื่อบริษัท', ceo: 'ผู้แทน', address: 'ที่อยู่', email: 'อีเมล' },
  uz: { name: 'Kompaniya', ceo: 'Rahbar', address: 'Manzil', email: 'Email' },
  km: { name: 'ក្រុមហ៊ុន', ceo: 'តំណាង', address: 'អាសយដ្ឋាន', email: 'អ៊ីមែល' },
  mn: { name: 'Компани', ceo: 'Захирал', address: 'Хаяг', email: 'И-мэйл' },
  ne: { name: 'कम्पनी', ceo: 'प्रतिनिधि', address: 'ठेगाना', email: 'इमेल' },
  id: { name: 'Perusahaan', ceo: 'Direktur', address: 'Alamat', email: 'Email' },
  my: { name: 'ကုမ္ပဏီ', ceo: 'ကိုယ်စားလှယ်', address: 'လိပ်စာ', email: 'အီးမေးလ်' },
  si: { name: 'සමාගම', ceo: 'නියෝජිත', address: 'ලිපිනය', email: 'ඊමේල්' },
  kk: { name: 'Компания', ceo: 'Басшы', address: 'Мекенжай', email: 'Эл. пошта' },
  bn: { name: 'কোম্পানি', ceo: 'প্রতিনিধি', address: 'ঠিকানা', email: 'ইমেল' },
  ur: { name: 'کمپنی', ceo: 'نمائندہ', address: 'پتہ', email: 'ای میل' },
};
