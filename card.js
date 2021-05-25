const cards = document.querySelectorAll(".card");
let firstClick = false;
let counter = 0;
let cardPair = [];

cards.forEach((card) => {
  card.state = "unclicked";
});

shuffle();

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", () => {});
  if (!firstClick) {
    time();
  }
  firstClick = true;
  if (cards[i].state == "unclicked") {
    cards[i].style.transform = "rotateY(180deg)";
    cards[i].state = "clicked";
    counter++;
    cardPair.push(cards[i]);
    check();
  }
}
function check() {
  if (counter == 2) {
    if (
      cardPair[0].querySelector("img").src == cardPair[1].querySelector("img")
    ) {
      matched();
    } else {
      unmatched();
    }
  }
}
function time() {
  let secs = 0;
  let mins = 0;
  let SS;
  let MM;

  setInterval(() => {
    secs++;
    if (secs == 60) {
      secs = 0;
      mins++;
    }
    sec < 10 ? (SS = `0${secs}`) : (SS = `${secs}`);
    mins < 10 ? (MM = `0${mins}`) : (SS = `${mins}`);
    document.querySelector("#time").innerHTML = `${MM}:${SS}`;
  }, 1000);
}
function shuffle() {
  let images = document.querySelectorAll("img");
  let srcs = [
    "images/berries.jpg",
    "images/cardmom.jpg",
    "images/chilli.jpg",
    "images/citrus.jpg",
    "images/citrusjuice.jpg",
    "images/lavender.jpg",
    "images/mint.jpg",
    "images/spice.jpg",
    "images/berries.jpg",
    "images/cardmom.jpg",
    "images/chilli.jpg",
    "images/citrus.jpg",
    "images/citrusjuice.jpg",
    "images/lavender.jpg",
    "images/mint.jpg",
    "images/spice.jpg",
  ];

  for (let i = srcs.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = srcs[i];
    srcs[i] = srcs[j];
    srcs[j] = temp;
  }
  for (let i = 0; i < images.length; i++) images[i].src = srcs[i];
}
