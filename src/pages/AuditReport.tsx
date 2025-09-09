import { Layout } from "@/components/Layout";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { TrustScore } from "@/components/TrustScore";
import { CodeEditor } from "@/components/CodeEditor";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  Award, 
  Download, 
  Share,
  ExternalLink,
  Code2,
  Lightbulb,
  TrendingUp
} from "lucide-react";
import { useParams } from "react-router-dom";

const AuditReport = () => {
  const { id } = useParams();
  
  // Mock data - in real app, this would be fetched based on audit ID
  const auditData = {
    id: id || "audit-new",
    projectName: "DeFi Lending Protocol",
    score: 92,
    status: "completed",
    date: "2024-01-15",
    vulnerabilities: [
      {
        id: 1,
        severity: "High",
        title: "Reentrancy Vulnerability",
        description: "The withdraw function is susceptible to reentrancy attacks. The external call should be made after updating the internal state.",
        line: 45,
        recommendation: "Use the checks-effects-interactions pattern or implement a reentrancy guard."
      },
      {
        id: 2,
        severity: "Medium", 
        title: "Unchecked Return Value",
        description: "The transfer function return value is not checked, which could lead to silent failures.",
        line: 78,
        recommendation: "Always check return values of external calls and handle failures appropriately."
      },
      {
        id: 3,
        severity: "Low",
        title: "Missing Event Emission",
        description: "Important state changes should emit events for transparency and monitoring.",
        line: 120,
        recommendation: "Add event emissions for critical operations like deposits and withdrawals."
      }
    ],
    gasOptimizations: [
      {
        id: 1,
        title: "Loop Optimization",
        description: "The loop in calculateInterest can be optimized to reduce gas consumption.",
        currentGas: "45,000",
        optimizedGas: "32,000",
        savings: "28.9%"
      },
      {
        id: 2,
        title: "Storage Optimization",
        description: "Pack struct variables to reduce storage slots.",
        currentGas: "20,000",
        optimizedGas: "15,000", 
        savings: "25%"
      }
    ],
    codeToIntentMatch: 95,
    originalCode: `use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, AccountId, Balance, Promise};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct LendingContract {
    pub balances: std::collections::HashMap<AccountId, Balance>,
    pub total_supply: Balance,
}

impl Default for LendingContract {
    fn default() -> Self {
        Self {
            balances: std::collections::HashMap::new(),
            total_supply: 0,
        }
    }
}

#[near_bindgen]
impl LendingContract {
    pub fn deposit(&mut self) {
        let account_id = env::predecessor_account_id();
        let amount = env::attached_deposit();
        
        let balance = self.balances.get(&account_id).unwrap_or(&0);
        self.balances.insert(account_id, balance + amount);
        self.total_supply += amount;
    }
    
    pub fn withdraw(&mut self, amount: Balance) {
        let account_id = env::predecessor_account_id();
        let balance = self.balances.get(&account_id).unwrap_or(&0);
        
        assert!(balance >= &amount, "Insufficient balance");
        
        self.balances.insert(account_id.clone(), balance - amount);
        self.total_supply -= amount;
        
        Promise::new(account_id).transfer(amount);
    }
}`
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high": return "bg-destructive/20 text-destructive border-destructive/30";
      case "medium": return "bg-warning/20 text-warning border-warning/30";
      case "low": return "bg-accent/20 text-accent border-accent/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high": return <AlertTriangle className="h-4 w-4" />;
      case "medium": return <Zap className="h-4 w-4" />;
      case "low": return <CheckCircle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Audit Report
            </h1>
            <p className="text-muted-foreground">{auditData.projectName} • {auditData.date}</p>
          </div>
          <div className="flex gap-3">
            <CyberButton variant="outline">
              <Share className="mr-2 h-4 w-4" />
              Share
            </CyberButton>
            <CyberButton variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </CyberButton>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trust Score Summary */}
            <GlassCard glow>
              <GlassCardHeader>
                <GlassCardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Analysis Summary
                </GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{auditData.score}/100</div>
                    <p className="text-sm text-muted-foreground">Trust Score</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-warning mb-2">{auditData.vulnerabilities.length}</div>
                    <p className="text-sm text-muted-foreground">Issues Found</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary mb-2">{auditData.codeToIntentMatch}%</div>
                    <p className="text-sm text-muted-foreground">Intent Match</p>
                  </div>
                </div>
              </GlassCardContent>
            </GlassCard>

            {/* Vulnerabilities */}
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Security Vulnerabilities
                </GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="space-y-4">
                  {auditData.vulnerabilities.map((vuln) => (
                    <div key={vuln.id} className="p-4 bg-card/50 rounded-lg border border-border/50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getSeverityIcon(vuln.severity)}
                          <h4 className="font-semibold text-primary">{vuln.title}</h4>
                        </div>
                        <Badge className={getSeverityColor(vuln.severity)}>
                          {vuln.severity}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{vuln.description}</p>
                      <div className="text-sm">
                        <span className="text-accent">Line {vuln.line}</span>
                        <span className="mx-2">•</span>
                        <span className="text-secondary">Recommendation:</span> {vuln.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCardContent>
            </GlassCard>

            {/* Gas Optimization */}
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Gas Optimization Analysis
                </GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="space-y-4">
                  {auditData.gasOptimizations.map((opt) => (
                    <div key={opt.id} className="p-4 bg-card/50 rounded-lg border border-border/50">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-primary">{opt.title}</h4>
                        <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                          -{opt.savings}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{opt.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Current:</span>
                          <span className="ml-2 font-mono">{opt.currentGas} gas</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Optimized:</span>
                          <span className="ml-2 font-mono text-secondary">{opt.optimizedGas} gas</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCardContent>
            </GlassCard>

            {/* Code to Intent Match */}
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Code-to-Intent Verification
                </GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Intent Match Score</span>
                    <span className="text-sm font-semibold text-secondary">{auditData.codeToIntentMatch}%</span>
                  </div>
                  <Progress value={auditData.codeToIntentMatch} className="h-2" />
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-secondary" />
                      <span className="font-semibold text-secondary">AI Analysis</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The code closely matches the intended DeFi lending functionality. The implementation correctly 
                      handles deposits and withdrawals, though some security considerations were identified.
                    </p>
                  </div>
                </div>
              </GlassCardContent>
            </GlassCard>

            {/* Source Code */}
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Audited Source Code
                </GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <CodeEditor
                  value={auditData.originalCode}
                  onChange={() => {}}
                  readOnly={true}
                />
              </GlassCardContent>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trust Score Visualization */}
            <div className="flex justify-center">
              <TrustScore score={auditData.score} size="lg" />
            </div>

            {/* Proof of Integrity NFT */}
            <GlassCard glow>
              <GlassCardHeader>
                <GlassCardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Proof of Integrity NFT
                </GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="text-center">
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-glass-border/30 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Shield className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse-glow" />
                    <div className="text-lg font-bold text-primary">Trust Score: {auditData.score}</div>
                    <div className="text-sm text-muted-foreground">{auditData.projectName}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <strong>Token ID:</strong> #SS-{auditData.id.substring(6)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <strong>Minted:</strong> {auditData.date}
                  </div>
                  <CyberButton className="w-full" glow>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View on NEAR
                  </CyberButton>
                </div>
              </GlassCardContent>
            </GlassCard>

            {/* Quick Stats */}
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle>Audit Summary</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">High Severity</span>
                    <span className="font-semibold text-destructive">
                      {auditData.vulnerabilities.filter(v => v.severity === "High").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Medium Severity</span>
                    <span className="font-semibold text-warning">
                      {auditData.vulnerabilities.filter(v => v.severity === "Medium").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Low Severity</span>
                    <span className="font-semibold text-accent">
                      {auditData.vulnerabilities.filter(v => v.severity === "Low").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Gas Optimizations</span>
                    <span className="font-semibold text-secondary">{auditData.gasOptimizations.length}</span>
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

export default AuditReport;