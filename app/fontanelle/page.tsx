import { ErrorState } from "@/components/ErrorState";
import { MapScreen } from "@/components/MapScreen";
import { PageHeader } from "@/components/PageHeader";
import fontanelle from "@/data/fontanelle.json";
import { loadFontanelle } from "@/lib/loadData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terzigno – Fontanelle pubbliche",
  description: "Mappa delle fontanelle pubbliche di Terzigno (NA).",
  openGraph: {
    title: "Terzigno – Fontanelle pubbliche",
    description: "Mappa delle fontanelle pubbliche di Terzigno (NA).",
    locale: "it_IT",
    siteName: "Terzigno",
    type: "website",
  },
};

export default function FontanellePage() {
  const result = loadFontanelle(fontanelle);

  return (
    <div className="flex h-dvh flex-col">
      <PageHeader
        title="Fontanelle pubbliche"
        subtitle="Trova le fontanelle pubbliche sul territorio"
        current="fontanelle"
      />
      {result.ok ? (
        <MapScreen
          punti={result.punti}
          mapLabel="Mappa delle fontanelle pubbliche di Terzigno"
        />
      ) : (
        <ErrorState message={result.message} />
      )}
    </div>
  );
}
