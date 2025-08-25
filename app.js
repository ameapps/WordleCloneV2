import { WordleGame } from './components/wordleGame/wordleGame.js';
import { getSecretWord } from './services/secret-word/secretWord.js';
import { LanguageSelector } from './components/LanguageSelector.js';

let currentLang = 'en'; // valore di default

const languages = [
  { code: 'it', name: 'Italiano' },
  { code: 'en', name: 'English' },
  { code: 'gr', name: 'Greek' }
];

function handleLangChange(lang) {
  currentLang = lang;
  // Puoi aggiungere qui altre azioni da eseguire al cambio lingua
}

function App() {
  const app = document.createElement('div');
  const langSelector = LanguageSelector(languages, handleLangChange);
  document.body.prepend(langSelector);
  const currentLang = 'en'; // Imposta la lingua corrente
  const secret = getSecretWord(currentLang) ?? 'HELLO';
  console.log("Parola segreta:", secret);
  const game = WordleGame(secret);
  app.appendChild(game);
  return app;
}

const root = document.getElementById('app');
root.appendChild(App());