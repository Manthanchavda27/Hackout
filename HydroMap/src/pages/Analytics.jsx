import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { BarChart3, TrendingUp, Zap, DollarSign, Calendar, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('6months');

  const performanceData = [
    { month: 'Jan', efficiency: 82, output: 1200, cost: 45 },
    { month: 'Feb', efficiency: 85, output: 1350, cost: 42 },
    { month: 'Mar', efficiency: 88, output: 1480, cost: 40 },
    { month: 'Apr', efficiency: 87, output: 1420, cost: 41 },
    { month: 'May', efficiency: 90, output: 1580, cost: 38 },
    { month: 'Jun', efficiency: 89, output: 1520, cost: 39 }
  ];

  const investmentData = [
    { quarter: 'Q1 2024', amount: 450, projects: 12 },
    { quarter: 'Q2 2024', amount: 680, projects: 18 },
    { quarter: 'Q3 2024', amount: 820, projects: 22 },
    { quarter: 'Q4 2024', amount: 950, projects: 28 }
  ];

  const regionData = [
    { name: 'Gujarat', value: 35, color: '#10B981' },
    { name: 'Rajasthan', value: 28, color: '#3B82F6' },
    { name: 'Tamil Nadu', value: 22, color: '#8B5CF6' },
    { name: 'Others', value: 15, color: '#06B6D4' }
  ];

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#06B6D4'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-slate-600 text-lg">
              Comprehensive performance tracking and insights
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
              <option value="2years">Last 2 Years</option>
            </select>
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Production</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">8,550 t</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12.5% vs last period
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Avg Efficiency</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">87.2%</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +3.8% improvement
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Investment Flow</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">$2.9B</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +45% YoY growth
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Projects</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">80</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +28 new projects
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Performance Trends */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="efficiency" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Investment Growth */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <DollarSign className="w-5 h-5 text-blue-500" />
                Investment Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={investmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Regional Distribution */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-slate-900">Regional Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Production Output */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-slate-900">Monthly Output</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="output" stroke="#8B5CF6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cost Analysis */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-slate-900">Cost Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="cost" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Performing Plants */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-slate-900">Top Performing Plants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Gujarat Green Hydrogen Plant", efficiency: 92, output: 180 },
                  { name: "Rajasthan Wind-H2 Facility", efficiency: 89, output: 165 },
                  { name: "Tamil Nadu Coastal Plant", efficiency: 87, output: 155 },
                  { name: "Karnataka Solar Hub", efficiency: 85, output: 140 }
                ].map((plant, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{plant.name}</p>
                      <p className="text-sm text-slate-600">Output: {plant.output} t/d</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {plant.efficiency}% Efficiency
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-slate-900">Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800">Efficiency Improvement</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Average plant efficiency increased by 3.8% over the last 6 months, exceeding industry benchmarks.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800">Investment Surge</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Q4 2024 saw record investment of $950M across 28 new projects, indicating strong market confidence.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800">Regional Growth</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Gujarat and Rajasthan continue to lead in hydrogen production capacity, accounting for 63% of total output.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-800">Cost Optimization</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    Production costs decreased by 15% due to improved technology and economies of scale.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}