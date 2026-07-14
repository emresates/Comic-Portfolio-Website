import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Bangers, Comic_Neue, Luckiest_Guy } from "next/font/google";
import { notFound } from "next/navigation";
import { PageTurn } from "@/components/PageTurn";
import { routing } from "@/i18n/routing";
import "../globals.css";

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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${bangers.variable} ${luckiestGuy.variable} ${comicNeue.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <PageTurn />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
