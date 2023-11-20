const words = [
  "apple", "banana", "orange", "grape", "strawberry", "pineapple", "watermelon", "blueberry", "kiwi", "pear",
  "apricot", "cherry", "coconut", "fig", "lemon", "lime", "mango", "papaya", "peach", "plum",
  "raspberry", "blackberry", "cantaloupe", "cranberry", "nectarine", "pomegranate", "melon", "tangerine", "avocado", "guava",
  "kiwifruit", "persimmon", "boysenberry", "elderberry", "gooseberry", "lychee", "passionfruit", "rhubarb", "starfruit", "durian",
  "jackfruit", "kumquat", "mulberry", "plantain", "quince", "soursop", "ugli fruit", "yuzu", "zucchini", "eggplant",
  "broccoli", "carrot", "cucumber", "lettuce", "spinach", "potato", "tomato", "bell pepper", "onion", "garlic",
  "ginger", "cabbage", "cauliflower", "asparagus", "celery", "peas", "beans", "corn", "artichoke", "pumpkin",
  "squash", "radish", "turnip", "sweet potato", "beetroot", "leek", "shallot", "fennel", "parsnip", "rutabaga",
  "watercress", "arugula", "endive", "kale", "chard", "collard greens", "bok choy", "mustard greens", "broccolini", "daikon",
  "edamame", "okra", "chives", "cilantro", "parsley", "basil", "mint", "thyme", "rosemary", "oregano"

];

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
let previousWord = ''; // Variable to store the previous word

function setRandomWordWithoutRepetition() {
  let newWord = getRandomWord();
  while (newWord === previousWord) {
    newWord = getRandomWord(); // Get a new word until it's different from the previous one
  }
  previousWord = newWord;
  return newWord;
}
// Function to set the random word in the placeholder div
function setRandomWord() {
  const wordToType = document.getElementById('wordToType');
  const newWord = setRandomWordWithoutRepetition();
  wordToType.textContent = newWord;
}

// Call the function to set the initial random word
setRandomWord();

const typingInput = document.querySelector('.typing-text');
const wordToType = document.getElementById('wordToType');
const startButton = document.getElementById('startButton');
const timeDisplay = document.getElementById('timeDisplay');
const wpmDisplay = document.getElementById('wpmDisplay');
const gameText = document.querySelector('.game-text');

let countdown;
let timeLeft = 30;
let startTime;
let wordCount = 0;

startButton.addEventListener('click', function() {
  startGame();
});

function startGame() {
  timeLeft = 30;
  clearInterval(countdown);
  wordCount = 0;
  gameText.textContent = 'Game Started';
  countdown = setInterval(function() {
    timeLeft--;
    displayTime();

    if (timeLeft <= 0) {
      clearInterval(countdown);
      alert('Time\'s up!');
      startButton.textContent = 'Try Again';
      calculateWPM();
      return;
    }
  }, 1000);
  typingInput.addEventListener('input', function(event) {
    const typedText = event.target.value.trim();
    const originalWord = wordToType.textContent.trim();
  
    if (typedText === originalWord) {
      wordCount++;
      wordToType.textContent = getRandomWord();
      event.target.value = '';
    }
  });
  typingInput.value = '';
  wordToType.textContent = getRandomWord();
  startTime = new Date().getTime(); // Record start time
}

typingInput.addEventListener('input', function(event) {
  const typedText = event.target.value.trim();
  const originalWord = wordToType.textContent.trim();

  if (typedText === originalWord) {
    wordToType.textContent = getRandomWord();
    event.target.value = '';
  }
});

function displayTime() {
  timeDisplay.textContent = `${timeLeft}s`;
}

function calculateWPM() {
  const endTime = new Date().getTime();
  const minutes = (endTime - startTime) / 60000; // Calculate minutes
  const wpm = Math.round(wordCount / minutes); // Calculate WPM

  wpmDisplay.textContent = `WPM: ${wpm}`;
}




