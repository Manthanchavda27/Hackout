import React, { useState, useContext } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { MapPin, AlertTriangle, TrendingDown, Zap, Download, Filter, Eye, X } from "lucide-react";
import { CurrencyContext } from "./Settings";
import "leaflet/dist/leaflet.css";

export default function EnhancedMap() {
  const { currencySymbol, formatCurrency } = useContext(CurrencyContext);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedFacility, setSelectedFacility] = useState(null);

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
    if (facility.status === 'critical') return '#EF4444';
    if (facility.wastage.daily > 5) return '#F59E0B';
    if (facility.efficiency < 70) return '#F97316';
    if (facility.efficiency > 85) return '#10B981';
    return '#3B82F6';
  };

  const getMarkerSize = (facility) => {
    return Math.max(8, Math.min(25, facility.capacity / 10));
  };

  const filteredFacilities = hydrogenFacilities.filter(facility => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'high-wastage') return facility.wastage.daily > 4;
    if (selectedFilter === 'critical') return facility.status === 'critical';
    if (selectedFilter === 'low-efficiency') return facility.efficiency < 75;
    return facility.type === selectedFilter;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Hydrogen Infrastructure Map
            </h1>
            <p className="text-slate-600 text-lg">Real-time monitoring of hydrogen facilities and wastage analysis</p>
          </div>
          <Button onClick={downloadMapReport} className="bg-green-600 hover:bg-green-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

        {/* Filters */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Filter className="w-5 h-5 text-blue-500" />
              Filter Facilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All Facilities' },
                { value: 'production', label: 'Production Plants' },
                { value: 'storage', label: 'Storage Facilities' },
                { value: 'distribution', label: 'Distribution Centers' },
                { value: 'high-wastage', label: 'High Wastage (>4t/day)' },
                { value: 'critical', label: 'Critical Status' },
                { value: 'low-efficiency', label: 'Low Efficiency (<75%)' }
              ].map((filter) => (
                <Button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`${
                    selectedFilter === filter.value
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-300'
                  } hover:bg-green-700 hover:text-white`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <MapPin className="w-5 h-5 text-red-500" />
              Interactive Facility Map
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-96 rounded-lg overflow-hidden">
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
                    color="#fff"
                    weight={2}
                    opacity={1}
                    fillOpacity={0.8}
                    eventHandlers={{
                      click: () => setSelectedFacility(facility)
                    }}
                  >
                    <Tooltip>
                      <div className="text-sm">
                        <strong>{facility.name}</strong><br/>
                        Wastage: {facility.wastage.daily} t/day<br/>
                        Efficiency: {facility.efficiency}%
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
  );
}