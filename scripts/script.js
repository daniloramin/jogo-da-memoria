import { fruits } from "./cardsGroup.js";
import shuffleCards from "./shuffleCards.js";

const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const finishScreen = document.getElementById("finishScreen");

const turn = {
  first: null,
  second: null,
};

let pairs = [];

shuffleCards();

const cards = [...document.getElementsByClassName("card")];

cards.forEach((card) => {
  card.addEventListener("click", async ({ target }) => {
    if (turn.first?.dataset.card && turn.second?.dataset.card) return;

    if (target.dataset.clicked == "true") return;
    console.log("chamou");

    if (pairs.includes(target.dataset.card)) return;

    target.dataset.clicked = "true";
    target.style.animation = "200ms linear both cardFlip";

    await delay(100);
    target.innerText = target.dataset.card;
    target.style.backgroundColor = "white";

    if (turn.first) {
      turn.second = target;

      console.log(turn);
      console.log(turn.first.dataset.card);
      console.log(turn.second.dataset.card);
      if (turn.first.dataset.card != turn.second.dataset.card) {
        await delay(1000);

        turn.first.style.animation = "200ms linear both reverseCardFlip";
        turn.second.style.animation = "200ms linear both reverseCardFlip";

        await delay(100);
        turn.first.innerText = "🧠";
        turn.second.innerText = "🧠";

        turn.first.style.backgroundColor = "lightskyblue";
        turn.second.style.backgroundColor = "lightskyblue";

        turn.first.dataset.clicked = "false";
        turn.second.dataset.clicked = "false";

        turn.first = null;
        turn.second = null;

        return;
      }

      pairs.push(turn.first.dataset.card);

      turn.first = null;
      turn.second = null;

      if (pairs.length == 10) {
        finishScreen.style.display = "block";
      }
      return;
    }

    turn.first = target;
  });
});

document.getElementById("restartButton").addEventListener("click", () => {
  finishScreen.style.display = "none";

  pairs = [];

  shuffleCards();

  cards.forEach((card) => {
    card.innerText = "🧠";
    card.dataset.clicked = "false";
    card.style.animation = "none";
    card.style.backgroundColor = "lightskyblue";
  });
});
