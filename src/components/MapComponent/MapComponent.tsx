import React, { useState, useEffect } from 'react';
import styles from './MapComponent.module.scss';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);

  const address = 'Rua Doutor Anderson Dutra de Almeida 90';

  const geocodeAddress = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
      } else {
        console.error('Geocodificação falhou: Nenhum resultado encontrado.');
      }
    } catch (error) {
      console.error('Erro na geocodificação:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    geocodeAddress();
  }, []);

  const mapStyles = {
    height: '50vh',
    width: '100%'
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Era uma vez... nós dois!</h1>
      <h2 className={styles.subtitle}>Nós nos conhecemos aqui:</h2>
      {!loading && mapCenter ? (
        <MapContainer center={mapCenter} zoom={15} style={mapStyles}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={mapCenter} />
        </MapContainer>
      ) : (
        <p>Carregando mapa...</p>
      )}
    </div>
  );
};

export default MapComponent;
