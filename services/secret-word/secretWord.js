export function getSecretWord(currentLang) {
    try {
        const words = {
            en: ['HELLO', 'WORLD', 'JAVASCRIPT', 'CODING'],
            it: ['CIAO', 'MONDO', 'JAVASCRIPT', 'PROGRAMMAZIONE']
        };
        const langWords = words[currentLang] || words['en'];
        const random = langWords[Math.floor(Math.random() * langWords.length)];
        return random;
    } catch (error) {
        console.error("Error getting secret word:", error);
        return null;
    }
}