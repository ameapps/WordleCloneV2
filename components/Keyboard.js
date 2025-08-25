export function Keyboard(onKeyPress){
  const container = document.createElement('div');
  container.className = 'keyboard';

  // Definisci le righe della tastiera
  const rows = [
    "QWERTYUIOP".split(''),
    "ASDFGHJKL".split(''),
    "ZXCVBNM".split('')
  ];

  const keyElements = {};

  rows.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'keyboard-row';

    // Terza riga: aggiungi Enter prima e Backspace dopo i tasti
    if(rowIndex === 2){
      const enterKey = document.createElement('div');
      enterKey.className = 'key key-wide';
      enterKey.textContent = 'Enter';
      enterKey.addEventListener('click', () => onKeyPress('Enter'));
      rowDiv.appendChild(enterKey);
    }

    row.forEach(k => {
      const key = document.createElement('div');
      key.className = 'key';
      key.textContent = k;
      key.addEventListener('click', () => onKeyPress(k));
      rowDiv.appendChild(key);
      keyElements[k] = key;
    });

    if(rowIndex === 2){
      const backKey = document.createElement('div');
      backKey.className = 'key key-wide';
      backKey.textContent = '←';
      backKey.addEventListener('click', () => onKeyPress('Backspace'));
      rowDiv.appendChild(backKey);
    }

    container.appendChild(rowDiv);
  });

  function markKey(char, status){
    const key = keyElements[char];
    if(key){
      key.classList.remove('correct','present','absent');
      key.classList.add(status);
    }
  }

  return { container, markKey };
}