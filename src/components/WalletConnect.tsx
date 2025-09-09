import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CyberButton } from "@/components/ui/cyber-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Wallet, Shield, Zap } from "lucide-react";

interface WalletConnectProps {
  isConnected: boolean;
  onConnect: () => void;
  address?: string;
}

export function WalletConnect({ isConnected, onConnect, address }: WalletConnectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = () => {
    onConnect();
    setIsOpen(false);
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 glass-card">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse-glow" />
          <span className="font-mono text-sm">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connected"}
          </span>
        </div>
        <CyberButton variant="outline" size="icon">
          <Wallet className="h-4 w-4" />
        </CyberButton>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CyberButton glow>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </CyberButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-glass-border/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Connect Your NEAR Wallet
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Connect your NEAR wallet to start auditing smart contracts and earn Proof of Integrity NFTs.
          </p>
          
          <GlassCard className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-primary">NEAR Wallet</h4>
                <p className="text-xs text-muted-foreground">Official NEAR Protocol Wallet</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Zap className="h-3 w-3" />
              <span>Fast & Secure</span>
            </div>
            <CyberButton 
              onClick={handleConnect} 
              className="w-full"
              glow
            >
              Connect NEAR Wallet
            </CyberButton>
          </GlassCard>

          <div className="text-xs text-muted-foreground text-center">
            By connecting, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}