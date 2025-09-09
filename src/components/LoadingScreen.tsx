import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Progress } from "@/components/ui/progress";
import { Shield, Cpu, Eye, Zap } from "lucide-react";

interface LoadingScreenProps {
  title?: string;
  subtitle?: string;
  progress?: number;
  stage?: string;
  isVisible: boolean;
}

export function LoadingScreen({ 
  title = "AI Auditors are inspecting your code...",
  subtitle = "This may take a few minutes",
  progress = 0,
  stage = "Initializing analysis",
  isVisible 
}: LoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(stage);

  const stages = [
    { id: 1, text: "Initializing AI models", icon: Cpu, duration: 1000 },
    { id: 2, text: "Scanning for vulnerabilities", icon: Shield, duration: 2000 },
    { id: 3, text: "Analyzing gas optimization", icon: Zap, duration: 1500 },
    { id: 4, text: "Verifying code intent", icon: Eye, duration: 1000 },
    { id: 5, text: "Generating report", icon: Shield, duration: 500 }
  ];

  useEffect(() => {
    if (!isVisible) return;

    let stageIndex = 0;
    let progressValue = 0;

    const interval = setInterval(() => {
      progressValue += Math.random() * 15 + 5;
      
      if (progressValue >= 100) {
        progressValue = 100;
        clearInterval(interval);
      }
      
      setDisplayProgress(progressValue);

      // Update stage based on progress
      const newStageIndex = Math.floor((progressValue / 100) * stages.length);
      if (newStageIndex !== stageIndex && newStageIndex < stages.length) {
        stageIndex = newStageIndex;
        setCurrentStage(stages[stageIndex].text);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <GlassCard glow className="text-center">
          <div className="p-8">
            {/* Animated Icon */}
            <div className="relative mb-6">
              <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-10 w-10 text-primary animate-pulse-glow" />
              </div>
              
              {/* Orbiting particles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border border-primary/30 rounded-full animate-spin">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Title and Subtitle */}
            <h2 className="text-2xl font-bold text-primary mb-2">{title}</h2>
            <p className="text-muted-foreground mb-6">{subtitle}</p>

            {/* Progress Bar */}
            <div className="mb-6">
              <Progress value={displayProgress} className="h-3 mb-2" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{Math.round(displayProgress)}%</span>
                <span className="text-primary">Complete</span>
              </div>
            </div>

            {/* Current Stage */}
            <div className="flex items-center justify-center gap-2 text-sm text-secondary">
              {(() => {
                const currentStageData = stages.find(s => s.text === currentStage);
                if (currentStageData) {
                  const IconComponent = currentStageData.icon;
                  return <IconComponent className="h-4 w-4 animate-pulse" />;
                }
                return null;
              })()}
              <span>{currentStage}</span>
            </div>

            {/* Stage Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {stages.map((stageItem, index) => (
                <div
                  key={stageItem.id}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    stages.findIndex(s => s.text === currentStage) >= index
                      ? "bg-primary"
                      : "bg-muted/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}