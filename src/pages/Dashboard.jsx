import React, { useState, useEffect } from "react";
import { Factory, Zap, TrendingUp, MapPin, DollarSign, Gauge, Sun } from "lucide-react";
import MetricCard from "../components/dashboard/MetricCard";
import InfrastructureMap from "../components/dashboard/InfrastructureMap";
import PerformanceChart from "../components/dashboard/PerformanceChart";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function Dashboard() {
  const [data, setData] = useState({
    plants: 47,
    capacity: 2340,
    investment: 2.8,
    efficiency: 89.2
  });

  useEffect(() => {
    // Simulate API call
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(() => console.log('Using mock data'));
  }, []);

  const mockInfrastructure = [
    {
      id: 1,
      name: "Gujarat Green Hydrogen Plant",
      type: "plant",
      status: "operational",
      capacity: 150,
      efficiency: 85,
      energy_source: "solar",
      location: { latitude: 23.0225, longitude: 72.5714, city: "Ahmedabad", state: "Gujarat" }
    },
    {
      id: 2,
      name: "Rajasthan Wind-H2 Facility",
      type: "plant",
      status: "under_construction",
      capacity: 200,
      efficiency: 88,
      energy_source: "wind",
      location: { latitude: 26.9124, longitude: 75.7873, city: "Jaipur", state: "Rajasthan" }
    },
    {
      id: 3,
      name: "Tamil Nadu Coastal Plant",
      type: "plant",
      status: "planned",
      capacity: 300,
      efficiency: 90,
      energy_source: "tidal",
      location: { latitude: 13.0827, longitude: 80.2707, city: "Chennai", state: "Tamil Nadu" }
    }
  ];

  const mockPerformance = [
    { id: 1, efficiency: 85, production_rate: 145 },
    { id: 2, efficiency: 87, production_rate: 148 },
    { id: 3, efficiency: 88, production_rate: 152 },
    { id: 4, efficiency: 86, production_rate: 149 },
    { id: 5, efficiency: 89, production_rate: 155 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Green Hydrogen Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            Real-time monitoring and optimization of hydrogen infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Plants"
            value={data.plants}
            subtitle="Infrastructure Assets"
            icon={Factory}
            trend="+12% this quarter"
            color="green"
          />
          <MetricCard
            title="Daily Capacity"
            value={`${data.capacity.toLocaleString()} t/d`}
            subtitle="Hydrogen Production"
            icon={Zap}
            trend="+8% efficiency gain"
            color="blue"
          />
          <MetricCard
            title="Total Investment"
            value={`$${data.investment}B`}
            subtitle="Committed Capital"
            icon={DollarSign}
            trend="+45% YoY growth"
            color="purple"
          />
          <MetricCard
            title="Avg Efficiency"
            value={`${data.efficiency}%`}
            subtitle="Plant Performance"
            icon={Gauge}
            trend="Within target range"
            color="cyan"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg">
            <div className="p-6 border-b border-gray-100">
              <h3 className="flex items-center gap-2 text-slate-900 text-xl font-semibold">
                <Sun className="w-5 h-5 text-yellow-500" />
                Energy Sources
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Solar</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-16 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Wind</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-14 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Tidal</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PerformanceChart performance={mockPerformance} />
          <AlertsPanel infrastructure={mockInfrastructure} />
        </div>

        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <MapPin className="w-5 h-5 text-red-500" />
              Infrastructure Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <InfrastructureMap infrastructure={mockInfrastructure} />
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockInfrastructure.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-white/60 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <Factory className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-600">{item.location.city}, {item.location.state}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      item.status === 'operational' ? 'bg-green-100 text-green-800' :
                      item.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{item.capacity} t/d</p>
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