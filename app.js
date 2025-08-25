import { WordleGame } from './components/WordleGame.js';

function App() {
  const app = document.createElement('div');
  const game = WordleGame("HELLO"); // parola segreta
  app.appendChild(game);
  return app;
}

const root = document.getElementById('app');
root.appendChild(App());