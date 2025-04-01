import { Inter } from "next/font/google";
import "./globals.css";

const InterSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Life",
  description: "Gestão de Frota",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Life" />
        <link rel="apple-touch-icon" href="/assets/images/web-app-manifest-192x192.png" />
      </head>

      <body
        className={`${InterSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
