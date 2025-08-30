import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, Sun, Wind, Waves, Zap } from "lucide-react";

export default function OptimizationFilters({ params, setParams }) {
  const updateParam = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const updateNestedParam = (parent, key, value) => {
    setParams(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [key]: value }
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Basic Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="energy-source">Preferred Energy Source</Label>
            <Select
              value={params.preferredEnergySource}
              onValueChange={(value) => updateParam('preferredEnergySource', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select energy source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="solar">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-yellow-500" />
                    Solar Energy
                  </div>
                </SelectItem>
                <SelectItem value="wind">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-blue-500" />
                    Wind Energy
                  </div>
                </SelectItem>
                <SelectItem value="tidal">
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-cyan-500" />
                    Tidal Energy
                  </div>
                </SelectItem>
                <SelectItem value="mixed">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-500" />
                    Mixed Sources
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="capacity">Target Capacity (tonnes/day)</Label>
            <Input
              id="capacity"
              type="number"
              value={params.targetCapacity}
              onChange={(e) => updateParam('targetCapacity', parseInt(e.target.value))}
              placeholder="500"
            />
          </div>

          <div>
            <Label>Budget Range (USD)</Label>
            <div className="space-y-2">
              <Slider
                value={params.budgetRange}
                onValueChange={(value) => updateParam('budgetRange', value)}
                min={100000000}
                max={5000000000}
                step={50000000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-slate-600">
                <span>${(params.budgetRange[0] / 1000000).toFixed(0)}M</span>
                <span>${(params.budgetRange[1] / 1000000).toFixed(0)}M</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle>Priority Factors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(params.priorityFactors).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between mb-2">
                <Label className="capitalize">{key.replace('_', ' ')}</Label>
                <span className="text-sm font-medium">{value}%</span>
              </div>
              <Slider
                value={[value]}
                onValueChange={(newValue) => updateNestedParam('priorityFactors', key, newValue[0])}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle>Location Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Preferred State</Label>
            <Select
              value={params.location.state}
              onValueChange={(value) => updateNestedParam('location', 'state', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="gujarat">Gujarat</SelectItem>
                <SelectItem value="rajasthan">Rajasthan</SelectItem>
                <SelectItem value="tamil_nadu">Tamil Nadu</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
                <SelectItem value="maharashtra">Maharashtra</SelectItem>
                <SelectItem value="andhra_pradesh">Andhra Pradesh</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="coastal"
                checked={params.location.coastalPreference}
                onCheckedChange={(checked) => updateNestedParam('location', 'coastalPreference', checked)}
              />
              <label htmlFor="coastal" className="text-sm font-medium">
                Prefer coastal locations
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="infrastructure"
                checked={params.location.existingInfrastructure}
                onCheckedChange={(checked) => updateNestedParam('location', 'existingInfrastructure', checked)}
              />
              <label htmlFor="infrastructure" className="text-sm font-medium">
                Near existing infrastructure
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}