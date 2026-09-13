import { FONTANELLA_COLOR } from "./mapConfig";
import type { Categoria, LoadResult, PuntoMappa } from "./types";
import {
  asRecord,
  isNonEmptyString,
  isValidColor,
  isValidLat,
  isValidLng,
} from "./validate";

function parseCategoria(value: unknown): Categoria | null {
  const item = asRecord(value);
  if (!item) return null;

  if (!isNonEmptyString(item.id)) return null;
  if (!isNonEmptyString(item.etichetta)) return null;
  if (!isValidColor(item.colore)) return null;
  if (!isNonEmptyString(item.indicazioni)) return null;

  return {
    id: item.id.trim(),
    etichetta: item.etichetta.trim(),
    colore: item.colore.trim(),
    indicazioni: item.indicazioni.trim(),
  };
}

function parseBasePunto(value: unknown): {
  nome: string;
  indirizzo: string;
  lat: number;
  lng: number;
} | null {
  const item = asRecord(value);
  if (!item) return null;

  const nome = isNonEmptyString(item.nome) ? item.nome.trim() : "";
  if (!nome) {
    console.warn("Punto ignorato: nome mancante.", item);
    return null;
  }

  if (!isNonEmptyString(item.indirizzo)) {
    console.warn(`Punto "${nome}" ignorato: indirizzo mancante.`);
    return null;
  }

  if (!isValidLat(item.lat) || !isValidLng(item.lng)) {
    console.warn(`Punto "${nome}" ignorato: coordinate non valide.`);
    return null;
  }

  return {
    nome,
    indirizzo: item.indirizzo.trim(),
    lat: item.lat,
    lng: item.lng,
  };
}

export function loadRaccolta(raw: unknown): LoadResult<{
  categorie: Categoria[];
  punti: PuntoMappa[];
}> {
  const data = asRecord(raw);
  if (!data || !Array.isArray(data.categorie) || !Array.isArray(data.punti)) {
    return {
      ok: false,
      message: "Impossibile caricare i dati dei punti di raccolta.",
    };
  }

  const categorie: Categoria[] = [];
  const knownIds = new Set<string>();

  for (const item of data.categorie) {
    const categoria = parseCategoria(item);
    if (!categoria) {
      console.warn("Categoria ignorata: dati non validi.", item);
      continue;
    }
    if (knownIds.has(categoria.id)) {
      console.warn(`Categoria duplicata ignorata: "${categoria.id}".`);
      continue;
    }
    knownIds.add(categoria.id);
    categorie.push(categoria);
  }

  const punti: PuntoMappa[] = [];

  for (const item of data.punti) {
    const base = parseBasePunto(item);
    if (!base) continue;

    const record = asRecord(item);
    const categoriaId = record && isNonEmptyString(record.categoria) ? record.categoria.trim() : "";

    if (!categoriaId) {
      console.warn(`Punto "${base.nome}" ignorato: categoria mancante.`);
      continue;
    }

    const categoria = categorie.find((entry) => entry.id === categoriaId);
    if (!categoria) {
      console.warn(
        `Punto "${base.nome}" ignorato: categoria "${categoriaId}" inesistente.`,
      );
      continue;
    }

    punti.push({
      ...base,
      colore: categoria.colore,
      tipologia: categoria.etichetta,
      indicazioni: categoria.indicazioni,
      categoriaId: categoria.id,
    });
  }

  return { ok: true, categorie, punti };
}

export function loadFontanelle(raw: unknown): LoadResult<{ punti: PuntoMappa[] }> {
  const data = asRecord(raw);
  if (!data || !Array.isArray(data.punti)) {
    return {
      ok: false,
      message: "Impossibile caricare i dati delle fontanelle.",
    };
  }

  const punti: PuntoMappa[] = [];

  for (const item of data.punti) {
    const base = parseBasePunto(item);
    if (!base) continue;

    const record = asRecord(item);
    const indicazioni =
      record && isNonEmptyString(record.indicazioni)
        ? record.indicazioni.trim()
        : undefined;

    punti.push({
      ...base,
      colore: FONTANELLA_COLOR,
      indicazioni,
    });
  }

  return { ok: true, punti };
}
