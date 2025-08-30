import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Info, MapPin, Zap, Factory, Calendar, TrendingUp } from "lucide-react";

export default function LocationDetails({ selectedLocation }) {
  if (!selectedLocation) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <Info className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600">Select a location on the map to view details</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800 border-green-200';
      case 'planned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'under_construction': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'maintenance': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-4">
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Factory className="w-5 h-5" />
            {selectedLocation.name}
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              {selectedLocation.type.replace('_', ' ')}
            </Badge>
            <Badge variant="secondary" className={`text-xs border ${getStatusColor(selectedLocation.status)}`}>
              {selectedLocation.status.replace('_', ' ')}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Location Info */}
          <div>
            <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </h4>
            <p className="text-sm text-slate-600">
              {selectedLocation.location?.city}, {selectedLocation.location?.state}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {selectedLocation.location?.latitude?.toFixed(4)}, {selectedLocation.location?.longitude?.toFixed(4)}
            </p>
          </div>

          {/* Performance Metrics */}
          <div>
            <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Performance
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Capacity</span>
                  <span className="font-medium">{selectedLocation.capacity || 0} t/d</span>
                </div>
              </div>
              
              {selectedLocation.efficiency && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Efficiency</span>
                    <span className="font-medium">{selectedLocation.efficiency}%</span>
                  </div>
                  <Progress value={selectedLocation.efficiency} className="h-2" />
                </div>
              )}
              
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Energy Source</span>
                  <span className="font-medium capitalize">{selectedLocation.energy_source}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Info */}
          {selectedLocation.investment_amount && (
            <div>
              <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Investment
              </h4>
              <p className="text-sm text-slate-600">
                ${(selectedLocation.investment_amount / 1000000).toFixed(1)}M USD
              </p>
            </div>
          )}

          {/* Operational Date */}
          {selectedLocation.operational_date && (
            <div>
              <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Operational Date
              </h4>
              <p className="text-sm text-slate-600">
                {new Date(selectedLocation.operational_date).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-4">
            <Button className="w-full" variant="outline">
              View Full Report
            </Button>
            <Button className="w-full" size="sm">
              Optimize Route
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}