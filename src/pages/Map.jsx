import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { MapPin, Filter, Info } from "lucide-react";
import { Badge } from "../components/ui/badge";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    energy_source: 'all'
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  const mockLocations = [
    { id: 1, name: "Gujarat Green Hydrogen Plant", location: "Kutch, Gujarat", status: "operational", capacity: 150, efficiency: 85 },
    { id: 2, name: "Rajasthan Wind-H2 Facility", location: "Jaisalmer, Rajasthan", status: "under_construction", capacity: 200, efficiency: 88 },
    { id: 3, name: "Tamil Nadu Coastal Plant", location: "Chennai, Tamil Nadu", status: "planned", capacity: 300, efficiency: 90 }
  ];

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <div className="w-80 bg-white/90 backdrop-blur-sm border-r border-white/20 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Infrastructure Map
          </h1>
          <p className="text-slate-600">Interactive visualization platform</p>
        </div>

        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Type</label>
              <select 
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="w-full p-2 border border-gray-200 rounded-lg bg-white"
              >
                <option value="all">All Types</option>
                <option value="plant">Plants</option>
                <option value="storage">Storage</option>
                <option value="pipeline">Pipeline</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Status</label>
              <select 
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full p-2 border border-gray-200 rounded-lg bg-white"
              >
                <option value="all">All Status</option>
                <option value="operational">Operational</option>
                <option value="under_construction">Under Construction</option>
                <option value="planned">Planned</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-slate-900 mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Visible Assets</span>
              <span className="font-medium">{mockLocations.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Operational</span>
              <span className="font-medium text-green-600">1</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Planned</span>
              <span className="font-medium text-blue-600">1</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {selectedLocation ? (
            <div>
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Location Details
              </h3>
              <div className="border-0 shadow-sm bg-white/60 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-2">{selectedLocation.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Status:</span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      selectedLocation.status === 'operational' ? 'bg-green-100 text-green-800' :
                      selectedLocation.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedLocation.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Capacity:</span>
                    <span className="font-medium">{selectedLocation.capacity} t/d</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Efficiency:</span>
                    <span className="font-medium">{selectedLocation.efficiency}%</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-slate-600 text-xs">{selectedLocation.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500">
              <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Select a location to view details</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 relative">
        <MapContainer 
          center={[23.0225, 72.5714]} 
          zoom={5} 
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {mockLocations.map((item) => (
            <CircleMarker
              key={item.id}
              center={[item.id === 1 ? 23.0225 : item.id === 2 ? 26.9124 : 13.0827, 
                      item.id === 1 ? 72.5714 : item.id === 2 ? 75.7873 : 80.2707]}
              radius={12}
              fillColor={item.status === 'operational' ? '#10B981' : 
                        item.status === 'planned' ? '#3B82F6' : '#F59E0B'}
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
                    <Badge variant="secondary" className="text-xs">plant</Badge>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        item.status === 'operational' ? 'bg-green-100 text-green-800' :
                        item.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Capacity:</span> {item.capacity} t/d</p>
                    <p><span className="font-medium">Efficiency:</span> {item.efficiency}%</p>
                    <p><span className="font-medium">Location:</span> {item.location}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedLocation(item)}
                    className="w-full mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        <div className="absolute top-4 right-4 z-10 space-y-2">
          <button className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Add Location
          </button>
        </div>
      </div>
    </div>
  );
}