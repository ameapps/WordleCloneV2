export async function getSecretWord(currentLang) {
    try {
        const langFiles = {
            en: 'assets/en.json',
            it: 'assets/it.json',
            gr: 'assets/gr.json'
        };
        const langFile = langFiles[currentLang] || langFiles['en'];
        const response = await fetch(langFile);
        if (!response.ok) throw new Error('Impossibile caricare il file delle parole');
        const data = await response.json();
        let words = data;
        const random = words[Math.floor(Math.random() * words.length)];
        return random.toUpperCase();
    } catch (error) {
        console.error("Error getting secret word:", error);
        return null;
    }
}