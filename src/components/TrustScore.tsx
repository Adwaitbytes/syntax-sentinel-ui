import { useEffect, useState } from "react";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";

interface TrustScoreProps {
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function TrustScore({ score, maxScore = 100, size = "md", animated = true }: TrustScoreProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const percentage = Math.min((score / maxScore) * 100, 100);
  
  const sizes = {
    sm: { container: "w-24 h-24", text: "text-lg" },
    md: { container: "w-32 h-32", text: "text-2xl" },
    lg: { container: "w-40 h-40", text: "text-3xl" }
  };

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        const increment = score / 50;
        const interval = setInterval(() => {
          setDisplayScore(prev => {
            if (prev >= score) {
              clearInterval(interval);
              return score;
            }
            return Math.min(prev + increment, score);
          });
        }, 20);
        return () => clearInterval(interval);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setDisplayScore(score);
    }
  }, [score, animated]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-secondary";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getGlowColor = (score: number) => {
    if (score >= 80) return "glow-secondary";
    if (score >= 60) return "shadow-warning";
    return "shadow-destructive";
  };

  return (
    <GlassCard className={`${animated ? "animate-float" : ""} ${getGlowColor(score)}`}>
      <GlassCardHeader className="pb-2">
        <GlassCardTitle className="text-center text-sm">Trust Score</GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent className="flex items-center justify-center">
        <div className={`relative ${sizes[size].container} flex items-center justify-center`}>
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full border-4 border-muted/30" />
          
          {/* Progress circle */}
          <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className={getScoreColor(score)}
              strokeDasharray={`${percentage * 2.83} 283`}
              style={{
                filter: `drop-shadow(0 0 8px ${score >= 80 ? 'hsl(var(--secondary))' : 
                  score >= 60 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))'})`,
                transition: 'stroke-dasharray 1s ease-in-out'
              }}
            />
          </svg>
          
          {/* Score text */}
          <div className="text-center">
            <div className={`font-bold ${sizes[size].text} ${getScoreColor(score)}`}>
              {Math.round(displayScore)}
            </div>
            <div className="text-xs text-muted-foreground">/ {maxScore}</div>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
}