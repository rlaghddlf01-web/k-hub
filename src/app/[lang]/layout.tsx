import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import TrafficTracker from '@/components/TrafficTracker';
import { BRAND } from '@/lib/brand';
import { COPY } from '@/lib/copy';
import { LANG_CODES, hubPath, isLang, isRtl } from '@/lib/langs';

export function generateStaticParams() {
  return LANG_CODES.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: '#4c2bd8',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const copy = COPY[lang];
  const languages = Object.fromEntries(LANG_CODES.map((code) => [code, `${BRAND.url}${hubPath(code)}`]));
  return {
    metadataBase: new URL(BRAND.url),
    title: `${BRAND.name} | ${copy.tagline}`,
    description: copy.sub,
    alternates: { canonical: `${BRAND.url}${hubPath(lang)}`, languages },
    openGraph: { title: `${BRAND.name} | ${copy.tagline}`, description: copy.sub, type: 'website' },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} dir={isRtl(lang) ? 'rtl' : 'ltr'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body>
        {children}
        <TrafficTracker />
      </body>
    </html>
  );
}
