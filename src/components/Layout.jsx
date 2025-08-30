import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, BarChart3, Settings, Users, Zap, Bell, Search, Target } from "lucide-react";

const navigationItems = [
  { title: "Dashboard", url: "/Dashboard", icon: BarChart3, description: "Overview & Metrics" },
  { title: "Infrastructure Map", url: "/Map", icon: MapPin, description: "Interactive Mapping" },
  { title: "Plant Optimizer", url: "/Optimizer", icon: Settings, description: "Location Analysis" },
  { title: "Advanced Optimizer", url: "/PlantOptimizer", icon: Target, description: "State-wise Analysis" },
  { title: "Collaboration Hub", url: "/Collaboration", icon: Users, description: "Investments & Partners" },
  { title: "Analytics", url: "/Analytics", icon: Zap, description: "Performance Tracking" },
];

export default function Layout({ children }) {
  const location = useLocation();
  
  const publicPages = ["/Home", "/Login", "/Signup"];
  const isPublicPage = publicPages.includes(location.pathname) || location.pathname === "/";
  
  if (isPublicPage) {
    return children;
  }

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <div className="w-64 bg-white/90 backdrop-blur-sm border-r border-white/20 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-slate-900">HydroMap</h2>
              <p className="text-xs text-slate-600 font-medium">Green Infrastructure Platform</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/80 hover:shadow-lg ${
                  location.pathname === item.url 
                    ? 'bg-white/90 shadow-md border border-green-100' 
                    : 'hover:bg-white/60'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  location.pathname === item.url
                    ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {React.createElement(item.icon, { className: "w-4 h-4" })}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${
                    location.pathname === item.url ? 'text-slate-900' : 'text-slate-700'
                  }`}>
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-900 truncate">Energy Analyst</p>
              <p className="text-xs text-slate-500 truncate">Planning Team</p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/90 backdrop-blur-sm border-b border-white/20 px-6 py-4 md:hidden">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-900">HydroMap</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/80 transition-colors duration-200">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/80 transition-colors duration-200">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="min-h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}