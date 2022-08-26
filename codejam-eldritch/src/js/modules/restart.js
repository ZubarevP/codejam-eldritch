export const ancients = document.querySelectorAll(".ancients-img");

export let currentLevel = 0;

export function returnAppToStart(e) {
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
