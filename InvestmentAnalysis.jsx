import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { DollarSign } from "lucide-react";

export default function InvestmentAnalysis({ investments }) {
  const getInvestmentByType = () => {
    const typeData = {};
    investments.forEach(inv => {
      const type = inv.project_type;
      typeData[type] = (typeData[type] || 0) + (inv.amount_required || 0);
    });
    
    return Object.entries(typeData).map(([type, amount]) => ({
      name: type.replace('_', ' '),
      value: amount / 1000000, // Convert to millions
      fullValue: amount
    }));
  };

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'];
  const data = getInvestmentByType();

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-500" />
          Investment Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`$${value.toFixed(0)}M`, 'Investment']}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="capitalize text-slate-700">{item.name}</span>
              </div>
              <span className="font-medium">${item.value.toFixed(0)}M</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}