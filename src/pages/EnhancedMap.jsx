import React, { useState, useContext } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { MapPin, AlertTriangle, TrendingDown, Zap, Download, Filter, Eye, X, Search, Settings, BarChart3, Users, Crown, Sliders } from "lucide-react";
import { CurrencyContext } from "./Settings";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import "leaflet/dist/leaflet.css";

export default function EnhancedMap() {
  const { currencySymbol, formatCurrency } = useContext(CurrencyContext);
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  const hydrogenFacilities = [
    {
      id: 1,
      name: "Gujarat Green Hydrogen Hub",
      type: "production",
      location: { lat: 23.0225, lng: 72.5714, city: "Ahmedabad", state: "Gujarat" },
      status: "operational",
      capacity: 150,
      efficiency: 85,
      wastage: {
        daily: 2.3,
        monthly: 69,
        annual: 828,
        cost: 45000000,
        causes: ["Pipeline leaks", "Storage inefficiency", "Transport losses"]
      },
      environmental: {
        co2Equivalent: 1200,
        waterWaste: 7452,
        energyLoss: 125
      },
      details: {
        technology: "PEM Electrolysis",
        energySource: "Solar + Wind",
        investment: 2500000000,
        employees: 450
      }
    },
    {
      id: 2,
      name: "Rajasthan Solar H2 Plant",
      type: "production",
      location: { lat: 26.9124, lng: 75.7873, city: "Jaipur", state: "Rajasthan" },
      status: "operational",
      capacity: 200,
      efficiency: 78,
      wastage: {
        daily: 4.1,
        monthly: 123,
        annual: 1476,
        cost: 82000000,
        causes: ["Equipment aging", "Maintenance gaps", "Weather exposure"]
      },
      environmental: {
        co2Equivalent: 2150,
        waterWaste: 13284,
        energyLoss: 220
      },
      details: {
        technology: "Alkaline Electrolysis",
        energySource: "Solar",
        investment: 1800000000,
        employees: 320
      }
    },
    {
      id: 3,
      name: "Tamil Nadu Coastal Plant",
      type: "production",
      location: { lat: 13.0827, lng: 80.2707, city: "Chennai", state: "Tamil Nadu" },
      status: "under_maintenance",
      capacity: 300,
      efficiency: 65,
      wastage: {
        daily: 8.7,
        monthly: 261,
        annual: 3132,
        cost: 175000000,
        causes: ["Corrosion issues", "Humidity damage", "Outdated systems"]
      },
      environmental: {
        co2Equivalent: 4560,
        waterWaste: 28188,
        energyLoss: 468
      },
      details: {
        technology: "SOEC",
        energySource: "Wind + Tidal",
        investment: 3200000000,
        employees: 580
      }
    },
    {
      id: 4,
      name: "Maharashtra Industrial Hub",
      type: "storage",
      location: { lat: 19.0760, lng: 72.8777, city: "Mumbai", state: "Maharashtra" },
      status: "operational",
      capacity: 500,
      efficiency: 92,
      wastage: {
        daily: 1.2,
        monthly: 36,
        annual: 432,
        cost: 24000000,
        causes: ["Minor valve leaks", "Pressure variations"]
      },
      environmental: {
        co2Equivalent: 630,
        waterWaste: 3888,
        energyLoss: 65
      },
      details: {
        technology: "Compressed Storage",
        energySource: "Grid + Solar",
        investment: 1200000000,
        employees: 180
      }
    },
    {
      id: 5,
      name: "Karnataka Distribution Center",
      type: "distribution",
      location: { lat: 12.9716, lng: 77.5946, city: "Bangalore", state: "Karnataka" },
      status: "critical",
      capacity: 100,
      efficiency: 58,
      wastage: {
        daily: 6.8,
        monthly: 204,
        annual: 2448,
        cost: 136000000,
        causes: ["Pipeline network issues", "Pressure drops", "Valve malfunctions"]
      },
      environmental: {
        co2Equivalent: 3564,
        waterWaste: 22032,
        energyLoss: 367
      },
      details: {
        technology: "Pipeline Network",
        energySource: "Grid",
        investment: 800000000,
        employees: 120
      }
    }
  ];

  const getMarkerColor = (facility) => {
    if (facility.status === 'critical') return '#DC2626';
    if (selectedFilter === 'high-wastage' && facility.wastage.daily > 4) return '#EA580C';
    if (selectedFilter === 'low-efficiency' && facility.efficiency < 75) return '#D97706';
    if (facility.type === 'production') return '#059669';
    if (facility.type === 'storage') return '#2563EB';
    if (facility.type === 'distribution') return '#7C3AED';
    if (facility.efficiency > 85) return '#10B981';
    return '#6B7280';
  };

  const getMarkerSize = (facility) => {
    return Math.max(8, Math.min(25, facility.capacity / 10));
  };

  const filteredFacilities = hydrogenFacilities.filter(facility => {
    const matchesSearch = searchTerm === '' || 
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.location.state.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'production') return facility.type === 'production';
    if (selectedFilter === 'storage') return facility.type === 'storage';
    if (selectedFilter === 'distribution') return facility.type === 'distribution';
    if (selectedFilter === 'high-wastage') return facility.wastage.daily > 4;
    if (selectedFilter === 'critical') return facility.status === 'critical';
    if (selectedFilter === 'low-efficiency') return facility.efficiency < 75;
    return false;
  });

  const totalWastage = hydrogenFacilities.reduce((sum, f) => sum + f.wastage.annual, 0);
  const totalCost = hydrogenFacilities.reduce((sum, f) => sum + f.wastage.cost, 0);
  const totalCO2 = hydrogenFacilities.reduce((sum, f) => sum + f.environmental.co2Equivalent, 0);

  const downloadMapReport = () => {
    const reportData = {
      summary: {
        totalFacilities: hydrogenFacilities.length,
        totalWastage: `${totalWastage} tons/year`,
        totalCost: `${currencySymbol}${formatCurrency(totalCost)}`,
        totalCO2Impact: `${totalCO2} tons CO2 equivalent`
      },
      facilities: hydrogenFacilities.map(f => ({
        ...f,
        wastage: {
          ...f.wastage,
          cost: `${currencySymbol}${formatCurrency(f.wastage.cost)}`
        },
        details: {
          ...f.details,
          investment: `${currencySymbol}${formatCurrency(f.details.investment)}`
        }
      })),
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hydrogen-infrastructure-report.json';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <div className="flex h-screen">
        {showSidebar && (
          <div className="w-80 bg-white/95 backdrop-blur-sm border-r border-white/20 p-6 overflow-y-auto">
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                  {user?.name === 'Manthan Chavda' ? (
                    <Crown className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-white font-bold">{user?.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-slate-600">
                    {user?.name === 'Manthan Chavda' ? 'Creator & Founder' : 'Infrastructure Analyst'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search facilities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter Categories
              </h3>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All Facilities', count: hydrogenFacilities.length },
                  { value: 'production', label: 'Production Plants', count: hydrogenFacilities.filter(f => f.type === 'production').length },
                  { value: 'storage', label: 'Storage Facilities', count: hydrogenFacilities.filter(f => f.type === 'storage').length },
                  { value: 'distribution', label: 'Distribution Centers', count: hydrogenFacilities.filter(f => f.type === 'distribution').length },
                  { value: 'high-wastage', label: 'High Wastage', count: hydrogenFacilities.filter(f => f.wastage.daily > 4).length },
                  { value: 'critical', label: 'Critical Status', count: hydrogenFacilities.filter(f => f.status === 'critical').length },
                  { value: 'low-efficiency', label: 'Low Efficiency', count: hydrogenFacilities.filter(f => f.efficiency < 75).length }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedFilter(filter.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      selectedFilter === filter.value
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <Badge className="bg-slate-200 text-slate-700 text-xs">{filter.count}</Badge>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Quick Access</h3>
              
              <button
                onClick={() => navigate('/plant-optimizer')}
                className="w-full text-left px-4 py-3 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg border border-green-200 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <Sliders className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Advanced Optimizer</p>
                    <p className="text-xs text-green-600">AI-powered site selection</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/collaboration')}
                className="w-full text-left px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg border border-blue-200 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Collaboration Hub</p>
                    <p className="text-xs text-blue-600">Connect with partners</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/analytics')}
                className="w-full text-left px-4 py-3 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-lg border border-purple-200 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-800">Analytics</p>
                    <p className="text-xs text-purple-600">Performance insights</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/settings')}
                className="w-full text-left px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 rounded-lg border border-slate-200 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="font-medium text-slate-800">Settings</p>
                    <p className="text-xs text-slate-600">Preferences & config</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
              <h4 className="text-sm font-semibold text-red-800 mb-2">Live Alerts</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-700">Maharashtra Hub: Wastage spike detected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-orange-700">Karnataka Center: Efficiency below 60%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-full space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                >
                  <Filter className="w-5 h-5 text-slate-600" />
                </button>
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Interactive Facility Map
                  </h1>
                  <p className="text-slate-600">Real-time monitoring • {filteredFacilities.length} facilities shown</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-100 text-blue-800">
                  Filter: {selectedFilter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
                <Button onClick={downloadMapReport} className="bg-green-600 hover:bg-green-700 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Wastage</p>
                  <p className="text-2xl font-bold text-red-600">{totalWastage.toLocaleString()} t/yr</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Economic Loss</p>
                  <p className="text-2xl font-bold text-orange-600">{currencySymbol}{formatCurrency(totalCost)}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">CO₂ Impact</p>
                  <p className="text-2xl font-bold text-purple-600">{totalCO2.toLocaleString()} t</p>
                </div>
                <Zap className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Active Facilities</p>
                  <p className="text-2xl font-bold text-blue-600">{hydrogenFacilities.length}</p>
                </div>
                <MapPin className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>



            <Card className="glass-effect border-white/20">
              <CardContent className="p-0">
                <div className="h-[600px] rounded-lg overflow-hidden relative">
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredFacilities.map((facility) => (
                  <CircleMarker
                    key={facility.id}
                    center={[facility.location.lat, facility.location.lng]}
                    radius={getMarkerSize(facility)}
                    fillColor={getMarkerColor(facility)}
                    color={selectedFacility?.id === facility.id ? '#FFD700' : '#fff'}
                    weight={selectedFacility?.id === facility.id ? 4 : 2}
                    opacity={1}
                    fillOpacity={0.9}
                    eventHandlers={{
                      click: () => setSelectedFacility(facility),
                      mouseover: (e) => {
                        e.target.setStyle({ fillOpacity: 1, weight: 3 });
                      },
                      mouseout: (e) => {
                        if (selectedFacility?.id !== facility.id) {
                          e.target.setStyle({ fillOpacity: 0.9, weight: 2 });
                        }
                      }
                    }}
                  >
                    <Tooltip permanent={selectedFacility?.id === facility.id}>
                      <div className="text-sm font-medium">
                        <strong className="text-slate-900">{facility.name}</strong><br/>
                        <span className="text-red-600">Wastage: {facility.wastage.daily} t/day</span><br/>
                        <span className="text-blue-600">Efficiency: {facility.efficiency}%</span>
                        {facility.name === 'Maharashtra Industrial Hub' && (
                          <div className="mt-1 text-xs text-purple-600 font-semibold">
                            📍 Featured Facility
                          </div>
                        )}
                      </div>
                    </Tooltip>
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-lg">{facility.name}</h3>
                        <p className="text-sm text-gray-600">{facility.location.city}, {facility.location.state}</p>
                        <div className="mt-2 space-y-1 text-sm">
                          <p><strong>Type:</strong> {facility.type}</p>
                          <p><strong>Capacity:</strong> {facility.capacity} MW</p>
                          <p><strong>Efficiency:</strong> {facility.efficiency}%</p>
                          <p><strong>Daily Wastage:</strong> {facility.wastage.daily} tons</p>
                          <p><strong>Annual Cost:</strong> {currencySymbol}{formatCurrency(facility.wastage.cost)}</p>
                        </div>
                        <Button 
                          onClick={() => setSelectedFacility(facility)}
                          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/20 z-[1000]">
                    <h4 className="text-sm font-semibold text-slate-800 mb-2">Legend</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-600"></div>
                        <span>Production Plants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        <span>Storage Facilities</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                        <span>Distribution Centers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-600"></div>
                        <span>Critical Status</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                        <span>High Wastage</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

        {/* Facility Details Modal */}
        {selectedFacility && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedFacility.name}</h3>
                  <p className="text-slate-600">{selectedFacility.location.city}, {selectedFacility.location.state}</p>
                </div>
                <Button onClick={() => setSelectedFacility(null)} className="p-2">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Wastage Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Wastage Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-600">Daily Wastage</p>
                        <p className="text-xl font-bold text-red-600">{selectedFacility.wastage.daily} tons</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Annual Wastage</p>
                        <p className="text-xl font-bold text-red-600">{selectedFacility.wastage.annual} tons</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Annual Economic Loss</p>
                      <p className="text-2xl font-bold text-red-600">{currencySymbol}{formatCurrency(selectedFacility.wastage.cost)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Main Causes:</p>
                      <ul className="space-y-1">
                        {selectedFacility.wastage.causes.map((cause, index) => (
                          <li key={index} className="text-sm text-slate-700">• {cause}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Environmental Impact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Environmental Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600">CO₂ Equivalent</p>
                      <p className="text-xl font-bold text-green-600">{selectedFacility.environmental.co2Equivalent} tons/year</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Water Waste</p>
                      <p className="text-xl font-bold text-blue-600">{selectedFacility.environmental.waterWaste.toLocaleString()} liters/year</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Energy Loss</p>
                      <p className="text-xl font-bold text-purple-600">{selectedFacility.environmental.energyLoss} MWh/year</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Facility Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-600">Facility Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Technology</p>
                        <p className="font-semibold">{selectedFacility.details.technology}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Energy Source</p>
                        <p className="font-semibold">{selectedFacility.details.energySource}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Capacity</p>
                        <p className="font-semibold">{selectedFacility.capacity} MW</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Efficiency</p>
                        <p className="font-semibold">{selectedFacility.efficiency}%</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Investment</p>
                        <p className="font-semibold">{currencySymbol}{formatCurrency(selectedFacility.details.investment)}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Employees</p>
                        <p className="font-semibold">{selectedFacility.details.employees}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Status & Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-600">Status & Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Badge className={
                        selectedFacility.status === 'operational' ? 'bg-green-100 text-green-800' :
                        selectedFacility.status === 'critical' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {selectedFacility.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-slate-700">Recommended Actions:</p>
                      {selectedFacility.efficiency < 70 && (
                        <p className="text-red-600">• Urgent efficiency improvement needed</p>
                      )}
                      {selectedFacility.wastage.daily > 5 && (
                        <p className="text-orange-600">• Implement leak detection systems</p>
                      )}
                      {selectedFacility.status === 'critical' && (
                        <p className="text-red-600">• Immediate maintenance required</p>
                      )}
                      <p className="text-blue-600">• Regular monitoring and maintenance</p>
                      <p className="text-green-600">• Consider technology upgrades</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}