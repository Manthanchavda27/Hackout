import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Layers } from "lucide-react";

export default function LayerToggle({ activeLayers, setActiveLayers }) {
  const handleLayerToggle = (layer) => {
    setActiveLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-slate-900 flex items-center gap-2">
        <Layers className="w-4 h-4" />
        Map Layers
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="infrastructure"
            checked={activeLayers.infrastructure}
            onCheckedChange={() => handleLayerToggle('infrastructure')}
          />
          <label htmlFor="infrastructure" className="text-sm font-medium text-slate-700">
            Infrastructure Assets
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="energy_sources"
            checked={activeLayers.energy_sources}
            onCheckedChange={() => handleLayerToggle('energy_sources')}
          />
          <label htmlFor="energy_sources" className="text-sm font-medium text-slate-700">
            Energy Resources
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="demand_centers"
            checked={activeLayers.demand_centers}
            onCheckedChange={() => handleLayerToggle('demand_centers')}
          />
          <label htmlFor="demand_centers" className="text-sm font-medium text-slate-700">
            Demand Centers
          </label>
        </div>
      </div>
    </div>
  );
}