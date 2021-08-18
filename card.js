//  pseudocode
//add event listner to cards
//click on the first card and flip
//click on the second card and flip
// check for match
// if matched disable the cards-remove event listner
//if not matched unflip the cards back
// lock the board so the cards cannot be clicked again

//-----------------------------------

//click event and flipcard function is called

window.onload = document.getElementById("popup-start").classList.add("show");
document.querySelector(".start-btn").addEventListener("click", function () {
  document.getElementById("popup-start").classList.remove("show");
  startTimer();
});

const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
function flipCard() {
  if (lockBoard) return;

  if (this === firstCard) return;

  //this will toggle the class that means if the class is there it removes and vice-versa
  this.classList.add("flip");

  if (!hasFlippedCard) {
    //this means the player has clicked the card first time
    //firstclick

    hasFlippedCard = true;
    //then set flipped card to true
    firstCard = this;
    //firstcard is set to "this" keyword. "this" is the element that fired the event
    return;
  }
  // now hasflipped card is set to false (if true then firstclick)or else
  //secondclick
  hasFlippedCard = false;
  //as it is false the "this" variable is set to secondcard
  secondCard = this;

  checkForMatch();
  // result();
}
function checkForMatch() {
  //do cards match

  //in order to access the data attribute set in HTML we do this through "dataset" object
  //element.dataset.name chosen
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    //its a match
    disableCards();
    checkForWinner();

    return;
  } else {
    //not a match
    unflipCards();
  }
}
function disableCards() {
  //its a match then disable cards by removing the event listner
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  // firstCard.removeEventListner("click", flipCard);
  // secondCard.removeEventListner("click", flipCard);
  resetBoard();
}
function unflipCards() {
  lockBoard = true;
  //not a match

  //set time out function to delay the remove "flip " by 1500 ms.to see the flipping
  setTimeout(() => {
    //remove the flip class from the cards
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
    resetBoard();
  }, 1500);
}
//after each round firstcard and secondcard reset to be null to meet the above "this" condtion
function resetBoard() {
  //es6 destructuring assignment
  [hasFlippedCard, lockBoard] = [false, false][(firstCard, secondCard)] = [
    null,
    null,
  ];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})(); // this function is wrapped in extra brackets whic is IIFE- Immediately Invoked Function Expression which means it is invoked right after its defination

function checkForWinner() {
  if (document.querySelectorAll(".matched").length === 12 || timeLeft === 0) {
    document.getElementById("popup").classList.add("show");
    onTimesUp();
  }
}
document.querySelector(".restart-btn").addEventListener("click", function () {
  window.location.reload();
  return false;
});

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
// ---------------------------
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
