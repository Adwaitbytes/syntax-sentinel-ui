import { useState } from "react";
import { NavLink } from "react-router-dom";
import { WalletConnect } from "./WalletConnect";
import { Shield, Activity, FileText, Home } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress] = useState("syntax.near");

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: Activity },
    { name: "Submit Audit", href: "/submit-audit", icon: FileText },
  ];

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
    // In a real app, this would integrate with NEAR Wallet
  };

  return (
    <div className="min-h-screen cyber-bg">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-1 h-20 bg-gradient-to-b from-primary/50 to-transparent animate-data-stream" 
             style={{ animationDelay: "0s" }} />
        <div className="absolute top-40 right-20 w-1 h-20 bg-gradient-to-b from-secondary/50 to-transparent animate-data-stream" 
             style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 left-1/3 w-1 h-20 bg-gradient-to-b from-accent/50 to-transparent animate-data-stream" 
             style={{ animationDelay: "2s" }} />
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 border-b border-glass-border/20 backdrop-blur-xl bg-card/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-primary/20 rounded-lg group-hover:glow-primary transition-all duration-300">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">SyntaxSentinel</h1>
                <p className="text-xs text-muted-foreground">Trust in Code. Powered by AI.</p>
              </div>
            </NavLink>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-primary/20 text-primary glow-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Wallet Connect */}
            <WalletConnect
              isConnected={isWalletConnected}
              onConnect={handleWalletConnect}
              address={isWalletConnected ? walletAddress : undefined}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-glass-border/20 bg-card/10 backdrop-blur-xl mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 SyntaxSentinel. Securing the future of smart contracts.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}