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
  const keyboard = Keyboard((key) => handleKey(key), translations.currentLang);
  container.appendChild(keyboard.container);
  //03. Creazione Reset Button
  const resetBtn = document.createElement('button');
  resetBtn.textContent = `${translations.langs[translations.currentLang].words['NEW_MATCH']}`;
  resetBtn.addEventListener('click', () => {
    container.innerHTML = '';
    const newGame = WordleGame(secret, translations);
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
    // Qui puoi aggiungere un controllo per lettere greche se serve
    if(key?.toUpperCase() === "BACKSPACE" || key === "←"){
      currentGuess = currentGuess.slice(0,-1);
      board.updateRow(currentRow, currentGuess);
    } else if(key?.toUpperCase() === "ENTER"){
      if(currentGuess.length === secret.length){
        board.checkGuess(currentRow, currentGuess, secret, keyboard);
        if(currentGuess.toUpperCase() === secret.toUpperCase()) {
          alert('HAI INDOVINATO LA PAROLA!');
        }
        currentGuess = '';
        currentRow++;
      }
    } else if(key.length === 1 && (
      (translations.currentLang === 'gr' && /[Α-ΩΪΫά-ώϊϋΐΰ]/i.test(key)) ||
      (translations.currentLang !== 'gr' && /[A-Z]/.test(key))
    )){
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