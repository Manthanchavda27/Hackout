import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, BarChart3, Settings as SettingsIcon, Users, Zap, Bell, Search, Target, Factory, TrendingUp, LogOut, Crown } from "lucide-react";
import { useUser } from "../contexts/UserContext";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3, description: "Overview & Metrics" },
  { title: "Infrastructure Map", url: "/map", icon: MapPin, description: "Interactive Mapping" },
  { title: "Factory Visualization", url: "/factory", icon: Factory, description: "Real-time Production" },
  { title: "Investment Planning", url: "/investment-map", icon: TrendingUp, description: "Strategic Planning" },
  { title: "Plant Optimizer", url: "/optimizer", icon: SettingsIcon, description: "Location Analysis" },
  { title: "Advanced Optimizer", url: "/plant-optimizer", icon: Target, description: "State-wise Analysis" },
  { title: "Collaboration Hub", url: "/collaboration", icon: Users, description: "Investments & Partners" },
  { title: "Analytics", url: "/analytics", icon: Zap, description: "Performance Tracking" },
  { title: "Settings", url: "/settings", icon: SettingsIcon, description: "Account & Preferences" },
];

export default function Layout({ children }) {
  const location = useLocation();
  const { user, logout } = useUser();
  
  const publicPages = ["/", "/home", "/login", "/signup"];
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
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold relative">
              {user?.name?.charAt(0) || 'U'}
              {user?.isCreator && (
                <Crown className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-900 truncate">
                {user?.name || 'Energy Analyst'}
                {user?.isCreator && <span className="text-yellow-600 ml-1">👑</span>}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.role || (user?.isCreator ? 'Creator & Founder' : 'Planning Team')}
              </p>
            </div>
            <button 
              onClick={logout}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-200 group"
              title="Logout"
            >
              <LogOut className="w-4 h-4 text-slate-500 group-hover:text-red-600" />
            </button>
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