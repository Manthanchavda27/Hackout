import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function MapFilters({ filters, setFilters }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-slate-900 flex items-center gap-2">
        <Filter className="w-4 h-4" />
        Filters
      </h3>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">Asset Type</label>
          <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="plant">Production Plants</SelectItem>
              <SelectItem value="storage">Storage Facilities</SelectItem>
              <SelectItem value="pipeline">Pipelines</SelectItem>
              <SelectItem value="distribution_hub">Distribution Hubs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">Status</label>
          <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="operational">Operational</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="under_construction">Under Construction</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">Energy Source</label>
          <Select value={filters.energy_source} onValueChange={(value) => setFilters({...filters, energy_source: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select energy source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="solar">Solar</SelectItem>
              <SelectItem value="wind">Wind</SelectItem>
              <SelectItem value="tidal">Tidal</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}