import { useState } from "react";
import { Layout } from "@/components/Layout";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { TrustScore } from "@/components/TrustScore";
import { NFTCard } from "@/components/NFTCard";
import { SearchAndFilter, FilterOptions } from "@/components/SearchAndFilter";
import { Activity, FileText, Award, Plus, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    dateRange: "all",
    scoreRange: "all",
    status: "all",
    sortBy: "date",
    sortOrder: "desc"
  });
  const recentAudits = [
    {
      id: "audit-001",
      name: "DeFi Lending Protocol",
      status: "completed",
      score: 92,
      date: "2024-01-15",
      vulnerabilities: 2
    },
    {
      id: "audit-002", 
      name: "NFT Marketplace Contract",
      status: "processing",
      score: null,
      date: "2024-01-14",
      vulnerabilities: null
    },
    {
      id: "audit-003",
      name: "Token Staking Contract",
      status: "completed",
      score: 78,
      date: "2024-01-12",
      vulnerabilities: 5
    }
  ];

  const nfts = [
    {
      id: "nft-001",
      name: "DeFi Lending Protocol PoI",
      score: 92,
      mintDate: "2024-01-15",
      image: "🛡️",
      rarity: "Epic" as const,
      blockchain: "NEAR",
      attributes: [
        { trait_type: "Security Score", value: 92 },
        { trait_type: "Gas Efficiency", value: "High" },
        { trait_type: "Audit Date", value: "2024-01-15" }
      ]
    },
    {
      id: "nft-003",
      name: "Token Staking Contract PoI", 
      score: 78,
      mintDate: "2024-01-12",
      image: "🔒",
      rarity: "Rare" as const,
      blockchain: "NEAR",
      attributes: [
        { trait_type: "Security Score", value: 78 },
        { trait_type: "Gas Efficiency", value: "Medium" },
        { trait_type: "Audit Date", value: "2024-01-12" }
      ]
    }
  ];

  const stats = [
    { label: "Total Audits", value: "23", icon: FileText, color: "text-primary" },
    { label: "Average Score", value: "85", icon: Activity, color: "text-secondary" },
    { label: "NFTs Earned", value: "18", icon: Award, color: "text-accent" },
    { label: "Gas Saved", value: "45K", icon: CheckCircle, color: "text-success" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-secondary" />;
      case "processing": return <Clock className="h-4 w-4 text-warning animate-pulse" />;
      case "failed": return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "processing": return "Processing...";
      case "failed": return "Failed";
      default: return "Unknown";
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Monitor your audits and security achievements</p>
          </div>
          <Link to="/submit-audit">
            <CyberButton glow className="group">
              <Plus className="mr-2 h-4 w-4" />
              New Audit
            </CyberButton>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <GlassCard key={index} className="text-center animate-float" style={{animationDelay: `${index * 0.1}s`}}>
              <GlassCardContent className="p-6">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Audits */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter */}
            <SearchAndFilter
              filters={filters}
              onFiltersChange={setFilters}
              resultCount={recentAudits.length}
              placeholder="Search your audits..."
            />
            
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Audits
                </GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="space-y-4">
                  {recentAudits.map((audit) => (
                    <div key={audit.id} className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border/50">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(audit.status)}
                          <span className="text-sm font-medium">{getStatusText(audit.status)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary">{audit.name}</h4>
                          <p className="text-sm text-muted-foreground">{audit.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {audit.score !== null ? (
                          <div className="text-lg font-bold text-secondary">{audit.score}/100</div>
                        ) : (
                          <div className="text-sm text-muted-foreground">Analyzing...</div>
                        )}
                        {audit.vulnerabilities !== null && (
                          <div className="text-xs text-muted-foreground">
                            {audit.vulnerabilities} issues found
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trust Score Overview */}
            <div className="flex justify-center">
              <TrustScore score={85} size="lg" />
            </div>

            {/* NFT Collection */}
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Proof of Integrity NFTs
                </GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="grid grid-cols-1 gap-4">
                  {nfts.map((nft) => (
                    <div key={nft.id} className="flex justify-center">
                      <NFTCard nft={nft} size="sm" />
                    </div>
                  ))}
                  <CyberButton variant="outline" className="w-full">
                    View All NFTs
                  </CyberButton>
                </div>
              </GlassCardContent>
            </GlassCard>

            {/* Protocol Stats */}
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Protocol Stats
                </GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Audits Today</span>
                    <span className="font-semibold text-primary">247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Value Secured</span>
                    <span className="font-semibold text-secondary">$2.4M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Auditors</span>
                    <span className="font-semibold text-accent">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="font-semibold text-success">98.7%</span>
                  </div>
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;