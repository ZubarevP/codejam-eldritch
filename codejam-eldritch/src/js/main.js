import {ancientsData} from "../../data/ancients.js";

import {
  choseLavelBodyColor, 
  ancientShadow
} from "./modules/color.js"; 

import {
  getCardDeck,
  interfereCardDesk,
  getRandomNum,
  getCardDeckBylevel
} from "./modules/cardDeck.js";

import{
  returnAppToStart,
  ancients, 
  currentLevel
} from "./modules/restart.js";

import {showCardScheme} from "./modules/show_shceme.js";

const start = document.querySelector(".start");
let levelPass = true;

function createCardBack(scheme, cardDesk) {
  let img = document.createElement("img"); 
  img.setAttribute("src", "./assets/mythicCardBackground.webp");
  img.setAttribute("class", "desk-back");
  img.setAttribute("alt", "card back side");
  img.onclick = ()=>showNextCard(scheme, cardDesk);
  document.querySelector(".desk").append(img);
}

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
  let pathToFace = cards[cont].pop().cardFace + ".webp";
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

function showCards(levelElem, ancientElem) {
  document.querySelectorAll(".level").forEach((elem, ind)=>{
    setTimeout(()=> elem.classList.remove("level-active"), ind * 100)
  });
  document.querySelector("body").style.boxShadow = choseLavelBodyColor(levelElem.getAttribute("data-name"));
  const level = levelElem.getAttribute("data-name");
  const ancient = ancientElem.getAttribute("data-name");

  const cardDesk = getCardDeckBylevel(level);
  const scheme = JSON.parse(JSON.stringify(ancientsData[ancient]));
  
  setTimeout(()=>{
    document.querySelector(".desk").classList.add("desk-active");
    document.querySelector(".score").classList.add("score-active");
  }, 1000);
  showCardScheme(scheme);
  createCardBack(scheme, cardDesk);
}

function chooseLevel(target) {
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
          chooseLevel(e.target);
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

ancients.forEach(elem=> elem.addEventListener("click", (e)=>chooseAncient(e)));
document.addEventListener("click", (e)=>returnAppToStart(e));
