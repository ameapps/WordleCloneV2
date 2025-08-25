import { WordleGame } from './components/wordleGame/wordleGame.js';
import { getSecretWord } from './services/secret-word/secretWord.js';

function App() {
  const app = document.createElement('div');
  const currentLang = 'en'; // Imposta la lingua corrente
  const secret = getSecretWord(currentLang) ?? 'HELLO';
  console.log("Parola segreta:", secret);
  const game = WordleGame(secret);
  app.appendChild(game);
  return app;
}

const root = document.getElementById('app');
root.appendChild(App());