import type { Metadata } from "next";
import { Geist, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["700"],
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/stemma-terzigno.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
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
    <html lang="it" className={`${geistSans.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
