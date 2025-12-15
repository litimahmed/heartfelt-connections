/**
 * @file LanguageToggle.tsx
 * @description This component provides a dropdown menu for switching between supported languages (French, Arabic, and English).
 * It uses the `useTranslation` hook to get and set the current language.
 */

// Import necessary libraries and components.
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/TranslationContext";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * @component LanguageToggle
 * @description A dropdown menu component for changing the application's language.
 */
export function LanguageToggle() {
  // Hook to get the current language and the function to set it.
  const { language, setLanguage } = useTranslation();

  return (
    <DropdownMenu>
      {/* The trigger for the dropdown menu is a button with a globe icon. */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-4 w-4 text-primary" />
          {/* Screen reader only text for accessibility. */}
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      {/* The content of the dropdown menu. */}
      <DropdownMenuContent align="end">
        {/* Each menu item sets the language to a different value. */}
        <DropdownMenuItem onClick={() => setLanguage('fr')}>
          Français {language === 'fr' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ar')}>
          العربية {language === 'ar' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          English {language === 'en' && '✓'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
