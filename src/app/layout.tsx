import type { Metadata, Viewport } from "next";
import { Bangers, Comic_Neue, Luckiest_Guy } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
  display: "swap",
});

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-luckiest-guy",
  display: "swap",
});

const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-comic-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EMRE — Frontend Developer",
  description:
    "Piksel piksel arayüz döven, kod bloklarından süper güçler çıkaran bir frontend developer portföyü.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${bangers.variable} ${luckiestGuy.variable} ${comicNeue.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
