"use client";

import type { Categoria } from "@/lib/types";

type LegendProps = {
  categorie: Categoria[];
  hiddenIds: Set<string>;
  onToggle: (id: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function Legend({
  categorie,
  hiddenIds,
  onToggle,
  open,
  onOpenChange,
}: LegendProps) {
  if (categorie.length === 0) {
    return null;
  }

  return (
    <section className="pointer-events-auto absolute inset-x-3 bottom-3 z-[650] sm:inset-x-auto sm:bottom-auto sm:left-3 sm:top-3 sm:w-72">
      <div className="overflow-hidden rounded-xl border border-stone-200 bg-white/95 shadow-md backdrop-blur-sm">
        <button
          type="button"
          className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left sm:min-h-11"
          aria-expanded={open}
          aria-controls="legend-panel"
          onClick={() => onOpenChange(!open)}
        >
          <span className="text-sm font-semibold text-stone-900">Categorie</span>
          <span className="text-sm text-stone-500" aria-hidden="true">
            {open ? "Chiudi" : "Apri"}
          </span>
        </button>

        {open ? (
          <div
            id="legend-panel"
            className="max-h-[40vh] space-y-0.5 overflow-y-auto border-t border-stone-200 px-2 py-2"
          >
            {categorie.map((categoria) => {
              const checked = !hiddenIds.has(categoria.id);
              const inputId = `categoria-${categoria.id}`;

              return (
                <div key={categoria.id} className="rounded-lg px-2">
                  <label
                    htmlFor={inputId}
                    className="flex min-h-11 cursor-pointer items-center gap-3"
                  >
                    <input
                      id={inputId}
                      type="checkbox"
                      className="size-5 shrink-0 accent-[#1e3a5f]"
                      checked={checked}
                      onChange={() => onToggle(categoria.id)}
                    />
                    <span
                      className="size-3.5 shrink-0 rounded-sm"
                      style={{ backgroundColor: categoria.colore }}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium leading-5 text-stone-900">
                      {categoria.etichetta}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
