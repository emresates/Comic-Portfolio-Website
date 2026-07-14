import type { Metadata, Viewport } from "next";

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
  return children;
}
