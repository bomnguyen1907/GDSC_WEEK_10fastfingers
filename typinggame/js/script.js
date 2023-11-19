const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is fun!",
    "Practice makes perfect.",
    // Add more quotes here...
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function startTest() {
    const quoteElement = document.getElementById("quote");
    const userInput = document.getElementById("userInput");
    const feedback = document.getElementById("feedback");

    const randomQuote = getRandomQuote();
    quoteElement.textContent = randomQuote;

    userInput.value = "";
    userInput.focus();

    userInput.addEventListener("input", function () {
        const inputText = userInput.value.trim();
        const quoteText = randomQuote.substring(0, inputText.length);

        if (inputText === randomQuote) {
            feedback.textContent = "Congratulations! You typed the quote correctly.";
        } else if (inputText === quoteText) {
            feedback.textContent = "Keep going!";
        } else {
            feedback.textContent = "Oops! Keep typing...";
        }
    });
}