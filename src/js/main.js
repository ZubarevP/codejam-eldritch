import {ancientsData} from "../../data/ancients.js";
import {brownCardsData} from "../../data/mythicCards/brown/index.js";
import {blueCardsData} from "../../data/mythicCards/blue/index.js";
import {greenCardsData} from "../../data/mythicCards/green/index.js";


// green blue brown 


const ancients = document.querySelectorAll(".ancients-img");
const start = document.querySelector(".start");

function choseLavelBodyColor(level) {
  let str = "inset 0px 0px 15px 0px ";
  switch(level) {
    case "extra-easy" : return str + "white"; 
    case "easy"       : return str + "#7ff57f"; 
    case "normal"     : return str + "#6b6bf1"; 
    case "hard"       : return str + "#ffc480"; 
    case "extra-hard" : return str + "#a02e30"; 
  }
}

function allLevel(boolNoExtra, first, second, third = '') {
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

function getRandomNum(min, max){
  return Math.floor(Math.random() * max + min);
}

function getRandomNumExcept(num, min, max) {
  let newNum;
  let bool = true;
  while(num == newNum || bool) {
    bool = false;
    newNum = getRandomNum(min, max);
  }
  return newNum;
}

function interfereCardDesk(array){
  for(let i = 0; i < array.length * 3; i++) {
    let a = getRandomNum(0, array.length - 1);
    let b = getRandomNumExcept(a, 0, array.length - 1);
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  }
  return array;
}

function getCardDesk(level) {
  switch(level) {
    case "extra-easy" : return allLevel(false, "normal", "easy"); 
    case "easy"       : return allLevel(true, "easy", "normal"); 
    case "normal"     : return allLevel(true, "easy", "hard", "normal"); 
    case "hard"       : return allLevel(true, "hard", "normal"); 
    case "extra-hard" : return allLevel(false, "normal", "hard"); 
  }
}

function showScheme(scheme) {

}

function showCards(levelElem, ancientElem) {
  document.querySelectorAll(".level").forEach((elem, ind)=>{
    setTimeout(()=> elem.classList.remove("level-active"), ind * 100)
  });
  document.querySelector("body").style.boxShadow = choseLavelBodyColor(levelElem.getAttribute("data-name"));
  const level = levelElem.getAttribute("data-name");
  const ancient = ancientElem.getAttribute("data-name");
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  const cardDesk = getCardDesk(level);
  const scheme = ancientsData[ancient];

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
}

function chooseLavel(target) {
  document.querySelectorAll(".level").forEach((elem, ind)=>{
    elem.onclick = function (e) {showCards(e.target, target);}; 
    setTimeout(()=> elem.classList.add("level-active"), ((ind * 100) + 1500))
  });
}

function chooseAncient(e) {
  if(document.querySelector(".start").classList.contains("hidden")){
    document.querySelectorAll(".ancients-img")
      .forEach(elem=>{
        if(elem.getAttribute("data-name") != e.target.getAttribute("data-name")){
          elem.classList.add("hidden");
          setTimeout(()=>elem.classList.add("hidden-none"), 1000);
        } else {
        ///////////////////////////////////////////
          chooseLavel(e.target);
        ///////////////////////////////////////////
          start.classList.remove("hidden-none");
          setTimeout(()=>start.classList.remove("hidden"), 1000);
          setTimeout(()=>{
            elem.classList.add("ancients-img-active");
            elem.classList.remove("max");
          }, 1000);
        } 
      })
  }
}

function startGame(e) {
  if(e.target.closest(".start")) {
   ancients.forEach(elem=>{
      elem.classList.add("max");
      elem.classList.remove("ancients-img-active");
      elem.classList.remove("hidden-none");
      setTimeout(()=>elem.classList.remove("hidden"), 1000);
   });
   document.querySelectorAll(".level")
      .forEach(elem=>elem.classList.remove("level-active"));
   document.querySelector("body").style.boxShadow  = "none";
   e.target.classList.add("hidden");
   setTimeout(()=>e.target.classList.add("hidden-none"), 1000);
  }
}

ancients.forEach(elem=> elem.addEventListener("click", (e)=>chooseAncient(e)));
document.addEventListener("click", (e)=>startGame(e));
