import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Badge } from "../ui/badge";
import "leaflet/dist/leaflet.css";

export default function InfrastructureMap({ infrastructure }) {
  const center = [23.0225, 72.5714];
  
  const getMarkerColor = (type, status) => {
    if (status === 'operational') {
      return type === 'plant' ? '#10B981' : 
             type === 'storage' ? '#3B82F6' :
             type === 'pipeline' ? '#8B5CF6' : '#06B6D4';
    } else if (status === 'planned') {
      return '#FCD34D';
    } else if (status === 'under_construction') {
      return '#F59E0B';
    }
    return '#9CA3AF';
  };

  const validInfrastructure = infrastructure.filter(item => 
    item.location && 
    typeof item.location.latitude === 'number' && 
    typeof item.location.longitude === 'number'
  );

  return (
    <div className="h-96 rounded-lg overflow-hidden">
      <MapContainer 
        center={center} 
        zoom={5} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {validInfrastructure.map((item) => (
          <CircleMarker
            key={item.id}
            center={[item.location.latitude, item.location.longitude]}
            radius={8}
            fillColor={getMarkerColor(item.type, item.status)}
            color="#ffffff"
            weight={2}
            opacity={1}
            fillOpacity={0.8}
          >
            <Popup>
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-900">{item.name}</h3>
                <div className="space-y-1">
                  <Badge variant="secondary" className="text-xs">
                    {item.type?.replace('_', ' ')}
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ml-2 ${
                      item.status === 'operational' ? 'bg-green-100 text-green-800' :
                      item.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                      item.status === 'under_construction' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {item.status?.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">Capacity: {item.capacity || 0} t/d</p>
                <p className="text-sm text-slate-600">Energy: {item.energy_source}</p>
                <p className="text-sm text-slate-600">Location: {item.location.city}, {item.location.state}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}