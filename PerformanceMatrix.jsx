import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Factory, Gauge, Zap, TrendingUp } from "lucide-react";

export default function PerformanceMetrics({ operationalPlants, averageEfficiency, totalCapacity, performance }) {
  const getCurrentProduction = () => {
    if (performance.length === 0) return 0;
    return performance.reduce((sum, item) => sum + (item.production_rate || 0), 0);
  };

  const metrics = [
    {
      title: "Operational Plants",
      value: operationalPlants,
      subtitle: "Active Facilities",
      icon: Factory,
      color: "green",
      trend: "+2 this month"
    },
    {
      title: "Average Efficiency", 
      value: `${averageEfficiency.toFixed(1)}%`,
      subtitle: "System Performance",
      icon: Gauge,
      color: "blue",
      trend: "+3% improvement"
    },
    {
      title: "Total Capacity",
      value: `${totalCapacity.toLocaleString()} t/d`,
      subtitle: "Production Capacity",
      icon: Zap,
      color: "purple",
      trend: "+15% capacity added"
    },
    {
      title: "Current Production",
      value: `${getCurrentProduction().toFixed(0)} kg/h`,
      subtitle: "Real-time Output",
      icon: TrendingUp,
      color: "cyan",
      trend: "98% of target"
    }
  ];

  const colorClasses = {
    green: "from-green-400 to-green-600",
    blue: "from-blue-400 to-blue-600",
    purple: "from-purple-400 to-purple-600", 
    cyan: "from-cyan-400 to-cyan-600"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="glass-effect border-white/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                <div>
                  <p className="text-3xl font-bold text-slate-900">{metric.value}</p>
                  <p className="text-sm text-slate-500">{metric.subtitle}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>{metric.trend}</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[metric.color]} shadow-lg`}>
                {React.createElement(metric.icon, { className: "w-6 h-6 text-white" })}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}