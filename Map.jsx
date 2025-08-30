import React, { useState, useEffect } from "react";
import { Infrastructure, EnergySource } from "@/entities/all";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, LayersControl } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Filter, Layers, Info } from "lucide-react";
import "leaflet/dist/leaflet.css";

import MapFilters from "../components/map/MapFilters";
import LocationDetails from "../components/map/LocationDetails";
import LayerToggle from "../components/map/LayerToggle";

export default function MapPage() {
  const [infrastructure, setInfrastructure] = useState([]);
  const [energySources, setEnergySources] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    energy_source: 'all'
  });
  const [activeLayers, setActiveLayers] = useState({
    infrastructure: true,
    energy_sources: true,
    demand_centers: false
  });

  useEffect(() => {
    loadMapData();
  }, []);

  const loadMapData = async () => {
    try {
      const [infraData, energyData] = await Promise.all([
        Infrastructure.list("-created_date", 100),
        EnergySource.list("-created_date", 50)
      ]);
      
      setInfrastructure(infraData);
      setEnergySources(energyData);
    } catch (error) {
      console.error("Error loading map data:", error);
    }
  };

  const filteredInfrastructure = infrastructure.filter(item => {
    return (filters.type === 'all' || item.type === filters.type) &&
           (filters.status === 'all' || item.status === filters.status) &&
           (filters.energy_source === 'all' || item.energy_source === filters.energy_source) &&
           item.location &&
           typeof item.location.latitude === 'number' &&
           typeof item.location.longitude === 'number';
  });

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

  const center = [23.0225, 72.5714]; // Center of India

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      {/* Sidebar with filters and details */}
      <div className="w-80 bg-white/90 backdrop-blur-sm border-r border-white/20 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Infrastructure Map
          </h1>
          <p className="text-slate-600">Interactive visualization platform</p>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-100">
          <MapFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Layer Toggle */}
        <div className="p-6 border-b border-gray-100">
          <LayerToggle activeLayers={activeLayers} setActiveLayers={setActiveLayers} />
        </div>

        {/* Statistics */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-slate-900 mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Visible Assets</span>
              <span className="font-medium">{filteredInfrastructure.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Operational</span>
              <span className="font-medium text-green-600">
                {filteredInfrastructure.filter(i => i.status === 'operational').length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Planned</span>
              <span className="font-medium text-blue-600">
                {filteredInfrastructure.filter(i => i.status === 'planned').length}
              </span>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="flex-1 overflow-auto">
          <LocationDetails selectedLocation={selectedLocation} />
        </div>
      </div>

      {/* Main Map */}
      <div className="flex-1 relative">
        <MapContainer 
          center={center} 
          zoom={5} 
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Infrastructure Layer */}
          {activeLayers.infrastructure && filteredInfrastructure.map((item) => (
            <CircleMarker
              key={item.id}
              center={[item.location.latitude, item.location.longitude]}
              radius={item.type === 'plant' ? 12 : 8}
              fillColor={getMarkerColor(item.type, item.status)}
              color="#ffffff"
              weight={2}
              opacity={1}
              fillOpacity={0.8}
              eventHandlers={{
                click: () => setSelectedLocation(item)
              }}
            >
              <Popup>
                <div className="space-y-2 min-w-48">
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {item.type.replace('_', ' ')}
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        item.status === 'operational' ? 'bg-green-100 text-green-800' :
                        item.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'under_construction' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Capacity:</span> {item.capacity || 0} t/d</p>
                    <p><span className="font-medium">Energy:</span> {item.energy_source}</p>
                    <p><span className="font-medium">Efficiency:</span> {item.efficiency || 0}%</p>
                    <p><span className="font-medium">Location:</span> {item.location.city}, {item.location.state}</p>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => setSelectedLocation(item)}
                    className="w-full mt-2"
                  >
                    View Details
                  </Button>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {/* Energy Sources Layer */}
          {activeLayers.energy_sources && energySources.map((source, index) => {
            if (!source.location?.latitude || !source.location?.longitude) return null;
            
            return (
              <CircleMarker
                key={`energy-${index}`}
                center={[source.location.latitude, source.location.longitude]}
                radius={6}
                fillColor="#FCD34D"
                color="#F59E0B"
                weight={2}
                opacity={0.8}
                fillOpacity={0.6}
              >
                <Popup>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Energy Resource</h3>
                    <div className="text-sm space-y-1">
                      {source.solar_potential && (
                        <p><span className="font-medium">Solar:</span> {source.solar_potential} kWh/m²/day</p>
                      )}
                      {source.wind_potential && (
                        <p><span className="font-medium">Wind:</span> {source.wind_potential} m/s</p>
                      )}
                      {source.tidal_potential && (
                        <p><span className="font-medium">Tidal:</span> {source.tidal_potential} m</p>
                      )}
                      <p><span className="font-medium">Grid:</span> {source.grid_connectivity}</p>
                      <p><span className="font-medium">Location:</span> {source.location.city}, {source.location.state}</p>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-10 space-y-2">
          <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm">
            <MapPin className="w-4 h-4 mr-2" />
            Add Location
          </Button>
        </div>
      </div>
    </div>
  );
}