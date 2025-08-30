import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
import { 
  MapPin, 
  BarChart3, 
  Settings, 
  Users, 
  Zap,
  Menu,
  Bell,
  Search
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: BarChart3,
    description: "Overview & Metrics"
  },
  {
    title: "Infrastructure Map",
    url: createPageUrl("Map"),
    icon: MapPin,
    description: "Interactive Mapping"
  },
  {
    title: "Plant Optimizer",
    url: createPageUrl("Optimizer"),
    icon: Settings,
    description: "Location Analysis"
  },
  {
    title: "Collaboration Hub",
    url: createPageUrl("Collaboration"),
    icon: Users,
    description: "Investments & Partners"
  },
  {
    title: "Analytics",
    url: createPageUrl("Analytics"),
    icon: Zap,
    description: "Performance Tracking"
  },
];

export default function Layout({ children }) {
  const location = useLocation();
  
  // Don't show layout for public pages
  const publicPages = ["/Home", "/Login", "/Signup"];
  const isPublicPage = publicPages.includes(location.pathname) || location.pathname === "/";
  
  if (isPublicPage) {
    return children;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
        <style>{`
          :root {
            --hydrogen-primary: #10B981;
            --hydrogen-secondary: #3B82F6;
            --hydrogen-accent: #06B6D4;
            --hydrogen-dark: #0F172A;
            --hydrogen-light: #F8FAFC;
          }
          
          .hydrogen-gradient {
            background: linear-gradient(135deg, var(--hydrogen-primary), var(--hydrogen-secondary));
          }
          
          .hydrogen-glow {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          
          .glass-effect {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
        `}</style>
        
        <Sidebar className="border-r border-white/20 glass-effect">
          <SidebarHeader className="border-b border-white/10 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 hydrogen-gradient rounded-xl flex items-center justify-center hydrogen-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-slate-900">HydroMap</h2>
                <p className="text-xs text-slate-600 font-medium">Green Infrastructure Platform</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`group relative overflow-hidden rounded-xl p-4 transition-all duration-300 hover:bg-white/80 hover:shadow-lg ${
                          location.pathname === item.url 
                            ? 'bg-white/90 shadow-md border border-green-100' 
                            : 'hover:bg-white/60'
                        }`}
                      >
                        <Link to={item.url} className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg transition-all duration-300 ${
                            location.pathname === item.url
                              ? 'hydrogen-gradient text-white'
                              : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                          }`}>
                            {React.createElement(item.icon, { className: "w-4 h-4" })}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-semibold text-sm ${
                              location.pathname === item.url ? 'text-slate-900' : 'text-slate-700'
                            }`}>
                              {item.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-8">
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                Quick Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="p-4 bg-white/60 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Active Plants</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">47</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Total Capacity</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">2,340 t/d</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Investments</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">$2.8B</Badge>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                U
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-slate-900 truncate">Energy Analyst</p>
                <p className="text-xs text-slate-500 truncate">Planning Team</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation Bar */}
          <header className="glass-effect border-b border-white/20 px-6 py-4 md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-white/80 p-2 rounded-lg transition-colors duration-200" />
                <h1 className="text-xl font-bold text-slate-900">HydroMap</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="hover:bg-white/80">
                  <Search className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-white/80">
                  <Bell className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="min-h-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}