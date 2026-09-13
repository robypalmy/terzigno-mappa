import { directionsUrl } from "@/lib/mapConfig";

export type MarkerPopupProps = {
  nome: string;
  indirizzo: string;
  tipologia?: string;
  indicazioni?: string;
  lat: number;
  lng: number;
};

export function MarkerPopup({
  nome,
  indirizzo,
  tipologia,
  indicazioni,
  lat,
  lng,
}: MarkerPopupProps) {
  return (
    <div className="popup-card">
      <p className="popup-title">{nome}</p>
      <p className="popup-address">{indirizzo}</p>
      {tipologia ? <p className="popup-type">{tipologia}</p> : null}
      {indicazioni ? <p className="popup-notes">{indicazioni}</p> : null}
      <a
        className="popup-directions"
        href={directionsUrl(lat, lng)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Indicazioni stradali
      </a>
    </div>
  );
}
