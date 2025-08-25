export const languages = [
  { code: 'en', name: 'English' },
  { code: 'it', name: 'Italiano' },
  { code: 'gr', name: 'Greek' }
];

export function languageSelector(onLangChange, translations) {
  const container = document.createElement('div');
  container.className = 'language-selector';

  const label = document.createElement('label');
  label.textContent = `${translations.langs[translations.currentLang].words['LANG']}: `;
  label.setAttribute('for', 'lang-select');

  const select = document.createElement('select');
  select.id = 'lang-select';

  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.name;
    if (lang.code === translations.currentLang) option.selected = true;
    select.appendChild(option);
  });

  select.addEventListener('change', (e) => {
    onLangChange(e.target.value);
  });

  container.appendChild(label);
  container.appendChild(select);

  return container;
}

/**Funzione per l'eliminazione della tendina e della label */
export function destroyLangSelector() {
  try {
    //01. Distruggo la tendina 
    const existingSelector = document.getElementById('lang-select');
    if (existingSelector) {
      existingSelector.remove();
    }
    //02. Distruggo la label
    const existingLabel = document.querySelector('.language-selector label');
    if (existingLabel) {
      existingLabel.remove();
    }
  } catch (error) {
    console.error("Errore durante la distruzione della tendina e della label:", error);
  }
}