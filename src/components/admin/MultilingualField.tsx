import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguageSelector } from "@/contexts/LanguageSelectorContext";
import { MultilingualField as MultilingualFieldType } from "@/types/admin/contact";

interface MultilingualFieldProps {
  label: string;
  value: MultilingualFieldType;
  onChange: (value: MultilingualFieldType) => void;
  required?: boolean;
  type?: "input" | "textarea";
  maxLength?: number;
  placeholder?: {
    fr: string;
    ar: string;
    en: string;
  };
  rows?: number;
}

export function MultilingualField({
  label,
  value,
  onChange,
  required = false,
  type = "input",
  maxLength,
  placeholder = { fr: "", ar: "", en: "" },
  rows = 6,
}: MultilingualFieldProps) {
  const { currentLanguage, getCurrentLanguageInfo } = useLanguageSelector();
  const langInfo = getCurrentLanguageInfo();

  const handleChange = (val: string) => {
    onChange({
      ...value,
      [currentLanguage]: val,
    });
  };

  const currentValue = value[currentLanguage] || "";
  const currentPlaceholder = placeholder[currentLanguage] || "";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {maxLength && (
          <span className="text-xs text-muted-foreground">
            {currentValue.length} / {maxLength}
          </span>
        )}
      </div>

      {type === "textarea" ? (
        <Textarea
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={currentPlaceholder}
          required={required}
          maxLength={maxLength}
          dir={langInfo.dir}
          rows={rows}
          className="resize-none border-border bg-background focus:border-primary/50 transition-colors"
        />
      ) : (
        <Input
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={currentPlaceholder}
          required={required}
          maxLength={maxLength}
          dir={langInfo.dir}
          className="border-border bg-background focus:border-primary/50 transition-colors"
        />
      )}
    </div>
  );
}
