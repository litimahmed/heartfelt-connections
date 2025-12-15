import { useLanguageSelector, LANGUAGES } from "@/contexts/LanguageSelectorContext";
import { cn } from "@/lib/utils";
import { Check, Circle } from "lucide-react";

interface CompletionStatus {
  fr: boolean;
  ar: boolean;
  en: boolean;
}

interface GlobalLanguageSelectorProps {
  completionStatus?: CompletionStatus;
}

export function GlobalLanguageSelector({ completionStatus }: GlobalLanguageSelectorProps) {
  const { currentLanguage, setCurrentLanguage } = useLanguageSelector();

  return (
    <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg border border-border/50">
      {LANGUAGES.map((lang) => {
        const isActive = currentLanguage === lang.code;
        const isComplete = completionStatus?.[lang.code];
        
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setCurrentLanguage(lang.code)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-background text-foreground shadow-sm border border-border/50"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.name}</span>
            
            {/* Completion indicator */}
            {completionStatus && (
              <span className={cn(
                "flex items-center justify-center h-4 w-4 rounded-full transition-colors",
                isComplete 
                  ? "bg-green-500/20 text-green-600" 
                  : "bg-muted text-muted-foreground/50"
              )}>
                {isComplete ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Circle className="h-2 w-2" />
                )}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
