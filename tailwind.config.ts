/**
 * =============================================================================
 * @file tailwind.config.ts
 * =============================================================================
 *
 * 🇫🇷 GUIDE POUR LE STAKEHOLDER - FICHIER DE CONFIGURATION DES STYLES
 *
 * Ce fichier contrôle l'apparence visuelle globale de votre plateforme Toorrii.
 * C'est ici que vous pouvez personnaliser les couleurs, les animations et
 * l'aspect général du site.
 *
 * ⚠️ ATTENTION: Modifiez uniquement les sections marquées "MODIFIABLE".
 *    Les autres sections sont techniques et ne doivent pas être touchées.
 *
 * 📞 En cas de doute, contactez votre équipe technique.
 *
 * =============================================================================
 */

import type { Config } from "tailwindcss";

export default {
    // ─────────────────────────────────────────────────────────────────────────────
    // ⚙️ CONFIGURATION SYSTÈME - NE PAS MODIFIER
    // Cette section active le mode sombre basé sur les classes CSS.
    // ─────────────────────────────────────────────────────────────────────────────
    darkMode: ["class"],

    // ─────────────────────────────────────────────────────────────────────────────
    // ⚙️ FICHIERS À SCANNER - NE PAS MODIFIER
    // Liste des dossiers où Tailwind cherche les classes CSS utilisées.
    // ─────────────────────────────────────────────────────────────────────────────
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",

    theme: {
        // ───────────────────────────────────────────────────────────────────────────
        // ⚙️ CONTENEUR RESPONSIVE - NE PAS MODIFIER
        // Configuration pour le centrage et l'espacement des conteneurs.
        // ───────────────────────────────────────────────────────────────────────────
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },

        extend: {
            // =========================================================================
            // 🔤 POLICES DE CARACTÈRES - FONTS
            // =========================================================================
            fontFamily: {
                'arabic': ['"IBM Plex Sans Arabic"', 'sans-serif'],  // Professional enterprise Arabic font
            },
            // =========================================================================
            // 🎨 COULEURS - SECTION MODIFIABLE PAR LE STAKEHOLDER
            // =========================================================================
            //
            // Ces couleurs sont liées aux variables CSS définies dans index.css.
            // Pour changer une couleur, modifiez la variable correspondante dans index.css.
            //
            // 📌 COULEURS PRINCIPALES QUE VOUS POUVEZ PERSONNALISER:
            //
            // • primary     → Couleur de marque (boutons principaux, liens actifs)
            // • secondary   → Couleur secondaire (éléments moins importants)
            // • accent      → Couleur d'accentuation (mise en valeur)
            // • muted       → Couleur atténuée (arrière-plans subtils)
            // • destructive → Rouge pour les erreurs (⚠️ ne pas changer)
            //
            // =========================================================================
            colors: {
                // ─────────────────────────────────────────────────────────────────────
                // 🔲 BORDURES ET CHAMPS DE SAISIE
                // Ces couleurs sont utilisées pour les bordures des cartes et formulaires.
                // ─────────────────────────────────────────────────────────────────────
                border: 'hsl(var(--border))',      // Couleur des bordures
                input: 'hsl(var(--input))',        // Fond des champs de saisie
                ring: 'hsl(var(--ring))',          // Anneau de focus (accessibilité)

                // ─────────────────────────────────────────────────────────────────────
                // 📄 COULEURS DE BASE
                // Fond de page et couleur du texte principal.
                // ─────────────────────────────────────────────────────────────────────
                background: 'hsl(var(--background))',  // Fond principal des pages
                foreground: 'hsl(var(--foreground))',  // Texte principal

                // ─────────────────────────────────────────────────────────────────────
                // 🎨 COULEUR PRINCIPALE (PRIMARY) - MODIFIABLE ✏️
                // C'est LA couleur de votre marque Toorrii.
                // Elle apparaît sur: boutons, liens, icônes actives, accents visuels.
                //
                // Pour changer: Modifiez --primary dans index.css
                // Valeur actuelle: Vert/Teal (182 86% 14%)
                // ─────────────────────────────────────────────────────────────────────
                primary: {
                    DEFAULT: 'hsl(var(--primary))',           // Couleur principale
                    foreground: 'hsl(var(--primary-foreground))', // Texte sur fond primary
                    light: 'hsl(var(--primary-light))',       // Version plus claire
                    dark: 'hsl(var(--primary-dark))'          // Version plus foncée
                },

                // ─────────────────────────────────────────────────────────────────────
                // 🎨 COULEUR SECONDAIRE (SECONDARY) - MODIFIABLE ✏️
                // Utilisée pour les éléments secondaires: badges, boutons alternatifs.
                //
                // Pour changer: Modifiez --secondary dans index.css
                // ─────────────────────────────────────────────────────────────────────
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },

                // ─────────────────────────────────────────────────────────────────────
                // ✅ COULEUR DE SUCCÈS - MODIFIABLE ✏️
                // Utilisée pour les messages de confirmation et actions réussies.
                // ─────────────────────────────────────────────────────────────────────
                success: {
                    DEFAULT: 'hsl(var(--success))',
                    foreground: 'hsl(var(--success-foreground))'
                },

                // ─────────────────────────────────────────────────────────────────────
                // ❌ COULEUR DESTRUCTIVE - NE PAS MODIFIER ⚠️
                // Rouge standard pour les erreurs et suppressions.
                // Important pour l'accessibilité et les conventions UX.
                // ─────────────────────────────────────────────────────────────────────
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },

                // ─────────────────────────────────────────────────────────────────────
                // ⚠️ COULEUR D'AVERTISSEMENT (WARNING) - MODIFIABLE ✏️
                // Utilisée pour les alertes et avertissements non-critiques.
                // ─────────────────────────────────────────────────────────────────────
                warning: {
                    DEFAULT: 'hsl(var(--warning))',
                    foreground: 'hsl(var(--warning-foreground))'
                },

                // ─────────────────────────────────────────────────────────────────────
                // 🔅 COULEUR ATTÉNUÉE (MUTED) - MODIFIABLE ✏️
                // Pour les arrière-plans subtils et le texte secondaire.
                // ─────────────────────────────────────────────────────────────────────
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },

                // ─────────────────────────────────────────────────────────────────────
                // ✨ COULEUR D'ACCENT - MODIFIABLE ✏️
                // Pour mettre en valeur certains éléments importants.
                // ─────────────────────────────────────────────────────────────────────
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },

                // ─────────────────────────────────────────────────────────────────────
                // 📦 COULEURS DES POPOVERS ET CARTES - TECHNIQUE
                // Ces couleurs suivent généralement le thème principal.
                // ─────────────────────────────────────────────────────────────────────
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },

                // ─────────────────────────────────────────────────────────────────────
                // 📊 COULEURS DE LA BARRE LATÉRALE (SIDEBAR) - ADMIN UNIQUEMENT
                // Ces couleurs affectent le menu latéral du tableau de bord admin.
                // ─────────────────────────────────────────────────────────────────────
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                }
            },

            // =========================================================================
            // 🌈 DÉGRADÉS (GRADIENTS) - MODIFIABLE ✏️
            // =========================================================================
            //
            // Les dégradés ajoutent de la profondeur visuelle à votre site.
            // Ils sont définis dans index.css et utilisés ici.
            //
            // • gradient-primary → Dégradé principal (en-têtes, sections importantes)
            // • gradient-hero    → Dégradé de la section héro (page d'accueil)
            // • gradient-subtle  → Dégradé subtil (arrière-plans doux)
            //
            // =========================================================================
            backgroundImage: {
                'gradient-primary': 'var(--gradient-primary)',  // Dégradé de marque
                'gradient-hero': 'var(--gradient-hero)',        // Dégradé section héro
                'gradient-subtle': 'var(--gradient-subtle)'     // Dégradé subtil
            },

            // =========================================================================
            // 🌓 OMBRES (SHADOWS) - MODIFIABLE ✏️
            // =========================================================================
            //
            // Les ombres créent de la profondeur et de l'élégance.
            //
            // • shadow-elegant → Ombre subtile et élégante (cartes principales)
            // • shadow-glow    → Effet de lueur (éléments mis en valeur)
            // • shadow-card    → Ombre standard pour les cartes
            //
            // =========================================================================
            boxShadow: {
                'elegant': 'var(--shadow-elegant)',  // Ombre élégante
                'glow': 'var(--shadow-glow)',        // Effet de lueur
                'card': 'var(--shadow-card)'         // Ombre des cartes
            },

            // =========================================================================
            // 🔘 ARRONDIS DES COINS (BORDER RADIUS) - MODIFIABLE ✏️
            // =========================================================================
            //
            // Contrôle l'arrondi des coins des boutons, cartes et autres éléments.
            //
            // Valeurs suggérées:
            // • 0rem      → Coins carrés (style brutaliste)
            // • 0.25rem   → Coins légèrement arrondis
            // • 0.5rem    → Coins moyennement arrondis (défaut Toorrii)
            // • 1rem      → Coins très arrondis (style moderne/doux)
            //
            // Pour modifier: Changez --radius dans index.css
            //
            // =========================================================================
            borderRadius: {
                lg: 'var(--radius)',                    // Grand arrondi
                md: 'calc(var(--radius) - 2px)',        // Arrondi moyen
                sm: 'calc(var(--radius) - 4px)'         // Petit arrondi
            },

            // =========================================================================
            // 🎬 ANIMATIONS - SECTION TECHNIQUE
            // =========================================================================
            //
            // Ces animations ajoutent du dynamisme à l'interface.
            // ⚠️ Modification réservée aux développeurs.
            //
            // =========================================================================
            keyframes: {
                // Animation d'ouverture des accordéons
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                // Animation de fermeture des accordéons
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                // Animation de fondu à l'apparition
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                // Animation de glissement vers le haut
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(50px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                // Animation de zoom à l'apparition
                'scale-in': {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' }
                },
                // Animation de lueur pulsante
                'glow': {
                    '0%, 100%': { boxShadow: 'var(--shadow-glow)' },
                    '50%': { boxShadow: '0 0 80px hsl(142 76% 55% / 0.4)' }
                },
                // Animation de flottement
                'float': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '33%': { transform: 'translateY(-30px) rotate(1deg)' },
                    '66%': { transform: 'translateY(20px) rotate(-1deg)' }
                },
                // Animation de blob (forme organique)
                'blob': {
                    '0%, 100%': { transform: 'translateY(0px) scale(1) rotate(0deg)' },
                    '33%': { transform: 'translateY(-20px) scale(1.1) rotate(1deg)' },
                    '66%': { transform: 'translateY(15px) scale(0.9) rotate(-1deg)' }
                }
            },

            // ─────────────────────────────────────────────────────────────────────────
            // 🎬 ANIMATIONS DISPONIBLES - RÉFÉRENCE
            // ─────────────────────────────────────────────────────────────────────────
            //
            // Ces animations peuvent être appliquées avec les classes:
            // • animate-accordion-down  → Animation d'accordéon
            // • animate-fade-in         → Apparition en fondu
            // • animate-slide-up        → Glissement vers le haut
            // • animate-scale-in        → Zoom à l'apparition
            // • animate-glow            → Lueur pulsante
            // • animate-float           → Effet de flottement
            // • animate-blob            → Animation organique
            //
            // ─────────────────────────────────────────────────────────────────────────
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.6s ease-out',
                'slide-up': 'slide-up 0.8s ease-out',
                'scale-in': 'scale-in 0.4s ease-out',
                'glow': 'glow 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'blob': 'blob 8s ease-in-out infinite'
            }
        }
    },

    // ─────────────────────────────────────────────────────────────────────────────
    // ⚙️ PLUGINS - NE PAS MODIFIER
    // Le plugin tailwindcss-animate ajoute des utilitaires d'animation.
    // ─────────────────────────────────────────────────────────────────────────────
    plugins: [require("tailwindcss-animate")],
} satisfies Config;