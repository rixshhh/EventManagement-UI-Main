import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export type Language = "en-IN" | "hi-IN" | "fr-FR";

export const resources = {
  "en-IN": {
    translation: {
      home: "Home",
      events: "Events",
      browse: "Browse",
      login: "Login",
      signup: "Signup",
      report: "Report",
      logout: "Logout",
    },
  },
  "hi-IN": {
    translation: {
      home: "होम",
      events: "इवेंट्स",
      browse: "ब्राउज़",
      login: "लॉगिन",
      signup: "साइन अप",
      report: "रिपोर्ट",
      logout: "लॉगआउट",
    },
  },
  "fr-FR": {
    translation: {
      home: "Accueil",
      events: "Événements",
      browse: "Explorer",
      login: "Connexion",
      signup: "S’inscrire",
      report: "Rapport",
      logout: "Déconnexion",
    },
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: (localStorage.getItem("lang") as Language) || "en-IN",
  fallbackLng: "en-IN",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;