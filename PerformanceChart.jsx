import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity } from "lucide-react";

export default function PerformanceChart({ performance }) {
  const chartData = performance.slice(0, 12).reverse().map((item, index) => ({
    time: `${index + 1}h`,
    efficiency: item.efficiency || 0,
    production: item.production_rate || 0
  }));

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Activity className="w-5 h-5 text-green-500" />
          Performance Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
            />
            <Line 
              type="monotone" 
              dataKey="efficiency" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ fill: "#10B981", strokeWidth: 2 }}
              name="Efficiency (%)"
            />
            <Line 
              type="monotone" 
              dataKey="production" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: "#3B82F6", strokeWidth: 2 }}
              name="Production (kg/h)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}