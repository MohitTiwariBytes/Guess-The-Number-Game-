const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const messageDisplay = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

let randomNumber;
let attempts;
let score;

function initGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    score = 0;
    guessInput.value = '';
    messageDisplay.textContent = '';
    attemptsDisplay.textContent = attempts;
    scoreDisplay.textContent = score;
    restartButton.style.display = 'none';
}

function updateScore(result) {
    if (result === 'Correct!') {
        score += 10 - attempts;
    }
    scoreDisplay.textContent = score;
}

function checkGuess() {
    const playerGuess = parseInt(guessInput.value);
    if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > 100) {
        messageDisplay.textContent = 'Please enter a number between 1 and 100.';
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    if (playerGuess === randomNumber) {
        messageDisplay.textContent = 'Correct! You guessed the number!';
        updateScore('Correct!');
        restartButton.style.display = 'block';
        guessButton.disabled = true;
        guessInput.disabled = true;
    } else if (playerGuess < randomNumber) {
        messageDisplay.textContent = 'Too low! Try again.';
    } else {
        messageDisplay.textContent = 'Too high! Try again.';
    }
}

guessButton.addEventListener('click', checkGuess);
restartButton.addEventListener('click', () => {
    guessButton.disabled = false;
    guessInput.disabled = false;
    initGame();
});

// Initialize the game when the page loads
initGame();
