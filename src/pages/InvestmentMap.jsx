import React, { useState, useContext } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Polygon, Polyline } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { MapPin, Factory, Truck, Zap, DollarSign, TrendingUp, Download, Filter, Plus } from "lucide-react";
import { CurrencyContext } from "./Settings";
import "leaflet/dist/leaflet.css";

export default function InvestmentMap() {
  const { currencySymbol, formatCurrency } = useContext(CurrencyContext);
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);

  // Comprehensive infrastructure data
  const infrastructureAssets = {
    plants: [
      {
        id: 1,
        name: "Gujarat Mega Hub",
        type: "production",
        status: "operational",
        location: { lat: 23.0225, lng: 72.5714 },
        capacity: 500,
        investment: 5000000000,
        roi: 18,
        demandCoverage: 85,
        renewableSource: "solar+wind",
        transportAccess: "excellent"
      },
      {
        id: 2,
        name: "Rajasthan Solar Plant",
        type: "production", 
        status: "planned",
        location: { lat: 26.9124, lng: 75.7873 },
        capacity: 300,
        investment: 3500000000,
        roi: 22,
        demandCoverage: 65,
        renewableSource: "solar",
        transportAccess: "good"
      },
      {
        id: 3,
        name: "Tamil Nadu Coastal",
        type: "production",
        status: "under_construction",
        location: { lat: 13.0827, lng: 80.2707 },
        capacity: 400,
        investment: 4200000000,
        roi: 20,
        demandCoverage: 75,
        renewableSource: "wind+tidal",
        transportAccess: "excellent"
      }
    ],
    storage: [
      {
        id: 4,
        name: "Mumbai Storage Hub",
        type: "storage",
        status: "operational",
        location: { lat: 19.0760, lng: 72.8777 },
        capacity: 1000,
        investment: 1200000000,
        roi: 15,
        strategicValue: "high",
        safetyRating: 95
      },
      {
        id: 5,
        name: "Delhi Distribution Center",
        type: "storage",
        status: "planned",
        location: { lat: 28.6139, lng: 77.2090 },
        capacity: 800,
        investment: 950000000,
        roi: 17,
        strategicValue: "critical",
        safetyRating: 98
      }
    ],
    pipelines: [
      {
        id: 6,
        name: "Western Corridor",
        type: "pipeline",
        status: "operational",
        route: [
          [23.0225, 72.5714],
          [19.0760, 72.8777],
          [18.5204, 73.8567]
        ],
        length: 450,
        capacity: 200,
        investment: 2800000000,
        throughput: 85
      },
      {
        id: 7,
        name: "Northern Link",
        type: "pipeline", 
        status: "planned",
        route: [
          [26.9124, 75.7873],
          [28.6139, 77.2090],
          [30.7333, 76.7794]
        ],
        length: 380,
        capacity: 150,
        investment: 2200000000,
        throughput: 0
      }
    ],
    demandCenters: [
      {
        id: 8,
        name: "Mumbai Industrial Zone",
        type: "demand",
        location: { lat: 19.0760, lng: 72.8777 },
        demand: 150,
        growth: 25,
        industries: ["steel", "chemicals", "refining"],
        priority: "high"
      },
      {
        id: 9,
        name: "Delhi NCR",
        type: "demand",
        location: { lat: 28.6139, lng: 77.2090 },
        demand: 200,
        growth: 30,
        industries: ["transport", "power", "manufacturing"],
        priority: "critical"
      },
      {
        id: 10,
        name: "Chennai Port Complex",
        type: "demand",
        location: { lat: 13.0827, lng: 80.2707 },
        demand: 120,
        growth: 20,
        industries: ["shipping", "export", "petrochemicals"],
        priority: "medium"
      }
    ],
    renewableSources: [
      {
        id: 11,
        name: "Rajasthan Solar Belt",
        type: "renewable",
        source: "solar",
        location: { lat: 27.0238, lng: 74.2179 },
        potential: 2500,
        utilization: 45,
        cost: 2.8
      },
      {
        id: 12,
        name: "Gujarat Wind Corridor", 
        type: "renewable",
        source: "wind",
        location: { lat: 22.2587, lng: 71.1924 },
        potential: 1800,
        utilization: 60,
        cost: 3.2
      },
      {
        id: 13,
        name: "Tamil Nadu Coastal Wind",
        type: "renewable",
        source: "wind",
        location: { lat: 12.9165, lng: 79.1325 },
        potential: 1200,
        utilization: 70,
        cost: 3.5
      }
    ]
  };

  const getAssetColor = (asset) => {
    switch(asset.type) {
      case 'production': return asset.status === 'operational' ? '#10B981' : asset.status === 'planned' ? '#3B82F6' : '#F59E0B';
      case 'storage': return '#8B5CF6';
      case 'demand': return '#EF4444';
      case 'renewable': return asset.source === 'solar' ? '#F59E0B' : '#06B6D4';
      default: return '#6B7280';
    }
  };

  const getAssetSize = (asset) => {
    if (asset.capacity) return Math.max(8, Math.min(25, asset.capacity / 20));
    if (asset.demand) return Math.max(8, Math.min(25, asset.demand / 10));
    if (asset.potential) return Math.max(8, Math.min(25, asset.potential / 100));
    return 12;
  };

  const filteredAssets = () => {
    let assets = [];
    if (selectedLayer === 'all' || selectedLayer === 'plants') {
      assets = [...assets, ...infrastructureAssets.plants];
    }
    if (selectedLayer === 'all' || selectedLayer === 'storage') {
      assets = [...assets, ...infrastructureAssets.storage];
    }
    if (selectedLayer === 'all' || selectedLayer === 'demand') {
      assets = [...assets, ...infrastructureAssets.demandCenters];
    }
    if (selectedLayer === 'all' || selectedLayer === 'renewable') {
      assets = [...assets, ...infrastructureAssets.renewableSources];
    }
    return assets;
  };

  const totalInvestment = [
    ...infrastructureAssets.plants,
    ...infrastructureAssets.storage,
    ...infrastructureAssets.pipelines
  ].reduce((sum, asset) => sum + (asset.investment || 0), 0);

  const downloadInvestmentReport = () => {
    const reportData = {
      summary: {
        totalAssets: filteredAssets().length,
        totalInvestment: `${currencySymbol}${formatCurrency(totalInvestment)}`,
        averageROI: '18.5%',
        coverageArea: '1.2M km²'
      },
      assetBreakdown: {
        productionPlants: infrastructureAssets.plants.length,
        storageFacilities: infrastructureAssets.storage.length,
        pipelineKm: infrastructureAssets.pipelines.reduce((sum, p) => sum + p.length, 0),
        demandCenters: infrastructureAssets.demandCenters.length
      },
      investmentOpportunities: infrastructureAssets.plants
        .filter(p => p.status === 'planned')
        .map(p => ({
          name: p.name,
          investment: `${currencySymbol}${formatCurrency(p.investment)}`,
          expectedROI: `${p.roi}%`,
          capacity: `${p.capacity} MW`
        })),
      demandAnalysis: infrastructureAssets.demandCenters.map(d => ({
        location: d.name,
        currentDemand: `${d.demand} tons/day`,
        projectedGrowth: `${d.growth}%`,
        priority: d.priority
      })),
      timestamp: new Date().toISOString()
    };
    
    // Create Excel-like CSV format
    const csvContent = [
      ['Investment Planning Report'],
      ['Generated:', new Date().toLocaleString()],
      [''],
      ['Summary Metrics'],
      ['Total Investment', `${currencySymbol}${formatCurrency(totalInvestment)}`],
      ['Active Assets', filteredAssets().length],
      ['Pipeline Length', `${infrastructureAssets.pipelines.reduce((sum, p) => sum + p.length, 0)} km`],
      [''],
      ['Production Plants'],
      ['Name', 'Status', 'Capacity (MW)', 'Investment', 'ROI (%)'],
      ...infrastructureAssets.plants.map(p => [
        p.name, p.status, p.capacity, `${currencySymbol}${formatCurrency(p.investment)}`, p.roi
      ]),
      [''],
      ['Demand Centers'],
      ['Location', 'Current Demand', 'Growth Rate', 'Priority'],
      ...infrastructureAssets.demandCenters.map(d => [
        d.name, `${d.demand} tons/day`, `${d.growth}%`, d.priority
      ])
    ].map(row => Array.isArray(row) ? row.join(',') : row).join('\n');
    
    // Download CSV
    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const csvLink = document.createElement('a');
    csvLink.href = csvUrl;
    csvLink.download = `investment-planning-report-${new Date().toISOString().split('T')[0]}.csv`;
    csvLink.click();
    
    // Download JSON
    const jsonStr = JSON.stringify(reportData, null, 2);
    const jsonBlob = new Blob([jsonStr], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = `investment-planning-report-${new Date().toISOString().split('T')[0]}.json`;
    jsonLink.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Investment Planning Map
            </h1>
            <p className="text-slate-600 text-lg">Strategic infrastructure planning and investment optimization</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setShowInvestmentModal(true)} className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Investment
            </Button>
            <Button onClick={downloadInvestmentReport} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Analysis
            </Button>
          </div>
        </div>

        {/* Investment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Investment</p>
                  <p className="text-2xl font-bold text-green-600">{currencySymbol}{formatCurrency(totalInvestment)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Active Assets</p>
                  <p className="text-2xl font-bold text-blue-600">{filteredAssets().length}</p>
                </div>
                <Factory className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Pipeline Network</p>
                  <p className="text-2xl font-bold text-purple-600">{infrastructureAssets.pipelines.reduce((sum, p) => sum + p.length, 0)} km</p>
                </div>
                <Truck className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Avg ROI</p>
                  <p className="text-2xl font-bold text-orange-600">18.5%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Layer Controls */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Filter className="w-5 h-5 text-blue-500" />
              Map Layers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All Assets', icon: MapPin },
                { value: 'plants', label: 'Production Plants', icon: Factory },
                { value: 'storage', label: 'Storage Facilities', icon: Factory },
                { value: 'demand', label: 'Demand Centers', icon: TrendingUp },
                { value: 'renewable', label: 'Renewable Sources', icon: Zap }
              ].map((layer) => (
                <Button
                  key={layer.value}
                  onClick={() => setSelectedLayer(layer.value)}
                  className={`flex items-center gap-2 ${
                    selectedLayer === layer.value
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-300'
                  } hover:bg-green-700 hover:text-white`}
                >
                  <layer.icon className="w-4 h-4" />
                  {layer.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Map */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <MapPin className="w-5 h-5 text-red-500" />
              Strategic Infrastructure Map
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
                  attribution='&copy; OpenStreetMap contributors'
                />
                
                {/* Pipeline Routes */}
                {(selectedLayer === 'all' || selectedLayer === 'pipelines') && 
                  infrastructureAssets.pipelines.map((pipeline) => (
                    <Polyline
                      key={pipeline.id}
                      positions={pipeline.route}
                      color={pipeline.status === 'operational' ? '#10B981' : '#3B82F6'}
                      weight={4}
                      opacity={0.8}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold">{pipeline.name}</h3>
                          <p><strong>Length:</strong> {pipeline.length} km</p>
                          <p><strong>Capacity:</strong> {pipeline.capacity} tons/day</p>
                          <p><strong>Investment:</strong> {currencySymbol}{formatCurrency(pipeline.investment)}</p>
                          <p><strong>Status:</strong> {pipeline.status}</p>
                        </div>
                      </Popup>
                    </Polyline>
                  ))
                }

                {/* Asset Markers */}
                {filteredAssets().map((asset) => (
                  <CircleMarker
                    key={asset.id}
                    center={[asset.location.lat, asset.location.lng]}
                    radius={getAssetSize(asset)}
                    fillColor={getAssetColor(asset)}
                    color="#fff"
                    weight={2}
                    opacity={1}
                    fillOpacity={0.8}
                    eventHandlers={{
                      click: () => setSelectedAsset(asset)
                    }}
                  >
                    <Popup>
                      <div className="p-2 min-w-48">
                        <h3 className="font-bold text-lg">{asset.name}</h3>
                        <Badge className="mb-2">{asset.type}</Badge>
                        
                        {asset.type === 'production' && (
                          <div className="space-y-1 text-sm">
                            <p><strong>Capacity:</strong> {asset.capacity} MW</p>
                            <p><strong>Investment:</strong> {currencySymbol}{formatCurrency(asset.investment)}</p>
                            <p><strong>ROI:</strong> {asset.roi}%</p>
                            <p><strong>Status:</strong> {asset.status}</p>
                          </div>
                        )}
                        
                        {asset.type === 'demand' && (
                          <div className="space-y-1 text-sm">
                            <p><strong>Demand:</strong> {asset.demand} tons/day</p>
                            <p><strong>Growth:</strong> {asset.growth}%</p>
                            <p><strong>Priority:</strong> {asset.priority}</p>
                          </div>
                        )}
                        
                        {asset.type === 'renewable' && (
                          <div className="space-y-1 text-sm">
                            <p><strong>Source:</strong> {asset.source}</p>
                            <p><strong>Potential:</strong> {asset.potential} MW</p>
                            <p><strong>Utilization:</strong> {asset.utilization}%</p>
                            <p><strong>Cost:</strong> {currencySymbol}{asset.cost}/MWh</p>
                          </div>
                        )}
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        {/* Investment Opportunities */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Investment Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {infrastructureAssets.plants
                .filter(plant => plant.status === 'planned')
                .map((plant) => (
                  <div key={plant.id} className="p-4 bg-white/60 rounded-xl border border-white/30 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-slate-900">{plant.name}</h3>
                      <p className="text-sm text-slate-600">Capacity: {plant.capacity} MW • ROI: {plant.roi}%</p>
                      <p className="text-sm text-slate-500">Renewable: {plant.renewableSource}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{currencySymbol}{formatCurrency(plant.investment)}</p>
                      <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm">
                        Analyze Investment
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}