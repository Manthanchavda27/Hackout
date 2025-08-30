import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertTriangle } from "lucide-react";

export default function AlertsPanel({ infrastructure }) {
  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Maintenance Due",
      message: "Gujarat Plant - Scheduled maintenance in 2 days",
      color: "yellow"
    },
    {
      id: 2,
      type: "success",
      title: "Efficiency Improved",
      message: "Rajasthan Plant - 3% efficiency gain this week",
      color: "green"
    },
    {
      id: 3,
      type: "info",
      title: "New Investment",
      message: "$50M funding secured for Tamil Nadu project",
      color: "blue"
    }
  ];

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          System Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`flex items-center gap-3 p-3 bg-${alert.color}-50 rounded-lg`}>
              <div className={`w-2 h-2 bg-${alert.color}-500 rounded-full`}></div>
              <div>
                <p className="text-sm font-medium text-slate-900">{alert.title}</p>
                <p className="text-xs text-slate-600">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}