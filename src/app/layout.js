import { Inter, Noto_Sans_KR } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const noto = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto',
  display: 'swap',
});


export const metadata = {
  title: "AIDAS Lab",
  description: "SNU AIDAS Lab",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${noto.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}