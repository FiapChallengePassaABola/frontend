import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "../assets/markmap.png";

const MapNominatim = ({
  center = [-23.561684, -46.655981],
  initialZoom = 13,
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const customIcon = L.icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapRef.current, { center, zoom: initialZoom });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    mapInstanceRef.current = map;

    L.marker(center, { icon: customIcon })
      .addTo(map)
      .bindPopup("Av. Paulista — São Paulo (padrão)")
      .openPopup();

    return () => {
      try {
        map.remove();
      } catch (e) {}
      mapInstanceRef.current = null;
    };
  }, [center, initialZoom]);

  const handleSearch = async (e) => {
    e?.preventDefault();
    const q = searchQuery.trim();
    if (!q || !mapInstanceRef.current) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          q
        )}`,
        { headers: { "Accept-Language": "pt-BR" } }
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        mapInstanceRef.current.setView([lat, lon], 13);
        L.marker([lat, lon], { icon: customIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(display_name)
          .openPopup();
      } else {
        alert("Nenhum resultado para a pesquisa.");
      }
    } catch (err) {
      alert("Erro ao buscar localização.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 mb-20">
      <h1 className="text-white text-2xl font-semibold mb-4">
        Mapa de Escolas
      </h1>
      <p className="mb-4 text-white/40 italic text-[.9rem]">
        Descubra locais para jogar futebol aprovados pela Passa a Bola
      </p>
      <form onSubmit={handleSearch} className="flex gap-2 mb-3">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar endereço, cidade ou ponto de referência"
          className="flex-1 bg-transparent border border-white/20 rounded-md py-2 px-3 text-white placeholder:text-white/50 outline-none"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      <div
        ref={mapRef}
        style={{ width: "100%", height: 320 }}
        className="rounded-md overflow-hidden"
      />
    </div>
  );
};

export default MapNominatim;
