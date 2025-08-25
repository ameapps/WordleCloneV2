export function langSelector(languages, onChange) {
  const container = document.createElement('div');
  container.className = 'language-selector';

  const label = document.createElement('label');
  label.textContent = 'Lingua: ';
  label.setAttribute('for', 'lang-select');

  const select = document.createElement('select');
  select.id = 'lang-select';

  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.name;
    select.appendChild(option);
  });

  select.addEventListener('change', (e) => {
    onChange(e.target.value);
  });

  container.appendChild(label);
  container.appendChild(select);

  return container;
}