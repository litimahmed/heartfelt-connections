/**
 * Données de documentation du projet
 * Documentation complète et détaillée pour le stakeholder
 * Contient des explications techniques et non-techniques
 */

export type FileCategory = 
  | 'configuration'
  | 'composant'
  | 'page'
  | 'hook'
  | 'service'
  | 'contexte'
  | 'type'
  | 'style'
  | 'utilitaire'
  | 'asset';

export type StakeholderRelevance = 'high' | 'medium' | 'low' | 'none';

export interface FileDoc {
  id: string;
  path: string;
  name: string;
  category: FileCategory;
  description: string;
  // Explication technique (pour développeurs)
  technicalDetails: string;
  // Explication non-technique (pour stakeholder)
  nonTechnicalDetails: string;
  // Est-ce que le stakeholder devrait s'intéresser à ce fichier?
  stakeholderRelevance: StakeholderRelevance;
  // Pourquoi le stakeholder devrait/ne devrait pas modifier ce fichier
  stakeholderNote: string;
  // Peut-il modifier ce fichier sans risque?
  canModify: boolean;
  // Quoi modifier dans ce fichier
  whatToModify?: string[];
  dependencies?: string[];
  exports?: string[];
  usedBy?: string[];
  relatedFiles?: string[];
  isStyleFile?: boolean;
  variables?: { name: string; description: string; type?: string; canChange?: boolean }[];
}

export interface FolderDoc {
  id: string;
  path: string;
  name: string;
  description: string;
  // Description pour non-technicien
  nonTechnicalDescription: string;
  // Pertinence pour le stakeholder
  stakeholderRelevance: StakeholderRelevance;
  files: FileDoc[];
  subfolders?: FolderDoc[];
}

export const categoryLabels: Record<FileCategory, string> = {
  configuration: 'Configuration',
  composant: 'Composant',
  page: 'Page',
  hook: 'Hook',
  service: 'Service',
  contexte: 'Contexte',
  type: 'Type',
  style: 'Style',
  utilitaire: 'Utilitaire',
  asset: 'Asset',
};

export const categoryDescriptions: Record<FileCategory, string> = {
  configuration: "Fichiers qui contrôlent le comportement global de l'application",
  composant: "Blocs visuels réutilisables (boutons, cartes, menus, etc.)",
  page: "Écrans complets visibles par les utilisateurs",
  hook: "Logique métier réutilisable (connexion API, états, etc.)",
  service: "Communication avec le serveur et les API externes",
  contexte: "Données partagées entre plusieurs écrans (langue, thème, utilisateur)",
  type: "Définitions de la structure des données",
  style: "Couleurs, polices, apparence visuelle",
  utilitaire: "Petites fonctions d'aide",
  asset: "Images, logos, icônes",
};

export const stakeholderRelevanceLabels: Record<StakeholderRelevance, { label: string; color: string; description: string }> = {
  high: { 
    label: '⭐ Très important', 
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    description: 'Ce fichier peut être modifié pour personnaliser votre plateforme'
  },
  medium: { 
    label: '📋 Bon à savoir', 
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    description: 'Comprendre ce fichier vous aidera à discuter avec les développeurs'
  },
  low: { 
    label: '🔧 Technique', 
    color: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
    description: 'Fichier technique, laissez-le aux développeurs'
  },
  none: { 
    label: '⚙️ Système', 
    color: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    description: 'Ne pas toucher - fichier système critique'
  },
};

export const categoryColors: Record<FileCategory, string> = {
  configuration: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  composant: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  page: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  hook: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  service: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  contexte: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  type: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  style: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  utilitaire: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
  asset: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
};

export const documentationData: FolderDoc[] = [
  {
    id: 'root',
    path: '/',
    name: 'Racine du projet',
    description: 'Fichiers de configuration principaux du projet',
    nonTechnicalDescription: "Ces fichiers contrôlent le comportement global de votre application. Certains sont très importants pour personnaliser l'apparence de votre site.",
    stakeholderRelevance: 'medium',
    files: [
      {
        id: 'index-html',
        path: '/index.html',
        name: 'index.html',
        category: 'configuration',
        description: "Point d'entrée HTML de l'application",
        technicalDetails: `Ce fichier est le point d'entrée principal de l'application React. Il contient:

• La balise \`<div id="root">\` où React monte l'application
• Les métadonnées SEO (title, description, viewport)
• Les liens vers les favicons
• L'import du script principal via Vite

**Structure HTML de base**:
\`\`\`html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Toorrii</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
\`\`\``,
        nonTechnicalDetails: `**Qu'est-ce que c'est?**
C'est la première page que le navigateur charge. C'est comme la couverture d'un livre - elle contient le titre du site et les informations de base.

**Ce que vous pouvez personnaliser:**
• Le titre qui apparaît dans l'onglet du navigateur
• La description du site pour Google
• L'icône (favicon) qui s'affiche dans l'onglet

**Exemple concret:**
Quand quelqu'un partage votre site sur Facebook ou LinkedIn, le titre et la description de ce fichier apparaissent dans l'aperçu.`,
        stakeholderRelevance: 'medium',
        stakeholderNote: "Vous pouvez modifier le titre et la description du site. Demandez à un développeur si vous voulez changer ces éléments pour le référencement (SEO).",
        canModify: true,
        whatToModify: [
          "Le titre dans <title>Toorrii</title>",
          "La meta description pour le SEO",
          "Le favicon (icône de l'onglet)"
        ],
        relatedFiles: ['src/main.tsx'],
      },
      {
        id: 'vite-config',
        path: '/vite.config.ts',
        name: 'vite.config.ts',
        category: 'configuration',
        description: 'Configuration du bundler Vite',
        technicalDetails: `Configuration de Vite pour le projet React. Contient:

• **Plugins**: react() pour le support JSX/TSX
• **Alias de chemin**: \`@/\` pointe vers \`src/\`
• **Configuration du serveur de développement**
• **Options de build pour la production**

**Variables importantes**:
\`\`\`typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
\`\`\``,
        nonTechnicalDetails: `**Qu'est-ce que c'est?**
C'est le fichier qui dit à l'ordinateur comment "construire" votre site web. Imaginez-le comme la recette qui transforme tous vos ingrédients (code) en un plat fini (site web).

**Pourquoi c'est important?**
Sans ce fichier, votre site ne pourrait pas fonctionner. Il s'assure que tout le code est correctement assemblé.

**Devez-vous y toucher?**
Non. Ce fichier est purement technique et fonctionne parfaitement tel quel.`,
        stakeholderRelevance: 'none',
        stakeholderNote: "Ne pas modifier. C'est un fichier système critique géré par l'équipe technique.",
        canModify: false,
        exports: ['default config'],
        relatedFiles: ['tsconfig.json'],
      },
      {
        id: 'tailwind-config',
        path: '/tailwind.config.ts',
        name: 'tailwind.config.ts',
        category: 'style',
        description: '🎨 FICHIER CLÉ - Couleurs et apparence de la plateforme',
        technicalDetails: `Fichier de configuration principal de Tailwind CSS. Définit:

• **Thème personnalisé**: Couleurs, espacements, typographies
• **Plugins**: tailwindcss-animate pour les animations
• **Mode sombre**: Configuration du dark mode
• **Extensions du thème**: Variables CSS personnalisées

**Structure du thème**:
\`\`\`typescript
theme: {
  extend: {
    colors: {
      primary: "hsl(var(--primary))",
      secondary: "hsl(var(--secondary))",
      accent: "hsl(var(--accent))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
    },
  },
}
\`\`\`

**Ajouter une nouvelle couleur**:
1. Définir la variable dans index.css
2. L'ajouter ici dans colors
3. Utiliser avec \`bg-nouvelle-couleur\``,
        nonTechnicalDetails: `**🌈 C'EST LE FICHIER LE PLUS IMPORTANT POUR VOUS!**

Ce fichier contrôle TOUTES les couleurs et l'apparence de votre plateforme Toorrii.

**Qu'est-ce que vous pouvez changer?**

1. **La couleur principale (primary)**
   - C'est la couleur de votre marque (actuellement le vert/teal)
   - Elle est utilisée sur les boutons, les liens, les accents

2. **La couleur secondaire (secondary)**
   - Pour les éléments moins importants
   - Badges, tags, boutons secondaires

3. **Les couleurs d'accentuation**
   - Pour attirer l'attention sur certains éléments

**Comment ça marche (simplifié)?**
Les couleurs sont définies en "HSL" (Teinte-Saturation-Luminosité):
- Teinte: La couleur (0-360, comme un cercle de couleurs)
- Saturation: L'intensité (0%=gris, 100%=vif)
- Luminosité: Clair ou foncé (0%=noir, 100%=blanc)

**Exemple pour changer la couleur principale:**
Si vous voulez du bleu au lieu du vert, demandez à votre développeur de changer la valeur de \`--primary\` dans index.css.`,
        stakeholderRelevance: 'high',
        stakeholderNote: "⭐ TRÈS IMPORTANT! Ce fichier contrôle l'identité visuelle de votre plateforme. Travaillez avec un développeur pour ajuster les couleurs selon votre charte graphique.",
        canModify: true,
        whatToModify: [
          "Couleur principale (primary) - la couleur de votre marque",
          "Couleur secondaire (secondary)",
          "Couleurs d'accentuation (accent)",
          "Rayons des bordures (border-radius) pour des coins plus ou moins arrondis"
        ],
        isStyleFile: true,
        relatedFiles: ['src/index.css'],
        variables: [
          { name: 'primary', description: 'Couleur principale de votre marque (boutons, liens actifs)', type: 'HSL', canChange: true },
          { name: 'secondary', description: 'Couleur secondaire (badges, boutons alternatifs)', type: 'HSL', canChange: true },
          { name: 'accent', description: "Couleur d'accentuation pour attirer l'attention", type: 'HSL', canChange: true },
          { name: 'background', description: 'Couleur de fond des pages', type: 'HSL', canChange: true },
          { name: 'foreground', description: 'Couleur du texte principal', type: 'HSL', canChange: true },
          { name: 'muted', description: 'Couleurs atténuées pour textes secondaires', type: 'HSL', canChange: true },
          { name: 'destructive', description: "Rouge pour les alertes et suppressions", type: 'HSL', canChange: false },
          { name: 'border', description: 'Couleur des bordures', type: 'HSL', canChange: true },
          { name: 'radius', description: 'Arrondi des coins (0.5rem = légèrement arrondi)', type: 'rem', canChange: true },
        ],
      },
      {
        id: 'eslint-config',
        path: '/eslint.config.js',
        name: 'eslint.config.js',
        category: 'configuration',
        description: 'Configuration du linter ESLint',
        technicalDetails: `Configuration ESLint pour maintenir la qualité du code:

• **Règles TypeScript**: Vérification des types
• **Règles React**: Hooks, JSX
• **Règles d'accessibilité**: a11y
• **Formatage**: Intégration avec Prettier`,
        nonTechnicalDetails: `**Qu'est-ce que c'est?**
C'est un "correcteur orthographique" pour le code. Il vérifie que les développeurs écrivent du code propre et cohérent.

**Pourquoi c'est utile?**
Cela évite les erreurs et garantit que tout le code suit les mêmes règles de style.

**Devez-vous y toucher?**
Non, jamais. C'est un outil pour les développeurs.`,
        stakeholderRelevance: 'none',
        stakeholderNote: "Fichier purement technique pour les développeurs. À ignorer.",
        canModify: false,
      },
      {
        id: 'env',
        path: '/.env',
        name: '.env',
        category: 'configuration',
        description: 'Variables d\'environnement (secrets et configuration)',
        technicalDetails: `Fichier contenant les variables d'environnement:

• **VITE_API_URL**: URL de l'API backend
• **Clés API**: Secrets pour services externes
• **Modes**: Production, développement, staging

**Format**:
\`\`\`
VITE_API_URL=https://api.toorrii.com
VITE_SOME_KEY=secret_value
\`\`\`

**Sécurité**: Ce fichier ne doit JAMAIS être partagé publiquement.`,
        nonTechnicalDetails: `**Qu'est-ce que c'est?**
C'est comme un coffre-fort qui contient les "mots de passe" de votre application - les clés pour se connecter aux différents services.

**Que contient-il?**
• L'adresse du serveur de données
• Les clés secrètes pour les services externes (paiement, email, etc.)

**ATTENTION SÉCURITÉ:**
Ce fichier est CONFIDENTIEL. Ne le partagez jamais par email, chat ou sur internet.`,
        stakeholderRelevance: 'medium',
        stakeholderNote: "Important à connaître mais NE JAMAIS PARTAGER. Contient des informations sensibles.",
        canModify: false,
      },
    ],
  },
  {
    id: 'src',
    path: '/src',
    name: 'src',
    description: 'Code source principal de l\'application',
    nonTechnicalDescription: "C'est le cœur de votre application. Tout ce qui fait fonctionner Toorrii se trouve ici.",
    stakeholderRelevance: 'high',
    files: [
      {
        id: 'main-tsx',
        path: '/src/main.tsx',
        name: 'main.tsx',
        category: 'configuration',
        description: "Point d'entrée JavaScript de l'application",
        technicalDetails: `Ce fichier initialise l'application React:

\`\`\`typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
\`\`\`

**Responsabilités**:
• Monte le composant App sur l'élément #root
• Configure le BrowserRouter pour la navigation
• Importe les styles globaux`,
        nonTechnicalDetails: `**Qu'est-ce que c'est?**
C'est le "démarreur" de votre application. Quand quelqu'un visite votre site, ce fichier lance tout le reste.

**Analogie:**
Imaginez le démarrage d'une voiture. Ce fichier est la clé de contact qui met le moteur en marche.

**Devez-vous y toucher?**
Non. Ce fichier fonctionne automatiquement.`,
        stakeholderRelevance: 'none',
        stakeholderNote: "Fichier technique critique. Ne pas modifier.",
        canModify: false,
        dependencies: ['react', 'react-dom', 'react-router-dom'],
        exports: ['Application React'],
        relatedFiles: ['src/App.tsx', 'index.html'],
      },
      {
        id: 'app-tsx',
        path: '/src/App.tsx',
        name: 'App.tsx',
        category: 'composant',
        description: 'Configuration des routes et pages de l\'application',
        technicalDetails: `Composant principal de l'application. Responsable de:

**Configuration des routes**:
\`\`\`typescript
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/about-us" element={<AboutUs />} />
  <Route path="/contact" element={<ContactUs />} />
  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  <Route path="/terms-of-service" element={<TermsOfService />} />
  <Route path="/documentation" element={<Documentation />} />
  
  {/* Routes Admin */}
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin/*" element={<ProtectedRoute><AdminRoutes /></ProtectedRoute>} />
</Routes>
\`\`\`

**Providers globaux**:
• QueryClientProvider (React Query)
• TooltipProvider
• Toaster (notifications)`,
        nonTechnicalDetails: `**Qu'est-ce que c'est?**
C'est le "plan" de votre site. Il définit quelle page s'affiche quand vous allez à quelle adresse.

**Exemple concret:**
• Quand vous allez sur toorrii.com/ → la page d'accueil s'affiche
• Quand vous allez sur toorrii.com/about-us → la page "À propos" s'affiche
• Quand vous allez sur toorrii.com/admin → le tableau de bord admin s'affiche

**C'est aussi là qu'on définit:**
• Les pages protégées (qui nécessitent une connexion)
• L'ordre de chargement des différentes parties du site`,
        stakeholderRelevance: 'medium',
        stakeholderNote: "Utile à comprendre pour savoir comment les pages sont organisées. Modifications réservées aux développeurs.",
        canModify: false,
        dependencies: ['@tanstack/react-query', 'react-router-dom'],
        exports: ['App'],
        usedBy: ['main.tsx'],
      },
      {
        id: 'index-css',
        path: '/src/index.css',
        name: 'index.css',
        category: 'style',
        description: '🎨 FICHIER CLÉ - Variables de couleurs et styles globaux',
        technicalDetails: `Fichier CSS principal contenant toutes les variables du design system:

**Variables de thème clair** (\`:root\`):
\`\`\`css
:root {
  --background: 0 0% 100%;        /* Blanc */
  --foreground: 222.2 84% 4.9%;   /* Noir bleuté */
  --primary: 171 77% 38%;         /* Vert Toorrii */
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 96.1%;
  --accent: 171 77% 38%;
  --muted: 210 40% 96.1%;
  --destructive: 0 84.2% 60.2%;   /* Rouge erreur */
  --border: 214.3 31.8% 91.4%;
  --radius: 0.5rem;
}
\`\`\`

**Variables de thème sombre** (\`.dark\`):
\`\`\`css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 171 77% 45%;
  /* ... */
}
\`\`\`

**Directives Tailwind**:
\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\``,
        nonTechnicalDetails: `**🌈 FICHIER ESSENTIEL POUR L'IDENTITÉ VISUELLE!**

C'est ici que sont définies TOUTES les couleurs de votre plateforme Toorrii.

**Comment lire les couleurs?**
Les couleurs sont en format HSL (Teinte Saturation Luminosité):
• \`171 77% 38%\` = Vert Toorrii
  - 171 = la teinte (vert-turquoise sur le cercle des couleurs)
  - 77% = saturation (très vif)
  - 38% = luminosité (moyennement foncé)

**Les couleurs principales à connaître:**

| Nom | Utilisation | Où vous la voyez |
|-----|-------------|------------------|
| primary | Couleur de marque | Boutons, liens, accents |
| secondary | Éléments secondaires | Badges, fonds légers |
| background | Fond des pages | Arrière-plan général |
| foreground | Texte | Tout le texte |
| destructive | Alertes/Erreurs | Messages d'erreur, suppression |

**Mode sombre:**
Le fichier contient aussi les couleurs pour le mode sombre. Quand un utilisateur active le mode sombre, ces couleurs alternatives s'appliquent automatiquement.`,
        stakeholderRelevance: 'high',
        stakeholderNote: "⭐ TRÈS IMPORTANT! C'est ici que vous changez les couleurs de votre marque. Travaillez avec un développeur pour ajuster les valeurs HSL.",
        canModify: true,
        whatToModify: [
          "La couleur primary (171 77% 38%) - votre couleur de marque",
          "Les couleurs du mode clair dans :root",
          "Les couleurs du mode sombre dans .dark",
          "La variable --radius pour l'arrondi des coins"
        ],
        isStyleFile: true,
        relatedFiles: ['tailwind.config.ts'],
        variables: [
          { name: '--background', description: 'Fond principal des pages (blanc en mode clair)', type: 'HSL', canChange: true },
          { name: '--foreground', description: 'Couleur du texte principal', type: 'HSL', canChange: true },
          { name: '--primary', description: '⭐ Couleur principale de Toorrii (vert turquoise)', type: 'HSL', canChange: true },
          { name: '--primary-foreground', description: 'Texte sur les boutons/éléments primary', type: 'HSL', canChange: false },
          { name: '--secondary', description: 'Couleur secondaire pour variantes', type: 'HSL', canChange: true },
          { name: '--accent', description: "Couleur d'accentuation (liens, hover)", type: 'HSL', canChange: true },
          { name: '--muted', description: 'Arrière-plan atténué pour sections secondaires', type: 'HSL', canChange: true },
          { name: '--muted-foreground', description: 'Texte secondaire/grisé', type: 'HSL', canChange: true },
          { name: '--destructive', description: 'Rouge pour erreurs et suppressions', type: 'HSL', canChange: false },
          { name: '--border', description: 'Couleur des bordures', type: 'HSL', canChange: true },
          { name: '--radius', description: 'Arrondi des coins (0.5rem par défaut)', type: 'rem', canChange: true },
        ],
      },
      {
        id: 'app-css',
        path: '/src/App.css',
        name: 'App.css',
        category: 'style',
        description: 'Styles additionnels du composant App',
        technicalDetails: `Styles CSS spécifiques au composant App. Généralement utilisé pour:
• Animations globales
• Styles de transition entre pages
• Overrides spécifiques`,
        nonTechnicalDetails: `**Qu'est-ce que c'est?**
Un fichier de styles supplémentaires. Il est généralement vide ou contient très peu de code.

**Devez-vous y toucher?**
Non. Les styles principaux sont dans index.css.`,
        stakeholderRelevance: 'none',
        stakeholderNote: "Fichier secondaire. Utilisez plutôt index.css pour les changements de style.",
        canModify: false,
        isStyleFile: true,
      },
    ],
    subfolders: [
      {
        id: 'components',
        path: '/src/components',
        name: 'components',
        description: 'Composants React réutilisables',
        nonTechnicalDescription: "Les \"briques\" visuelles de votre site. Chaque bouton, carte, formulaire est un composant réutilisable.",
        stakeholderRelevance: 'medium',
        files: [
          {
            id: 'header',
            path: '/src/components/Header.tsx',
            name: 'Header.tsx',
            category: 'composant',
            description: 'En-tête principal du site public',
            technicalDetails: `Composant d'en-tête pour les pages publiques:

**Structure**:
\`\`\`tsx
<header>
  <Logo />
  <Navigation links={[...]} />
  <LanguageToggle />
  <MobileMenu />
</header>
\`\`\`

**Fonctionnalités**:
• Logo Toorrii avec lien vers l'accueil
• Navigation principale (liens vers sections)
• Sélecteur de langue (FR/EN/AR)
• Support RTL pour l'arabe
• Menu hamburger responsive pour mobile

**Contextes utilisés**: TranslationContext pour i18n`,
            nonTechnicalDetails: `**Qu'est-ce que c'est?**
C'est la barre de navigation en haut de toutes les pages publiques de votre site.

**Ce qu'elle contient:**
• Votre logo Toorrii (cliquable pour revenir à l'accueil)
• Les liens de navigation (Accueil, À propos, Contact, etc.)
• Le sélecteur de langue (Français, English, العربية)
• Un menu "hamburger" sur mobile (les 3 petites lignes)

**Personnalisations possibles:**
• Changer le logo
• Modifier les liens de navigation
• Ajouter ou retirer des langues`,
            stakeholderRelevance: 'high',
            stakeholderNote: "Important! Vous pouvez demander à modifier le logo, les liens de navigation et les langues disponibles.",
            canModify: true,
            whatToModify: [
              "Le logo affiché",
              "Les liens de navigation",
              "Les langues disponibles"
            ],
            dependencies: ['react-router-dom', 'lucide-react', 'framer-motion'],
            exports: ['Header'],
            usedBy: ['pages/Index.tsx'],
          },
          {
            id: 'footer',
            path: '/src/components/Footer.tsx',
            name: 'Footer.tsx',
            category: 'composant',
            description: 'Pied de page du site public',
            technicalDetails: `Composant de pied de page:

**Sections**:
• Logo et description
• Liens utiles (navigation secondaire)
• Liens légaux (CGU, Confidentialité)
• Réseaux sociaux
• Copyright

**Support multilingue**: Oui, via TranslationContext`,
            nonTechnicalDetails: `**Qu'est-ce que c'est?**
C'est le bas de toutes vos pages, affiché en permanence. Il contient généralement:

**Ce qu'on y trouve:**
• Une version du logo
• Des liens vers les pages importantes
• Les mentions légales (CGU, Politique de confidentialité)
• Les icônes de réseaux sociaux
• Le copyright "© 2024 Toorrii"

**Pourquoi c'est important:**
Le footer est visible sur TOUTES les pages. C'est un endroit stratégique pour mettre vos informations de contact et liens légaux.`,
            stakeholderRelevance: 'high',
            stakeholderNote: "Vous voudrez probablement personnaliser les liens, les informations de contact et les réseaux sociaux affichés.",
            canModify: true,
            whatToModify: [
              "Les liens affichés",
              "Les réseaux sociaux",
              "Les informations de contact",
              "Le texte de copyright"
            ],
            exports: ['Footer'],
            usedBy: ['pages/Index.tsx'],
          },
          {
            id: 'hero',
            path: '/src/components/Hero.tsx',
            name: 'Hero.tsx',
            category: 'composant',
            description: "Section héro de la page d'accueil (première impression)",
            technicalDetails: `Section principale de la landing page:

**Éléments**:
• Titre principal (H1) avec animations
• Sous-titre descriptif
• Boutons CTA (Call-to-Action)
• Image ou illustration principale
• Animations d'entrée avec Framer Motion

**Structure**:
\`\`\`tsx
<section className="hero">
  <motion.h1 animate={...}>Titre Principal</motion.h1>
  <p>Description accrocheuse</p>
  <div className="cta-buttons">
    <Button>Commencer</Button>
    <Button variant="outline">En savoir plus</Button>
  </div>
  <HeroImage />
</section>
\`\`\``,
            nonTechnicalDetails: `**Qu'est-ce que c'est?**
C'est LA PREMIÈRE CHOSE que vos visiteurs voient en arrivant sur votre site. C'est la grande section en haut de la page d'accueil.

**Pourquoi c'est crucial:**
Vous avez environ 3 secondes pour convaincre un visiteur de rester. Cette section doit:
• Expliquer clairement ce que fait Toorrii
• Donner envie d'en savoir plus
• Avoir un bouton d'action clair ("Commencer", "Essayer", etc.)

**Ce que vous pouvez personnaliser:**
• Le titre principal (le plus gros texte)
• Le sous-titre explicatif
• Les boutons d'action
• L'image ou illustration`,
            stakeholderRelevance: 'high',
            stakeholderNote: "⭐ TRÈS IMPORTANT! C'est votre première impression. Le texte, l'image et les boutons d'action devraient être soigneusement réfléchis.",
            canModify: true,
            whatToModify: [
              "Le titre principal (slogan)",
              "Le texte descriptif",
              "Les boutons d'action",
              "L'image de fond ou illustration"
            ],
            dependencies: ['framer-motion'],
            exports: ['Hero'],
            usedBy: ['pages/Index.tsx'],
          },
          {
            id: 'features',
            path: '/src/components/Features.tsx',
            name: 'Features.tsx',
            category: 'composant',
            description: 'Section des fonctionnalités',
            technicalDetails: `Présente les fonctionnalités principales:

**Structure**:
\`\`\`tsx
const features = [
  { icon: <Icon />, title: "...", description: "..." },
  // ...
];

<section>
  {features.map(feature => (
    <FeatureCard key={feature.title} {...feature} />
  ))}
</section>
\`\`\`

**Animations**: Apparition au scroll avec Framer Motion`,
            nonTechnicalDetails: `**Qu'est-ce que c'est?**
La section qui présente les fonctionnalités principales de Toorrii. Généralement affichée sous forme de cartes avec icônes.

**Ce qu'elle montre:**
• Les avantages clés de votre plateforme
• Ce que les utilisateurs peuvent faire
• Pourquoi choisir Toorrii

**Format typique:**
Chaque fonctionnalité a:
• Une icône représentative
• Un titre court
• Une description de 1-2 phrases`,
            stakeholderRelevance: 'high',
            stakeholderNote: "Important! Définissez clairement vos 3-6 fonctionnalités clés à mettre en avant.",
            canModify: true,
            whatToModify: [
              "La liste des fonctionnalités",
              "Les titres et descriptions",
              "Les icônes utilisées"
            ],
            exports: ['Features'],
            usedBy: ['pages/Index.tsx'],
          },
          {
            id: 'partnerships',
            path: '/src/components/Partnerships.tsx',
            name: 'Partnerships.tsx',
            category: 'composant',
            description: 'Section des partenariats',
            technicalDetails: `Affiche les logos et informations des partenaires:

**Données**: Chargées depuis l'API via usePartners hook
**Affichage**: Grille ou carrousel de logos
**Liens**: Chaque partenaire peut avoir une page détail`,
            nonTechnicalDetails: `**Qu'est-ce que c'est?**
La section qui affiche vos partenaires officiels. Cela rassure les visiteurs et renforce votre crédibilité.

**Ce qu'elle affiche:**
• Les logos de vos partenaires
• Potentiellement leur nom
• Liens vers plus de détails

**Conseil:**
Avoir des partenaires reconnus (banques, opérateurs, institutions) renforce la confiance des utilisateurs.`,
            stakeholderRelevance: 'high',
            stakeholderNote: "Gérez vos partenaires depuis l'interface admin. Cette section se met à jour automatiquement.",
            canModify: true,
            whatToModify: [
              "Les partenaires (via l'admin)",
              "L'ordre d'affichage",
              "Le style d'affichage"
            ],
            dependencies: ['hooks/usePartners'],
            exports: ['Partnerships'],
          },
          {
            id: 'stats',
            path: '/src/components/Stats.tsx',
            name: 'Stats.tsx',
            category: 'composant',
            description: 'Section des statistiques',
            technicalDetails: `Affiche les métriques clés avec animations:

**Éléments**:
• Compteurs animés (incrémentation)
• Nombres formatés (1K, 10M, etc.)
• Labels explicatifs

**Animation**: Les nombres s'incrémentent quand la section devient visible`,
            nonTechnicalDetails: `**Qu'est-ce que c'est?**
Une section qui affiche vos chiffres clés de manière impactante:
• Nombre d'utilisateurs
• Nombre de partenaires
• Transactions traitées
• Etc.

**Pourquoi c'est important:**
Les chiffres concrets rassurent les visiteurs et démontrent votre succès.

**Conseil:**
Mettez des vrais chiffres à jour régulièrement. Les visiteurs remarquent les chiffres qui semblent inventés.`,
            stakeholderRelevance: 'high',
            stakeholderNote: "Tenez ces chiffres à jour! Ils doivent refléter la réalité de votre activité.",
            canModify: true,
            whatToModify: [
              "Les chiffres affichés",
              "Les labels (ce que représente chaque chiffre)",
              "Les unités (K, M, etc.)"
            ],
            exports: ['Stats'],
          },
          {
            id: 'contact-section',
            path: '/src/components/ContactSection.tsx',
            name: 'ContactSection.tsx',
            category: 'composant',
            description: 'Section de contact sur la page d\'accueil',
            technicalDetails: `Formulaire de contact intégré:

**Champs**:
• Nom complet
• Email
• Message

**Validation**: Côté client + serveur
**Envoi**: Via API /api/contacts
**Feedback**: Toast de confirmation/erreur`,
            nonTechnicalDetails: `**Qu'est-ce que c'est?**
Un formulaire de contact directement sur la page d'accueil pour que les visiteurs puissent vous écrire facilement.

**Ce qu'il contient:**
• Champ pour le nom
• Champ pour l'email
• Zone de texte pour le message
• Bouton "Envoyer"

**Ce qui se passe après l'envoi:**
Les messages arrivent dans votre interface admin sous "Contacts". Vous recevez aussi une notification.`,
            stakeholderRelevance: 'medium',
            stakeholderNote: "Les messages reçus apparaissent dans votre admin. Pensez à les consulter régulièrement!",
            canModify: true,
            whatToModify: [
              "Les champs du formulaire",
              "Le texte d'introduction",
              "Le message de confirmation"
            ],
            exports: ['ContactSection'],
          },
          {
            id: 'about-us-component',
            path: '/src/components/AboutUs.tsx',
            name: 'AboutUs.tsx',
            category: 'composant',
            description: 'Section À propos',
            technicalDetails: `Présentation de l'entreprise:

**Contenu dynamique**: Chargé depuis l'API
**Support multilingue**: FR/EN/AR
**Mise en page**: Texte + images`,
            nonTechnicalDetails: `**Qu'est-ce que c'est?**
La section qui présente qui vous êtes:
• L'histoire de Toorrii
• Votre mission
• Vos valeurs
• L'équipe (optionnel)

**Important:**
Ce contenu est géré depuis l'interface admin. Vous pouvez le modifier sans toucher au code.`,
            stakeholderRelevance: 'high',
            stakeholderNote: "Modifiez ce contenu depuis l'interface admin > À propos.",
            canModify: true,
            whatToModify: [
              "Le texte (via l'admin)",
              "Les images (via l'admin)"
            ],
            exports: ['AboutUs'],
          },
          {
            id: 'language-toggle',
            path: '/src/components/LanguageToggle.tsx',
            name: 'LanguageToggle.tsx',
            category: 'composant',
            description: 'Sélecteur de langue',
            technicalDetails: `Dropdown pour changer la langue de l'interface:

**Langues**: FR, EN, AR
**Persistance**: LocalStorage
**RTL**: Déclenche le changement de direction pour l'arabe`,
            nonTechnicalDetails: `**Qu'est-ce que c'est?**
Le petit bouton qui permet aux visiteurs de changer la langue du site.

**Langues actuellement supportées:**
• 🇫🇷 Français
• 🇬🇧 English
• 🇸🇦 العربية (Arabe)

**Particularité de l'arabe:**
Le site s'affiche en mode RTL (droite à gauche) automatiquement.`,
            stakeholderRelevance: 'medium',
            stakeholderNote: "Pour ajouter une nouvelle langue, contactez votre équipe technique.",
            canModify: false,
            exports: ['LanguageToggle'],
          },
          {
            id: 'scroll-to-top',
            path: '/src/components/ScrollToTop.tsx',
            name: 'ScrollToTop.tsx',
            category: 'composant',
            description: 'Composant de scroll automatique',
            technicalDetails: `Utilitaire qui scroll vers le haut lors des changements de route:

\`\`\`tsx
useEffect(() => {
  window.scrollTo(0, 0);
}, [pathname]);
\`\`\`

**Aucun rendu visuel** - composant invisible`,
            nonTechnicalDetails: `**Qu'est-ce que c'est?**
Un composant invisible qui s'assure que quand vous changez de page, le site remonte automatiquement en haut.

**Pourquoi c'est utile:**
Sans ça, si vous êtes en bas d'une page et que vous cliquez sur un lien, vous arriveriez au milieu de la nouvelle page au lieu du haut.`,
            stakeholderRelevance: 'none',
            stakeholderNote: "Composant technique invisible. Aucune action requise.",
            canModify: false,
            exports: ['ScrollToTop'],
            usedBy: ['App.tsx'],
          },
          {
            id: 'floating-blob',
            path: '/src/components/FloatingBlob.tsx',
            name: 'FloatingBlob.tsx',
            category: 'composant',
            description: 'Élément décoratif animé',
            technicalDetails: `Forme animée pour décoration visuelle:

**CSS**:
• Animation continue (float)
• Dégradé de couleurs
• Effet de flou (blur)
• Position absolue`,
            nonTechnicalDetails: `**Qu'est-ce que c'est?**
Ces formes colorées et floues qui bougent doucement en arrière-plan de certaines sections. C'est purement décoratif.

**Effet visuel:**
Ça donne un aspect moderne et dynamique à votre site.`,
            stakeholderRelevance: 'low',
            stakeholderNote: "Élément décoratif. Peut être modifié pour changer les couleurs ou retiré si vous préférez un design plus sobre.",
            canModify: true,
            whatToModify: [
              "Les couleurs du dégradé",
              "La taille",
              "La vitesse d'animation"
            ],
            exports: ['FloatingBlob'],
          },
        ],
        subfolders: [
          {
            id: 'components-ui',
            path: '/src/components/ui',
            name: 'ui',
            description: 'Composants UI de base (Shadcn)',
            nonTechnicalDescription: "Les composants visuels de base: boutons, formulaires, cartes, etc. Ce sont des éléments prêts à l'emploi.",
            stakeholderRelevance: 'low',
            files: [
              {
                id: 'button',
                path: '/src/components/ui/button.tsx',
                name: 'button.tsx',
                category: 'composant',
                description: 'Composant bouton avec variantes',
                technicalDetails: `Bouton Shadcn avec variants:

**Variantes disponibles**:
• \`default\`: Style principal (couleur primary)
• \`destructive\`: Rouge pour actions dangereuses
• \`outline\`: Bordure seulement
• \`secondary\`: Style secondaire
• \`ghost\`: Transparent
• \`link\`: Style lien

**Tailles**: sm, default, lg, icon

**Usage**:
\`\`\`tsx
<Button variant="default" size="lg">Cliquez ici</Button>
\`\`\``,
                nonTechnicalDetails: `**Qu'est-ce que c'est?**
Le modèle pour tous les boutons de votre site. Au lieu de créer chaque bouton individuellement, on utilise ce "moule" avec différentes options.

**Les différents styles de boutons:**
• Principal (plein, coloré) - pour les actions importantes
• Outline (bordure) - pour les actions secondaires
• Ghost (transparent) - pour les actions mineures
• Destructif (rouge) - pour supprimer/annuler

**Pourquoi c'est bien:**
Tous les boutons du site ont un style cohérent.`,
                stakeholderRelevance: 'low',
                stakeholderNote: "Le style des boutons suit automatiquement vos couleurs primary/secondary. Pas besoin de modifier.",
                canModify: false,
                exports: ['Button', 'buttonVariants'],
                dependencies: ['class-variance-authority', '@radix-ui/react-slot'],
              },
              {
                id: 'card',
                path: '/src/components/ui/card.tsx',
                name: 'card.tsx',
                category: 'composant',
                description: 'Composant carte conteneur',
                technicalDetails: `Carte Shadcn pour conteneurs:

**Sous-composants**:
• Card: Conteneur principal
• CardHeader: En-tête
• CardTitle: Titre
• CardDescription: Description
• CardContent: Contenu
• CardFooter: Pied`,
                nonTechnicalDetails: `**Qu'est-ce que c'est?**
Une "boîte" visuelle pour regrouper du contenu. Les cartes ont généralement:
• Un titre
• Une description
• Du contenu
• Parfois des boutons en bas

**Où les voit-on?**
• Les cartes de fonctionnalités
• Les cartes de partenaires
• Les tableaux de bord admin`,
                stakeholderRelevance: 'none',
                stakeholderNote: "Composant de base. Le style suit automatiquement votre thème.",
                canModify: false,
                exports: ['Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'],
              },
              {
                id: 'dialog',
                path: '/src/components/ui/dialog.tsx',
                name: 'dialog.tsx',
                category: 'composant',
                description: 'Modale/fenêtre popup',
                technicalDetails: `Composant dialogue basé sur Radix UI:

**Fonctionnalités**:
• Focus trap (le focus reste dans la modale)
• Fermeture avec Escape
• Overlay sombre
• Animation d'entrée/sortie`,
                nonTechnicalDetails: `**Qu'est-ce que c'est?**
Les fenêtres "popup" qui s'ouvrent par-dessus le contenu. Par exemple:
• "Êtes-vous sûr de vouloir supprimer?"
• Formulaires de confirmation
• Messages importants`,
                stakeholderRelevance: 'none',
                stakeholderNote: "Composant système. Pas de modification nécessaire.",
                canModify: false,
                exports: ['Dialog', 'DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle'],
                dependencies: ['@radix-ui/react-dialog'],
              },
              {
                id: 'toast',
                path: '/src/components/ui/toast.tsx',
                name: 'toast.tsx',
                category: 'composant',
                description: 'Notifications toast',
                technicalDetails: `Système de notifications temporaires:

**Variantes**:
• default: Information
• destructive: Erreur

**Usage**:
\`\`\`tsx
toast({ title: "Succès", description: "Action réussie" });
\`\`\``,
                nonTechnicalDetails: `**Qu'est-ce que c'est?**
Les petits messages qui apparaissent temporairement en bas de l'écran pour confirmer une action:
• "Enregistré avec succès!"
• "Erreur lors de l'envoi"
• "Connexion réussie"

Ils disparaissent automatiquement après quelques secondes.`,
                stakeholderRelevance: 'low',
                stakeholderNote: "Les messages sont définis dans le code. Contactez votre équipe pour les modifier.",
                canModify: false,
                exports: ['Toast', 'ToastAction', 'ToastProvider'],
                dependencies: ['@radix-ui/react-toast'],
              },
              {
                id: 'sidebar',
                path: '/src/components/ui/sidebar.tsx',
                name: 'sidebar.tsx',
                category: 'composant',
                description: 'Barre latérale de navigation (admin)',
                technicalDetails: `Système de sidebar complet:

**Composants**:
• SidebarProvider: Context
• Sidebar: Conteneur
• SidebarContent: Zone scrollable
• SidebarMenu: Navigation
• SidebarMenuItem: Item
• SidebarMenuButton: Bouton cliquable
• SidebarTrigger: Toggle collapse

**États**: Expanded, collapsed, mobile drawer`,
                nonTechnicalDetails: `**Qu'est-ce que c'est?**
Le menu latéral de l'interface admin (à gauche). Il permet de naviguer entre:
• Tableau de bord
• Partenaires
• Contacts
• Paramètres
• Etc.

**Sur mobile:**
Il se transforme en menu glissant depuis le côté.`,
                stakeholderRelevance: 'low',
                stakeholderNote: "La structure du menu est définie dans AppSidebar.tsx. Contactez votre équipe pour modifier les sections.",
                canModify: false,
                exports: ['Sidebar', 'SidebarProvider', 'SidebarContent', 'SidebarMenu', 'SidebarMenuItem'],
              },
            ],
          },
          {
            id: 'components-admin',
            path: '/src/components/admin',
            name: 'admin',
            description: "Composants spécifiques à l'administration",
            nonTechnicalDescription: "Les composants utilisés uniquement dans l'interface d'administration (tableau de bord, menus, etc.)",
            stakeholderRelevance: 'medium',
            files: [
              {
                id: 'dashboard-layout',
                path: '/src/components/admin/DashboardLayout.tsx',
                name: 'DashboardLayout.tsx',
                category: 'composant',
                description: 'Structure de base du dashboard admin',
                technicalDetails: `Layout wrapper pour toutes les pages admin:

**Structure**:
\`\`\`tsx
<SidebarProvider>
  <div className="flex">
    <AppSidebar />
    <div className="flex-1">
      <DashboardHeader />
      <main>{children}</main>
    </div>
  </div>
</SidebarProvider>
\`\`\`

**Responsabilités**:
• Affiche la sidebar de navigation
• Affiche le header avec profil
• Gère le support RTL
• Fournit le contexte de traduction admin`,
                nonTechnicalDetails: `**Qu'est-ce que c'est?**
Le "cadre" de l'interface admin. C'est ce qui entoure chaque page admin avec:
• Le menu de navigation à gauche
• La barre du haut avec votre profil
• L'espace pour le contenu de chaque page

**Toutes les pages admin utilisent ce cadre** pour avoir une apparence cohérente.`,
                stakeholderRelevance: 'low',
                stakeholderNote: "Composant structurel. Le design général de l'admin est défini ici.",
                canModify: false,
                exports: ['DashboardLayout'],
                usedBy: ['Toutes les pages admin'],
              },
              {
                id: 'dashboard-header',
                path: '/src/components/admin/DashboardHeader.tsx',
                name: 'DashboardHeader.tsx',
                category: 'composant',
                description: "Barre supérieure du dashboard",
                technicalDetails: `Header de l'interface admin:

**Éléments**:
• Logo Toorrii (lien vers accueil admin)
• Barre de recherche globale
• Sélecteur de langue (FR/EN/AR)
• Toggle thème clair/sombre
• Menu utilisateur:
  - Avatar avec initiales
  - Nom et email (depuis API)
  - Niveau d'accès
  - Liens: Profil, Paramètres
  - Bouton Déconnexion

**Données**: useProfile() pour infos utilisateur`,
                nonTechnicalDetails: `**Qu'est-ce que c'est?**
La barre en haut de l'interface admin qui affiche:
• Votre logo
• Un champ de recherche
• Le bouton pour changer de langue
• Le bouton jour/nuit (thème)
• Votre avatar avec menu:
  - Votre nom et email
  - Votre niveau d'accès (Admin, Manager, etc.)
  - Lien vers votre profil
  - Bouton de déconnexion`,
                stakeholderRelevance: 'medium',
                stakeholderNote: "Affiche VOS informations. Pour modifier votre profil, allez dans les paramètres du compte.",
                canModify: false,
                exports: ['DashboardHeader'],
                dependencies: ['hooks/admin/useProfile', 'hooks/admin/useLogout'],
              },
              {
                id: 'app-sidebar',
                path: '/src/components/admin/AppSidebar.tsx',
                name: 'AppSidebar.tsx',
                category: 'composant',
                description: 'Menu de navigation admin',
                technicalDetails: `Sidebar de navigation:

**Sections**:
1. Dashboard (Aperçu, Analytiques)
2. Gestion (Partenaires, Contacts, Catégories, Services, Professionnels)
3. Contenu (À propos, Confidentialité, CGU)
4. Paramètres

**États**: 
• Expanded: Menu complet
• Collapsed: Icônes seulement
• Mobile: Drawer glissant`,
                nonTechnicalDetails: `**Qu'est-ce que c'est?**
Le menu à gauche de l'interface admin. Il organise toutes les fonctionnalités en sections:

**📊 Tableau de bord**
• Aperçu général
• Statistiques

**📁 Gestion**
• Partenaires
• Contacts reçus
• Catégories
• Services
• Professionnels

**📝 Contenu**
• Page À propos
• Politique de confidentialité
• Conditions d'utilisation

**⚙️ Paramètres**
• Configuration générale`,
                stakeholderRelevance: 'medium',
                stakeholderNote: "C'est votre plan de navigation admin. Pour ajouter de nouvelles sections, contactez votre équipe technique.",
                canModify: false,
                exports: ['AppSidebar'],
              },
              {
                id: 'protected-route',
                path: '/src/components/admin/ProtectedRoute.tsx',
                name: 'ProtectedRoute.tsx',
                category: 'composant',
                description: 'Protection des pages admin',
                technicalDetails: `HOC pour protéger les routes admin:

\`\`\`tsx
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  
  if (isLoading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/admin/login" />;
  
  return children;
}
\`\`\``,
                nonTechnicalDetails: `**Qu'est-ce que c'est?**
Un "garde de sécurité" invisible qui vérifie si vous êtes connecté avant de vous laisser accéder à l'admin.

**Ce qui se passe:**
1. Vous essayez d'accéder à /admin/quelque-chose
2. Ce composant vérifie si vous êtes connecté
3. Si OUI → vous voyez la page
4. Si NON → vous êtes redirigé vers la page de connexion`,
                stakeholderRelevance: 'none',
                stakeholderNote: "Composant de sécurité automatique. Pas d'action requise.",
                canModify: false,
                exports: ['ProtectedRoute'],
                dependencies: ['contexts/AdminAuthContext'],
              },
              {
                id: 'multilingual-input',
                path: '/src/components/admin/MultilingualInput.tsx',
                name: 'MultilingualInput.tsx',
                category: 'composant',
                description: 'Champ de saisie multilingue',
                technicalDetails: `Input avec onglets par langue:

**Structure**:
\`\`\`tsx
<Tabs>
  <TabsList>
    <TabsTrigger value="fr">FR</TabsTrigger>
    <TabsTrigger value="en">EN</TabsTrigger>
    <TabsTrigger value="ar">AR</TabsTrigger>
  </TabsList>
  <TabsContent value="fr">
    <Input value={value.fr} onChange={...} />
  </TabsContent>
  // ...
</Tabs>
\`\`\``,
                nonTechnicalDetails: `**Qu'est-ce que c'est?**
Un champ de formulaire spécial qui vous permet d'entrer du texte dans plusieurs langues.

**Comment ça marche:**
Vous voyez des onglets (FR, EN, AR) et vous pouvez saisir une version différente pour chaque langue.

**Où l'utilisez-vous?**
Partout où vous entrez du contenu dans l'admin:
• Noms de partenaires
• Descriptions
• Textes de pages`,
                stakeholderRelevance: 'medium',
                stakeholderNote: "Vous utilisez ce composant quand vous éditez du contenu. Pensez à remplir TOUTES les langues!",
                canModify: false,
                exports: ['MultilingualInput'],
              },
            ],
          },
        ],
      },
      {
        id: 'pages',
        path: '/src/pages',
        name: 'pages',
        description: 'Pages de l\'application (routes)',
        nonTechnicalDescription: "Chaque fichier ici correspond à une page visible de votre site. C'est ce que vos utilisateurs voient vraiment.",
        stakeholderRelevance: 'high',
        files: [
          {
            id: 'index-page',
            path: '/src/pages/Index.tsx',
            name: 'Index.tsx',
            category: 'page',
            description: "Page d'accueil principale",
            technicalDetails: `Landing page de Toorrii:

**Sections assemblées**:
1. Header
2. Hero (première impression)
3. Features (fonctionnalités)
4. Stats (chiffres clés)
5. Partnerships (partenaires)
6. AboutUs (présentation)
7. ContactSection (formulaire)
8. Footer

**Provider**: TranslationProvider pour i18n`,
            nonTechnicalDetails: `**C'est LA page d'accueil de votre site!**

Quand quelqu'un va sur toorrii.com, c'est cette page qui s'affiche.

**Ce qu'elle contient (de haut en bas):**
1. 🔝 **Le header** avec menu et logo
2. 🦸 **La section Hero** - votre slogan et image principale
3. ✨ **Les fonctionnalités** - ce que Toorrii offre
4. 📊 **Les statistiques** - vos chiffres impressionnants
5. 🤝 **Les partenaires** - logos de vos partenaires
6. 📖 **À propos** - qui vous êtes
7. ✉️ **Contact** - formulaire de contact
8. 🔻 **Le footer** avec liens et infos`,
            stakeholderRelevance: 'high',
            stakeholderNote: "⭐ C'est votre vitrine! Chaque section peut être personnalisée. Le contenu vient des composants listés.",
            canModify: true,
            whatToModify: [
              "L'ordre des sections",
              "Ajouter ou retirer des sections",
              "Le contenu de chaque section (via les composants)"
            ],
            exports: ['default'],
            usedBy: ['App.tsx route "/"'],
          },
          {
            id: 'about-us-page',
            path: '/src/pages/AboutUs.tsx',
            name: 'AboutUs.tsx',
            category: 'page',
            description: 'Page À propos complète',
            technicalDetails: `Page dédiée à la présentation:

**Contenu**: Chargé depuis API via useAboutUs()
**Multilingue**: FR/EN/AR
**Structure**: Header + contenu dynamique + Footer`,
            nonTechnicalDetails: `**Page "À propos de nous"**

Une page complète qui présente Toorrii:
• Votre histoire
• Votre mission
• Vos valeurs
• Votre équipe

**💡 Important:**
Le contenu de cette page est modifiable depuis l'interface admin, section "À propos".`,
            stakeholderRelevance: 'high',
            stakeholderNote: "Modifiez le contenu depuis Admin > Contenu > À propos. Pas besoin de toucher au code!",
            canModify: true,
            whatToModify: [
              "Le contenu (via l'admin)",
              "Les images (via l'admin)"
            ],
            exports: ['default'],
            dependencies: ['hooks/useAboutUs'],
          },
          {
            id: 'contact-us-page',
            path: '/src/pages/ContactUs.tsx',
            name: 'ContactUs.tsx',
            category: 'page',
            description: 'Page Contact complète',
            technicalDetails: `Page de contact dédiée:

**Éléments**:
• Formulaire de contact complet
• Informations de contact (email, téléphone, adresse)
• Carte interactive (optionnel)
• Horaires d'ouverture (optionnel)`,
            nonTechnicalDetails: `**Page de Contact**

Une page dédiée pour que vos visiteurs puissent vous contacter:
• Formulaire avec nom, email, sujet, message
• Vos coordonnées
• Éventuellement une carte

**Les messages arrivent dans l'admin** sous la section "Contacts".`,
            stakeholderRelevance: 'high',
            stakeholderNote: "Mettez à jour vos informations de contact (email, téléphone, adresse) pour qu'elles soient correctes!",
            canModify: true,
            whatToModify: [
              "Les informations de contact",
              "L'adresse",
              "Les horaires d'ouverture"
            ],
            exports: ['default'],
          },
          {
            id: 'privacy-policy-page',
            path: '/src/pages/PrivacyPolicy.tsx',
            name: 'PrivacyPolicy.tsx',
            category: 'page',
            description: 'Page Politique de confidentialité',
            technicalDetails: `Affiche la politique de confidentialité:

**Contenu**: Depuis API
**Format**: Markdown rendu en HTML
**Date**: Affiche la date de dernière mise à jour`,
            nonTechnicalDetails: `**Page des mentions légales sur les données personnelles**

Cette page est **obligatoire légalement** (RGPD). Elle explique:
• Quelles données vous collectez
• Comment vous les utilisez
• Les droits des utilisateurs

**Modifiable depuis l'admin** > Contenu > Politique de confidentialité`,
            stakeholderRelevance: 'high',
            stakeholderNote: "⚖️ Page légalement obligatoire! Faites-la rédiger par un juriste et mettez-la à jour via l'admin.",
            canModify: true,
            whatToModify: [
              "Le contenu (via l'admin)"
            ],
            exports: ['default'],
            dependencies: ['hooks/usePrivacyPolicy'],
          },
          {
            id: 'terms-page',
            path: '/src/pages/TermsOfService.tsx',
            name: 'TermsOfService.tsx',
            category: 'page',
            description: "Page Conditions d'utilisation",
            technicalDetails: `Affiche les CGU:

**Contenu**: Depuis API
**Format**: Markdown
**Structure**: Header + contenu + Footer`,
            nonTechnicalDetails: `**Page des Conditions Générales d'Utilisation**

Cette page est **obligatoire**. Elle définit:
• Les règles d'utilisation de votre service
• Les responsabilités de chaque partie
• Les conditions d'inscription

**Modifiable depuis l'admin** > Contenu > Conditions d'utilisation`,
            stakeholderRelevance: 'high',
            stakeholderNote: "⚖️ Page légalement obligatoire! Faites rédiger par un juriste et mettez à jour via l'admin.",
            canModify: true,
            whatToModify: [
              "Le contenu (via l'admin)"
            ],
            exports: ['default'],
            dependencies: ['hooks/useTermsOfService'],
          },
          {
            id: 'partner-detail-page',
            path: '/src/pages/PartnerDetail.tsx',
            name: 'PartnerDetail.tsx',
            category: 'page',
            description: 'Page détail d\'un partenaire',
            technicalDetails: `Affiche les détails d'un partenaire:

**URL**: /partner/:id
**Contenu**: Logo, nom, description, services
**Navigation**: Retour à la liste`,
            nonTechnicalDetails: `**Page de détail d'un partenaire**

Quand un visiteur clique sur un partenaire, il arrive sur cette page qui montre:
• Le logo en grand
• Le nom complet
• Une description détaillée
• Les services proposés`,
            stakeholderRelevance: 'medium',
            stakeholderNote: "Le contenu vient de ce que vous avez entré dans Admin > Partenaires.",
            canModify: false,
            exports: ['default'],
          },
          {
            id: 'not-found-page',
            path: '/src/pages/NotFound.tsx',
            name: 'NotFound.tsx',
            category: 'page',
            description: 'Page 404 (page non trouvée)',
            technicalDetails: `Page affichée pour les routes inexistantes:

**Éléments**:
• Message d'erreur 404
• Lien retour accueil
• Design cohérent avec le site`,
            nonTechnicalDetails: `**Page d'erreur "Page non trouvée"**

Quand quelqu'un essaie d'accéder à une page qui n'existe pas (ex: toorrii.com/nimportequoi), cette page s'affiche.

**Elle contient:**
• Un message "Page non trouvée"
• Un bouton pour retourner à l'accueil`,
            stakeholderRelevance: 'low',
            stakeholderNote: "Vous pouvez personnaliser le message et le design de cette page d'erreur.",
            canModify: true,
            whatToModify: [
              "Le message d'erreur",
              "L'image ou illustration"
            ],
            exports: ['default'],
          },
          {
            id: 'documentation-page',
            path: '/src/pages/Documentation.tsx',
            name: 'Documentation.tsx',
            category: 'page',
            description: 'Cette page de documentation',
            technicalDetails: `Page de documentation interactive:

**Fonctionnalités**:
• Recherche avec autocomplétion
• Filtres par catégorie
• Arborescence de fichiers
• Détails pour chaque fichier`,
            nonTechnicalDetails: `**C'est la page que vous êtes en train de lire!**

Elle vous permet d'explorer et comprendre tous les fichiers du projet Toorrii.

**Fonctionnalités:**
• Recherchez un fichier par son nom
• Filtrez par type (page, composant, style, etc.)
• Naviguez dans l'arborescence
• Lisez les explications détaillées`,
            stakeholderRelevance: 'high',
            stakeholderNote: "Cette documentation est faite POUR VOUS! Consultez-la régulièrement pour comprendre le projet.",
            canModify: false,
            exports: ['default'],
          },
        ],
        subfolders: [
          {
            id: 'pages-admin',
            path: '/src/pages/admin',
            name: 'admin',
            description: 'Pages du dashboard administrateur',
            nonTechnicalDescription: "Toutes les pages de votre interface d'administration. C'est ici que vous gérez votre plateforme.",
            stakeholderRelevance: 'high',
            files: [
              {
                id: 'admin-login',
                path: '/src/pages/admin/Login.tsx',
                name: 'Login.tsx',
                category: 'page',
                description: 'Page de connexion admin',
                technicalDetails: `Formulaire d'authentification:

**Champs**: Email, Mot de passe
**Validation**: Zod
**API**: POST /api/admins/login
**Après connexion**: Redirect vers /admin`,
                nonTechnicalDetails: `**Page de connexion à l'administration**

C'est la page où vous entrez votre email et mot de passe pour accéder à l'interface admin.

**Sécurité:**
• 3 tentatives maximum avant blocage temporaire
• Mot de passe masqué
• Connexion sécurisée (HTTPS)`,
                stakeholderRelevance: 'medium',
                stakeholderNote: "Si vous oubliez votre mot de passe, contactez votre administrateur technique.",
                canModify: false,
                exports: ['default'],
                dependencies: ['hooks/admin/useLogin'],
              },
              {
                id: 'admin-dashboard',
                path: '/src/pages/admin/Dashboard.tsx',
                name: 'Dashboard.tsx',
                category: 'page',
                description: 'Page d\'accueil du dashboard',
                technicalDetails: `Vue d'ensemble admin:

**Widgets**:
• Statistiques rapides
• Actions récentes
• Graphiques de performance
• Raccourcis vers sections importantes`,
                nonTechnicalDetails: `**Tableau de bord principal**

C'est la première page que vous voyez après connexion. Elle affiche:
• Un résumé de l'activité
• Les chiffres clés
• Les actions récentes
• Des raccourcis vers les sections importantes`,
                stakeholderRelevance: 'high',
                stakeholderNote: "Votre point de départ quotidien! Consultez-le pour avoir une vue d'ensemble rapide.",
                canModify: false,
                exports: ['default'],
              },
              {
                id: 'admin-profile',
                path: '/src/pages/admin/Profile.tsx',
                name: 'Profile.tsx',
                category: 'page',
                description: 'Page profil administrateur',
                technicalDetails: `Gestion du profil:

**Sections**:
• Informations personnelles (nom, email, téléphone)
• Changement de mot de passe
• Préférences (langue, thème)
• Historique de connexion

**API**: GET /api/admins/compte/afficher`,
                nonTechnicalDetails: `**Votre page de profil**

Ici vous pouvez:
• Voir vos informations
• Changer votre mot de passe
• Modifier vos préférences
• Voir votre niveau d'accès`,
                stakeholderRelevance: 'high',
                stakeholderNote: "Pensez à mettre à jour vos informations et à changer votre mot de passe régulièrement!",
                canModify: false,
                exports: ['default'],
                dependencies: ['hooks/admin/useProfile'],
              },
              {
                id: 'admin-partner-list',
                path: '/src/pages/admin/PartnerList.tsx',
                name: 'PartnerList.tsx',
                category: 'page',
                description: 'Liste des partenaires',
                technicalDetails: `Tableau CRUD partenaires:

**Fonctionnalités**:
• Liste paginée
• Recherche par nom
• Tri par colonnes
• Actions: voir, modifier, supprimer
• Bouton création`,
                nonTechnicalDetails: `**Gestion de vos partenaires**

Cette page liste tous vos partenaires. Vous pouvez:
• 👁️ Voir les détails d'un partenaire
• ✏️ Modifier ses informations
• 🗑️ Supprimer un partenaire
• ➕ Ajouter un nouveau partenaire

**Les partenaires s'affichent** sur la page d'accueil du site public.`,
                stakeholderRelevance: 'high',
                stakeholderNote: "Gérez vos partenaires ici! N'oubliez pas d'ajouter le logo et les descriptions en 3 langues.",
                canModify: false,
                exports: ['default'],
                dependencies: ['hooks/admin/usePartners'],
              },
              {
                id: 'admin-contact-list',
                path: '/src/pages/admin/ContactList.tsx',
                name: 'ContactList.tsx',
                category: 'page',
                description: 'Liste des messages de contact',
                technicalDetails: `Tableau des messages reçus:

**Colonnes**: Date, Nom, Email, Sujet, Statut
**Actions**: Voir détails, Marquer comme lu, Supprimer
**Filtres**: Lu/Non lu, Date`,
                nonTechnicalDetails: `**Boîte de réception des messages**

Tous les messages envoyés via le formulaire de contact arrivent ici.

**Vous pouvez:**
• Voir le contenu complet de chaque message
• Marquer comme "lu" 
• Répondre par email (depuis votre messagerie)
• Supprimer les messages traités`,
                stakeholderRelevance: 'high',
                stakeholderNote: "📬 Consultez régulièrement! Les visiteurs vous contactent ici.",
                canModify: false,
                exports: ['default'],
                dependencies: ['hooks/admin/useContacts'],
              },
              {
                id: 'admin-analytics',
                path: '/src/pages/admin/Analytics.tsx',
                name: 'Analytics.tsx',
                category: 'page',
                description: 'Statistiques et analytiques',
                technicalDetails: `Tableaux de bord analytiques:

**Graphiques**:
• Visites par jour/semaine/mois
• Sources de trafic
• Pages les plus vues
• Taux de conversion`,
                nonTechnicalDetails: `**Statistiques de votre site**

Cette page vous montre comment votre site est utilisé:
• Combien de visiteurs
• Quelles pages sont populaires
• D'où viennent les visiteurs
• Quand le site est le plus visité`,
                stakeholderRelevance: 'high',
                stakeholderNote: "📊 Consultez ces stats pour comprendre le comportement de vos utilisateurs!",
                canModify: false,
                exports: ['default'],
              },
              {
                id: 'admin-settings',
                path: '/src/pages/admin/Settings.tsx',
                name: 'Settings.tsx',
                category: 'page',
                description: "Paramètres de l'application",
                technicalDetails: `Configuration générale:

**Options**:
• Thème par défaut
• Langue par défaut
• Paramètres de notification
• Configuration email`,
                nonTechnicalDetails: `**Paramètres généraux**

Configurez le comportement de votre application:
• Langue par défaut du site
• Thème clair ou sombre
• Notifications`,
                stakeholderRelevance: 'medium',
                stakeholderNote: "Personnalisez les paramètres selon vos besoins.",
                canModify: false,
                exports: ['default'],
              },
            ],
          },
        ],
      },
      {
        id: 'contexts',
        path: '/src/contexts',
        name: 'contexts',
        description: 'Contextes React pour état global',
        nonTechnicalDescription: "Ces fichiers permettent de partager des informations entre toutes les pages (comme la langue choisie ou le thème).",
        stakeholderRelevance: 'low',
        files: [
          {
            id: 'theme-context',
            path: '/src/contexts/ThemeContext.tsx',
            name: 'ThemeContext.tsx',
            category: 'contexte',
            description: 'Gestion du thème clair/sombre',
            technicalDetails: `Context pour le thème:

**Valeurs fournies**:
• theme: 'light' | 'dark'
• setTheme: fonction
• toggleTheme: fonction

**Persistance**: localStorage
**Détection**: Préférence système`,
            nonTechnicalDetails: `**Gestion du mode jour/nuit**

Ce fichier permet aux utilisateurs de choisir entre:
• ☀️ Mode clair (fond blanc)
• 🌙 Mode sombre (fond noir)

Leur choix est sauvegardé et réappliqué à leur prochaine visite.`,
            stakeholderRelevance: 'low',
            stakeholderNote: "Le thème fonctionne automatiquement. Les couleurs sont définies dans index.css.",
            canModify: false,
            exports: ['ThemeProvider', 'useTheme'],
          },
          {
            id: 'translation-context',
            path: '/src/contexts/TranslationContext.tsx',
            name: 'TranslationContext.tsx',
            category: 'contexte',
            description: 'Gestion des traductions (site public)',
            technicalDetails: `Context i18n:

**Langues**: 'fr' | 'en' | 'ar'
**RTL**: Automatique pour l'arabe
**Persistance**: localStorage`,
            nonTechnicalDetails: `**Gestion des langues du site public**

Ce fichier permet:
• De changer la langue du site (FR/EN/AR)
• D'inverser l'affichage pour l'arabe (droite à gauche)
• De se souvenir de la langue choisie

**Toutes les traductions** sont définies dans ce fichier.`,
            stakeholderRelevance: 'medium',
            stakeholderNote: "Pour ajouter/modifier des traductions, contactez votre équipe technique.",
            canModify: false,
            exports: ['TranslationProvider', 'useTranslation'],
          },
          {
            id: 'admin-auth-context',
            path: '/src/contexts/AdminAuthContext.tsx',
            name: 'AdminAuthContext.tsx',
            category: 'contexte',
            description: "Gestion de l'authentification admin",
            technicalDetails: `Context d'authentification:

**État**:
• isAuthenticated: boolean
• isLoading: boolean
• user: AdminUser | null

**Actions**:
• login(email, password)
• logout()

**Token**: Stocké dans localStorage`,
            nonTechnicalDetails: `**Gestion de la connexion admin**

Ce fichier vérifie si vous êtes connecté ou non:
• Après connexion: stocke votre session
• Protège les pages admin
• Gère la déconnexion`,
            stakeholderRelevance: 'none',
            stakeholderNote: "Composant de sécurité automatique.",
            canModify: false,
            exports: ['AdminAuthProvider', 'useAdminAuth'],
          },
        ],
      },
      {
        id: 'hooks',
        path: '/src/hooks',
        name: 'hooks',
        description: 'Custom hooks React',
        nonTechnicalDescription: "Fichiers techniques qui gèrent la logique de l'application (chargement de données, état, etc.)",
        stakeholderRelevance: 'none',
        files: [
          {
            id: 'use-toast',
            path: '/src/hooks/use-toast.ts',
            name: 'use-toast.ts',
            category: 'hook',
            description: 'Hook pour les notifications',
            technicalDetails: `Hook Shadcn pour les toasts:

\`\`\`tsx
const { toast } = useToast();
toast({
  title: "Succès",
  description: "Action effectuée",
  variant: "default"
});
\`\`\``,
            nonTechnicalDetails: `Ce fichier permet d'afficher les petites notifications temporaires qui confirment vos actions.`,
            stakeholderRelevance: 'none',
            stakeholderNote: "Fichier technique.",
            canModify: false,
            exports: ['useToast', 'toast'],
          },
          {
            id: 'use-mobile',
            path: '/src/hooks/use-mobile.tsx',
            name: 'use-mobile.tsx',
            category: 'hook',
            description: 'Détection appareil mobile',
            technicalDetails: `Hook pour détecter si l'écran est mobile:

\`\`\`tsx
const isMobile = useIsMobile();
// true si écran < 768px
\`\`\``,
            nonTechnicalDetails: `Détecte automatiquement si l'utilisateur est sur téléphone ou tablette pour adapter l'affichage.`,
            stakeholderRelevance: 'none',
            stakeholderNote: "Fichier technique.",
            canModify: false,
            exports: ['useMobile', 'useIsMobile'],
          },
        ],
        subfolders: [
          {
            id: 'hooks-admin',
            path: '/src/hooks/admin',
            name: 'admin',
            description: "Hooks pour l'administration",
            nonTechnicalDescription: "Fichiers qui gèrent les interactions avec le serveur pour l'interface admin.",
            stakeholderRelevance: 'none',
            files: [
              {
                id: 'use-profile',
                path: '/src/hooks/admin/useProfile.ts',
                name: 'useProfile.ts',
                category: 'hook',
                description: 'Récupération du profil admin',
                technicalDetails: `Hook pour le profil:

**API**: GET /api/admins/compte/afficher
**Retourne**: nom, email, niveau_acces, telephone`,
                nonTechnicalDetails: `Charge vos informations de profil depuis le serveur.`,
                stakeholderRelevance: 'none',
                stakeholderNote: "Fichier technique.",
                canModify: false,
                exports: ['useProfile'],
              },
              {
                id: 'use-partners-admin',
                path: '/src/hooks/admin/usePartners.ts',
                name: 'usePartners.ts',
                category: 'hook',
                description: 'Gestion CRUD des partenaires',
                technicalDetails: `Hook CRUD complet:

• usePartners(): Liste
• useCreatePartner(): Création
• useUpdatePartner(): Modification
• useDeletePartner(): Suppression`,
                nonTechnicalDetails: `Gère toutes les opérations sur les partenaires (ajouter, modifier, supprimer, lister).`,
                stakeholderRelevance: 'none',
                stakeholderNote: "Fichier technique.",
                canModify: false,
                exports: ['usePartners', 'useCreatePartner', 'useUpdatePartner', 'useDeletePartner'],
              },
            ],
          },
        ],
      },
      {
        id: 'services',
        path: '/src/services',
        name: 'services',
        description: 'Services API',
        nonTechnicalDescription: "Fichiers qui communiquent avec le serveur pour récupérer ou envoyer des données.",
        stakeholderRelevance: 'none',
        files: [
          {
            id: 'api-service',
            path: '/src/services/api.ts',
            name: 'api.ts',
            category: 'service',
            description: 'Configuration API de base',
            technicalDetails: `Instance Axios configurée:

**Base URL**: Variable d'environnement VITE_API_URL
**Intercepteurs**:
• Request: Ajout token Authorization
• Response: Gestion erreurs 401`,
            nonTechnicalDetails: `Ce fichier configure la communication avec votre serveur. C'est le "téléphone" entre le site et la base de données.`,
            stakeholderRelevance: 'none',
            stakeholderNote: "Fichier technique critique. Ne pas modifier.",
            canModify: false,
            exports: ['api', 'default'],
          },
        ],
        subfolders: [],
      },
      {
        id: 'types',
        path: '/src/types',
        name: 'types',
        description: 'Définitions TypeScript',
        nonTechnicalDescription: "Fichiers qui définissent la structure des données (comme un dictionnaire des termes utilisés).",
        stakeholderRelevance: 'none',
        files: [
          {
            id: 'partner-type',
            path: '/src/types/partner.ts',
            name: 'partner.ts',
            category: 'type',
            description: 'Structure des données partenaire',
            technicalDetails: `Interface Partner:

\`\`\`typescript
interface Partner {
  id: string;
  name: { fr: string; en: string; ar: string };
  logo: string;
  description: { fr: string; en: string; ar: string };
}
\`\`\``,
            nonTechnicalDetails: `Définit les informations qu'un partenaire doit avoir: nom, logo, description (en 3 langues).`,
            stakeholderRelevance: 'none',
            stakeholderNote: "Fichier technique.",
            canModify: false,
            exports: ['Partner'],
          },
        ],
        subfolders: [],
      },
      {
        id: 'lib',
        path: '/src/lib',
        name: 'lib',
        description: 'Utilitaires',
        nonTechnicalDescription: "Petites fonctions d'aide utilisées partout dans le code.",
        stakeholderRelevance: 'none',
        files: [
          {
            id: 'utils',
            path: '/src/lib/utils.ts',
            name: 'utils.ts',
            category: 'utilitaire',
            description: 'Fonctions utilitaires',
            technicalDetails: `Utilitaires partagés:

**cn()**: Combine les classes Tailwind
\`\`\`typescript
cn("px-4", condition && "bg-primary", "text-white")
\`\`\``,
            nonTechnicalDetails: `Petites fonctions d'aide pour le code. Rien d'intéressant pour un non-développeur.`,
            stakeholderRelevance: 'none',
            stakeholderNote: "Fichier technique.",
            canModify: false,
            exports: ['cn'],
            dependencies: ['clsx', 'tailwind-merge'],
          },
        ],
      },
      {
        id: 'assets',
        path: '/src/assets',
        name: 'assets',
        description: 'Images et ressources',
        nonTechnicalDescription: "Toutes les images utilisées dans le site: logos, illustrations, icônes.",
        stakeholderRelevance: 'high',
        files: [
          {
            id: 'toorrii-logo',
            path: '/src/assets/toorrii-logo.png',
            name: 'toorrii-logo.png',
            category: 'asset',
            description: 'Logo principal Toorrii',
            technicalDetails: `Logo PNG utilisé dans:
• Header du site public
• Header de l'admin
• Favicon (version réduite)`,
            nonTechnicalDetails: `**Votre logo principal!**

C'est l'image du logo Toorrii qui apparaît:
• En haut de chaque page
• Dans l'interface admin
• Comme icône dans l'onglet du navigateur

**Pour changer le logo:**
Remplacez ce fichier par votre nouveau logo (même nom, même format).`,
            stakeholderRelevance: 'high',
            stakeholderNote: "⭐ Pour changer votre logo, fournissez une nouvelle image à votre équipe technique.",
            canModify: true,
            whatToModify: [
              "L'image elle-même"
            ],
          },
          {
            id: 'hero-image',
            path: '/src/assets/toorrii_hero.png',
            name: 'toorrii_hero.png',
            category: 'asset',
            description: 'Image principale de la section Hero',
            technicalDetails: `Image d'illustration pour la section Hero.
Format recommandé: PNG ou WebP, haute résolution.`,
            nonTechnicalDetails: `**L'image principale de votre page d'accueil!**

C'est la grande image/illustration qui apparaît en premier quand on arrive sur votre site.

**Impact:**
Cette image donne la première impression de votre plateforme.`,
            stakeholderRelevance: 'high',
            stakeholderNote: "⭐ Image très visible! Choisissez une image professionnelle qui représente bien Toorrii.",
            canModify: true,
            whatToModify: [
              "L'image elle-même"
            ],
          },
          {
            id: 'partner-logos',
            path: '/src/assets/',
            name: 'Logos partenaires',
            category: 'asset',
            description: 'Logos des partenaires (Sonelgaz, CNAS, etc.)',
            technicalDetails: `Collection de logos:
• Sonlgaz.png
• cnas.png
• Bank_of_Algeria.png
• Djezzy_Logo.png
• Logo_Mobilis.png
• Ooredoo_logo.svg
• Flag_of_Sonatrach.png
• Air_Algérie_logo.png`,
            nonTechnicalDetails: `**Logos de vos partenaires**

Ces images s'affichent dans la section "Nos partenaires" de la page d'accueil.

**Pour ajouter un partenaire:**
1. Allez dans Admin > Partenaires
2. Ajoutez le partenaire avec son logo

Le logo sera automatiquement affiché sur le site.`,
            stakeholderRelevance: 'high',
            stakeholderNote: "Gérez les logos via l'interface admin lors de l'ajout de partenaires.",
            canModify: true,
            whatToModify: [
              "Via l'interface admin"
            ],
          },
        ],
      },
      {
        id: 'data',
        path: '/src/data',
        name: 'data',
        description: 'Données statiques',
        nonTechnicalDescription: "Fichiers contenant des données fixes (comme cette documentation).",
        stakeholderRelevance: 'medium',
        files: [
          {
            id: 'documentation-data',
            path: '/src/data/documentationData.ts',
            name: 'documentationData.ts',
            category: 'configuration',
            description: 'Données de cette documentation',
            technicalDetails: `Contient toutes les informations affichées sur la page /documentation.

Structure:
• FolderDoc: Dossiers
• FileDoc: Fichiers avec descriptions techniques et non-techniques`,
            nonTechnicalDetails: `**C'est le contenu de cette page de documentation!**

Ce fichier contient toutes les explications que vous lisez en ce moment.`,
            stakeholderRelevance: 'high',
            stakeholderNote: "Ce fichier EST la documentation. Il peut être mis à jour pour ajouter des explications.",
            canModify: false,
            exports: ['documentationData', 'categoryLabels', 'categoryColors'],
          },
          {
            id: 'partners-data',
            path: '/src/data/partnersData.ts',
            name: 'partnersData.ts',
            category: 'configuration',
            description: 'Données de fallback partenaires',
            technicalDetails: `Liste des partenaires par défaut.
Utilisé comme fallback si l'API ne répond pas.`,
            nonTechnicalDetails: `Données de secours pour les partenaires au cas où le serveur ne répond pas.`,
            stakeholderRelevance: 'low',
            stakeholderNote: "Les vrais partenaires sont gérés via l'admin. Ce fichier est juste un backup.",
            canModify: false,
            exports: ['partnersData'],
          },
        ],
      },
    ],
  },
  {
    id: 'public',
    path: '/public',
    name: 'public',
    description: 'Fichiers publics statiques',
    nonTechnicalDescription: "Images et fichiers accessibles directement par URL (favicon, images de partage, etc.)",
    stakeholderRelevance: 'high',
    files: [
      {
        id: 'favicon',
        path: '/public/favicon.png',
        name: 'favicon.png',
        category: 'asset',
        description: "Icône de l'onglet du navigateur",
        technicalDetails: `Favicon affiché dans:
• L'onglet du navigateur
• Les favoris
• L'historique`,
        nonTechnicalDetails: `**La petite icône dans l'onglet du navigateur**

Quand vous ouvrez un site, une petite icône apparaît dans l'onglet. C'est cette image.

**Format recommandé:** 
PNG carré, idéalement 32x32 ou 64x64 pixels.`,
        stakeholderRelevance: 'high',
        stakeholderNote: "Pour changer l'icône de l'onglet, remplacez ce fichier.",
        canModify: true,
        whatToModify: [
          "L'image (doit être carrée)"
        ],
      },
      {
        id: 'home-banner',
        path: '/public/home_page_banner.png',
        name: 'home_page_banner.png',
        category: 'asset',
        description: 'Bannière de la page d\'accueil',
        technicalDetails: `Image de bannière pour la page d'accueil.
Peut être utilisée pour les aperçus sur réseaux sociaux.`,
        nonTechnicalDetails: `**Image de bannière**

Cette image peut être utilisée:
• Comme fond de section
• Pour les aperçus sur Facebook/LinkedIn quand on partage votre site`,
        stakeholderRelevance: 'high',
        stakeholderNote: "Image importante pour le partage sur les réseaux sociaux!",
        canModify: true,
        whatToModify: [
          "L'image (format recommandé: 1200x630 pixels pour les réseaux sociaux)"
        ],
      },
    ],
  },
];

// Fonctions utilitaires
export function getAllFiles(): FileDoc[] {
  const files: FileDoc[] = [];
  
  function traverse(folders: FolderDoc[]) {
    for (const folder of folders) {
      files.push(...folder.files);
      if (folder.subfolders) {
        traverse(folder.subfolders);
      }
    }
  }
  
  traverse(documentationData);
  return files;
}

export function searchFiles(query: string, files?: FileDoc[]): FileDoc[] {
  const allFiles = files || getAllFiles();
  const lowerQuery = query.toLowerCase();
  
  return allFiles.filter(file => 
    file.name.toLowerCase().includes(lowerQuery) ||
    file.path.toLowerCase().includes(lowerQuery) ||
    file.description.toLowerCase().includes(lowerQuery) ||
    file.nonTechnicalDetails.toLowerCase().includes(lowerQuery)
  );
}

export function getFilesByCategory(category: FileCategory): FileDoc[] {
  return getAllFiles().filter(file => file.category === category);
}

export function getFilesByStakeholderRelevance(relevance: StakeholderRelevance): FileDoc[] {
  return getAllFiles().filter(file => file.stakeholderRelevance === relevance);
}

export function filterDocumentationByCategory(category: FileCategory | "all"): FolderDoc[] {
  if (category === "all") return documentationData;
  
  function filterFolder(folder: FolderDoc): FolderDoc | null {
    const filteredFiles = folder.files.filter(f => f.category === category);
    const filteredSubfolders = folder.subfolders
      ?.map(sf => filterFolder(sf))
      .filter((sf): sf is FolderDoc => sf !== null) || [];
    
    if (filteredFiles.length === 0 && filteredSubfolders.length === 0) {
      return null;
    }
    
    return {
      ...folder,
      files: filteredFiles,
      subfolders: filteredSubfolders.length > 0 ? filteredSubfolders : undefined,
    };
  }
  
  return documentationData
    .map(f => filterFolder(f))
    .filter((f): f is FolderDoc => f !== null);
}

export function filterDocumentationByRelevance(relevance: StakeholderRelevance | "all"): FolderDoc[] {
  if (relevance === "all") return documentationData;
  
  function filterFolder(folder: FolderDoc): FolderDoc | null {
    const filteredFiles = folder.files.filter(f => f.stakeholderRelevance === relevance);
    const filteredSubfolders = folder.subfolders
      ?.map(sf => filterFolder(sf))
      .filter((sf): sf is FolderDoc => sf !== null) || [];
    
    if (filteredFiles.length === 0 && filteredSubfolders.length === 0) {
      return null;
    }
    
    return {
      ...folder,
      files: filteredFiles,
      subfolders: filteredSubfolders.length > 0 ? filteredSubfolders : undefined,
    };
  }
  
  return documentationData
    .map(f => filterFolder(f))
    .filter((f): f is FolderDoc => f !== null);
}
