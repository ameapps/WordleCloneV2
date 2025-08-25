import { WordleGame } from './components/wordleGame/wordleGame.js';
import { getSecretWord } from './services/secret-word/secretWord.js';
import { getAppLangs } from './services/translations/translations.js';
import { languageSelector, destroyLangSelector } from './components/languageSelector/languageSelector.js';

/**Variabili globali */
let currentLang = 'en';
let app = null;
let game = null;
let translations = null;

/**Entry dell'app con costruzione GUI */
async function App() {
  app = document.createElement('div');
  //01. Recupero le lingue dell'app 
  translations = await getAppLangs(currentLang);
  console.log("Lingue disponibili:", translations);
  //02. Inizializzo la sessione
  const session = await initSession();
  return session;
}

async function initSession() {
  //01. Creo la select per le lingue
  const langSelector = languageSelector(handleLangChange, translations);
  document.body.prepend(langSelector);
  //02. Recupero la parola segreta
  const secret = await getSecretWord(currentLang) ?? 'HELLO';
  console.log("Parola segreta:", secret);
  if (game != null) game.removeGame();
  //03. Recupero la parola
  game = WordleGame(secret, translations);
  app.appendChild(game);
  return app;
}

/**Callback cambio lingua */
async function handleLangChange(lang) {
  
  currentLang = lang;
  // Distruggo la tendina esistente
  destroyLangSelector();
  // Aggiungo la nuova tendina
  const session = await initSession();
}

//Avvio app con gestione asincrona
(async () => {
  const root = document.getElementById('app');
  const app = await App();
  root.appendChild(app);
})();