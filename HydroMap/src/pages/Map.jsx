import React, { useState, useEffect } from "react";
import { Infrastructure, EnergySource } from "../entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { MapPin, Filter, Layers, Info } from "lucide-react";

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
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Energy Source</label>
              <select 
                value={filters.energy_source}
                onChange={(e) => setFilters({...filters, energy_source: e.target.value})}
                className="w-full p-2 border border-gray-200 rounded-lg bg-white"
              >
                <option value="all">All Sources</option>
                <option value="solar">Solar</option>
                <option value="wind">Wind</option>
                <option value="tidal">Tidal</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layer Toggle */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Layers
          </h3>
          <div className="space-y-3">
            {Object.entries(activeLayers).map(([key, value]) => (
              <label key={key} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={value}
                  onChange={(e) => setActiveLayers({...activeLayers, [key]: e.target.checked})}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-slate-700 capitalize">
                  {key.replace('_', ' ')}
                </span>
              </label>
            ))}
          </div>
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
        <div className="flex-1 overflow-auto p-6">
          {selectedLocation ? (
            <div>
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Location Details
              </h3>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">{selectedLocation.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Type:</span>
                      <Badge variant="secondary">{selectedLocation.type}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Status:</span>
                      <Badge variant="secondary" className={
                        selectedLocation.status === 'operational' ? 'bg-green-100 text-green-800' :
                        selectedLocation.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {selectedLocation.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Capacity:</span>
                      <span className="font-medium">{selectedLocation.capacity} t/d</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Efficiency:</span>
                      <span className="font-medium">{selectedLocation.efficiency}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Energy Source:</span>
                      <span className="font-medium capitalize">{selectedLocation.energy_source}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-slate-600 text-xs">
                        {selectedLocation.location.city}, {selectedLocation.location.state}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center text-slate-500">
              <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Select a location on the map to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-100 to-green-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-24 h-24 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Interactive Map</h2>
            <p className="text-slate-600 mb-6">
              Map visualization would be implemented here using Leaflet or similar mapping library
            </p>
            
            {/* Mock Map Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {filteredInfrastructure.map((item) => (
                <Card 
                  key={item.id} 
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  onClick={() => setSelectedLocation(item)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === 'operational' ? 'bg-green-500' :
                        item.status === 'planned' ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}></div>
                      <h4 className="font-semibold text-slate-900 text-sm">{item.name}</h4>
                    </div>
                    <div className="space-y-1 text-xs text-slate-600">
                      <p>{item.location.city}, {item.location.state}</p>
                      <p>Capacity: {item.capacity} t/d</p>
                      <p>Efficiency: {item.efficiency}%</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

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