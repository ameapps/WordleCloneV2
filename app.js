import { WordleGame } from './components/wordleGame/wordleGame.js';
import { getSecretWord } from './services/secret-word/secretWord.js';
import { languageSelector, destroyLangSelector } from './components/languageSelector/languageSelector.js';

/**Variabili globali */
let currentLang = 'en'; 
let app = null; 

/**Entry dell'app con costruzione GUI */
async function App() {
  app = document.createElement('div');
  const langSelector = languageSelector(handleLangChange);
  document.body.prepend(langSelector);
  const secret = await getSecretWord(currentLang) ?? 'HELLO';
  console.log("Parola segreta:", secret);
  const game = WordleGame(secret);
  app.appendChild(game);
  return app;
}

/**Callback cambio lingua */
async function handleLangChange(lang) {
  currentLang = lang;
  // Distruggo la tendina esistente
  destroyLangSelector();
  // Aggiungo la nuova tendina
  const langSelector = languageSelector(handleLangChange);
  document.body.prepend(langSelector);
  const secret = await getSecretWord(currentLang) ?? 'HELLO';
  console.log("Parola segreta:", secret);
  const game = WordleGame(secret);
  app.appendChild(game);
}

//Avvio app con gestione asincrona
(async () => {
  const root = document.getElementById('app');
  const app = await App();
  root.appendChild(app);
})();