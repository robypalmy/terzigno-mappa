import { ErrorState } from "@/components/ErrorState";
import { MapScreen } from "@/components/MapScreen";
import { PageHeader } from "@/components/PageHeader";
import raccolta from "@/data/raccolta.json";
import { loadRaccolta } from "@/lib/loadData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terzigno – Punti di raccolta rifiuti",
  description:
    "Mappa dei punti di raccolta rifiuti di Terzigno (NA). Trova facilmente il punto più vicino a te.",
  openGraph: {
    title: "Terzigno – Punti di raccolta rifiuti",
    description:
      "Mappa dei punti di raccolta rifiuti di Terzigno (NA). Trova facilmente il punto più vicino a te.",
    locale: "it_IT",
    siteName: "Terzigno",
    type: "website",
  },
};

export default function HomePage() {
  const result = loadRaccolta(raccolta);

  return (
    <div className="flex h-dvh flex-col">
      <PageHeader
        title="Punti di raccolta rifiuti"
        subtitle="Trova il punto di raccolta più vicino a te"
        current="raccolta"
      />
      {result.ok ? (
        <MapScreen
          punti={result.punti}
          categorie={result.categorie}
          mapLabel="Mappa dei punti di raccolta rifiuti di Terzigno"
        />
      ) : (
        <ErrorState message={result.message} />
      )}
    </div>
  );
}
