import {ancientsData} from "../../data/ancients.js";
import {brownCardsData} from "../../data/mythicCards/brown/index.js";
import {blueCardsData} from "../../data/mythicCards/blue/index.js";
import {greenCardsData} from "../../data/mythicCards/green/index.js";

const ancients = document.querySelectorAll(".ancients-img");
const start = document.querySelector(".start");
let levelPass = true;

function choseLavelBodyColor(level) {
  let str = "inset 0px 0px 45px 0px ";
  switch(level) {
    case "extra-easy" : return str + "#c9c9c9"; 
    case "easy"       : return str + "#3ea7a6"; 
    case "normal"     : return str + "#a7973e"; 
    case "hard"       : return str + "#a73e3e"; 
    case "extra-hard" : return str + "#940a0a"; 
  }
}


function ancientShadow(ancient) {
  let str  = "1px 1px 15px 5px ";
  switch(ancient) {
    case "cthulthu"      : return str + "#c46521";
    case "shubNiggurath" : return str + "#8c6d8f";
    case "iogSothoth"    : return str + "#5b1d05";
    case "azathoth"      : return str + "#47500e";
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
    let a = getRandomNum(0, array.length);
    let b = getRandomNumExcept(a, 0, array.length);
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

function createCardBack(scheme, cardDesk) {
  let img = document.createElement("img"); 
  img.setAttribute("src", "./assets/mythicCardBackground.png");
  img.setAttribute("class", "desk-back");
  img.setAttribute("alt", "card back side");
  img.onclick = ()=>showNextCard(scheme, cardDesk);
  document.querySelector(".desk").append(img);
}

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

function getScoreNumElem(elem){
  return [
   elem.querySelector(".score-green"),
   elem.querySelector(".score-brown"),
   elem.querySelector(".score-blue"),
 ];
}

function getScoreElem(selector) {
  return document.querySelector(selector);
}

function getScoreTable(arr) {
  return arr.map(elem=>getScoreNumElem(getScoreElem(elem)));
}

function showCardScheme(scheme) {
  let table =  getScoreTable(
    [".score-level-one", ".score-level-two", ".score-level-three"]
  ); 
  table
    .forEach((elemTop, indTop)=>elemTop
      .forEach((elem, ind)=>elem.textContent = scheme[indTop][ind]));
}

let currentLevel = 0;

function createDeskFace(pathToFace) {
  let desk = document.querySelector(".desk");
  let img = document.createElement("img");
  img.setAttribute("class", "desk-face");
  img.setAttribute("src", pathToFace);
  img.setAttribute("alt", "front of card");
  desk.append(img);
}


function showNextCard(scheme, cards, max = 3) {
  let cont = getRandomNum(0, max);
  while(scheme[currentLevel][cont] == 0)  {
    cont = (cont + getRandomNum(0, 200)) % max;
  }

  let deskFace = document.querySelector(".desk-face");
  let pathToFace = cards[cont].pop().cardFace + ".png";
  deskFace ? 
    deskFace.setAttribute("src", pathToFace) : 
    createDeskFace(pathToFace);
  --scheme[currentLevel][cont];
  showCardScheme(scheme);

  let levelSum = scheme[currentLevel].reduce((sum, elem) => sum + elem, 0);
  if(levelSum == 0) {
    if(++currentLevel == max) {
      let elem = document.querySelector(".desk-back");
      elem.remove();
    };
  }
}
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

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
  const scheme = JSON.parse(JSON.stringify(ancientsData[ancient]));
  
  setTimeout(()=>{
    document.querySelector(".desk").classList.add("desk-active");
    document.querySelector(".score").classList.add("score-active");
  }, 1000);
  showCardScheme(scheme);
  createCardBack(scheme, cardDesk);

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
}

function chooseLavel(target) {
  document.querySelectorAll(".level").forEach((elem, ind)=>{
    elem.onclick = function (e) {
      if(levelPass) {
        levelPass = false;
        setTimeout(()=>levelPass = true, 1000);
        showCards(e.target, target);
      }
    }; 
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
            elem.style.boxShadow = ancientShadow(elem.getAttribute("data-name")); 
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
      elem.style.boxShadow = "none"; 
      elem.classList.remove("hidden-none");
      setTimeout(()=>elem.classList.remove("hidden"), 1000);
     });
   document.querySelectorAll(".level")
      .forEach(elem=>elem.classList.remove("level-active"));

   document.querySelector("body").style.boxShadow  = "none";

   let desk_back = document.querySelector(".desk-back");
   desk_back ? desk_back.remove(): null;

   let desk_face = document.querySelector(".desk-face");
   desk_face ? desk_face.remove(): null;

   const desk = document.querySelector(".desk");
    desk.classList.add("hidden");
    setTimeout(()=>desk.classList.remove("desk-active"), 500);
    setTimeout(()=>desk.classList.remove("hidden"), 900);
   const score = document.querySelector(".score");
    score.classList.add("hidden");
    setTimeout(()=>score.classList.remove("score-active"), 500);
    setTimeout(()=>score.classList.remove("hidden"), 900);

   e.target.classList.add("hidden");
   setTimeout(()=>e.target.classList.add("hidden-none"), 1000);
    currentLevel = 0;
  }
}

ancients.forEach(elem=> elem.addEventListener("click", (e)=>chooseAncient(e)));
document.addEventListener("click", (e)=>startGame(e));
