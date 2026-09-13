import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Terzigno – Punti di raccolta rifiuti",
    template: "%s",
  },
  description:
    "Mappa dei punti di raccolta rifiuti di Terzigno (NA). Trova facilmente il punto più vicino a te.",
  applicationName: "Terzigno",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Terzigno – Punti di raccolta rifiuti",
    description:
      "Mappa dei punti di raccolta rifiuti di Terzigno (NA). Trova facilmente il punto più vicino a te.",
    locale: "it_IT",
    siteName: "Terzigno",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terzigno – Punti di raccolta rifiuti",
    description:
      "Mappa dei punti di raccolta rifiuti di Terzigno (NA). Trova facilmente il punto più vicino a te.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
