import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Settings, MapPin, Zap, DollarSign, TrendingUp, Target } from "lucide-react";

export default function Optimizer() {
  const [selectedCriteria, setSelectedCriteria] = useState({
    renewable_potential: true,
    infrastructure_proximity: true,
    cost_efficiency: true,
    regulatory_compliance: false,
    water_availability: true
  });

  const [optimizationResults] = useState([
    {
      id: 1,
      location: "Kutch, Gujarat",
      score: 92,
      renewable_potential: 95,
      infrastructure_proximity: 88,
      cost_efficiency: 90,
      water_availability: 85,
      estimated_capacity: 250,
      investment_required: 650000000
    },
    {
      id: 2,
      location: "Jaisalmer, Rajasthan",
      score: 89,
      renewable_potential: 98,
      infrastructure_proximity: 82,
      cost_efficiency: 87,
      water_availability: 78,
      estimated_capacity: 300,
      investment_required: 720000000
    },
    {
      id: 3,
      location: "Rameswaram, Tamil Nadu",
      score: 85,
      renewable_potential: 88,
      infrastructure_proximity: 90,
      cost_efficiency: 82,
      water_availability: 92,
      estimated_capacity: 200,
      investment_required: 580000000
    }
  ]);

  const runOptimization = () => {
    console.log("Running optimization with criteria:", selectedCriteria);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Plant Optimizer
          </h1>
          <p className="text-slate-600 text-lg">
            AI-powered location analysis for optimal hydrogen plant placement
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Optimization Criteria */}
          <div className="lg:col-span-1">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Settings className="w-5 h-5 text-blue-500" />
                  Optimization Criteria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(selectedCriteria).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 capitalize">
                      {key.replace('_', ' ')}
                    </span>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setSelectedCriteria({
                        ...selectedCriteria,
                        [key]: e.target.checked
                      })}
                      className="rounded border-gray-300"
                    />
                  </label>
                ))}
                
                <Button 
                  onClick={runOptimization}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white mt-6"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Run Optimization
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Optimization Results */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Optimization Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {optimizationResults.map((result, index) => (
                    <div key={result.id} className="p-6 bg-white/60 rounded-xl border border-white/30">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? 'bg-green-500' :
                            index === 1 ? 'bg-blue-500' :
                            'bg-purple-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {result.location}
                            </h3>
                            <p className="text-sm text-slate-600">Optimization Score: {result.score}/100</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Recommended
                        </Badge>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-white/50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{result.renewable_potential}</div>
                          <div className="text-xs text-slate-600">Renewable Potential</div>
                        </div>
                        <div className="text-center p-3 bg-white/50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{result.infrastructure_proximity}</div>
                          <div className="text-xs text-slate-600">Infrastructure</div>
                        </div>
                        <div className="text-center p-3 bg-white/50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{result.cost_efficiency}</div>
                          <div className="text-xs text-slate-600">Cost Efficiency</div>
                        </div>
                        <div className="text-center p-3 bg-white/50 rounded-lg">
                          <div className="text-2xl font-bold text-cyan-600">{result.water_availability}</div>
                          <div className="text-xs text-slate-600">Water Access</div>
                        </div>
                      </div>

                      {/* Key Details */}
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span className="text-slate-600">Estimated Capacity:</span>
                          <span className="font-medium">{result.estimated_capacity} t/d</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="text-slate-600">Investment Required:</span>
                          <span className="font-medium">${(result.investment_required / 1000000).toFixed(0)}M</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          View Details
                        </Button>
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white">
                          Start Project
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}