const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
function flipCard() {
  if (lockBoard) return;
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
}
function unflipCards() {
  lockBoard = true;
  //not a match
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
  }, 1500);
}
cards.forEach((card) => card.addEventListener("click", flipCard));
