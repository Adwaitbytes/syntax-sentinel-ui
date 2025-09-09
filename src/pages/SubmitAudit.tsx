import { useState } from "react";
import { Layout } from "@/components/Layout";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { CodeEditor } from "@/components/CodeEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { FileText, Code2, Info, Zap, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubmitAudit = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    code: "",
    projectName: "",
    description: "",
    originalPrompt: ""
  });

  const steps = [
    { id: 1, title: "Code Submission", icon: Code2 },
    { id: 2, title: "Project Details", icon: FileText },
    { id: 3, title: "Review & Confirm", icon: Info }
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit to the blockchain
    navigate("/report/audit-new");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.code.trim().length > 0;
      case 2: return formData.projectName.trim().length > 0 && formData.description.trim().length > 0;
      case 3: return true;
      default: return false;
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Submit Smart Contract Audit</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get AI-powered security analysis and earn your Proof of Integrity NFT
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 ${
                  step.id <= currentStep ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    step.id <= currentStep ? "bg-primary/20 glow-primary" : "bg-muted/20"
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <GlassCard glow>
              <GlassCardHeader>
                <GlassCardTitle>Step 1: Smart Contract Code</GlassCardTitle>
                <p className="text-muted-foreground">
                  Paste your vibe-coded smart contract below. Our AI will analyze it for security vulnerabilities, 
                  gas optimization opportunities, and intent verification.
                </p>
              </GlassCardHeader>
              <GlassCardContent>
                <CodeEditor
                  value={formData.code}
                  onChange={(value) => setFormData(prev => ({ ...prev, code: value }))}
                  placeholder="// Paste your Rust smart contract code here...
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, AccountId, Balance, Promise};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct MyContract {
    // Your contract implementation
}

// Add your contract methods here..."
                />
              </GlassCardContent>
            </GlassCard>
          )}

          {currentStep === 2 && (
            <GlassCard glow>
              <GlassCardHeader>
                <GlassCardTitle>Step 2: Project Information</GlassCardTitle>
                <p className="text-muted-foreground">
                  Provide details about your project to help our AI understand the context and intent.
                </p>
              </GlassCardHeader>
              <GlassCardContent className="space-y-6">
                <div>
                  <Label htmlFor="projectName" className="text-primary font-medium">Project Name</Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                    placeholder="e.g., DeFi Lending Protocol"
                    className="mt-2 bg-card/50 border-border focus:border-primary focus:glow-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-primary font-medium">Project Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what your smart contract does, its main features, and any specific security concerns..."
                    className="mt-2 bg-card/50 border-border focus:border-primary focus:glow-primary h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="originalPrompt" className="text-primary font-medium">
                    Original Vibe Prompt <span className="text-muted-foreground">(Optional)</span>
                  </Label>
                  <Textarea
                    id="originalPrompt"
                    value={formData.originalPrompt}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrompt: e.target.value }))}
                    placeholder="If you used AI to generate this code, paste the original prompt here for intent verification..."
                    className="mt-2 bg-card/50 border-border focus:border-primary focus:glow-primary h-24"
                  />
                </div>
              </GlassCardContent>
            </GlassCard>
          )}

          {currentStep === 3 && (
            <GlassCard glow>
              <GlassCardHeader>
                <GlassCardTitle>Step 3: Review & Confirm</GlassCardTitle>
                <p className="text-muted-foreground">
                  Review your submission details before starting the audit process.
                </p>
              </GlassCardHeader>
              <GlassCardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-3">Project Details</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name:</span>
                        <span className="ml-2 text-foreground">{formData.projectName}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Code Length:</span>
                        <span className="ml-2 text-foreground">{formData.code.length} characters</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Lines:</span>
                        <span className="ml-2 text-foreground">{formData.code.split('\n').length} lines</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary mb-3">Audit Includes</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full" />
                        <span>Security vulnerability analysis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full" />
                        <span>Gas optimization suggestions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full" />
                        <span>Code-to-intent verification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full" />
                        <span>Proof of Integrity NFT</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-warning" />
                    <span className="font-semibold text-warning">Transaction Details</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Estimated NEAR fee: <span className="text-warning font-medium">0.1 NEAR</span></p>
                    <p>Processing time: <span className="text-primary font-medium">2-5 minutes</span></p>
                  </div>
                </div>
              </GlassCardContent>
            </GlassCard>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <div>
            {currentStep > 1 && (
              <CyberButton variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </CyberButton>
            )}
          </div>

          <div>
            {currentStep < steps.length ? (
              <CyberButton 
                onClick={handleNext} 
                disabled={!canProceed()}
                glow={canProceed()}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </CyberButton>
            ) : (
              <CyberButton 
                onClick={handleSubmit}
                disabled={!canProceed()}
                glow={canProceed()}
                className="group"
              >
                <Zap className="mr-2 h-4 w-4" />
                Confirm Audit
              </CyberButton>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubmitAudit;