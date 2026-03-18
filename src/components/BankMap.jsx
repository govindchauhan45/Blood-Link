import { useEffect, useRef, useState } from "react";
import { getBanks } from "../services/api";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function BankMap({ open, onClose }) {
  const mapRef = useRef(null);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    if (!open) return;
    let map;
    getBanks().then(b => setBanks(b || []));

    // init map
    map = L.map('bank-map', { zoomControl: true }).setView([20.5937,78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    mapRef.current = map;

    return () => {
      try { map.remove(); } catch (e) {}
    };
  }, [open]);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.eachLayer(layer => { if (layer.options && layer.options.pane !== 'tilePane') mapRef.current.removeLayer(layer); });
    const group = L.featureGroup();
    banks.forEach(b => {
      if (!b.lat || !b.lng) return;
      const m = L.marker([b.lat, b.lng]).bindPopup(`<strong>${b.name}</strong><br/>${b.city}<br/>${b.phone || ''}`);
      m.addTo(group);
    });
    group.addTo(mapRef.current);
    if (banks.length) mapRef.current.fitBounds(group.getBounds().pad(0.5));
  }, [banks]);

  const locate = () => {
    if (!mapRef.current) return;
    if (!navigator.geolocation) return alert('Geolocation not supported');
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      L.circle([latitude, longitude], { radius: 500, color: '#ef4444' }).addTo(mapRef.current);
      mapRef.current.setView([latitude, longitude], 13);
    }, () => alert('Unable to get your location'));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-4xl h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-3 border-b">
          <div className="font-bold">Nearby Blood Banks</div>
          <div className="flex items-center gap-2">
            <button onClick={locate} className="px-3 py-1 rounded bg-red-600 text-white">Locate Me</button>
            <button onClick={onClose} className="px-3 py-1 rounded border">Close</button>
          </div>
        </div>
        <div id="bank-map" className="w-full h-full" />
      </div>
    </div>
  );
}
