"use client";

import { MarkerPopup } from "@/components/MarkerPopup";
import {
  DEFAULT_ZOOM,
  MAP_CENTER,
  MAX_BOUNDS,
  MAX_ZOOM,
  MIN_ZOOM,
} from "@/lib/mapConfig";
import type { PuntoMappa } from "@/lib/types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

type MapProps = {
  punti: PuntoMappa[];
  visibleCategoryIds?: string[];
  ariaLabel: string;
};

function createCircleIcon(color: string) {
  return L.divIcon({
    className: "custom-marker",
    html: `<span class="custom-marker-dot" style="background-color:${color}"></span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -12],
  });
}

function isVisible(punto: PuntoMappa, visibleCategoryIds?: string[]) {
  if (!punto.categoriaId || !visibleCategoryIds) {
    return true;
  }
  return visibleCategoryIds.includes(punto.categoriaId);
}

export default function Map({ punti, visibleCategoryIds, ariaLabel }: MapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<globalThis.Map<string, L.LayerGroup>>(new globalThis.Map());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) {
      return;
    }

    const map = L.map(container, {
      center: [MAP_CENTER.lat, MAP_CENTER.lng],
      zoom: DEFAULT_ZOOM,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      maxBounds: MAX_BOUNDS,
      maxBoundsViscosity: 0.75,
      zoomControl: false,
      attributionControl: true,
    });

    L.control.zoom({ position: "topright" }).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: MAX_ZOOM,
    }).addTo(map);

    mapRef.current = map;
    setReady(true);

    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
      layersRef.current.clear();
      setReady(false);
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) {
      return;
    }

    for (const layer of layersRef.current.values()) {
      layer.clearLayers();
      map.removeLayer(layer);
    }
    layersRef.current.clear();

    const groups = new globalThis.Map<string, L.LayerGroup>();

    for (const punto of punti) {
      if (!isVisible(punto, visibleCategoryIds)) {
        continue;
      }

      const key = punto.categoriaId ?? "__default";
      let group = groups.get(key);
      if (!group) {
        group = L.layerGroup().addTo(map);
        groups.set(key, group);
      }

      const marker = L.marker([punto.lat, punto.lng], {
        icon: createCircleIcon(punto.colore),
        alt: punto.nome,
        title: punto.nome,
      });

      marker.bindPopup(
        renderToStaticMarkup(
          <MarkerPopup
            nome={punto.nome}
            indirizzo={punto.indirizzo}
            tipologia={punto.tipologia}
            indicazioni={punto.indicazioni}
            lat={punto.lat}
            lng={punto.lng}
          />,
        ),
        {
          maxWidth: 280,
          minWidth: 200,
          className: "app-popup",
        },
      );

      marker.addTo(group);
    }

    layersRef.current = groups;
  }, [punti, ready, visibleCategoryIds]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      role="region"
      aria-label={ariaLabel}
    />
  );
}
