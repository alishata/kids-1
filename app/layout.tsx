import { Noto_Sans_Arabic, Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'كويت كيدز | نظام إدارة الحضانات',
  description: 'نظام متكامل لإدارة الحضانات في دولة الكويت',
};

import PinLock from '@/components/PinLock';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${notoArabic.variable} ${inter.variable}`}>
      <body className="bg-slate-950 text-slate-50 font-arabic antialiased selection:bg-sky-500/30">
        <PinLock>
          {children}
        </PinLock>
      </body>
    </html>
  );
}
