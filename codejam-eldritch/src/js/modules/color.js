export function choseLavelBodyColor(level) {
  let str = "inset 0px 0px 45px 0px ";
  switch(level) {
    case "extra-easy" : return str + "#c9c9c9"; 
    case "easy"       : return str + "#3ea7a6"; 
    case "normal"     : return str + "#a7973e"; 
    case "hard"       : return str + "#a73e3e"; 
    case "extra-hard" : return str + "#940a0a"; 
  }
}

export function ancientShadow(ancient) {
  let str  = "1px 1px 15px 5px ";
  switch(ancient) {
    case "cthulthu"      : return str + "#c46521";
    case "shubNiggurath" : return str + "#8c6d8f";
    case "iogSothoth"    : return str + "#5b1d05";
    case "azathoth"      : return str + "#47500e";
  }
}
