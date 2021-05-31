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
  if (document.querySelectorAll(".matched").length === 12) {
    document.getElementById("popup").classList.add("show");
  }
}

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
