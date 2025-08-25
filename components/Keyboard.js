export function Keyboard(onKeyPress){
  const container = document.createElement('div');
  container.className = 'keyboard';
  const keys = "QWERTYUIOPASDFGHJKLZXCVBNM".split('');
  const keyElements = {};

  keys.forEach(k => {
    const key = document.createElement('div');
    key.className = 'key';
    key.textContent = k;
    key.addEventListener('click', () => onKeyPress(k));
    container.appendChild(key);
    keyElements[k] = key;
  });

  // Enter e Backspace
  const enterKey = document.createElement('div');
  enterKey.className = 'key';
  enterKey.textContent = 'Enter';
  enterKey.addEventListener('click', () => onKeyPress('Enter'));
  container.appendChild(enterKey);

  const backKey = document.createElement('div');
  backKey.className = 'key';
  backKey.textContent = 'Backspace';
  backKey.addEventListener('click', () => onKeyPress('Backspace'));
  container.appendChild(backKey);

  function markKey(char, status){
    const key = keyElements[char];
    if(key){
      key.classList.remove('correct','present','absent');
      key.classList.add(status);
    }
  }

  return { container, markKey };
}