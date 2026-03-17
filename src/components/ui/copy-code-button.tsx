import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CopyCodeProps {
  code?: string;
  label?: string;
  className?: string;
}

export function CopyCode({ code = "21DEV-LEO", label = "Copy", className }: CopyCodeProps) {
  const [copied, setCopied] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progress, setProgress] = useState(0);
  const duration = 4000;

  useEffect(() => {
    if (copied) {
      const showTimer = setTimeout(() => {
        setShowConfirmation(true);
      }, 400);

      setProgress(0);
      const startTime = Date.now();
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
        
        if (elapsed >= duration) {
          clearInterval(interval);
          setShowConfirmation(false);
          setTimeout(() => {
            setCopied(false);
            setProgress(0);
          }, 400);
        }
      }, 16);

      return () => {
        clearInterval(interval);
        clearTimeout(showTimer);
      };
    }
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopied(true);
  };

  return (
    <div className={cn("relative overflow-hidden flex items-center justify-center bg-muted rounded-full px-10 py-3 min-w-80 h-16", className)}>
      {/* Progress background */}
      <div 
        className="absolute left-0 top-0 bottom-0 bg-muted-foreground/20"
        style={{ 
          width: `${progress}%`,
          opacity: copied ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      
      {/* Original content - code and button */}
      <div 
        className="absolute inset-0 flex items-center justify-between pl-10 pr-3"
        style={{
          opacity: copied ? 0 : 1,
          filter: copied ? 'blur(12px)' : 'blur(0px)',
          transform: copied ? 'scale(0.92)' : 'scale(1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: copied ? 'none' : 'auto',
          zIndex: copied ? 0 : 20,
        }}
      >
        <span className="text-2xl font-medium tracking-wide text-muted-foreground select-all truncate max-w-48">
          {code}
        </span>
        <button
          onClick={handleCopy}
          className="bg-background hover:bg-accent text-foreground font-medium text-lg px-8 py-3 rounded-full shadow-sm transition-all duration-300 hover:shadow-md active:scale-95 cursor-pointer select-none"
        >
          {label}
        </button>
      </div>

      {/* Confirmation content - Code Copied! */}
      <div 
        className="relative flex items-center gap-3"
        style={{
          opacity: showConfirmation ? 1 : 0,
          filter: showConfirmation ? 'blur(0px)' : 'blur(12px)',
          transform: showConfirmation ? 'scale(1)' : 'scale(1.08)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
          <svg 
            className="w-4 h-4 text-primary-foreground" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7"
              style={{
                strokeDasharray: 24,
                strokeDashoffset: showConfirmation ? 0 : 24,
                transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
              }}
            />
          </svg>
        </div>
        <span className="text-xl font-semibold text-foreground">
          Copied!
        </span>
      </div>
    </div>
  );
}
