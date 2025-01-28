const fromText = document.querySelector(".from-text"),
      translateBtn = document.querySelector("button");

// Handle translation when Translate button is clicked
translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim();

    if (!text) return;

    fromText.setAttribute("placeholder", "Detecting language and translating...");
    
    // Language detection and translation
    let detectUrl = `https://api.mymemory.translated.net/get?q=${text}`;
    
    fetch(detectUrl)
        .then(res => res.json())
        .then(data => {
            // Detect the source language
            let detectedLang = data.responseData.detectedLanguage || "en"; // Default to English
            let translateTo = detectedLang === "en" ? "hi" : "en"; // Set the target language
            
            // Translate the text into the target language
            let translateUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${detectedLang}|${translateTo}`;
            fetch(translateUrl)
                .then(res => res.json())
                .then(translationData => {
                    fromText.value = translationData.responseData.translatedText; // Replace input with translation
                    fromText.setAttribute("placeholder", "Enter text to translate");
                })
                .catch(() => {
                    fromText.setAttribute("placeholder", "Translation error. Try again!");
                });
        })
        .catch(() => {
            fromText.setAttribute("placeholder", "Detection error. Try again!");
        });
});
