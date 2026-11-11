import { notFound } from 'next/navigation';
import Hub from '@/components/Hub';
import { isLang } from '@/lib/langs';

export default async function HubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <Hub lang={lang} />;
}
