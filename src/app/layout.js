import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

export const metadata = {
  title: "AIDAS Lab",
  description: "SNU AIDAS Lab",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className = "font-display">
      <head>
      </head>
      <body>
        {children}
        <SpeedInsights/>
      </body>
    </html>
  );
}