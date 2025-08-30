import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Wrench } from "lucide-react";

export default function AlertsPanel({ infrastructure }) {
  const getAlerts = () => {
    const alerts = [];
    
    infrastructure.forEach(item => {
      if (item.efficiency && item.efficiency < 75) {
        alerts.push({
          type: "warning",
          message: `${item.name} efficiency below 75%`,
          icon: AlertTriangle,
          color: "yellow"
        });
      }
      
      if (item.status === 'maintenance') {
        alerts.push({
          type: "info",
          message: `${item.name} under maintenance`,
          icon: Wrench,
          color: "blue"
        });
      }
      
      if (item.status === 'operational' && item.efficiency >= 90) {
        alerts.push({
          type: "success",
          message: `${item.name} performing optimally`,
          icon: CheckCircle,
          color: "green"
        });
      }
    });
    
    return alerts.slice(0, 5);
  };

  const alerts = getAlerts();

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
          {alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                {React.createElement(alert.icon, { className: `w-4 h-4 ${
                  alert.color === 'yellow' ? 'text-yellow-500' :
                  alert.color === 'blue' ? 'text-blue-500' :
                  alert.color === 'green' ? 'text-green-500' :
                  'text-gray-500'
                }` })}
                <div className="flex-1">
                  <p className="text-sm text-slate-700">{alert.message}</p>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    alert.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                    alert.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                    alert.color === 'green' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  {alert.type}
                </Badge>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-slate-600">All systems operational</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}