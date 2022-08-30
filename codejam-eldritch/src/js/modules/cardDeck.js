import {brownCardsData} from "../../../data/mythicCards/brown/index.js";
import {blueCardsData} from "../../../data/mythicCards/blue/index.js";
import {greenCardsData} from "../../../data/mythicCards/green/index.js";

export function getCardDeckBylevel(scheme, level) {
  switch(level) {
    case "extra-easy" : return getCardDeck(scheme, false, "normal", "easy"); 
    case "easy"       : return getCardDeck(scheme, true, "easy", "normal"); 
    case "normal"     : return getCardDeck(scheme, true, "easy", "hard", "normal"); 
    case "hard"       : return getCardDeck(scheme, true, "hard", "normal"); 
    case "extra-hard" : return getCardDeck(scheme, false, "normal", "hard"); 
  }
}

export function getStringWithLevelMessage(level) {
  let str = "Level: ";
  switch(level) {
    case "extra-easy" : return str + "Very Easy"; 
    case "easy"       : return str + "Easy"; 
    case "normal"     : return str + "Normal"; 
    case "hard"       : return str + "Hard"; 
    case "extra-hard" : return str + "Horror"; 
  }
}

function countColor(scheme, num) {
  let count = 0;
  for( let i = 0; i < scheme.length; ++i) {
    count += scheme[i][num]; 
  }
  return count;
}

export function getCardDeck(scheme, boolNoExtra, first, second, third = '') {
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
  } else {
      let res = [
      array[0].splice(array[0].length - countColor(scheme, 0), countColor(scheme, 0)),
      array[1].splice(array[1].length - countColor(scheme, 1), countColor(scheme, 1)),
      array[2].splice(array[2].length - countColor(scheme, 2), countColor(scheme, 2))
      ];
    res.forEach(elem=>interfereCardDesk(elem));
    return res;
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
