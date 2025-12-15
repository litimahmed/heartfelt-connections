import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MultilingualField } from "@/components/admin/MultilingualField";
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MultilingualText {
  ar: string;
  fr: string;
  en: string;
}

interface Section {
  id: string;
  titre: MultilingualText;
  paragraphe: MultilingualText;
}

interface SectionBuilderProps {
  sections: Section[];
  onChange: (sections: Section[]) => void;
  titlePlaceholder?: { ar: string; fr: string; en: string };
  contentPlaceholder?: { ar: string; fr: string; en: string };
}

export function SectionBuilder({
  sections,
  onChange,
  titlePlaceholder = {
    ar: "عنوان القسم",
    fr: "Titre de la section",
    en: "Section title",
  },
  contentPlaceholder = {
    ar: "محتوى القسم",
    fr: "Contenu de la section",
    en: "Section content",
  },
}: SectionBuilderProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.map((s) => s.id))
  );

  const generateId = () => `section_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const addSection = () => {
    const newSection: Section = {
      id: generateId(),
      titre: { ar: "", fr: "", en: "" },
      paragraphe: { ar: "", fr: "", en: "" },
    };
    const newSections = [...sections, newSection];
    onChange(newSections);
    setExpandedSections((prev) => new Set([...prev, newSection.id]));
  };

  const removeSection = (id: string) => {
    onChange(sections.filter((s) => s.id !== id));
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const updateSection = (id: string, field: "titre" | "paragraphe", value: MultilingualText) => {
    onChange(
      sections.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const newSections = [...sections];
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    onChange(newSections);
  };

  const toggleExpanded = (id: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-border/50 bg-muted/20">
              <CardContent className="p-4">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => moveSection(index, "up")}
                        disabled={index === 0}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => moveSection(index, "down")}
                        disabled={index === sections.length - 1}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium text-sm">
                        Section {index + 1}
                        {section.titre.fr && `: ${section.titre.fr.substring(0, 30)}${section.titre.fr.length > 30 ? "..." : ""}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(section.id)}
                    >
                      {expandedSections.has(section.id) ? "Réduire" : "Développer"}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeSection(section.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Section Content */}
                <AnimatePresence>
                  {expandedSections.has(section.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <Separator className="bg-border/50" />

                      <MultilingualField
                        label="Titre de la section"
                        value={section.titre}
                        onChange={(value) => updateSection(section.id, "titre", value)}
                        type="input"
                        required
                        placeholder={titlePlaceholder}
                      />

                      <MultilingualField
                        label="Contenu de la section"
                        value={section.paragraphe}
                        onChange={(value) => updateSection(section.id, "paragraphe", value)}
                        type="textarea"
                        required
                        rows={6}
                        placeholder={contentPlaceholder}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Section Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed border-2 h-14 gap-2 text-muted-foreground hover:text-foreground hover:border-primary/50"
        onClick={addSection}
      >
        <Plus className="h-5 w-5" />
        Ajouter une section
      </Button>

      {sections.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-4">
          Aucune section ajoutée. Cliquez sur le bouton ci-dessus pour commencer.
        </p>
      )}
    </div>
  );
}
