export async function getAppLangs(currentLang) {
    try {
        const en = await (await fetch('./assets/langs/en.json')).json();
        const ita = await (await fetch('./assets/langs/ita.json')).json();
        const gr = await (await fetch('./assets/langs/gr.json')).json();
        return {
            currentLang,
            langs:  {
                en: { name: 'English', words: en },
                it: { name: 'Italiano', words: ita },
                gr: { name: 'Ελληνικά', words: gr }
            }
        };
    } catch (error) {
        console.error('Error fetching language files:', error);
        throw error;
    }
}