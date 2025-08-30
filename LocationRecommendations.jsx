import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Star, 
  DollarSign, 
  Gauge, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Sun,
  Wind,
  Waves
} from "lucide-react";

export default function LocationRecommendations({ recommendations, params }) {
  const getEnergyIcon = (source) => {
    switch (source) {
      case 'solar': return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'wind': return <Wind className="w-4 h-4 text-blue-500" />;
      case 'tidal': return <Waves className="w-4 h-4 text-cyan-500" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Top Location Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                index === 0 
                  ? 'border-green-200 bg-green-50/50' 
                  : 'border-gray-200 bg-white/50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    index === 0 ? 'bg-green-500' : 
                    index === 1 ? 'bg-blue-500' :
                    index === 2 ? 'bg-purple-500' : 'bg-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">
                      {rec.location}
                    </h3>
                    <p className="text-slate-600 text-sm">{rec.state}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(rec.score)}`}>
                    {rec.score}
                  </div>
                  <p className="text-xs text-slate-500">Score</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {getEnergyIcon(rec.energySource)}
                  <div>
                    <p className="text-xs text-slate-500">Energy Source</p>
                    <p className="font-medium capitalize">{rec.energySource}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-xs text-slate-500">Est. Cost</p>
                    <p className="font-medium">${(rec.estimatedCost / 1000000).toFixed(0)}M</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-slate-500">Efficiency</p>
                    <p className="font-medium">{rec.efficiency}%</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Overall Score</span>
                  <span className="font-medium">{rec.score}/100</span>
                </div>
                <Progress value={rec.score} className="h-2" />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Advantages
                  </h4>
                  <ul className="space-y-1">
                    {rec.advantages.map((advantage, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-orange-700 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Challenges
                  </h4>
                  <ul className="space-y-1">
                    {rec.challenges.map((challenge, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>Timeline: {rec.timeline}</span>
                </div>
                
                <Button 
                  size="sm" 
                  className={index === 0 ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}