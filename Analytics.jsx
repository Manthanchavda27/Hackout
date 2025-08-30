import React, { useState, useEffect } from "react";
import { Infrastructure, PlantPerformance, Investment } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";
import { 
  Activity, 
  TrendingUp, 
  Zap, 
  Download,
  Calendar,
  Filter
} from "lucide-react";

import PerformanceMetrics from "../components/analytics/PerformanceMetrics";
import EfficiencyTrends from "../components/analytics/EfficiencyTrends";
import InvestmentAnalysis from "../components/analytics/InvestmentAnalysis";
import RegionalBreakdown from "../components/analytics/RegionalBreakdown";

export default function AnalyticsPage() {
  const [infrastructure, setInfrastructure] = useState([]);
  const [performance, setPerformance] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("efficiency");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      const [infraData, perfData, invData] = await Promise.all([
        Infrastructure.list("-created_date", 100),
        PlantPerformance.list("-timestamp", 200),
        Investment.list("-created_date", 50)
      ]);
      
      setInfrastructure(infraData);
      setPerformance(perfData);
      setInvestments(invData);
    } catch (error) {
      console.error("Error loading analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getOperationalPlants = () => {
    return infrastructure.filter(item => item.status === 'operational');
  };

  const getAverageEfficiency = () => {
    const operational = getOperationalPlants();
    if (operational.length === 0) return 0;
    return operational.reduce((sum, item) => sum + (item.efficiency || 0), 0) / operational.length;
  };

  const getTotalCapacity = () => {
    return getOperationalPlants().reduce((sum, item) => sum + (item.capacity || 0), 0);
  };

  const getPerformanceTrend = () => {
    return performance.slice(0, 12).reverse().map((item, index) => ({
      time: `${index + 1}h`,
      efficiency: item.efficiency || 0,
      production: item.production_rate || 0,
      energyConsumption: item.energy_consumption || 0
    }));
  };

  const getRegionalData = () => {
    const stateData = {};
    infrastructure.forEach(item => {
      const state = item.location?.state || 'Unknown';
      if (!stateData[state]) {
        stateData[state] = { plants: 0, capacity: 0, investment: 0 };
      }
      stateData[state].plants += 1;
      stateData[state].capacity += item.capacity || 0;
      stateData[state].investment += item.investment_amount || 0;
    });
    
    return Object.entries(stateData).map(([state, data]) => ({
      state,
      ...data
    })).sort((a, b) => b.capacity - a.capacity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-slate-600 text-lg">
              Comprehensive performance tracking and business intelligence
            </p>
          </div>
          
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        <PerformanceMetrics 
          operationalPlants={getOperationalPlants().length}
          averageEfficiency={getAverageEfficiency()}
          totalCapacity={getTotalCapacity()}
          performance={performance}
        />

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Efficiency Trends */}
          <EfficiencyTrends 
            data={getPerformanceTrend()}
            timeRange={timeRange}
          />

          {/* Investment Analysis */}
          <InvestmentAnalysis investments={investments} />
        </div>

        {/* Regional Breakdown */}
        <RegionalBreakdown 
          data={getRegionalData()}
          infrastructure={infrastructure}
        />

        {/* Detailed Performance Table */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Plant Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-semibold text-slate-700">Plant</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Status</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Capacity</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Efficiency</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Energy Source</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {getOperationalPlants().slice(0, 10).map((plant) => (
                    <tr key={plant.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 font-medium text-slate-900">{plant.name}</td>
                      <td className="p-3">
                        <Badge 
                          variant="secondary" 
                          className="bg-green-100 text-green-800"
                        >
                          {plant.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-slate-700">{plant.capacity} t/d</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-700">{plant.efficiency}%</span>
                          <div className={`w-2 h-2 rounded-full ${
                            plant.efficiency >= 85 ? 'bg-green-500' :
                            plant.efficiency >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                        </div>
                      </td>
                      <td className="p-3 text-slate-700 capitalize">{plant.energy_source}</td>
                      <td className="p-3 text-slate-700">
                        {plant.location?.city}, {plant.location?.state}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}