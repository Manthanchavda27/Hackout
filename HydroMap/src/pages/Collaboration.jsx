import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Users, DollarSign, Building, MessageSquare, Plus, Search, Filter } from "lucide-react";

export default function Collaboration() {
  const [activeTab, setActiveTab] = useState('projects');

  const projects = [
    {
      id: 1,
      name: "Gujarat Mega Hydrogen Hub",
      description: "Large-scale green hydrogen production facility with 500 t/d capacity",
      funding_required: 1200000000,
      funding_raised: 750000000,
      investors: 15,
      status: "funding",
      location: "Kutch, Gujarat",
      timeline: "24 months",
      category: "Production"
    },
    {
      id: 2,
      name: "Rajasthan Wind-H2 Integration",
      description: "Wind-powered hydrogen production with integrated storage solutions",
      funding_required: 850000000,
      funding_raised: 520000000,
      investors: 12,
      status: "active",
      location: "Jaisalmer, Rajasthan",
      timeline: "18 months",
      category: "Production"
    },
    {
      id: 3,
      name: "Tamil Nadu Coastal Distribution",
      description: "Hydrogen distribution network for industrial and transport sectors",
      funding_required: 450000000,
      funding_raised: 180000000,
      investors: 8,
      status: "planning",
      location: "Chennai, Tamil Nadu",
      timeline: "30 months",
      category: "Infrastructure"
    }
  ];

  const investors = [
    {
      id: 1,
      name: "Green Energy Ventures",
      type: "VC Fund",
      focus: "Clean Energy",
      investment_range: "$50M - $200M",
      portfolio_size: 45,
      location: "Mumbai, India",
      status: "active"
    },
    {
      id: 2,
      name: "Sustainable Infrastructure Partners",
      type: "Private Equity",
      focus: "Infrastructure",
      investment_range: "$100M - $500M",
      portfolio_size: 28,
      location: "Singapore",
      status: "active"
    },
    {
      id: 3,
      name: "Climate Impact Fund",
      type: "Impact Fund",
      focus: "Climate Tech",
      investment_range: "$25M - $150M",
      portfolio_size: 62,
      location: "London, UK",
      status: "active"
    }
  ];

  const partners = [
    {
      id: 1,
      name: "TechnoHydrogen Solutions",
      type: "Technology Provider",
      expertise: "Electrolysis Systems",
      projects: 23,
      location: "Bangalore, India",
      rating: 4.8
    },
    {
      id: 2,
      name: "GreenBuild Engineering",
      type: "EPC Contractor",
      expertise: "Plant Construction",
      projects: 18,
      location: "Pune, India",
      rating: 4.6
    },
    {
      id: 3,
      name: "HydroLogistics Corp",
      type: "Logistics Partner",
      expertise: "H2 Transportation",
      projects: 31,
      location: "Delhi, India",
      rating: 4.7
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'funding': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFundingProgress = (raised, required) => {
    return Math.round((raised / required) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Collaboration Hub
            </h1>
            <p className="text-slate-600 text-lg">
              Connect with investors, partners, and projects in the hydrogen ecosystem
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Submit Project
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900">127</div>
              <div className="text-sm text-slate-600">Active Projects</div>
            </CardContent>
          </Card>
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900">$4.2B</div>
              <div className="text-sm text-slate-600">Total Investment</div>
            </CardContent>
          </Card>
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900">89</div>
              <div className="text-sm text-slate-600">Active Investors</div>
            </CardContent>
          </Card>
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900">156</div>
              <div className="text-sm text-slate-600">Active Partners</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/60 p-1 rounded-xl">
          {[
            { id: 'projects', label: 'Projects', icon: Building },
            { id: 'investors', label: 'Investors', icon: DollarSign },
            { id: 'partners', label: 'Partners', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white shadow-md text-slate-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {React.createElement(tab.icon, { className: "w-4 h-4" })}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'projects' && (
          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="glass-effect border-white/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-slate-900">{project.name}</h3>
                        <Badge variant="secondary" className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Badge variant="outline">{project.category}</Badge>
                      </div>
                      <p className="text-slate-600 mb-4">{project.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Location:</span>
                          <p className="font-medium">{project.location}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Timeline:</span>
                          <p className="font-medium">{project.timeline}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Investors:</span>
                          <p className="font-medium">{project.investors} partners</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Funding:</span>
                          <p className="font-medium">{getFundingProgress(project.funding_raised, project.funding_required)}% raised</p>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-80 space-y-4">
                      <div className="text-center p-4 bg-white/50 rounded-lg">
                        <div className="text-2xl font-bold text-slate-900">
                          ${(project.funding_required / 1000000).toFixed(0)}M
                        </div>
                        <div className="text-sm text-slate-600">Total Required</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${getFundingProgress(project.funding_raised, project.funding_required)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          ${(project.funding_raised / 1000000).toFixed(0)}M raised
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          View Details
                        </Button>
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white">
                          Invest Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'investors' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investors.map((investor) => (
              <Card key={investor.id} className="glass-effect border-white/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{investor.name}</h3>
                      <p className="text-sm text-slate-600">{investor.type}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Focus:</span>
                      <span className="font-medium">{investor.focus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Investment Range:</span>
                      <span className="font-medium">{investor.investment_range}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Portfolio:</span>
                      <span className="font-medium">{investor.portfolio_size} companies</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Location:</span>
                      <span className="font-medium">{investor.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Profile
                    </Button>
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white">
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'partners' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <Card key={partner.id} className="glass-effect border-white/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{partner.name}</h3>
                      <p className="text-sm text-slate-600">{partner.type}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Expertise:</span>
                      <span className="font-medium">{partner.expertise}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Projects:</span>
                      <span className="font-medium">{partner.projects} completed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Location:</span>
                      <span className="font-medium">{partner.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Rating:</span>
                      <div className="flex items-center">
                        <span className="font-medium">{partner.rating}</span>
                        <div className="flex ml-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xs ${i < Math.floor(partner.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Portfolio
                    </Button>
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white">
                      Partner
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}