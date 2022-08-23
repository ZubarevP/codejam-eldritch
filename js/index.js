/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../data/ancients.js":
/*!***************************!*\
  !*** ../data/ancients.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ancientsData\": () => (/* binding */ ancientsData)\n/* harmony export */ });\nconst ancientsData = {\n  azathoth: {\n    name: 'azathoth',\n    firstStage: {\n      greenCards: 1,\n      blueCards: 1,\n      brownCards: 2,\n    },\n    secondStage: {\n      greenCards: 2,\n      blueCards: 1,\n      brownCards: 3,\n    },\n    thirdStage: {\n      greenCards: 2,\n      blueCards: 0,\n      brownCards: 4,\n    },\n  },\n  cthulhu: {\n    name: 'cthulhu',\n    firstStage: {\n      greenCards: 0,\n      blueCards: 2,\n      brownCards: 2,\n    },\n    secondStage: {\n      greenCards: 1,\n      blueCards: 0,\n      brownCards: 3,\n    },\n    thirdStage: {\n      greenCards: 3,\n      blueCards: 0,\n      brownCards: 4,\n    },\n  },\n  iogSothoth: {\n    name: 'iogSothoth',\n    firstStage: {\n      greenCards: 0,\n      blueCards: 1,\n      brownCards: 2,\n    },\n    secondStage: {\n      greenCards: 2,\n      blueCards: 1,\n      brownCards: 3,\n    },\n    thirdStage: {\n      greenCards: 3,\n      blueCards: 0,\n      brownCards: 4,\n    },\n  },\n  shubNiggurath: {\n    name: 'shubNiggurath',\n    firstStage: {\n      greenCards: 1,\n      blueCards: 1,\n      brownCards: 2,\n    },\n    secondStage: {\n      greenCards: 3,\n      blueCards: 1,\n      brownCards: 2,\n    },\n    thirdStage: {\n      greenCards: 2,\n      blueCards: 0,\n      brownCards: 4,\n    },\n  },\n}\n\n\n//# sourceURL=webpack://src/../data/ancients.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_ancients_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/ancients.js */ \"../data/ancients.js\");\n\n\nconst ancients = document.querySelectorAll(\".ancients-img\");\nconst start = document.querySelector(\".start\");\n\nfunction showCards(levelElem, ancientElem) {\n  const level = levelElem.getAttribute(\"data-name\");\n  const ancient = ancientElem.getAttribute(\"data-name\");\n}\n\nfunction chooseLavel(target) {\n  document.querySelectorAll(\".level\").forEach((elem, ind)=>{\n    elem.onclick = function (e) {showCards(e.target, target);}; \n    setTimeout(()=> elem.classList.add(\"level-active\"), ((ind * 100) + 1500))\n  });\n}\n\nfunction chooseAncient(e) {\n  document.querySelectorAll(\".ancients-img\")\n    .forEach(elem=>{\n      if(elem.getAttribute(\"data-name\") != e.target.getAttribute(\"data-name\")){\n        elem.classList.add(\"hidden\");\n        setTimeout(()=>elem.classList.add(\"hidden-none\"), 1000);\n      } else {\n        ///////////////////////////////////////////\n        chooseLavel(e.target);\n        ///////////////////////////////////////////\n        start.classList.remove(\"hidden-none\");\n        setTimeout(()=>start.classList.remove(\"hidden\"), 1000);\n        setTimeout(()=>{\n          elem.classList.add(\"ancients-img-active\");\n          elem.classList.remove(\"max\");\n        }, 1000);\n      } \n    })\n}\n\nfunction startGame(e) {\n  if(e.target.closest(\".start\")) {\n   ancients.forEach(elem=>{\n      elem.classList.add(\"max\");\n      elem.classList.remove(\"ancients-img-active\");\n      elem.classList.remove(\"hidden-none\");\n      setTimeout(()=>elem.classList.remove(\"hidden\"), 1000);\n   });\n   document.querySelectorAll(\".level\").forEach(elem=>elem.classList.remove(\"level-active\"));\n   e.target.classList.add(\"hidden\");\n   setTimeout(()=>e.target.classList.add(\"hidden-none\"), 1000);\n  }\n}\n\nancients.forEach(elem=> elem.addEventListener(\"click\", (e)=>chooseAncient(e)));\ndocument.addEventListener(\"click\", (e)=>startGame(e));\n\n\n//# sourceURL=webpack://src/./js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main.js");
/******/ 	
/******/ })()
;