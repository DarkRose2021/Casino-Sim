const dice1Element = document.getElementById('dice1');
const dice2Element = document.getElementById('dice2');
const rollButton = document.getElementById('roll-button');
const withdrawButton = document.getElementById('withdraw-button');
const pointElement = document.getElementById('point');
const statusElement = document.getElementById('status');
const passBetButton = document.getElementById('pass-bet');
const dontPassBetButton = document.getElementById('dont-pass-bet');
const fieldBetButton = document.getElementById('field-bet');
const hardway4BetButton = document.getElementById('hardway-4-bet');
const hardway10BetButton = document.getElementById('hardway-10-bet');

let point = null;
let rollCount = 0;

function rollDice() {
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;

  dice1Element.textContent = dice1;
  dice2Element.textContent = dice2;

  const total = dice1 + dice2;

  if (point === null) {
    if (total === 7 || total === 11) {
        statusElement.textContent = 'You Win!';
    } else if (total === 2 || total === 3 || total === 12) {
        statusElement.textContent = 'You Lose!';
    } else {
        point = total;
        pointElement.textContent = point;
        statusElement.textContent = `Point established: ${point}`;
    }
    } else {
        if (total === 7) {
            statusElement.textContent = 'You Lose!';
            balance -= 10;
            point = null;
            pointElement.textContent = '';
        } else if (total === point) {
            statusElement.textContent = 'You Win!';
            balance += 10;
            point = null;
            pointElement.textContent = '';
        } else {
            statusElement.textContent = 'Roll again!';
        }
    }

    rollCount++;
    updateBalance();
    rollButton.disabled = true;
    }

function updateBalance() {
  const balanceDisplay = document.getElementById('balance-display');
  balanceDisplay.textContent = `Balance: $${balance}`;

  if (balance <= 0) {
    statusElement.textContent = 'You are out of money. Click Withdraw to restart.';
    rollButton.disabled = true;
    withdrawButton.disabled = false;
  } else {
    rollButton.disabled = false;
    withdrawButton.disabled = true;
  }
  }

  function makeBet(betAmount) {
    if (balance >= betAmount) {
      balance -= betAmount;
      updateBalance();
      return true;
    } else {
      statusElement.textContent = 'Insufficient balance for this bet.';
      return false;
    }
  }

function withdrawBalance() {
  balance = balance;
  rollCount = 0;
  point = null;
  pointElement.textContent = '';
  statusElement.textContent = '';
  updateBalance();
  withdrawButton.disabled = true;
}



rollButton.addEventListener('click', rollDice);
withdrawButton.addEventListener('click', withdrawBalance);
passBetButton.addEventListener('click', () => makeBet(10));
dontPassBetButton.addEventListener('click', () => makeBet(10));
fieldBetButton.addEventListener('click', () => makeBet(10));
hardway4BetButton.addEventListener('click', () => makeBet(10));
hardway10BetButton.addEventListener('click', () => makeBet(10));


updateBalance();
