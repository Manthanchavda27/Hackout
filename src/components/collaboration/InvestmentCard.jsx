import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Building2, MapPin, DollarSign, TrendingUp, Calendar, Mail, Target } from "lucide-react";

export default function InvestmentCard({ investment }) {
  const fundingProgress = ((investment.amount_committed || 0) / investment.amount_required) * 100;

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{investment.project_name}</h3>
                <p className="text-slate-600 font-medium">{investment.investor_name}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-xs text-slate-500">Required</p>
                <p className="font-semibold">${(investment.amount_required / 1000000).toFixed(0)}M</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-xs text-slate-500">Capacity</p>
                <p className="font-semibold">{investment.expected_capacity || 250} t/d</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">Funding Progress</span>
              <span className="font-medium">${(investment.amount_committed || 0) / 1000000}M / ${investment.amount_required / 1000000}M</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${fundingProgress}%` }}></div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">View Details</Button>
            <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Mail className="w-4 h-4 mr-1" />
              Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}