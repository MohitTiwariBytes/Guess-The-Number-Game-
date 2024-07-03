const gameContainer = document.getElementById('game-container');
const totalPairs = 4; // Number of pairs, so total cards will be 2 * totalPairs + 1

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Generate random numbers for cards
let cardNumbers = [];
for (let i = 1; i <= totalPairs; i++) {
    cardNumbers.push(i, i); // Each number will appear twice (to make pairs)
}
// Add an extra card with a unique number
cardNumbers.push(totalPairs + 1);

// Shuffle function to randomize array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle card numbers
cardNumbers = shuffle(cardNumbers);

// Create card elements
for (let i = 0; i < cardNumbers.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.framework = cardNumbers[i];

    const frontFace = document.createElement('div');
    frontFace.classList.add('front-face');
    frontFace.textContent = cardNumbers[i];

    const backFace = document.createElement('div');
    backFace.classList.add('back-face');
    backFace.textContent = '?';

    card.appendChild(frontFace);
    card.appendChild(backFace);

    gameContainer.appendChild(card);

    // Add click event listener to each card
    card.addEventListener('click', flipCard);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
