const cards = document.querySelectorAll(".card");
const curFlips = document.querySelector(".currentFlips");
const progressValue = document.querySelectorAll(".progress__value");
let matched = 0;
let cardOne, cardTwo;
let boardLocked = false;
let currentProgress = 0;
let allProgress = JSON.parse(localStorage.getItem("progress"));
let indexProgress = localStorage.getItem("index");

function getLocalStorage() {
  if (indexProgress) {
    for (let i = 0; i < allProgress.length; i++) {
      progressValue[i].innerHTML = allProgress[i];
    }
  }
}

function showLastValue() {
  for (let i = 0; i < progressValue.length; i++) {
    if (i == indexProgress) {
      progressValue[i].classList.add("lastValue");
    } else progressValue[i].classList.remove("lastValue");
  }
}

function saveLocalStorage() {
  if (indexProgress == null || indexProgress >= 9) {
    indexProgress = 0;
  } else indexProgress++;

  if (allProgress === "" || allProgress === null) {
    allProgress = [];
  }

  allProgress[indexProgress] = currentProgress;
  progressValue[indexProgress].innerHTML = currentProgress;
  localStorage.setItem("progress", JSON.stringify(allProgress));
  localStorage.setItem("index", indexProgress);
}

function showCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !boardLocked) {
    clickedCard.classList.add("flip");
    currentProgress++;
    curFlips.innerHTML = currentProgress;
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    boardLocked = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == 8) {
      setTimeout(() => {
        saveLocalStorage();
        showLastValue();
        currentProgress = 0;
        return mixCard();
      }, 1000);
    }
    cardOne.removeEventListener("click", showCard);
    cardTwo.removeEventListener("click", showCard);
    cardOne = cardTwo = "";
    return (boardLocked = false);
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    boardLocked = false;
  }, 1200);
}

function mixCard() {
  showLastValue();
  getLocalStorage();
  curFlips.innerHTML = 0;
  matched = 0;
  boardLocked = false;
  cardOne = cardTwo = "";
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `./assets/images/img-${arr[i]}.svg`;
    card.addEventListener("click", showCard);
  });
}

mixCard();

cards.forEach((card) => {
  card.addEventListener("click", showCard);
});
