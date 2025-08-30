import React from "react";
import { Card, CardContent } from "../ui/card";
import { TrendingUp, Users, Building2, DollarSign } from "lucide-react";

export default function FundingStats({ totalFunding, seekingFunding, totalProjects }) {
  const stats = [
    {
      title: "Total Funding",
      value: `$${(totalFunding / 1000000000).toFixed(1)}B`,
      subtitle: "Committed Capital",
      icon: DollarSign,
      color: "green"
    },
    {
      title: "Seeking Investment",
      value: `$${(seekingFunding / 1000000000).toFixed(1)}B`,
      subtitle: "Available Opportunities",
      icon: TrendingUp,
      color: "blue"
    },
    {
      title: "Active Projects",
      value: totalProjects,
      subtitle: "Investment Projects",
      icon: Building2,
      color: "purple"
    },
    {
      title: "Success Rate",
      value: "73%",
      subtitle: "Funded Projects",
      icon: Users,
      color: "cyan"
    }
  ];

  const colorClasses = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    cyan: "bg-cyan-500"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-effect border-white/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                <div>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.subtitle}</p>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${colorClasses[stat.color]} shadow-lg`}>
                {React.createElement(stat.icon, { className: "w-6 h-6 text-white" })}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}