
const words = [
  "apple", "banana", "orange", "grape", "strawberry", "pineapple", "watermelon", "blueberry", "kiwi", "pear",
  "we", "he", "she", "it", "they", "this", "that", "these", "those", "some", "any", "all", "many", "few",
  "big", "small", "good", "bad", "happy", "sad", "beautiful", "ugly", "hot", "cold", "new", "old", "young",
  "man", "woman", "child", "dog", "cat", "bird", "fish", "house", "car", "tree", "flower", "sun", "moon",
  "run", "walk", "jump", "eat", "drink", "sleep", "talk", "listen", "read", "write", "play", "work", "study"
];

let isStared = false;
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
// const wordToType = document.getElementById('wordToType');
const startButton = document.getElementById('startButton');
const timeDisplay = document.getElementById('timeDisplay');
const viewResultButton = document.getElementById('viewResultButton');
const resultSection = document.getElementById('resultSection');
const wpmResult = document.getElementById('wpmResult');
const gameText = document.querySelector('.game-text');
const wordToType = document.getElementById('wordToType');
const mistakesCount = document.getElementById('mistakesCount');
const accuracyPercentage = document.getElementById('accuracyPercentage');
const closeBtn = document.querySelector('.close');
viewResultButton.addEventListener('click', function () {
  resultModal.style.display = 'block';
  calculateResults();
});

closeBtn.addEventListener('click', function () {
  resultModal.style.display = 'none';
});

window.addEventListener('click', function (event) {
  if (event.target === resultModal) {
    resultModal.style.display = 'none';
  }
});

function calculateResults() {
  const endTime = new Date().getTime();
  const minutes = (endTime - startTime) / 60000; // Calculate minutes
  const typedWords = wordCount;
  const accuracy = calculateAccuracy(typedWords, words.length);
  const wpm = Math.round(typedWords / minutes); // Calculate WPM
  const incorrectWords = typedWords - words.length;

  wpmResult.textContent = wpm;
  mistakesCount.textContent = incorrectWords;
  accuracyPercentage.textContent = `${accuracy}%`;
}

function calculateAccuracy(typedWords, totalWords) {
  const accuracy = ((totalWords - (typedWords - wordCount)) / totalWords) * 100;
  return accuracy.toFixed(2);
}


let countdown;
let timeLeft = 60;
let startTime;
let wordCount = 0;

startButton.addEventListener('click', function () {
  startGame();
});

function startGame() {
  isStared = true;
  timeLeft = 60;
  clearInterval(countdown);
  wordCount = 0;
  gameText.textContent = 'Game Started';
  countdown = setInterval(function () {
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
  typingInput.addEventListener('input', function (event) {
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

typingInput.addEventListener('input', function (event) {
  if (isStared == true) {
    return;
  }
  else {
    const typedText = event.target.value.trim();
    const originalWord = wordToType.textContent.trim();

    if (typedText === originalWord) {
      wordToType.textContent = getRandomWord();
      event.target.value = '';
    }
  }
});

function displayTime() {
  timeDisplay.textContent = `${timeLeft}s`;
}


document.body.addEventListener('keydown', function () {
  // Set the focus on the typing input field
  typingInput.focus();
});




function getKey (e) {
  var location = e.location;
  var selector;
  if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
      selector = ['[data-key="' + e.keyCode + '-R"]']
  } else {
      var code = e.keyCode || e.which;
      selector = [
          '[data-key="' + code + '"]',
          '[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]'
      ].join(',');
  }
  return document.querySelector(selector);
}

function pressKey (char) {
  var key = document.querySelector('[data-char*="' + char.toUpperCase() + '"]');
  if (!key) {
      return console.warn('No key for', char);
  }
  key.setAttribute('data-pressed', 'on');
  setTimeout(function () {
      key.removeAttribute('data-pressed');
  }, 200);
}

document.body.addEventListener('keydown', function (e) {
  var key = getKey(e);
  if (!key) {
      return console.warn('No key for', e.keyCode);
  }

  key.setAttribute('data-pressed', 'on');
});

document.body.addEventListener('keyup', function (e) {
  var key = getKey(e);
  key && key.removeAttribute('data-pressed');
});

function size () {
  var size = keyboard.parentNode.clientWidth / 90;
  keyboard.style.fontSize = size + 'px';
  console.log(size);
}

var keyboard = document.querySelector('.keyboard');
window.addEventListener('resize', function (e) {
  size();
});
size();

const body = document.body;

startButton.addEventListener('click', function () {
  body.classList.add('transition-background');
  body.classList.add('dark-background');

  setTimeout(() => {
    body.classList.remove('dark-background');
  }, timeLeft*1000); 
});