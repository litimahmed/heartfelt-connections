import { useCallback, useEffect, useState, useRef } from "react";
import { useWalkthrough } from "@/contexts/WalkthroughContext";
import { useAdminTranslation } from "@/contexts/AdminTranslationContext";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface TooltipPosition {
  top: number;
  left: number;
  arrowPosition: "top" | "bottom" | "left" | "right";
}

interface HighlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function WalkthroughTour() {
  const { isRunning, stepIndex, stopTour, nextStep, prevStep, tourSteps } = useWalkthrough();
  const { t, isRTL } = useAdminTranslation();
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null);
  const [highlightRect, setHighlightRect] = useState<HighlightRect | null>(null);
  const [targetElement, setTargetElement] = useState<Element | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentStep = tourSteps[stepIndex];
  const isLastStep = stepIndex === tourSteps.length - 1;
  const isFirstStep = stepIndex === 0;
  const isSmallElement = currentStep?.isSmallElement ?? false;

  // Get translated content with fallback
  const getStepTitle = () => {
    if (!currentStep) return "Step";
    const key = currentStep.titleKey as keyof typeof t;
    const value = t[key];
    return typeof value === 'string' ? value : currentStep.titleKey;
  };

  const getStepContent = () => {
    if (!currentStep) return "";
    const key = currentStep.contentKey as keyof typeof t;
    const value = t[key];
    return typeof value === 'string' ? value : currentStep.contentKey;
  };

  // Calculate tooltip position based on target element
  const calculatePosition = useCallback((target: Element, placement: string = "bottom") => {
    const rect = target.getBoundingClientRect();
    const tooltipWidth = 380;
    const tooltipHeight = 220;
    const offset = 16;
    const padding = isSmallElement ? 4 : 8;

    // Store highlight rect for spotlight
    setHighlightRect({
      top: rect.top - padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    });

    let top = 0;
    let left = 0;
    let arrowPosition: "top" | "bottom" | "left" | "right" = "top";

    switch (placement) {
      case "bottom":
        top = rect.bottom + offset;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        arrowPosition = "top";
        break;
      case "top":
        top = rect.top - tooltipHeight - offset;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        arrowPosition = "bottom";
        break;
      case "left":
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - offset;
        arrowPosition = "right";
        break;
      case "right":
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + offset;
        arrowPosition = "left";
        break;
    }

    // Keep tooltip in viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 20) left = 20;
    if (left + tooltipWidth > viewportWidth - 20) left = viewportWidth - tooltipWidth - 20;
    if (top < 20) top = 20;
    if (top + tooltipHeight > viewportHeight - 20) top = viewportHeight - tooltipHeight - 20;

    setTooltipPosition({ top, left, arrowPosition });
  }, [isSmallElement]);

  // Lock scroll when tour is active
  useEffect(() => {
    if (isRunning) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isRunning]);

  // Find and highlight target element
  useEffect(() => {
    if (!isRunning || !currentStep) {
      setTargetElement(null);
      setIsVisible(false);
      setTooltipPosition(null);
      setHighlightRect(null);
      return;
    }

    let attempts = 0;
    const maxAttempts = 15;

    const findTarget = () => {
      const target = document.querySelector(currentStep.target);

      if (target) {
        setTargetElement(target);

        const rect = target.getBoundingClientRect();
        const elementTop = window.scrollY + rect.top;
        
        // Scroll to TOP for large sections, center for small elements
        let scrollTarget: number;
        if (currentStep.scrollPosition === "top" || rect.height > 300) {
          // Scroll so element is at top with some padding
          scrollTarget = elementTop - 100;
        } else {
          // For small elements, center them
          scrollTarget = elementTop - window.innerHeight / 2 + rect.height / 2;
        }

        // Temporarily unlock scroll for programmatic scrolling
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";

        window.scrollTo({
          top: Math.max(0, scrollTarget),
          behavior: "smooth",
        });

        // Re-lock scroll after scrolling completes
        setTimeout(() => {
          document.body.style.overflow = "hidden";
          document.documentElement.style.overflow = "hidden";
          calculatePosition(target, currentStep.placement || "bottom");
          setIsVisible(true);
        }, 500);
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(findTarget, 200);
        } else {
          console.warn(`Tour target not found: ${currentStep.target}`);
          nextStep();
        }
      }
    };

    // Reset visibility before finding new target
    setIsVisible(false);
    setTooltipPosition(null);
    setHighlightRect(null);

    // Small delay to allow page transition
    const timer = setTimeout(findTarget, 200);

    return () => clearTimeout(timer);
  }, [isRunning, stepIndex, currentStep, calculatePosition, nextStep]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isRunning) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        stopTour();
      } else if (e.key === "ArrowRight" || e.key === "Enter") {
        e.preventDefault();
        nextStep();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevStep();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, nextStep, prevStep, stopTour]);

  if (!isRunning) {
    return null;
  }

  return (
    <>
      {/* Dark overlay with spotlight cutout */}
      <div
        className="fixed inset-0 z-[9998] transition-opacity duration-500 pointer-events-auto"
        style={{
          opacity: isVisible ? 1 : 0,
        }}
        onClick={stopTour}
      >
        {/* SVG mask for spotlight effect */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <mask id="spotlight-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {highlightRect && (
                <rect
                  x={highlightRect.left}
                  y={highlightRect.top}
                  width={highlightRect.width}
                  height={highlightRect.height}
                  rx={isSmallElement ? "6" : "12"}
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.75)"
            mask="url(#spotlight-mask)"
          />
        </svg>
      </div>

      {/* Highlight border around target - only for large sections */}
      {highlightRect && isVisible && !isSmallElement && (
        <div
          className="fixed z-[9999] pointer-events-none transition-all duration-500 ease-out"
          style={{
            top: highlightRect.top,
            left: highlightRect.left,
            width: highlightRect.width,
            height: highlightRect.height,
            borderRadius: "12px",
            border: "2px solid hsl(var(--primary))",
            boxShadow: "0 0 0 4px hsl(var(--primary) / 0.2), 0 0 30px hsl(var(--primary) / 0.3)",
          }}
        />
      )}

      {/* For small elements - just a subtle ring */}
      {highlightRect && isVisible && isSmallElement && (
        <div
          className="fixed z-[9999] pointer-events-none transition-all duration-500 ease-out"
          style={{
            top: highlightRect.top,
            left: highlightRect.left,
            width: highlightRect.width,
            height: highlightRect.height,
            borderRadius: "6px",
            boxShadow: "0 0 0 2px hsl(var(--primary)), 0 0 12px hsl(var(--primary) / 0.5)",
          }}
        />
      )}

      {/* Tooltip */}
      {tooltipPosition && (
        <div
          ref={tooltipRef}
          className={cn(
            "fixed z-[10000] w-[380px] transition-all duration-500 ease-out",
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95 pointer-events-none"
          )}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
        >
          {/* Arrow */}
          <div
            className={cn(
              "absolute w-4 h-4 rotate-45 transition-all duration-300",
              "bg-gradient-to-br from-primary/20 to-card border",
              tooltipPosition.arrowPosition === "top" && "top-[-8px] left-1/2 -translate-x-1/2 border-l border-t border-r-0 border-b-0 border-primary/30",
              tooltipPosition.arrowPosition === "bottom" && "bottom-[-8px] left-1/2 -translate-x-1/2 border-r border-b border-l-0 border-t-0 border-border",
              tooltipPosition.arrowPosition === "left" && "left-[-8px] top-1/2 -translate-y-1/2 border-l border-b border-r-0 border-t-0 border-primary/30",
              tooltipPosition.arrowPosition === "right" && "right-[-8px] top-1/2 -translate-y-1/2 border-r border-t border-l-0 border-b-0 border-border"
            )}
          />

          <div
            className={cn(
              "relative overflow-hidden rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl",
              isRTL && "text-right"
            )}
          >
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-primary/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center justify-between px-5 py-4 border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/25">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Guided Tour
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    {tourSteps.map((_, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          idx === stepIndex
                            ? "w-6 bg-primary"
                            : idx < stepIndex
                            ? "w-1.5 bg-primary/50"
                            : "w-1.5 bg-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={stopTour}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="relative px-5 py-5">
              <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                {getStepTitle()}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {getStepContent()}
              </p>
            </div>

            {/* Footer */}
            <div
              className={cn(
                "relative flex items-center justify-between px-5 py-4 border-t border-border/30 bg-muted/20",
                isRTL && "flex-row-reverse"
              )}
            >
              <div className="flex items-center gap-2">
                {!isFirstStep && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevStep}
                    className={cn(
                      "gap-1.5 text-muted-foreground hover:text-foreground h-9 px-3",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    <ChevronLeft className={cn("h-4 w-4", isRTL && "rotate-180")} />
                    {t.previous || "Previous"}
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-medium">
                  {stepIndex + 1} / {tourSteps.length}
                </span>
                <Button
                  size="sm"
                  onClick={nextStep}
                  className={cn(
                    "gap-1.5 h-9 px-4 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  {isLastStep ? (
                    <>
                      <Check className="h-4 w-4" />
                      {t.finish || "Finish"}
                    </>
                  ) : (
                    <>
                      {t.next || "Next"}
                      <ChevronRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
