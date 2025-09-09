import { Layout } from "@/components/Layout";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { Shield, Zap, Award, ArrowRight, Code2, Eye, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Code2,
      title: "AI-Powered Analysis",
      description: "Advanced AI auditors inspect your vibe-coded smart contracts for vulnerabilities and gas optimization opportunities."
    },
    {
      icon: Eye,
      title: "Code-to-Intent Verification",
      description: "Ensure your generated code matches your original intent with our sophisticated matching algorithms."
    },
    {
      icon: Award,
      title: "Proof of Integrity NFTs",
      description: "Receive immutable NFT certificates that prove your smart contract's security and authenticity."
    }
  ];

  const stats = [
    { label: "Contracts Audited", value: "12,847" },
    { label: "Vulnerabilities Found", value: "3,291" },
    { label: "Gas Saved", value: "2.3M" },
    { label: "NFTs Minted", value: "8,562" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-8">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Next-Gen Smart Contract Security</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
              Trust in Code.<br />
              Powered by AI.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              SyntaxSentinel uses advanced AI to audit your vibe-coded smart contracts, ensuring security, 
              gas efficiency, and intent verification. Get your Proof of Integrity NFT today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/submit-audit">
                <CyberButton size="lg" glow className="group">
                  Start Audit
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </CyberButton>
              </Link>
              <Link to="/dashboard">
                <CyberButton variant="outline" size="lg">
                  View Dashboard
                </CyberButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <GlassCard key={index} className="text-center animate-float" style={{animationDelay: `${index * 0.5}s`}}>
                <GlassCardContent className="p-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </GlassCardContent>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Revolutionary Security Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of smart contract auditing with our cutting-edge AI technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <GlassCard key={index} glow animated className="group hover:scale-105 transition-transform duration-300">
                <GlassCardHeader>
                  <div className="p-3 bg-primary/20 rounded-lg w-fit mb-4 group-hover:glow-primary transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <GlassCardTitle className="text-xl">{feature.title}</GlassCardTitle>
                </GlassCardHeader>
                <GlassCardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </GlassCardContent>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <GlassCard glow className="text-center">
            <GlassCardContent className="p-12">
              <Zap className="h-16 w-16 text-secondary mx-auto mb-6 animate-pulse-glow" />
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
                Ready to Secure Your Smart Contract?
              </h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of developers who trust SyntaxSentinel to keep their code secure.
                Get your AI-powered audit and Proof of Integrity NFT in minutes.
              </p>
              <Link to="/submit-audit">
                <CyberButton size="lg" glow className="group">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Submit for Audit
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </CyberButton>
              </Link>
            </GlassCardContent>
          </GlassCard>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
