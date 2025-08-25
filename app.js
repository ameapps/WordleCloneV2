import { WordleGame } from './components/wordleGame/wordleGame.js';

function App() {
  const app = document.createElement('div');
  const game = WordleGame("HELLO"); // parola segreta
  app.appendChild(game);
  return app;
}

const root = document.getElementById('app');
root.appendChild(App());