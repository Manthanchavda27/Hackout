import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function MetricCard({ title, value, subtitle, icon: Icon, trend, color }) {
  const colorClasses = {
    green: "from-green-400 to-green-600",
    blue: "from-blue-400 to-blue-600", 
    purple: "from-purple-400 to-purple-600",
    cyan: "from-cyan-400 to-cyan-600"
  };

  const isPositiveTrend = trend && (trend.includes('+') || trend.includes('gain') || trend.includes('growth'));

  return (
    <Card className="glass-effect border-white/20 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <div>
              <p className="text-3xl font-bold text-slate-900">{value}</p>
              <p className="text-sm text-slate-500">{subtitle}</p>
            </div>
            {trend && (
              <div className={`flex items-center gap-1 text-xs ${
                isPositiveTrend ? 'text-green-600' : 'text-slate-600'
              }`}>
                {isPositiveTrend ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{trend}</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}