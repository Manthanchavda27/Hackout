import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign } from "lucide-react";

export default function CostAnalysis({ recommendations }) {
  const chartData = recommendations.map((rec, index) => ({
    name: rec.location.split(',')[0],
    cost: rec.estimatedCost / 1000000,
    efficiency: rec.efficiency,
    score: rec.score
  }));

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-500" />
          Cost Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
              formatter={(value, name) => [
                name === 'cost' ? `$${value}M` : `${value}%`,
                name === 'cost' ? 'Estimated Cost' : 'Efficiency'
              ]}
            />
            <Bar 
              dataKey="cost" 
              fill="#10B981" 
              name="cost"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Avg. Investment</span>
            <span className="font-medium">
              ${(recommendations.reduce((sum, rec) => sum + rec.estimatedCost, 0) / recommendations.length / 1000000).toFixed(0)}M
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Cost Range</span>
            <span className="font-medium">
              ${Math.min(...recommendations.map(r => r.estimatedCost)) / 1000000}M - 
              ${Math.max(...recommendations.map(r => r.estimatedCost)) / 1000000}M
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}