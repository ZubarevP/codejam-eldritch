const ancients = document.querySelectorAll(".ancients-img");
const start = document.querySelector(".start");

function chooseAncient(e) {
  document.querySelectorAll(".ancients-img")
    .forEach(elem=>{
      if(elem.getAttribute("data-name") != e.target.getAttribute("data-name")){
        elem.classList.add("hidden");
        setTimeout(()=>elem.classList.add("hidden-none"), 1000);
      } else {
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

function startGame(e) {
  if(e.target.closest(".start")) {
   ancients.forEach(elem=>{
      elem.classList.add("max");
      elem.classList.remove("ancients-img-active");
      elem.classList.remove("hidden-none");
      elem.classList.remove("hidden");
   });
   e.target.classList.add("hidden");
   setTimeout(()=>e.target.classList.add("hidden-none"), 1000);
  }
}

ancients.forEach(elem=> elem.addEventListener("click", (e)=>chooseAncient(e)));
document.addEventListener("click", (e)=>startGame(e));
