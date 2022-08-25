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

export function showCardScheme(scheme) {
  getScoreTable([".score-level-one", ".score-level-two", ".score-level-three"]) 
    .forEach((elemTop, indTop)=>elemTop
      .forEach((elem, ind)=>elem.textContent = scheme[indTop][ind]));
}
