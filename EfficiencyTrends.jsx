import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Activity } from "lucide-react";

export default function EfficiencyTrends({ data, timeRange }) {
  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-500" />
          Efficiency Trends ({timeRange})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="efficiency"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#efficiencyGradient)"
              strokeWidth={2}
              name="Efficiency (%)"
            />
            <Area
              type="monotone"
              dataKey="production"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#productionGradient)"
              strokeWidth={2}
              name="Production (kg/h)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}