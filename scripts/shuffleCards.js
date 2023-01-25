import { fruits } from "./cardsGroup.js";

export default () => {
  const data = document.getElementsByClassName("card");
  const screenCards = [...data];

  for (let i = screenCards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [screenCards[i], screenCards[j]] = [screenCards[j], screenCards[i]];
  }

  for (let i = 0; i < fruits.length; i++) {
    screenCards[i].innerText = fruits[i];
    screenCards[i + 10].innerText = fruits[i];
  }
};
