import {ancientsData} from "../../data/ancients.js";

import {
  choseLavelBodyColor, 
  ancientShadow
} from "./modules/color.js"; 

import {
  getCardDeck,
  interfereCardDesk,
  getRandomNum,
  getCardDeckBylevel,
  getStringWithLevelMessage
} from "./modules/cardDeck.js";

import {showCardScheme} from "./modules/show_shceme.js";


const ancients = document.querySelectorAll(".ancients-img");

let currentLevel = 0;

function returnAppToStart(e) {
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

  const scheme = JSON.parse(JSON.stringify(ancientsData[ancient]));
  const cardDesk = getCardDeckBylevel(scheme, level);
  
  setTimeout(()=>{
    document.querySelector(".desk").classList.add("desk-active");
    document.querySelector(".score").classList.add("score-active");
  }, 1000);

  document
    .querySelector(".score-current-level")
    .textContent = getStringWithLevelMessage(level);

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
