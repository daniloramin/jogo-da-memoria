import { fruits } from "./cardsGroup.js";
import shuffleCards from "./shuffleCards.js";

const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const turn = {
  first: null,
  second: null,
};

const pairs = [];

shuffleCards();

const cards = [...document.getElementsByClassName("card")];

cards.forEach((card) => {
  card.addEventListener("click", async ({ target }) => {
    if (turn.first?.dataset.card && turn.second?.dataset.card) return;

    if (target.dataset.clicked == "true") return;
    console.log("chamou");

    if (pairs.includes(target.dataset.card)) return;

    target.dataset.clicked = "true";
    target.style.animation = "200ms linear backwards cardFlip";

    await delay(100);
    target.innerText = target.dataset.card;

    if (turn.first) {
      turn.second = target;

      console.log(turn);
      console.log(turn.first.dataset.card);
      console.log(turn.second.dataset.card);
      if (turn.first.dataset.card != turn.second.dataset.card) {
        await delay(1000);

        turn.first.style.animation = "200ms linear backwards reverseCardFlip";
        turn.second.style.animation = "200ms linear backwards reverseCardFlip";

        await delay(100);
        turn.first.innerText = "x";
        turn.second.innerText = "x";

        turn.first.dataset.clicked = "false";
        turn.second.dataset.clicked = "false";

        turn.first = null;
        turn.second = null;

        return;
      }

      pairs.push(turn.first.dataset.card);

      turn.first = null;
      turn.second = null;
      return;
    }

    turn.first = target;
  });
});
