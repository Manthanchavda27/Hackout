import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Users, Star } from "lucide-react";

export default function InvestorProfiles() {
  const topInvestors = [
    {
      name: "ReNew Energy Partners",
      type: "Equity Fund",
      totalInvested: 2500,
      projects: 8,
      sectors: ["Production", "Storage"],
      rating: 4.8
    },
    {
      name: "Mahindra Green Solutions",
      type: "Corporate VC",
      totalInvested: 1800,
      projects: 5,
      sectors: ["Distribution", "Research"],
      rating: 4.6
    },
    {
      name: "L&T Energy Development",
      type: "Infrastructure",
      totalInvested: 1200,
      projects: 6,
      sectors: ["Production", "Infrastructure"],
      rating: 4.7
    }
  ];

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Top Investors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topInvestors.map((investor, index) => (
          <div key={index} className="p-4 bg-white/60 rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">{investor.name}</h4>
                <p className="text-xs text-slate-600">{investor.type}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs font-medium">{investor.rating}</span>
              </div>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Invested</span>
                <span className="font-medium">${investor.totalInvested}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Projects</span>
                <span className="font-medium">{investor.projects}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {investor.sectors.map((sector, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {sector}
                </Badge>
              ))}
            </div>
            
            <Button size="sm" variant="outline" className="w-full text-xs">
              View Profile
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}