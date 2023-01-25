import { fruits } from "./cardsGroup.js";
import shuffleCards from "./shuffleCards.js";

shuffleCards();

const cards = [...document.getElementsByClassName("card")];

cards.forEach((card) => {
  card.addEventListener("click", ({ target }) => {
    target.style.animation = "200ms linear both cardFlip";
    setTimeout(() => {
      target.innerText = target.dataset.card;
    }, 100);
  });
});
