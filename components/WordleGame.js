import { WordleBoard } from './WordleBoard.js';
import { Keyboard } from './Keyboard.js';

export function WordleGame(secret) {
  const container = document.createElement('div');

  let currentGuess = '';
  let currentRow = 0;
  const maxGuesses = 6;

  // Board
  const board = WordleBoard(secret, maxGuesses);
  container.appendChild(board.container);

  // Keyboard
  const keyboard = Keyboard((key) => handleKey(key));
  container.appendChild(keyboard.container);

  // Reset Button
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Nuova Partita';
  resetBtn.addEventListener('click', () => {
    container.innerHTML = '';
    const newGame = WordleGame(secret);
    container.appendChild(newGame);
  });
  container.appendChild(resetBtn);

  function handleKey(key) {
    if(currentRow >= maxGuesses) return;

    if(key === "Backspace"){
      currentGuess = currentGuess.slice(0,-1);
      board.updateRow(currentRow, currentGuess);
    } else if(key === "Enter"){
      if(currentGuess.length === secret.length){
        board.checkGuess(currentRow, currentGuess, secret, keyboard);
        currentGuess = '';
        currentRow++;
      }
    } else if(key.length === 1 && /[A-Z]/.test(key)){
      if(currentGuess.length < secret.length){
        currentGuess += key;
        board.updateRow(currentRow, currentGuess);
      }
    }
  }

  // Listener tastiera fisica
  document.addEventListener('keydown', (e) => handleKey(e.key.toUpperCase()));

  return container;
}