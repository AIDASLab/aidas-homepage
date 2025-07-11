import '@fortawesome/fontawesome-free/css/all.min.css'
import "./globals.css";

export const metadata = {
  title: "AIDAS Lab",
  description: "SNU AIDAS Lab",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className = "font-display">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8LN41BFKEJ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8LN41BFKEJ');
            `
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}