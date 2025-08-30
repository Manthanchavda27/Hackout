import React, { useState, useContext, useEffect } from "react";
import { BarChart3, TrendingUp, Zap, DollarSign, Calendar, Download, RefreshCw, Filter, Eye, AlertTriangle } from "lucide-react";
import { CurrencyContext } from "./Settings";

export default function Analytics() {
  const { currencySymbol, formatCurrency } = useContext(CurrencyContext);
  const [timeRange, setTimeRange] = useState('6months');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('production');
  const [realTimeData, setRealTimeData] = useState({
    production: 8550,
    efficiency: 87.2,
    investment: 2900000000,
    projects: 80
  });
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        production: prev.production + Math.floor(Math.random() * 10 - 5),
        efficiency: Math.max(75, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 2)),
        investment: prev.investment + Math.floor(Math.random() * 10000000),
        projects: prev.projects + Math.floor(Math.random() * 3 - 1)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const refreshData = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRealTimeData(prev => ({
      production: prev.production + Math.floor(Math.random() * 50),
      efficiency: Math.max(75, Math.min(95, prev.efficiency + Math.random() * 5)),
      investment: prev.investment + Math.floor(Math.random() * 50000000),
      projects: prev.projects + Math.floor(Math.random() * 5)
    }));
    setIsRefreshing(false);
  };
  

  
  const downloadAnalyticsReport = () => {
    const reportData = {
      timeRange,
      selectedMetric,
      metrics: {
        totalProduction: `${realTimeData.production} t`,
        avgEfficiency: `${realTimeData.efficiency.toFixed(1)}%`,
        investmentFlow: `${currencySymbol}${formatCurrency(realTimeData.investment)}`,
        activeProjects: realTimeData.projects
      },
      regionalData: [
        { name: 'Gujarat', value: 35, trend: '+5.2%' },
        { name: 'Rajasthan', value: 28, trend: '+3.8%' },
        { name: 'Tamil Nadu', value: 22, trend: '+2.1%' },
        { name: 'Others', value: 15, trend: '+1.5%' }
      ],
      alerts: [
        { type: 'warning', message: 'Plant efficiency below 85% in 3 facilities' },
        { type: 'success', message: 'New investment milestone reached: ₹3000 Cr' }
      ],
      timestamp: new Date().toISOString()
    };
    
    // Generate both JSON and CSV
    const jsonStr = JSON.stringify(reportData, null, 2);
    const jsonBlob = new Blob([jsonStr], {type: 'application/json'});
    const jsonUrl = URL.createObjectURL(jsonBlob);
    
    const csvData = [
      ['Metric', 'Value', 'Trend'],
      ['Total Production', `${realTimeData.production} t`, '+12.5%'],
      ['Avg Efficiency', `${realTimeData.efficiency.toFixed(1)}%`, '+3.8%'],
      ['Investment Flow', `${currencySymbol}${formatCurrency(realTimeData.investment)}`, '+45%'],
      ['Active Projects', realTimeData.projects, '+28']
    ].map(row => row.join(',')).join('\n');
    
    const csvBlob = new Blob([csvData], {type: 'text/csv'});
    const csvUrl = URL.createObjectURL(csvBlob);
    
    // Download JSON
    const jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    jsonLink.click();
    
    // Download CSV
    setTimeout(() => {
      const csvLink = document.createElement('a');
      csvLink.href = csvUrl;
      csvLink.download = `analytics-report-${new Date().toISOString().split('T')[0]}.csv`;
      csvLink.click();
    }, 100);
  };

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend, color, isSelected, onClick, realTime }) => (
    <div 
      className={`bg-white/95 backdrop-blur-sm border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' : 'border-white/20'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-slate-600">{title}</p>
            {realTime && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
          </div>
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
          <div className="flex items-center gap-4 flex-wrap">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors"
            >
              <option value="24hours">Last 24 Hours</option>
              <option value="7days">Last 7 Days</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
            
            <button 
              onClick={refreshData} 
              disabled={isRefreshing}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 inline-flex items-center disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            
            <button 
              onClick={downloadAnalyticsReport} 
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-300 inline-flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Reports
            </button>
          </div>
        </div>

        {/* Real-time Alerts */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-orange-800">Live System Alerts</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-orange-700">3 plants operating below 85% efficiency</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700">New investment milestone: ₹3000 Cr reached</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Production"
            value={`${realTimeData.production.toLocaleString()} t`}
            icon={Zap}
            trend="+12.5% vs last period"
            color="green"
            isSelected={selectedMetric === 'production'}
            onClick={() => setSelectedMetric('production')}
            realTime={true}
          />
          <MetricCard
            title="Avg Efficiency"
            value={`${realTimeData.efficiency.toFixed(1)}%`}
            icon={BarChart3}
            trend="+3.8% improvement"
            color="blue"
            isSelected={selectedMetric === 'efficiency'}
            onClick={() => setSelectedMetric('efficiency')}
            realTime={true}
          />
          <MetricCard
            title="Investment Flow"
            value={`${currencySymbol}${formatCurrency(realTimeData.investment)}`}
            icon={DollarSign}
            trend="+45% YoY growth"
            color="purple"
            isSelected={selectedMetric === 'investment'}
            onClick={() => setSelectedMetric('investment')}
            realTime={true}
          />
          <MetricCard
            title="Active Projects"
            value={realTimeData.projects.toString()}
            icon={Calendar}
            trend="+28 new projects"
            color="cyan"
            isSelected={selectedMetric === 'projects'}
            onClick={() => setSelectedMetric('projects')}
            realTime={true}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-slate-900 text-xl font-semibold">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Performance Trends - {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Eye className="w-4 h-4" />
                  Live Data
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
                  const baseValue = selectedMetric === 'production' ? 7000 + index * 200 :
                                   selectedMetric === 'efficiency' ? 70 + index * 3 :
                                   selectedMetric === 'investment' ? 40 + index * 8 :
                                   60 + index * 5;
                  const percentage = Math.min(100, baseValue / (selectedMetric === 'production' ? 85 : 1));
                  
                  return (
                    <div key={month} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded transition-colors">
                      <span className="text-slate-600 font-medium">{month}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12 text-right">
                          {selectedMetric === 'production' ? `${baseValue}t` :
                           selectedMetric === 'efficiency' ? `${baseValue}%` :
                           selectedMetric === 'investment' ? `₹${baseValue}Cr` :
                           `${baseValue}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
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

        {/* Interactive Detailed View */}
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-slate-900 text-xl font-semibold">
              Detailed Analysis - {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}
            </h3>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {selectedMetric === 'production' && (
                <>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{(realTimeData.production * 0.12).toFixed(0)}t</div>
                    <div className="text-sm text-green-700">Daily Average</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{(realTimeData.production * 0.85).toFixed(0)}t</div>
                    <div className="text-sm text-blue-700">Peak Capacity</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">94.2%</div>
                    <div className="text-sm text-purple-700">Utilization Rate</div>
                  </div>
                </>
              )}
              {selectedMetric === 'efficiency' && (
                <>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{(realTimeData.efficiency + 5).toFixed(1)}%</div>
                    <div className="text-sm text-green-700">Best Performer</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{(realTimeData.efficiency - 8).toFixed(1)}%</div>
                    <div className="text-sm text-orange-700">Needs Attention</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">+3.2%</div>
                    <div className="text-sm text-blue-700">Monthly Improvement</div>
                  </div>
                </>
              )}
              {selectedMetric === 'investment' && (
                <>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">₹{formatCurrency(realTimeData.investment * 0.3)}</div>
                    <div className="text-sm text-green-700">This Quarter</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">₹{formatCurrency(realTimeData.investment * 0.15)}</div>
                    <div className="text-sm text-blue-700">Pipeline</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <div className="text-sm text-purple-700">Active Investors</div>
                  </div>
                </>
              )}
              {selectedMetric === 'projects' && (
                <>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{Math.floor(realTimeData.projects * 0.6)}</div>
                    <div className="text-sm text-green-700">Operational</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{Math.floor(realTimeData.projects * 0.25)}</div>
                    <div className="text-sm text-yellow-700">Under Construction</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{Math.floor(realTimeData.projects * 0.15)}</div>
                    <div className="text-sm text-blue-700">Planning Phase</div>
                  </div>
                </>
              )}
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
                  { name: 'Gujarat', value: 35, color: 'bg-green-500', trend: '+5.2%', projects: 28 },
                  { name: 'Rajasthan', value: 28, color: 'bg-blue-500', trend: '+3.8%', projects: 22 },
                  { name: 'Tamil Nadu', value: 22, color: 'bg-purple-500', trend: '+2.1%', projects: 18 },
                  { name: 'Others', value: 15, color: 'bg-cyan-500', trend: '+1.5%', projects: 12 }
                ].map((region) => (
                  <div key={region.name} className="hover:bg-gray-50 p-3 rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${region.color}`}></div>
                        <span className="text-slate-700 font-medium">{region.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-900">{region.value}%</span>
                        <span className="text-xs text-green-600 ml-2">{region.trend}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>{region.projects} active projects</span>
                      <div className="w-20 h-1 bg-gray-200 rounded-full">
                        <div 
                          className={`h-1 rounded-full ${region.color}`}
                          style={{ width: `${region.value * 2}%` }}
                        ></div>
                      </div>
                    </div>
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