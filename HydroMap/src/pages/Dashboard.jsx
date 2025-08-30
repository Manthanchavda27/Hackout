import React, { useState, useEffect } from "react";
import { Infrastructure, EnergySource, Investment, PlantPerformance } from "../entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  Factory, 
  Zap, 
  TrendingUp, 
  MapPin, 
  DollarSign,
  Gauge,
  Wind,
  Sun,
  Waves,
  AlertTriangle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

export default function Dashboard() {
  const [infrastructure, setInfrastructure] = useState([]);
  const [energySources, setEnergySources] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [performance, setPerformance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [infraData, energyData, investData, perfData] = await Promise.all([
        Infrastructure.list("-created_date", 50),
        EnergySource.list("-created_date", 20),
        Investment.list("-created_date", 10),
        PlantPerformance.list("-timestamp", 100)
      ]);
      
      setInfrastructure(infraData);
      setEnergySources(energyData);
      setInvestments(investData);
      setPerformance(perfData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalCapacity = () => {
    return infrastructure
      .filter(item => item.status === 'operational')
      .reduce((sum, item) => sum + (item.capacity || 0), 0);
  };

  const getTotalInvestment = () => {
    return investments.reduce((sum, inv) => sum + (inv.amount_required || 0), 0);
  };

  const getAverageEfficiency = () => {
    const operational = infrastructure.filter(item => item.status === 'operational');
    if (operational.length === 0) return 0;
    return operational.reduce((sum, item) => sum + (item.efficiency || 0), 0) / operational.length;
  };

  const getEnergySourceData = () => {
    const sources = { solar: 0, wind: 0, tidal: 0, mixed: 0 };
    infrastructure.forEach(item => {
      sources[item.energy_source] = (sources[item.energy_source] || 0) + 1;
    });
    return Object.entries(sources).map(([name, value]) => ({ name, value }));
  };

  const COLORS = ['#10B981', '#3B82F6', '#06B6D4', '#8B5CF6'];

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend, color }) => (
    <Card className="glass-effect border-white/20 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
            {trend && (
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {trend}
              </p>
            )}
          </div>
          <div className={`w-12 h-12 rounded-xl bg-${color}-500 flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Green Hydrogen Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            Real-time monitoring and optimization of hydrogen infrastructure
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Plants"
            value={infrastructure.length}
            subtitle="Infrastructure Assets"
            icon={Factory}
            trend="+12% this quarter"
            color="green"
          />
          <MetricCard
            title="Daily Capacity"
            value={`${getTotalCapacity().toLocaleString()} t/d`}
            subtitle="Hydrogen Production"
            icon={Zap}
            trend="+8% efficiency gain"
            color="blue"
          />
          <MetricCard
            title="Total Investment"
            value={`$${(getTotalInvestment() / 1000000000).toFixed(1)}B`}
            subtitle="Committed Capital"
            icon={DollarSign}
            trend="+45% YoY growth"
            color="purple"
          />
          <MetricCard
            title="Avg Efficiency"
            value={`${getAverageEfficiency().toFixed(1)}%`}
            subtitle="Plant Performance"
            icon={Gauge}
            trend="Within target range"
            color="cyan"
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Energy Source Distribution */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Sun className="w-5 h-5 text-yellow-500" />
                Energy Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={getEnergySourceData()}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {getEnergySourceData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={performance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="efficiency" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Alerts Panel */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Maintenance Due</p>
                    <p className="text-xs text-slate-600">Gujarat Plant - Scheduled maintenance in 2 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Efficiency Improved</p>
                    <p className="text-xs text-slate-600">Rajasthan Plant - 3% efficiency gain this week</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">New Investment</p>
                    <p className="text-xs text-slate-600">$50M funding secured for Tamil Nadu project</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {infrastructure.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-white/60 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <Factory className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-600">
                        {item.location?.city}, {item.location?.state}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="secondary" 
                      className={
                        item.status === 'operational' ? 'bg-green-100 text-green-800' :
                        item.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'under_construction' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {item.status.replace('_', ' ')}
                    </Badge>
                    <p className="text-sm text-slate-600 mt-1">
                      {item.capacity} t/d
                    </p>
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