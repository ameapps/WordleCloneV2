export function WordleBoard(secret, maxGuesses){
  const container = document.createElement('div');
  const rows = [];
  const wordLength = secret.length;

  for(let i=0; i<maxGuesses; i++){
    const row = document.createElement('div');
    row.className = 'row';
    for(let j=0; j<wordLength; j++){
      const cell = document.createElement('div');
      cell.className = 'cell';
      row.appendChild(cell);
    }
    container.appendChild(row);
    rows.push(row);
  }

  function updateRow(rowIndex, guess){
    const cells = rows[rowIndex].children;
    for(let i=0;i<wordLength;i++){
      cells[i].textContent = guess[i] || '';
    }
  }

  function checkGuess(rowIndex, guess, secret, keyboard){
    const cells = rows[rowIndex].children;
    for(let i=0;i<wordLength;i++){
      const char = guess[i];
      if(char === secret[i]){
        cells[i].classList.add('correct');
        keyboard.markKey(char, 'correct');
      } else if(secret.includes(char)){
        cells[i].classList.add('present');
        keyboard.markKey(char, 'present');
      } else {
        cells[i].classList.add('absent');
        keyboard.markKey(char, 'absent');
      }
    }
  }

  return { container, updateRow, checkGuess };
}