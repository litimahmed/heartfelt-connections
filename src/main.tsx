/**
 * @file main.tsx
 * @description This is the main entry point for the React application.
 * It sets up the root of the application, including all necessary providers,
 * and renders the main App component into the DOM.
 *
 * @author Toorrii Development Team
 * @version 1.0.0
 */

// Import necessary libraries and components.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TranslationProvider } from "@/contexts/TranslationContext";
import App from "./App.tsx";
import "./index.css"; // Import global styles.

/**
 * @const {QueryClient} queryClient
 * @description An instance of QueryClient from React Query. It is used to manage
 * server state throughout the application, including caching, fetching, and updating data.
 */
const queryClient = new QueryClient();

/**
 * Root Application Render
 *
 * This section initializes the React application and mounts it to the DOM element with the ID "root".
 * The component tree is wrapped with several providers to enable global functionality:
 *
 * 1. `StrictMode`: An optional wrapper that helps identify potential problems in an application during development.
 *    It activates additional checks and warnings for its descendants.
 *
 * 2. `BrowserRouter`: Provides client-side routing capabilities, allowing the application to navigate
 *    between different pages without a full page reload.
 *
 * 3. `QueryClientProvider`: Connects the React Query client to the component tree, making it accessible
 *    to all components for server state management.
 *
 * 4. `TranslationProvider`: A custom context provider that manages the application's multi-language
 *    support (French, Arabic, and English).
 *
 * 5. `App`: The main application component, which contains the core layout and routing structure.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TranslationProvider>
          <App />
        </TranslationProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
