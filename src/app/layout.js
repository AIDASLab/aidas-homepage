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
      </head>
      <body>
        {children}
        <SpeedInsights/>
      </body>
    </html>
  );
}