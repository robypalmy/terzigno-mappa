export type Categoria = {
  id: string;
  etichetta: string;
  colore: string;
  indicazioni: string;
};

export type PuntoMappa = {
  nome: string;
  indirizzo: string;
  lat: number;
  lng: number;
  colore: string;
  tipologia?: string;
  indicazioni?: string;
  categoriaId?: string;
};

export type LoadSuccess<T> = { ok: true } & T;
export type LoadFailure = { ok: false; message: string };
export type LoadResult<T> = LoadSuccess<T> | LoadFailure;
