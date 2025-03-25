// //i18n.ts
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import enTranslations from './locales/en.json';
// import jaTranslations from './locales/ja.json';

// i18n
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: {
//         translation: enTranslations
//       },
//       ja: {
//         translation: jaTranslations
//       }
//     },
//     lng: localStorage.getItem('language') || 'en',
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false
//     },
//     react: {
//       useSuspense: false
//     }
//   });

// export default i18n;


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import jaTranslations from './locales/ja.json';

i18n
  .use(initReactI18next)
  .init({
    // Define available translations
    resources: {
      en: {
        translation: enTranslations,
      },
      ja: {
        translation: jaTranslations,
      },
    },
    // Language initialization
    lng: localStorage.getItem('language') || navigator.language.split('-')[0] || 'en', // Detect browser language
    fallbackLng: 'en', // Default to English if translation is missing
    supportedLngs: ['en', 'ja'], // List of supported languages
    debug: true, // Set to false in production
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    react: {
      useSuspense: false, // Disable suspense mode for translations
    },
    detection: {
      order: ['localStorage', 'navigator', 'querystring'], // Order of detection
      caches: ['localStorage'], // Cache the selected language in localStorage
    },
  });

// Update language in localStorage on change
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
