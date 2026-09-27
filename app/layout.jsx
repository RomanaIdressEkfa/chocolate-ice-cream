import { DM_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';
import BottomBar from '@/components/BottomBar';
import SiteFooter from '@/components/SiteFooter';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata = {
  title: {
    default: 'Chocolate',
    template: '%s — Chocolate',
  },
  description: 'Chocolate makes everything better.',
};

export const viewport = {
  themeColor: '#0c0705',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <SmoothScroll />
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <SiteFooter />
        <BottomBar />
      </body>
    </html>
  );
}
