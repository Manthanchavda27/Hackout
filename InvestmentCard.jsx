import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Mail,
  Target
} from "lucide-react";

export default function InvestmentCard({ investment, onContact }) {
  const fundingProgress = ((investment.amount_committed || 0) / investment.amount_required) * 100;
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'seeking_investors': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'funded': return 'bg-green-100 text-green-800 border-green-200';
      case 'under_review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProjectTypeColor = (type) => {
    switch (type) {
      case 'production': return 'bg-green-100 text-green-800';
      case 'storage': return 'bg-blue-100 text-blue-800';
      case 'distribution': return 'bg-purple-100 text-purple-800';
      case 'research': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-gray-200">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {investment.project_name}
                </h3>
                <p className="text-slate-600 font-medium">
                  {investment.investor_name}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Badge variant="secondary" className={getProjectTypeColor(investment.project_type)}>
                {investment.project_type}
              </Badge>
              <Badge variant="secondary" className={`border ${getStatusColor(investment.status)}`}>
                {investment.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <p className="font-semibold">{investment.expected_capacity} t/d</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <div>
                <p className="text-xs text-slate-500">ROI</p>
                <p className="font-semibold">{investment.roi_projection}%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-500" />
              <div>
                <p className="text-xs text-slate-500">Timeline</p>
                <p className="font-semibold">{investment.timeline}</p>
              </div>
            </div>
          </div>

          {/* Funding Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">Funding Progress</span>
              <span className="font-medium">
                ${(investment.amount_committed || 0) / 1000000}M / ${investment.amount_required / 1000000}M
              </span>
            </div>
            <Progress value={fundingProgress} className="h-2" />
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="w-4 h-4" />
            <span>{investment.location?.city}, {investment.location?.state}</span>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="text-sm text-slate-600">
              Contact: {investment.contact_email}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Mail className="w-4 h-4 mr-1" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}