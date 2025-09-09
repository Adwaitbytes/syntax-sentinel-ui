import { useState } from "react";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  ExternalLink, 
  Share, 
  Download, 
  Eye,
  Calendar,
  Hash,
  Star
} from "lucide-react";

interface NFTCardProps {
  nft: {
    id: string;
    name: string;
    score: number;
    mintDate: string;
    image?: string;
    contractAddress?: string;
    blockchain?: string;
    rarity?: "Common" | "Rare" | "Epic" | "Legendary";
    attributes?: Array<{
      trait_type: string;
      value: string | number;
    }>;
  };
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
}

export function NFTCard({ nft, size = "md", interactive = true }: NFTCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "w-48 h-64",
    md: "w-64 h-80", 
    lg: "w-80 h-96"
  };

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case "Legendary": return "border-warning text-warning";
      case "Epic": return "border-secondary text-secondary";
      case "Rare": return "border-accent text-accent";
      default: return "border-primary text-primary";
    }
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return "from-secondary/30 to-primary/30";
    if (score >= 80) return "from-primary/30 to-accent/30";
    if (score >= 70) return "from-accent/30 to-warning/30";
    return "from-warning/30 to-destructive/30";
  };

  return (
    <div 
      className={`${sizeClasses[size]} perspective-1000 cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => interactive && setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <GlassCard 
            className={`w-full h-full overflow-hidden group ${
              isHovered ? "glow-primary scale-105" : ""
            } transition-all duration-300`}
          >
            <GlassCardContent className="p-0 h-full flex flex-col">
              {/* NFT Image/Visual */}
              <div className={`flex-1 bg-gradient-to-br ${getScoreGradient(nft.score)} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Shield className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse-glow" />
                    <div className="text-2xl font-bold text-primary mb-2">
                      {nft.score}/100
                    </div>
                    <div className="text-sm text-muted-foreground px-4">
                      Trust Score
                    </div>
                  </div>
                </div>
                
                {/* Rarity badge */}
                {nft.rarity && (
                  <div className="absolute top-3 right-3">
                    <Badge className={`${getRarityColor(nft.rarity)} bg-card/80 backdrop-blur-sm`}>
                      <Star className="h-3 w-3 mr-1" />
                      {nft.rarity}
                    </Badge>
                  </div>
                )}

                {/* Score badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    #{nft.id.slice(-4)}
                  </Badge>
                </div>

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-primary/10 flex items-center justify-center transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}>
                  <Eye className="h-8 w-8 text-primary" />
                </div>
              </div>

              {/* Card Info */}
              <div className="p-4">
                <h3 className="font-bold text-primary text-sm mb-2 truncate">
                  {nft.name}
                </h3>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(nft.mintDate).toLocaleDateString()}</span>
                </div>

                {interactive && (
                  <div className="flex gap-2">
                    <CyberButton size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Flip
                    </CyberButton>
                  </div>
                )}
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <GlassCard className="w-full h-full overflow-hidden">
            <GlassCardContent className="p-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-primary text-sm">NFT Details</h3>
                <CyberButton 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                >
                  <Eye className="h-3 w-3" />
                </CyberButton>
              </div>

              <div className="flex-1 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Score:</span>
                  <span className="text-primary font-bold">{nft.score}/100</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minted:</span>
                  <span className="text-foreground">{nft.mintDate}</span>
                </div>

                {nft.blockchain && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Blockchain:</span>
                    <span className="text-secondary">{nft.blockchain}</span>
                  </div>
                )}

                {nft.attributes && nft.attributes.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-muted-foreground font-medium">Attributes:</span>
                    {nft.attributes.slice(0, 3).map((attr, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{attr.trait_type}:</span>
                        <span className="text-accent">{attr.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <CyberButton size="sm" variant="outline" className="flex-1">
                  <Share className="h-3 w-3 mr-1" />
                  Share
                </CyberButton>
                <CyberButton size="sm" variant="outline" className="flex-1">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View
                </CyberButton>
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}