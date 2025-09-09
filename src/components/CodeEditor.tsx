import { useState } from "react";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { Code2, Copy, Check } from "lucide-react";
import { CyberButton } from "@/components/ui/cyber-button";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  language?: string;
  readOnly?: boolean;
}

export function CodeEditor({ 
  value, 
  onChange, 
  placeholder = "Paste your vibe-coded smart contract here...",
  language = "rust",
  readOnly = false 
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassCard className="w-full">
      <GlassCardHeader className="flex-row items-center justify-between pb-4">
        <GlassCardTitle className="flex items-center gap-2">
          <Code2 className="h-5 w-5" />
          Smart Contract Code
        </GlassCardTitle>
        {value && (
          <CyberButton
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-2"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied!" : "Copy"}
          </CyberButton>
        )}
      </GlassCardHeader>
      <GlassCardContent>
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            readOnly={readOnly}
            className="w-full h-64 bg-card/50 border border-border rounded-lg p-4 font-mono text-sm resize-none
                     focus:border-primary focus:glow-primary focus:outline-none
                     placeholder:text-muted-foreground/60
                     scrollbar-thin scrollbar-track-muted scrollbar-thumb-primary/50"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)',
            }}
          />
          
          {/* Syntax highlighting overlay effect */}
          <div className="absolute top-4 right-4 text-xs text-muted-foreground font-mono px-2 py-1 bg-muted/50 rounded">
            {language.toUpperCase()}
          </div>
        </div>
        
        {value && (
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span>Lines: {value.split('\n').length}</span>
            <span>Characters: {value.length}</span>
            <span className="text-primary">Ready for audit</span>
          </div>
        )}
      </GlassCardContent>
    </GlassCard>
  );
}