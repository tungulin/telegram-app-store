import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './lang/EN.json'
import translationRUS from './lang/RU.json'
// export const defaultNS = 'ns1';

i18next.use(initReactI18next).init({
    resources: {
        en: {
            translation: translationEN
        },
        ru: {
            translation: translationRUS
        }
    },
});


export default i18next