import {brownCardsData} from "../../../data/mythicCards/brown/index.js";
import {blueCardsData} from "../../../data/mythicCards/blue/index.js";
import {greenCardsData} from "../../../data/mythicCards/green/index.js";

export function getCardDeckBylevel(level) {
  switch(level) {
    case "extra-easy" : return getCardDeck(false, "normal", "easy"); 
    case "easy"       : return getCardDeck(true, "easy", "normal"); 
    case "normal"     : return getCardDeck(true, "easy", "hard", "normal"); 
    case "hard"       : return getCardDeck(true, "hard", "normal"); 
    case "extra-hard" : return getCardDeck(false, "normal", "hard"); 
  }
}

export function getCardDeck(boolNoExtra, first, second, third = '') {
  let array = [
    [
      ...interfereCardDesk(greenCardsData.filter(elem=>elem.difficulty == first)),
      ...interfereCardDesk(greenCardsData.filter(elem=>elem.difficulty == second)),
      ...interfereCardDesk(greenCardsData.filter(elem=>elem.difficulty == third)),
    ],
    [
      ...interfereCardDesk(brownCardsData.filter(elem=>elem.difficulty == first)),
      ...interfereCardDesk(brownCardsData.filter(elem=>elem.difficulty == second)),
      ...interfereCardDesk(brownCardsData.filter(elem=>elem.difficulty == third)),
    ],
    [
      ...interfereCardDesk(blueCardsData.filter(elem=>elem.difficulty == first)),
      ...interfereCardDesk(blueCardsData.filter(elem=>elem.difficulty == second)),
      ...interfereCardDesk(blueCardsData.filter(elem=>elem.difficulty == third)),
    ]
  ];
  if(boolNoExtra) {
    array.forEach(elem=>interfereCardDesk(elem));
  }
  return array;
}

export function interfereCardDesk(array){
  for(let i = 0; i < array.length * 3; i++) {
    let a = getRandomNum(0, array.length);
    let b = getRandomNumExcept(a, 0, array.length);
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  }
  return array;
}

export function getRandomNum(min, max){
  return Math.floor(Math.random() * max + min);
}

export function getRandomNumExcept(num, min, max) {
  let newNum;
  let bool = true;
  while(num == newNum || bool) {
    bool = false;
    newNum = getRandomNum(min, max);
  }
  return newNum;
}
