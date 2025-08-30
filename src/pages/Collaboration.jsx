import React, { useState, useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Users, DollarSign, TrendingUp, MapPin, Calendar, User, Eye, UserPlus, Briefcase, Download, X } from "lucide-react";
import { CurrencyContext } from "./Settings";

export default function Collaboration() {
  const { currencySymbol, formatCurrency } = useContext(CurrencyContext);
  const [myInvestments, setMyInvestments] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [investAmount, setInvestAmount] = useState('');

  const projects = [
    {
      id: 1,
      title: "Gujarat Green Hydrogen Hub",
      location: "Kutch, Gujarat",
      capacity: "500 MW",
      targetFunding: 2500000000,
      currentFunding: 1800000000,
      investors: 12,
      roi: "18%",
      timeline: "24 months",
      status: "Active",
      description: "Large-scale green hydrogen production facility powered by solar and wind energy.",
      details: {
        technology: "Electrolysis",
        energySource: "Solar + Wind",
        waterSource: "Desalination",
        offtaker: "IOCL, BPCL",
        permits: "Approved"
      }
    },
    {
      id: 2,
      title: "Rajasthan Solar H2 Plant",
      location: "Jodhpur, Rajasthan",
      capacity: "300 MW",
      targetFunding: 1500000000,
      currentFunding: 900000000,
      investors: 8,
      roi: "22%",
      timeline: "18 months",
      status: "Funding",
      description: "Solar-powered hydrogen production with integrated storage facility.",
      details: {
        technology: "PEM Electrolysis",
        energySource: "Solar",
        waterSource: "Groundwater",
        offtaker: "NTPC, Adani",
        permits: "In Progress"
      }
    },
    {
      id: 3,
      title: "Tamil Nadu Wind H2 Project",
      location: "Coimbatore, Tamil Nadu",
      capacity: "400 MW",
      targetFunding: 2000000000,
      currentFunding: 1200000000,
      investors: 15,
      roi: "20%",
      timeline: "30 months",
      status: "Planning",
      description: "Wind-powered green hydrogen production for industrial applications.",
      details: {
        technology: "Alkaline Electrolysis",
        energySource: "Wind",
        waterSource: "Municipal",
        offtaker: "Tata Steel, JSW",
        permits: "Applied"
      }
    }
  ];

  const investors = [
    {
      id: 1,
      name: "Adani Green Energy",
      type: "Corporate",
      portfolio: 45,
      totalInvestment: 12500000000,
      expertise: "Renewable Energy",
      location: "Ahmedabad, India",
      connected: false
    },
    {
      id: 2,
      name: "Reliance New Energy",
      type: "Corporate",
      portfolio: 32,
      totalInvestment: 18000000000,
      expertise: "Energy Transition",
      location: "Mumbai, India",
      connected: true
    },
    {
      id: 3,
      name: "NTPC Renewable",
      type: "PSU",
      portfolio: 28,
      totalInvestment: 8500000000,
      expertise: "Power Generation",
      location: "New Delhi, India",
      connected: false
    }
  ];



  const handleInvest = (project) => {
    setSelectedProject(project);
    setShowInvestModal(true);
  };

  const confirmInvestment = () => {
    if (investAmount && selectedProject) {
      const investment = {
        id: Date.now(),
        projectId: selectedProject.id,
        projectTitle: selectedProject.title,
        amount: parseFloat(investAmount),
        date: new Date().toLocaleDateString(),
        status: "Active"
      };
      
      setMyInvestments([...myInvestments, investment]);
      setShowInvestModal(false);
      setInvestAmount('');
      alert(`Successfully invested ${currencySymbol}${investAmount} in ${selectedProject.title}`);
    }
  };

  const connectWithInvestor = (investor) => {
    if (!connections.find(c => c.id === investor.id)) {
      setConnections([...connections, investor]);
      alert(`Connected with ${investor.name}`);
    }
  };

  const downloadReport = () => {
    const reportData = {
      investments: myInvestments,
      connections: connections.length,
      totalInvested: formatCurrency(totalInvested)
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'investment-report.json';
    link.click();
  };

  const totalInvested = myInvestments.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Collaboration Hub
            </h1>
            <p className="text-slate-600 text-lg">Connect, invest, and collaborate on hydrogen projects</p>
          </div>
          <Button onClick={downloadReport} className="bg-green-600 hover:bg-green-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>

        {/* My Investment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Invested</p>
                  <p className="text-2xl font-bold text-green-600">{currencySymbol}{formatCurrency(totalInvested)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Active Investments</p>
                  <p className="text-2xl font-bold text-blue-600">{myInvestments.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Connections</p>
                  <p className="text-2xl font-bold text-purple-600">{connections.length}</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Avg ROI</p>
                  <p className="text-2xl font-bold text-orange-600">20%</p>
                </div>
                <Briefcase className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Investments */}
        {myInvestments.length > 0 && (
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Briefcase className="w-5 h-5 text-green-500" />
                My Investments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myInvestments.map((investment) => (
                  <div key={investment.id} className="p-4 bg-white/60 rounded-xl border border-white/30 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-slate-900">{investment.projectTitle}</h3>
                      <p className="text-sm text-slate-600">Invested: {currencySymbol}{formatCurrency(investment.amount)} on {investment.date}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{investment.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Connected Investors */}
        {connections.length > 0 && (
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Users className="w-5 h-5 text-blue-500" />
                My Connections ({connections.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connections.map((connection) => (
                  <div key={connection.id} className="p-4 bg-white/60 rounded-xl border border-white/30">
                    <h3 className="font-semibold text-slate-900">{connection.name}</h3>
                    <p className="text-sm text-slate-600">{connection.expertise}</p>
                    <p className="text-xs text-slate-500">{connection.location}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Investment Opportunities */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Investment Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {projects.map((project) => (
                <div key={project.id} className="p-6 bg-white/60 rounded-xl border border-white/30">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {project.timeline}
                        </span>
                      </div>
                      <p className="text-slate-700 mb-4">{project.description}</p>
                    </div>
                    <Badge className={
                      project.status === 'Active' ? 'bg-green-100 text-green-800' :
                      project.status === 'Funding' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }>
                      {project.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-slate-600">Capacity</p>
                      <p className="font-semibold">{project.capacity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Target Funding</p>
                      <p className="font-semibold">{currencySymbol}{formatCurrency(project.targetFunding)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">ROI</p>
                      <p className="font-semibold text-green-600">{project.roi}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Investors</p>
                      <p className="font-semibold">{project.investors}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Funding Progress</span>
                      <span>{Math.round((project.currentFunding / project.targetFunding) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${(project.currentFunding / project.targetFunding) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleInvest(project)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Invest Now
                    </Button>
                    <Button 
                      onClick={() => setSelectedProject(project)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investor Network */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Users className="w-5 h-5 text-purple-500" />
              Investor Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {investors.map((investor) => (
                <div key={investor.id} className="p-4 bg-white/60 rounded-xl border border-white/30 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {investor.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{investor.name}</h3>
                      <p className="text-sm text-slate-600">{investor.expertise} • {investor.type}</p>
                      <p className="text-xs text-slate-500">{investor.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm text-slate-600">Portfolio: {investor.portfolio} projects</p>
                      <p className="text-sm font-semibold">{currencySymbol}{formatCurrency(investor.totalInvestment)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => alert(`Viewing ${investor.name}'s profile`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Profile
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => connectWithInvestor(investor)}
                        disabled={investor.connected || connections.find(c => c.id === investor.id)}
                        className="bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
                      >
                        <UserPlus className="w-4 h-4 mr-1" />
                        {investor.connected || connections.find(c => c.id === investor.id) ? 'Connected' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Modal */}
      {showInvestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Invest in {selectedProject?.title}</h3>
              <Button onClick={() => setShowInvestModal(false)} className="p-1">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Investment Amount ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter amount"
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={confirmInvestment}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Confirm Investment
                </Button>
                <Button 
                  onClick={() => setShowInvestModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && !showInvestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{selectedProject.title}</h3>
              <Button onClick={() => setSelectedProject(null)} className="p-1">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <p className="text-slate-700">{selectedProject.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Project Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Technology:</span> {selectedProject.details.technology}</p>
                    <p><span className="font-medium">Energy Source:</span> {selectedProject.details.energySource}</p>
                    <p><span className="font-medium">Water Source:</span> {selectedProject.details.waterSource}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Commercial Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Offtaker:</span> {selectedProject.details.offtaker}</p>
                    <p><span className="font-medium">Permits:</span> {selectedProject.details.permits}</p>
                    <p><span className="font-medium">Timeline:</span> {selectedProject.timeline}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}