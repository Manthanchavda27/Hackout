import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Settings, MapPin, Zap, DollarSign, TrendingUp, Target, Sun, Wind, Waves, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function PlantOptimizer() {
  const [selectedCriteria, setSelectedCriteria] = useState({
    renewable_potential: true,
    infrastructure_proximity: true,
    cost_efficiency: true,
    regulatory_compliance: false,
    water_availability: true
  });

  const [selectedEnergyType, setSelectedEnergyType] = useState('all');
  const [optimizationResults, setOptimizationResults] = useState([]);
  const [stateAnalysis, setStateAnalysis] = useState([]);

  const stateOptimizationData = {
    solar: [
      { state: "Rajasthan", score: 95, capacity: 450, projects: 12, investment: 850 },
      { state: "Gujarat", score: 92, capacity: 380, projects: 10, investment: 720 },
      { state: "Karnataka", score: 88, capacity: 320, projects: 8, investment: 650 },
      { state: "Andhra Pradesh", score: 85, capacity: 290, projects: 7, investment: 580 },
      { state: "Maharashtra", score: 82, capacity: 260, projects: 6, investment: 520 }
    ],
    wind: [
      { state: "Tamil Nadu", score: 94, capacity: 420, projects: 11, investment: 780 },
      { state: "Gujarat", score: 91, capacity: 360, projects: 9, investment: 690 },
      { state: "Karnataka", score: 87, capacity: 310, projects: 8, investment: 620 },
      { state: "Rajasthan", score: 84, capacity: 280, projects: 7, investment: 560 },
      { state: "Maharashtra", score: 81, capacity: 250, projects: 6, investment: 500 }
    ],
    tidal: [
      { state: "Gujarat", score: 93, capacity: 200, projects: 5, investment: 450 },
      { state: "Tamil Nadu", score: 89, capacity: 180, projects: 4, investment: 380 },
      { state: "Odisha", score: 85, capacity: 150, projects: 3, investment: 320 },
      { state: "West Bengal", score: 82, capacity: 130, projects: 3, investment: 280 },
      { state: "Kerala", score: 78, capacity: 110, projects: 2, investment: 240 }
    ],
    all: [
      { state: "Gujarat", score: 92, capacity: 940, projects: 24, investment: 1860 },
      { state: "Rajasthan", score: 90, capacity: 730, projects: 19, investment: 1410 },
      { state: "Tamil Nadu", score: 88, capacity: 600, projects: 15, investment: 1160 },
      { state: "Karnataka", score: 85, capacity: 630, projects: 16, investment: 1270 },
      { state: "Maharashtra", score: 82, capacity: 510, projects: 12, investment: 1020 }
    ]
  };

  const runOptimization = () => {
    const data = stateOptimizationData[selectedEnergyType];
    setStateAnalysis(data);
    
    const results = data.slice(0, 3).map((state, index) => ({
      id: index + 1,
      location: `${state.state}, India`,
      score: state.score,
      renewable_potential: state.score,
      infrastructure_proximity: Math.max(75, state.score - 10),
      cost_efficiency: Math.max(70, state.score - 15),
      water_availability: Math.max(80, state.score - 5),
      estimated_capacity: state.capacity,
      investment_required: state.investment * 1000000
    }));
    
    setOptimizationResults(results);
  };

  const getEnergyIcon = (type) => {
    switch(type) {
      case 'solar': return Sun;
      case 'wind': return Wind;
      case 'tidal': return Waves;
      default: return Zap;
    }
  };

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Advanced Plant Optimizer
          </h1>
          <p className="text-slate-600 text-lg">
            AI-powered state-wise optimization analysis for hydrogen plant placement
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Settings className="w-5 h-5 text-blue-500" />
                  Optimization Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">Energy Source</label>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Sources', icon: Zap },
                      { value: 'solar', label: 'Solar Energy', icon: Sun },
                      { value: 'wind', label: 'Wind Energy', icon: Wind },
                      { value: 'tidal', label: 'Tidal Energy', icon: Waves }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="energyType"
                          value={option.value}
                          checked={selectedEnergyType === option.value}
                          onChange={(e) => setSelectedEnergyType(e.target.value)}
                          className="text-green-600"
                        />
                        <option.icon className="w-4 h-4 text-slate-600" />
                        <span className="text-sm text-slate-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">Optimization Criteria</label>
                  <div className="space-y-3">
                    {Object.entries(selectedCriteria).map(([key, value]) => (
                      <label key={key} className="flex items-center justify-between">
                        <span className="text-sm text-slate-700 capitalize">
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
                  </div>
                </div>
                
                <Button 
                  onClick={runOptimization}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Analyze States
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            {stateAnalysis.length > 0 && (
              <>
                <Card className="glass-effect border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-900">
                      <Award className="w-5 h-5 text-gold-500" />
                      Top Optimized States - {selectedEnergyType === 'all' ? 'All Energy Sources' : `${selectedEnergyType.charAt(0).toUpperCase() + selectedEnergyType.slice(1)} Energy`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stateAnalysis}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="state" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="score" fill="#10B981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>

                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={stateAnalysis}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="capacity"
                            label={({ state, percent }) => `${state} ${(percent * 100).toFixed(0)}%`}
                          >
                            {stateAnalysis.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-900">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      State-wise Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stateAnalysis.map((state, index) => (
                        <div key={state.state} className="p-4 bg-white/60 rounded-xl border border-white/30">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                index === 0 ? 'bg-green-500' :
                                index === 1 ? 'bg-blue-500' :
                                index === 2 ? 'bg-purple-500' :
                                index === 3 ? 'bg-orange-500' :
                                'bg-red-500'
                              }`}>
                                {index + 1}
                              </div>
                              <div>
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {state.state}
                                </h3>
                                <p className="text-sm text-slate-600">Optimization Score: {state.score}/100</p>
                              </div>
                            </div>
                            <Badge variant="secondary" className={
                              index === 0 ? 'bg-green-100 text-green-800' :
                              index === 1 ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }>
                              {index === 0 ? 'Best Choice' : index === 1 ? 'Good Option' : 'Viable'}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-yellow-500" />
                              <span className="text-slate-600">Capacity:</span>
                              <span className="font-medium">{state.capacity} MW</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-green-500" />
                              <span className="text-slate-600">Investment:</span>
                              <span className="font-medium">${state.investment}M</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-blue-500" />
                              <span className="text-slate-600">Projects:</span>
                              <span className="font-medium">{state.projects}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {React.createElement(getEnergyIcon(selectedEnergyType), { className: "w-4 h-4 text-purple-500" })}
                              <span className="text-slate-600">Score:</span>
                              <span className="font-medium">{state.score}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {stateAnalysis.length === 0 && (
              <Card className="glass-effect border-white/20">
                <CardContent className="p-12 text-center">
                  <Target className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Ready for Analysis</h3>
                  <p className="text-slate-600">
                    Select your energy source and optimization criteria, then click "Analyze States" to see the most optimized states for hydrogen plant development.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}