import React, { useState, useContext } from "react";
import { BarChart3, TrendingUp, Zap, DollarSign, Calendar, Download } from "lucide-react";
import { CurrencyContext } from "./Settings";

export default function Analytics() {
  const { currencySymbol, formatCurrency } = useContext(CurrencyContext);
  const [timeRange, setTimeRange] = useState('6months');
  

  
  const downloadAnalyticsReport = () => {
    const reportData = {
      timeRange,
      metrics: {
        totalProduction: '8,550 t',
        avgEfficiency: '87.2%',
        investmentFlow: `${currencySymbol}${formatCurrency(2900000000)}`,
        activeProjects: 80
      },
      regionalData: [
        { name: 'Gujarat', value: 35 },
        { name: 'Rajasthan', value: 28 },
        { name: 'Tamil Nadu', value: 22 },
        { name: 'Others', value: 15 }
      ],
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'analytics-report.json';
    link.click();
  };

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend, color }) => (
    <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          <p className="text-sm text-green-600 mt-1 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-${color}-500 flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
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
            </select>
            <button onClick={downloadAnalyticsReport} className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-300 inline-flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Production"
            value="8,550 t"
            icon={Zap}
            trend="+12.5% vs last period"
            color="green"
          />
          <MetricCard
            title="Avg Efficiency"
            value="87.2%"
            icon={BarChart3}
            trend="+3.8% improvement"
            color="blue"
          />
          <MetricCard
            title="Investment Flow"
            value={`${currencySymbol}${formatCurrency(2900000000)}`}
            icon={DollarSign}
            trend="+45% YoY growth"
            color="purple"
          />
          <MetricCard
            title="Active Projects"
            value="80"
            icon={Calendar}
            trend="+28 new projects"
            color="cyan"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg">
            <div className="p-6 border-b border-gray-100">
              <h3 className="flex items-center gap-2 text-slate-900 text-xl font-semibold">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Performance Trends
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
                  <div key={month} className="flex items-center justify-between">
                    <span className="text-slate-600">{month}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-green-500 rounded-full" 
                          style={{ width: `${70 + index * 5}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{70 + index * 5}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg">
            <div className="p-6 border-b border-gray-100">
              <h3 className="flex items-center gap-2 text-slate-900 text-xl font-semibold">
                <DollarSign className="w-5 h-5 text-blue-500" />
                Investment Growth
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'].map((quarter, index) => (
                  <div key={quarter} className="flex items-center justify-between">
                    <span className="text-slate-600">{quarter}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-4 bg-gray-200 rounded">
                        <div 
                          className="h-4 bg-blue-500 rounded" 
                          style={{ width: `${40 + index * 15}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{currencySymbol}{formatCurrency((450 + index * 170) * 1000000)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-slate-900 text-xl font-semibold">Regional Distribution</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: 'Gujarat', value: 35, color: 'bg-green-500' },
                  { name: 'Rajasthan', value: 28, color: 'bg-blue-500' },
                  { name: 'Tamil Nadu', value: 22, color: 'bg-purple-500' },
                  { name: 'Others', value: 15, color: 'bg-cyan-500' }
                ].map((region) => (
                  <div key={region.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${region.color}`}></div>
                      <span className="text-slate-600">{region.name}</span>
                    </div>
                    <span className="font-medium">{region.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-slate-900 text-xl font-semibold">Top Performing Plants</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: "Gujarat Green Hydrogen Plant", efficiency: 92 },
                  { name: "Rajasthan Wind-H2 Facility", efficiency: 89 },
                  { name: "Tamil Nadu Coastal Plant", efficiency: 87 },
                  { name: "Karnataka Solar Hub", efficiency: 85 }
                ].map((plant, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{plant.name}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                        {plant.efficiency}% Efficiency
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-slate-900 text-xl font-semibold">Key Insights</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 text-sm">Efficiency Improvement</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Average plant efficiency increased by 3.8% over the last 6 months.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 text-sm">Investment Surge</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Q4 2024 saw record investment of $950M across 28 new projects.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800 text-sm">Regional Growth</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Gujarat and Rajasthan lead in hydrogen production capacity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}