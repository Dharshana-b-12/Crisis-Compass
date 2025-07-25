// src/App.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Fix marker icons import issue
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await axios.get('http://localhost:5000/api/alerts');
        setAlerts(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAlerts();
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {alerts.map(alert => (
          <Marker
            key={alert._id}
            position={[alert.location.lat, alert.location.lng]}
          >
            <Popup>
              <strong>Type:</strong> {alert.type}<br />
              <strong>Description:</strong> {alert.description}<br />
              <strong>Reported by:</strong> {alert.createdBy.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
