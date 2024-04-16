import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n

    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    titleMain: 'The Art of Food',
                    instructions: 'Please select one of the following questions from the dropdown menu and record your answer:',
                    q1: 'What is the most delicious thing you have ever eaten? Describe it!',
                    q2: 'What role does food play in your family\'s cultural or holiday traditions?',
                    q3: 'Share a memorable food from your childhood.'
                }
            },
            es: {
                translation: {
                    titleMain: 'EL ARTE DE LA GASTRONOMIA',
                    instructions: 'Seleccione una de las siguientes preguntas del menú y registre su respuesta:',
                    q1: '¿Qué es lo más delicioso que has comido jamás?  ¡Describirlo!',
                    q2: '¿Qué papel juega la comida en las tradiciones culturales o navideñas de su familia?',
                    q3: 'Comparte una comida memorable de tu infancia.'
                }
            }
        }
    });

export default i18n;