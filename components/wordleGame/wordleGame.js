import { WordleBoard } from '../wordleBoard/wordleBoard.js';
import { Keyboard } from '../keyboard/keyboard.js';

/**Visualizzazione tavolo di gioco */
export function WordleGame(secret, translations) {
  const container = document.createElement('div');
  //01. Creazione variabili di gioco
  let currentGuess = '';
  let currentRow = 0;
  const maxGuesses = 6;
  //01. Creazione Board
  const board = WordleBoard(secret, maxGuesses);
  container.appendChild(board.container);
  //02. Creazione Tastiera
  const keyboard = Keyboard((key) => handleKey(key));
  container.appendChild(keyboard.container);
  //03. Creazione Reset Button
  const resetBtn = document.createElement('button');
  resetBtn.textContent = `${translations.langs[translations.currentLang].words['NEW_MATCH']}`;
  resetBtn.addEventListener('click', () => {
    container.innerHTML = '';
    const newGame = WordleGame(secret);
    container.appendChild(newGame);
  });
  container.appendChild(resetBtn);
  //04. Listener tastiera fisica
  function keyListener(e) {
    handleKey(e.key.toUpperCase());
  }
  document.addEventListener('keydown', keyListener);

  function handleKey(key) {
    if(currentRow >= maxGuesses) return;
    if(key?.toUpperCase() === "BACKSPACE"){
      currentGuess = currentGuess.slice(0,-1);
      board.updateRow(currentRow, currentGuess);
    } else if(key === "ENTER"){
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

  // Funzione per rimuovere tutto dal DOM e i listener
  function removeGame() {
    document.removeEventListener('keydown', keyListener);
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }

  // Espone anche la funzione removeGame
  container.removeGame = removeGame;

  return container;
}