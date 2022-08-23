/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ (() => {

eval("const ancients = document.querySelectorAll(\".ancients-img\");\nconst start = document.querySelector(\".start\");\n\nfunction chooseAncient(e) {\n  document.querySelectorAll(\".ancients-img\")\n    .forEach(elem=>{\n      if(elem.getAttribute(\"data-name\") != e.target.getAttribute(\"data-name\")){\n        elem.classList.add(\"hidden\");\n        setTimeout(()=>elem.classList.add(\"hidden-none\"), 1000);\n      } else {\n        ///////////////////////////////////////////\n        start.classList.remove(\"hidden-none\");\n        setTimeout(()=>start.classList.remove(\"hidden\"), 1000);\n        setTimeout(()=>{\n          elem.classList.add(\"ancients-img-active\");\n          elem.classList.remove(\"max\");\n        }, 1000);\n      } \n    })\n    \n}\n\nfunction startGame(e) {\n  if(e.target.closest(\".start\")) {\n   ancients.forEach(elem=>{\n      elem.classList.add(\"max\");\n      elem.classList.remove(\"ancients-img-active\");\n      elem.classList.remove(\"hidden-none\");\n      elem.classList.remove(\"hidden\");\n   });\n   e.target.classList.add(\"hidden\");\n   setTimeout(()=>e.target.classList.add(\"hidden-none\"), 1000);\n  }\n}\n\nancients.forEach(elem=> elem.addEventListener(\"click\", (e)=>chooseAncient(e)));\ndocument.addEventListener(\"click\", (e)=>startGame(e));\n\n\n//# sourceURL=webpack://src/./js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/main.js"]();
/******/ 	
/******/ })()
;