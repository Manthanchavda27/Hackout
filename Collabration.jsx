import React, { useState, useEffect } from "react";
import { Investment } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Building2,
  Search,
  Filter,
  Plus,
  Mail,
  MapPin,
  Calendar,
  Target
} from "lucide-react";

import InvestmentCard from "../components/collaboration/InvestmentCard";
import InvestorProfiles from "../components/collaboration/InvestorProfiles";
import ProjectSubmission from "../components/collaboration/ProjectSubmission";
import FundingStats from "../components/collaboration/FundingStats";

export default function CollaborationPage() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  useEffect(() => {
    loadInvestments();
  }, []);

  const loadInvestments = async () => {
    try {
      const data = await Investment.list("-created_date", 50);
      setInvestments(data);
    } catch (error) {
      console.error("Error loading investments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInvestments = investments.filter(investment => {
    const matchesSearch = investment.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investment.investor_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || investment.project_type === filterType;
    const matchesStatus = filterStatus === "all" || investment.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTotalFunding = () => {
    return investments.reduce((sum, inv) => sum + (inv.amount_committed || 0), 0);
  };

  const getSeekingFunding = () => {
    return investments
      .filter(inv => inv.status === 'seeking_investors')
      .reduce((sum, inv) => sum + (inv.amount_required - (inv.amount_committed || 0)), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Collaboration Hub
            </h1>
            <p className="text-slate-600 text-lg">
              Connect investors, developers, and partners in the hydrogen ecosystem
            </p>
          </div>
          
          <Button 
            onClick={() => setShowSubmissionForm(true)}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Submit Project
          </Button>
        </div>

        {/* Funding Stats */}
        <FundingStats 
          totalFunding={getTotalFunding()}
          seekingFunding={getSeekingFunding()}
          totalProjects={investments.length}
        />

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Search</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Project Type</label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="storage">Storage</SelectItem>
                      <SelectItem value="distribution">Distribution</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Status</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="seeking_investors">Seeking Investors</SelectItem>
                      <SelectItem value="funded">Funded</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <InvestorProfiles />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Investment Opportunities */}
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  Investment Opportunities ({filteredInvestments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    Array(3).fill(0).map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-32 bg-gray-200 rounded-lg"></div>
                      </div>
                    ))
                  ) : filteredInvestments.length > 0 ? (
                    filteredInvestments.map((investment) => (
                      <InvestmentCard 
                        key={investment.id} 
                        investment={investment}
                        onContact={() => {}} 
                      />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Building2 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-700 mb-2">
                        No projects match your criteria
                      </h3>
                      <p className="text-slate-600">
                        Try adjusting your filters or search terms
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Project Submission Modal */}
        {showSubmissionForm && (
          <ProjectSubmission onClose={() => setShowSubmissionForm(false)} />
        )}
      </div>
    </div>
  );
}