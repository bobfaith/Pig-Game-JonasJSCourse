"use strict";

//* VARIABLES - Selecting Elements ===========================================================
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.getElementsByClassName("dice")[0];
const btnNew = document.getElementsByClassName("btn--new")[0];
const btnRoll = document.getElementsByClassName("btn--roll")[0];
const btnHold = document.getElementsByClassName("btn--hold")[0];

let scores, currentScore, activePlayer, gamePlaying;

//* Functions =====================================

const init = function () {
  // Resetting the internal state retaining variables
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // Resetting the Visable part  OR Setting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

// Calling init function to initialize the initial state of the game as it loads.
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // the previouse player's score is set to 0 before we switch the players
  currentScore = 0; // resetting the current score here
  activePlayer = activePlayer === 0 ? 1 : 0; // switching the active player using ternary operator
  player0El.classList.toggle("player--active"); // this will remove the 'player-active' class from the element (it the background color) as it has the class applied to it.
  player1El.classList.toggle("player--active"); // this will add the 'player-active' class to the element as it didn't have the class
};

//* Rolling Dice Functionality - EventListeners ==============================================================
btnRoll.addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Generate a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;  //Todo We need to change this line of Code
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Add current score to the active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the Game
      gamePlaying = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to the Next Player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
