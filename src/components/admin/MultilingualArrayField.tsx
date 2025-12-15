import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguageSelector } from "@/contexts/LanguageSelectorContext";
import { MultilingualField, MultilingualItem } from "@/types/admin/partner";

interface MultilingualArrayFieldProps {
  label: string;
  value: MultilingualField;
  onChange: (value: MultilingualField) => void;
  required?: boolean;
  type?: "input" | "textarea";
  maxLength?: number;
  placeholder?: string;
  rows?: number;
}

// Helper to get value by language from array format
const getValueByLang = (field: MultilingualField, lang: "fr" | "ar" | "en"): string => {
  const item = field.find((i) => i.lang === lang);
  return item?.value || "";
};

// Helper to update value by language in array format
const updateValueByLang = (
  field: MultilingualField,
  lang: "fr" | "ar" | "en",
  value: string
): MultilingualField => {
  const existingIndex = field.findIndex((i) => i.lang === lang);
  if (existingIndex >= 0) {
    return field.map((item, index) =>
      index === existingIndex ? { ...item, value } : item
    );
  }
  return [...field, { lang, value }];
};

export function MultilingualArrayField({
  label,
  value,
  onChange,
  required = false,
  type = "input",
  maxLength,
  placeholder = "",
  rows = 6,
}: MultilingualArrayFieldProps) {
  const { currentLanguage, getCurrentLanguageInfo } = useLanguageSelector();
  const langInfo = getCurrentLanguageInfo();

  const handleChange = (val: string) => {
    onChange(updateValueByLang(value, currentLanguage, val));
  };

  const currentValue = getValueByLang(value, currentLanguage);

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
          placeholder={placeholder}
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
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          dir={langInfo.dir}
          className="border-border bg-background focus:border-primary/50 transition-colors"
        />
      )}
    </div>
  );
}
