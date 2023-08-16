//document ids


let bet = 0
// change later?
let betInt = 0
let money = 0

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

const deck = new Set();

for (const suit of suits) {
  for (const rank of ranks) {
    deck.add(`${rank} of ${suit}`);
  }
}

// Now the 'deck' Set contains all 52 unique cards.

// Convert the Set to an array
const shuffledDeck = [...deck];

// Shuffle the array using the Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(shuffledDeck);

console.log(shuffledDeck)

// Now the 'shuffledDeck' array contains the unique cards in a random order.