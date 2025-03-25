import { createRoot } from 'react-dom/client';
import { SidebarProvider } from "@/components/ui/sidebar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import i18n from "./i18n/i18n.ts";
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Check your index.html file.");
}

const root = createRoot(rootElement);

root.render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <LanguageProvider>
      <SidebarProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </SidebarProvider>
    </LanguageProvider>
  </ThemeProvider>
);