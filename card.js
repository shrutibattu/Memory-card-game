const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!hasFlippedCard) {
    //firstclick
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  //secondclick
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
  // result();
}
function checkForMatch() {
  //do cards match
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    //its a match
    disableCards();
  } else {
    //not a match
    unflipCards();
  }
}
function disableCards() {
  //its a match
  firstCard.removeEventListner("click", flipCard);
  secondCard.removeEventListner("click", flipCard);
  resetBoard();
}
function unflipCards() {
  lockBoard = true;
  //not a match
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
    resetBoard();
  }, 1500);
}
function resetBoard() {
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

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
