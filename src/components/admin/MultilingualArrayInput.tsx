import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultilingualField, MultilingualItem } from "@/types/admin/partner";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultilingualArrayInputProps {
  label: string;
  value: MultilingualField;
  onChange: (value: MultilingualField) => void;
  required?: boolean;
  type?: "input" | "textarea";
  maxLength?: number;
  placeholder?: string;
  className?: string;
}

const LANGUAGES: { code: "fr" | "ar" | "en"; name: string; flag: string; dir: "ltr" | "rtl" }[] = [
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇩🇿", dir: "rtl" },
  { code: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
];

// Helper to get value from array format
const getValueByLang = (field: MultilingualField, lang: string): string => {
  const item = field.find((f) => f.lang === lang);
  return item?.value || "";
};

// Helper to update value in array format
const updateValueByLang = (field: MultilingualField, lang: "fr" | "ar" | "en", value: string): MultilingualField => {
  const existingIndex = field.findIndex((f) => f.lang === lang);
  if (existingIndex >= 0) {
    const newField = [...field];
    newField[existingIndex] = { lang, value };
    return newField;
  }
  return [...field, { lang, value }];
};

export const createEmptyMultilingual = (): MultilingualField => [
  { lang: "fr", value: "" },
  { lang: "ar", value: "" },
  { lang: "en", value: "" },
];

export function MultilingualArrayInput({
  label,
  value,
  onChange,
  required = false,
  type = "input",
  maxLength,
  placeholder = "",
  className,
}: MultilingualArrayInputProps) {
  const handleChange = (lang: "fr" | "ar" | "en", val: string) => {
    onChange(updateValueByLang(value, lang, val));
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-md rounded-full" />
          <Globe className="relative h-4 w-4 text-primary" />
        </div>
        <Label className="text-sm font-semibold text-foreground">{label}</Label>
        {required && <span className="text-destructive text-xs font-medium">Required</span>}
      </div>

      <div className="rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <Tabs defaultValue="en" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/20 p-1.5 h-auto gap-1 rounded-none border-b border-border/40">
            {LANGUAGES.map((lang) => (
              <TabsTrigger
                key={lang.code}
                value={lang.code}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-lg py-2.5 px-3 transition-all duration-200 hover:bg-muted/50 group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg" role="img" aria-label={lang.name}>
                    {lang.flag}
                  </span>
                  <span className="font-medium text-xs sm:text-sm">{lang.name}</span>
                  {getValueByLang(value, lang.code) && (
                    <span className="hidden sm:inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {LANGUAGES.map((lang) => (
            <TabsContent
              key={lang.code}
              value={lang.code}
              className="p-4 animate-fade-in"
              dir={lang.dir}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {lang.name} Content
                  </span>
                  {maxLength && (
                    <span className={cn(
                      "text-xs font-mono px-2 py-0.5 rounded-full",
                      (getValueByLang(value, lang.code)?.length || 0) > maxLength * 0.9
                        ? "bg-destructive/10 text-destructive"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {getValueByLang(value, lang.code)?.length || 0}/{maxLength}
                    </span>
                  )}
                </div>

                {type === "textarea" ? (
                  <Textarea
                    value={getValueByLang(value, lang.code)}
                    onChange={(e) => handleChange(lang.code, e.target.value)}
                    placeholder={placeholder}
                    required={required && lang.code === "en"}
                    maxLength={maxLength}
                    dir={lang.dir}
                    className="min-h-[160px] resize-none border-border/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all bg-background/60 rounded-lg"
                  />
                ) : (
                  <Input
                    value={getValueByLang(value, lang.code)}
                    onChange={(e) => handleChange(lang.code, e.target.value)}
                    placeholder={placeholder}
                    required={required && lang.code === "en"}
                    maxLength={maxLength}
                    dir={lang.dir}
                    className="border-border/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all bg-background/60 h-11 rounded-lg"
                  />
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
