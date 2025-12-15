/**
 * Page de documentation du projet
 * Documentation complète et accessible pour stakeholders
 */

import { useState, useMemo, useCallback } from "react";
import { Search, Filter, ChevronRight, ChevronDown, FileCode, Folder, X, ArrowLeft, Star, AlertTriangle, Settings, Eye, Wrench, CheckCircle, XCircle, Info, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  documentationData,
  getAllFiles,
  searchFiles,
  categoryLabels,
  categoryDescriptions,
  categoryColors,
  stakeholderRelevanceLabels,
  filterDocumentationByCategory,
  filterDocumentationByRelevance,
  type FileDoc,
  type FolderDoc,
  type FileCategory,
  type StakeholderRelevance,
} from "@/data/documentationData";

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FileCategory | "all">("all");
  const [selectedRelevance, setSelectedRelevance] = useState<StakeholderRelevance | "all">("all");
  const [selectedFile, setSelectedFile] = useState<FileDoc | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["root", "src", "components", "pages"]));
  const [searchOpen, setSearchOpen] = useState(false);
  const [detailsTab, setDetailsTab] = useState<"simple" | "technical">("simple");

  const allFiles = useMemo(() => getAllFiles(), []);

  // Filtered documentation based on category and relevance
  const filteredDocumentation = useMemo(() => {
    let docs = documentationData;
    
    if (selectedCategory !== "all") {
      docs = filterDocumentationByCategory(selectedCategory);
    }
    
    if (selectedRelevance !== "all") {
      docs = filterDocumentationByRelevance(selectedRelevance);
    }
    
    return docs;
  }, [selectedCategory, selectedRelevance]);

  const filteredFiles = useMemo(() => {
    let files = allFiles;
    
    if (searchQuery) {
      files = searchFiles(searchQuery, files);
    }
    
    if (selectedCategory !== "all") {
      files = files.filter(f => f.category === selectedCategory);
    }
    
    if (selectedRelevance !== "all") {
      files = files.filter(f => f.stakeholderRelevance === selectedRelevance);
    }
    
    return files;
  }, [allFiles, searchQuery, selectedCategory, selectedRelevance]);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return searchFiles(searchQuery, allFiles).slice(0, 10);
  }, [searchQuery, allFiles]);

  const toggleFolder = useCallback((folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  }, []);

  const handleSelectFile = useCallback((file: FileDoc) => {
    setSelectedFile(file);
    setSearchOpen(false);
    setSearchQuery("");
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategory("all");
    setSelectedRelevance("all");
    setSearchQuery("");
  }, []);

  const getRelevanceIcon = (relevance: StakeholderRelevance) => {
    switch (relevance) {
      case 'high': return <Star className="h-4 w-4 text-emerald-500" />;
      case 'medium': return <Eye className="h-4 w-4 text-amber-500" />;
      case 'low': return <Wrench className="h-4 w-4 text-slate-500" />;
      case 'none': return <Settings className="h-4 w-4 text-gray-400" />;
    }
  };

  const renderFolderTree = (folders: FolderDoc[], level = 0) => {
    return folders.map(folder => {
      const isExpanded = expandedFolders.has(folder.id);
      const indent = level * 16;

      // Check if folder has any content after filters
      if (folder.files.length === 0 && (!folder.subfolders || folder.subfolders.length === 0)) {
        return null;
      }

      return (
        <div key={folder.id}>
          <button
            onClick={() => toggleFolder(folder.id)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted/50 transition-colors rounded-md"
            style={{ paddingLeft: `${12 + indent}px` }}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            )}
            <Folder className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="font-medium truncate">{folder.name}</span>
            <Badge variant="outline" className="ml-auto text-xs">
              {folder.files.length}
            </Badge>
          </button>

          {isExpanded && (
            <div>
              {folder.files.map(file => (
                <button
                  key={file.id}
                  onClick={() => handleSelectFile(file)}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted/50 transition-colors rounded-md ${
                    selectedFile?.id === file.id ? "bg-primary/10 text-primary" : ""
                  }`}
                  style={{ paddingLeft: `${28 + indent}px` }}
                >
                  {getRelevanceIcon(file.stakeholderRelevance)}
                  <FileCode className="h-4 w-4 text-blue-500 shrink-0" />
                  <span className="truncate flex-1 text-left">{file.name}</span>
                </button>
              ))}
              {folder.subfolders && renderFolderTree(folder.subfolders, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedRelevance !== "all" || searchQuery;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold">📚 Documentation du Projet Toorrii</h1>
            <p className="text-sm text-muted-foreground">Guide complet pour comprendre et personnaliser votre plateforme</p>
          </div>

          {/* Search with autocomplete */}
          <div className="flex items-center gap-3">
            <Popover open={searchOpen} onOpenChange={setSearchOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[280px] justify-start gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">
                    {searchQuery || "Rechercher un fichier..."}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0" align="end">
                <Command>
                  <CommandInput 
                    placeholder="Rechercher par nom ou description..." 
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>Aucun fichier trouvé.</CommandEmpty>
                    <CommandGroup heading="Résultats">
                      {searchResults.map(file => (
                        <CommandItem
                          key={file.id}
                          value={file.path}
                          onSelect={() => handleSelectFile(file)}
                          className="flex items-center gap-3 py-3"
                        >
                          {getRelevanceIcon(file.stakeholderRelevance)}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{file.description}</p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`shrink-0 text-xs ${categoryColors[file.category]}`}
                          >
                            {categoryLabels[file.category]}
                          </Badge>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      {/* Filters Bar */}
      <div className="border-b bg-muted/30">
        <div className="container py-3 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filtrer par:</span>
          </div>
          
          {/* Category Filter */}
          <Select 
            value={selectedCategory} 
            onValueChange={(v) => setSelectedCategory(v as FileCategory | "all")}
          >
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Type de fichier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${categoryColors[key as FileCategory].split(' ')[0].replace('/10', '')}`} />
                    {label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Relevance Filter */}
          <Select 
            value={selectedRelevance} 
            onValueChange={(v) => setSelectedRelevance(v as StakeholderRelevance | "all")}
          >
            <SelectTrigger className="w-[200px] h-9">
              <SelectValue placeholder="Pertinence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les pertinences</SelectItem>
              {Object.entries(stakeholderRelevanceLabels).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
              <X className="h-3 w-3" />
              Effacer les filtres
            </Button>
          )}

          <div className="ml-auto text-sm text-muted-foreground">
            {filteredFiles.length} fichier(s) affiché(s)
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - File Tree */}
          <aside className="col-span-3 border rounded-lg bg-card">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Structure du projet</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Cliquez sur un fichier pour voir les détails
              </p>
            </div>
            
            {/* Legend */}
            <div className="p-3 border-b bg-muted/30 text-xs space-y-1">
              <p className="font-medium mb-2">Légende:</p>
              <div className="flex items-center gap-2">
                <Star className="h-3 w-3 text-emerald-500" />
                <span>Important pour vous</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-3 w-3 text-amber-500" />
                <span>Bon à savoir</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="h-3 w-3 text-slate-500" />
                <span>Technique</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-3 w-3 text-gray-400" />
                <span>Système (ne pas toucher)</span>
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100vh-340px)]">
              <div className="p-2">
                {renderFolderTree(filteredDocumentation)}
              </div>
            </ScrollArea>
          </aside>

          {/* Main Content */}
          <main className="col-span-9">
            {selectedFile ? (
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <FileCode className="h-6 w-6 text-blue-500" />
                        <CardTitle className="text-2xl">{selectedFile.name}</CardTitle>
                        <Badge className={categoryColors[selectedFile.category]}>
                          {categoryLabels[selectedFile.category]}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={stakeholderRelevanceLabels[selectedFile.stakeholderRelevance].color}
                        >
                          {stakeholderRelevanceLabels[selectedFile.stakeholderRelevance].label}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        {selectedFile.description}
                      </CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setSelectedFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <code className="px-2 py-1 bg-muted rounded text-xs">{selectedFile.path}</code>
                  </div>

                  {/* Stakeholder Note Alert */}
                  <div className={`mt-4 p-4 rounded-lg border ${
                    selectedFile.stakeholderRelevance === 'high' 
                      ? 'bg-emerald-500/5 border-emerald-500/20' 
                      : selectedFile.stakeholderRelevance === 'medium'
                      ? 'bg-amber-500/5 border-amber-500/20'
                      : 'bg-muted/50 border-border'
                  }`}>
                    <div className="flex items-start gap-3">
                      {selectedFile.stakeholderRelevance === 'high' ? (
                        <Lightbulb className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : selectedFile.stakeholderRelevance === 'medium' ? (
                        <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium text-sm">
                          {selectedFile.stakeholderRelevance === 'high' 
                            ? "💡 Ce fichier vous concerne!" 
                            : selectedFile.stakeholderRelevance === 'medium'
                            ? "📋 Bon à savoir"
                            : "⚙️ Fichier technique"
                          }
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedFile.stakeholderNote}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <Separator />

                <CardContent className="pt-6 space-y-6">
                  {/* Can Modify Badge */}
                  <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    {selectedFile.canModify ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                        <div>
                          <p className="font-medium text-emerald-600">Modifiable</p>
                          <p className="text-sm text-muted-foreground">Vous pouvez demander des modifications sur ce fichier</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium text-red-600">Ne pas modifier</p>
                          <p className="text-sm text-muted-foreground">Ce fichier est technique et ne doit pas être modifié</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* What to Modify */}
                  {selectedFile.canModify && selectedFile.whatToModify && selectedFile.whatToModify.length > 0 && (
                    <section className="p-4 border rounded-lg bg-emerald-500/5 border-emerald-500/20">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-emerald-600" />
                        Ce que vous pouvez personnaliser
                      </h3>
                      <ul className="space-y-2">
                        {selectedFile.whatToModify.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Tabs for Simple/Technical */}
                  <Tabs value={detailsTab} onValueChange={(v) => setDetailsTab(v as "simple" | "technical")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="simple" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Explication simple
                      </TabsTrigger>
                      <TabsTrigger value="technical" className="gap-2">
                        <Wrench className="h-4 w-4" />
                        Détails techniques
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="simple" className="mt-4">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <div className="bg-muted/30 p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap">
                          {selectedFile.nonTechnicalDetails}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="technical" className="mt-4">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                          {selectedFile.technicalDetails}
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Variables (for style files) */}
                  {selectedFile.variables && selectedFile.variables.length > 0 && (
                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        🎨 Variables de style
                      </h3>
                      <div className="grid gap-2">
                        {selectedFile.variables.map((variable, index) => (
                          <div 
                            key={index}
                            className={`flex items-center gap-4 p-3 rounded-lg border ${
                              variable.canChange 
                                ? 'bg-emerald-500/5 border-emerald-500/20' 
                                : 'bg-muted/50 border-border'
                            }`}
                          >
                            <code className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-mono shrink-0">
                              {variable.name}
                            </code>
                            <span className="text-sm flex-1">{variable.description}</span>
                            {variable.type && (
                              <Badge variant="outline" className="text-xs shrink-0">
                                {variable.type}
                              </Badge>
                            )}
                            {variable.canChange ? (
                              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shrink-0">
                                Modifiable
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-muted-foreground shrink-0">
                                Fixe
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Exports */}
                  {selectedFile.exports && selectedFile.exports.length > 0 && (
                    <section>
                      <h3 className="font-semibold text-lg mb-3">Exports</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedFile.exports.map((exp, index) => (
                          <code 
                            key={index}
                            className="px-3 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md text-sm font-mono"
                          >
                            {exp}
                          </code>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Dependencies */}
                  {selectedFile.dependencies && selectedFile.dependencies.length > 0 && (
                    <section>
                      <h3 className="font-semibold text-lg mb-3">Dépendances</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedFile.dependencies.map((dep, index) => (
                          <Badge key={index} variant="secondary">
                            {dep}
                          </Badge>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Used By */}
                  {selectedFile.usedBy && selectedFile.usedBy.length > 0 && (
                    <section>
                      <h3 className="font-semibold text-lg mb-3">Utilisé par</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedFile.usedBy.map((use, index) => (
                          <code 
                            key={index}
                            className="px-3 py-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-md text-sm"
                          >
                            {use}
                          </code>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Related Files */}
                  {selectedFile.relatedFiles && selectedFile.relatedFiles.length > 0 && (
                    <section>
                      <h3 className="font-semibold text-lg mb-3">Fichiers associés</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedFile.relatedFiles.map((file, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => {
                              const found = allFiles.find(f => f.path.includes(file) || f.name === file);
                              if (found) handleSelectFile(found);
                            }}
                          >
                            <FileCode className="h-3 w-3" />
                            {file}
                          </Button>
                        ))}
                      </div>
                    </section>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Welcome Card */}
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-2xl">👋 Bienvenue dans votre documentation!</CardTitle>
                    <CardDescription className="text-base">
                      Cette documentation a été créée spécialement pour vous permettre de comprendre et personnaliser votre plateforme Toorrii, même sans connaissances techniques.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-background rounded-lg">
                        <p className="text-3xl font-bold text-primary">{allFiles.length}</p>
                        <p className="text-sm text-muted-foreground">Fichiers documentés</p>
                      </div>
                      <div className="text-center p-4 bg-background rounded-lg">
                        <p className="text-3xl font-bold text-emerald-500">
                          {allFiles.filter(f => f.stakeholderRelevance === 'high').length}
                        </p>
                        <p className="text-sm text-muted-foreground">Importants pour vous</p>
                      </div>
                      <div className="text-center p-4 bg-background rounded-lg">
                        <p className="text-3xl font-bold text-blue-500">
                          {allFiles.filter(f => f.canModify).length}
                        </p>
                        <p className="text-sm text-muted-foreground">Personnalisables</p>
                      </div>
                      <div className="text-center p-4 bg-background rounded-lg">
                        <p className="text-3xl font-bold text-amber-500">
                          {allFiles.filter(f => f.isStyleFile).length}
                        </p>
                        <p className="text-sm text-muted-foreground">Fichiers de style</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Access - Important Files */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-emerald-500" />
                      Fichiers importants pour vous
                    </CardTitle>
                    <CardDescription>
                      Ces fichiers sont ceux que vous voudrez probablement personnaliser ou comprendre en priorité
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {allFiles.filter(f => f.stakeholderRelevance === 'high').slice(0, 6).map(file => (
                        <button
                          key={file.id}
                          onClick={() => handleSelectFile(file)}
                          className="flex items-center gap-4 p-4 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 transition-colors rounded-lg text-left"
                        >
                          <Star className="h-5 w-5 text-emerald-500 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{file.description}</p>
                          </div>
                          <Badge className={categoryColors[file.category]}>
                            {categoryLabels[file.category]}
                          </Badge>
                          {file.canModify && (
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                              Modifiable
                            </Badge>
                          )}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Category Overview or Filtered Results */}
                {hasActiveFilters ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Résultats filtrés
                      </CardTitle>
                      <CardDescription>
                        {filteredFiles.length} fichier(s) correspondant à vos critères
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        {filteredFiles.slice(0, 10).map(file => (
                          <button
                            key={file.id}
                            onClick={() => handleSelectFile(file)}
                            className="flex items-center gap-4 p-4 bg-muted/50 hover:bg-muted transition-colors rounded-lg text-left"
                          >
                            {getRelevanceIcon(file.stakeholderRelevance)}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-muted-foreground truncate">{file.description}</p>
                            </div>
                            <Badge className={categoryColors[file.category]}>
                              {categoryLabels[file.category]}
                            </Badge>
                          </button>
                        ))}
                        {filteredFiles.length > 10 && (
                          <p className="text-sm text-muted-foreground text-center py-2">
                            + {filteredFiles.length - 10} autres fichiers
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  /* Category Overview */
                  <Card>
                    <CardHeader>
                      <CardTitle>Explorer par catégorie</CardTitle>
                      <CardDescription>
                        Cliquez sur une catégorie pour voir les fichiers correspondants
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(categoryLabels).map(([key, label]) => {
                          const categoryFiles = allFiles.filter(f => f.category === key);
                          if (categoryFiles.length === 0) return null;
                          
                          return (
                            <button
                              key={key}
                              className="p-4 border rounded-lg hover:border-primary/50 transition-colors text-left"
                              onClick={() => setSelectedCategory(key as FileCategory)}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">{label}</span>
                                <Badge className={categoryColors[key as FileCategory]}>
                                  {categoryFiles.length}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {categoryDescriptions[key as FileCategory]}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
