import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MultilingualField } from "@/types/admin/contact";
import { Globe } from "lucide-react";

interface MultilingualInputProps {
  label: string;
  value: MultilingualField;
  onChange: (value: MultilingualField) => void;
  required?: boolean;
  type?: "input" | "textarea";
  maxLength?: number;
  placeholder?: {
    fr: string;
    ar: string;
    en: string;
  };
}

export function MultilingualInput({
  label,
  value,
  onChange,
  required = false,
  type = "input",
  maxLength,
  placeholder = { fr: "", ar: "", en: "" }
}: MultilingualInputProps) {
  const handleChange = (lang: "fr" | "ar" | "en", val: string) => {
    onChange({
      ...value,
      [lang]: val
    });
  };

  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
    { code: "ar", name: "العربية", flag: "🇩🇿", dir: "rtl" },
    { code: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-md rounded-full" />
          <Globe className="relative h-4 w-4 text-primary" />
        </div>
        <Label className="text-base font-semibold">{label}</Label>
        {required && <span className="text-destructive text-sm">*</span>}
      </div>
      
      <Card className="overflow-hidden border-2 border-border/50 shadow-sm hover:shadow-md transition-shadow">
        <Tabs defaultValue="fr" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/30 p-1 h-auto gap-1">
            {languages.map((lang) => (
              <TabsTrigger
                key={lang.code}
                value={lang.code}
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-primary/20 rounded-lg py-2.5 px-3 transition-all duration-200 hover:bg-background/50"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl" role="img" aria-label={lang.name}>
                    {lang.flag}
                  </span>
                  <span className="font-medium text-sm">{lang.name}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {languages.map((lang) => (
            <TabsContent
              key={lang.code}
              value={lang.code}
              className="p-4 bg-gradient-to-br from-background to-muted/5 animate-in fade-in-50 duration-200"
              dir={lang.dir}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    {lang.name} Version
                  </span>
                  {value[lang.code as keyof MultilingualField] && (
                    <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {value[lang.code as keyof MultilingualField].length} characters
                    </span>
                  )}
                </div>
                
                {type === "textarea" ? (
                  <Textarea
                    value={value[lang.code as keyof MultilingualField]}
                    onChange={(e) =>
                      handleChange(lang.code as keyof MultilingualField, e.target.value)
                    }
                    placeholder={placeholder[lang.code as keyof MultilingualField]}
                    required={required}
                    maxLength={maxLength}
                    dir={lang.dir}
                    className="min-h-[200px] resize-none border-border/50 focus:border-primary/50 transition-colors bg-background/50"
                  />
                ) : (
                  <Input
                    value={value[lang.code as keyof MultilingualField]}
                    onChange={(e) =>
                      handleChange(lang.code as keyof MultilingualField, e.target.value)
                    }
                    placeholder={placeholder[lang.code as keyof MultilingualField]}
                    required={required}
                    maxLength={maxLength}
                    dir={lang.dir}
                    className="border-border/50 focus:border-primary/50 transition-colors bg-background/50"
                  />
                )}
                
                {maxLength && (
                  <p className="text-xs text-muted-foreground text-right">
                    {value[lang.code as keyof MultilingualField]?.length || 0} / {maxLength}
                  </p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
