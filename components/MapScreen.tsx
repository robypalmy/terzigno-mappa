"use client";

import { Legend } from "@/components/Legend";
import type { Categoria, PuntoMappa } from "@/lib/types";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-[#ece9e4] text-sm text-stone-600">
      Caricamento mappa…
    </div>
  ),
});

type MapScreenProps = {
  punti: PuntoMappa[];
  categorie?: Categoria[];
  mapLabel: string;
};

export function MapScreen({ punti, categorie = [], mapLabel }: MapScreenProps) {
  const [legendOpen, setLegendOpen] = useState(false);
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());

  const visibleCategoryIds = useMemo(
    () => categorie.filter((categoria) => !hiddenIds.has(categoria.id)).map((categoria) => categoria.id),
    [categorie, hiddenIds],
  );

  function toggleCategory(id: string) {
    setHiddenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="relative min-h-0 flex-1">
      <Map
        punti={punti}
        visibleCategoryIds={categorie.length > 0 ? visibleCategoryIds : undefined}
        ariaLabel={mapLabel}
      />
      {categorie.length > 0 ? (
        <Legend
          categorie={categorie}
          hiddenIds={hiddenIds}
          onToggle={toggleCategory}
          open={legendOpen}
          onOpenChange={setLegendOpen}
        />
      ) : null}
    </div>
  );
}
