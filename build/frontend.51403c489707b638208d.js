/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/frontend.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),

/***/ "./src/accordion/frontend.js":
/*!***********************************!*\
  !*** ./src/accordion/frontend.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var accordions = document.querySelectorAll('.accordion-title');
accordions.forEach(function (el) {
  el.addEventListener('click', function (event) {
    accordions.forEach(function (element) {
      if (element !== event.target) {
        element.setAttribute('aria-expanded', 'false');
        element.parentElement.classList.remove('is-open');
      } else if (element === event.target) {
        var expanded = el.getAttribute('aria-expanded') === "false" ? true : false;
        element.setAttribute('aria-expanded', expanded);
        element.parentElement.classList.contains('is-open') ? el.parentElement.classList.remove('is-open') : el.parentElement.classList.add('is-open');
      }
    });
  });
});

/***/ }),

/***/ "./src/anchor-link-navigation/frontend.js":
/*!************************************************!*\
  !*** ./src/anchor-link-navigation/frontend.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var headers = document.querySelectorAll("h2, h3, h4, h5, h6");
var anchorHeaders = [];
headers.forEach(function (header) {
  if (header.id) {
    anchorHeaders.push(header);
  }
});
var anchorLinkBlocks = document.querySelectorAll(".anchor-link-block-links");
var href = window.location.href;

if (anchorLinkBlocks && anchorLinkBlocks.length > 0 && anchorHeaders && anchorHeaders.length > 0) {
  anchorLinkBlocks.forEach(function (block) {
    anchorHeaders.forEach(function (header) {
      var anchor = document.createElement('a');
      var text = document.createTextNode(header.innerHTML);
      anchor.appendChild(text);
      anchor.title = header.innerHTML;
      anchor.href = "#" + header.id;
      anchor.classList.add("anchor-link-block-link");
      block.appendChild(anchor);
    });
  });
  var links = document.querySelectorAll('a.anchor-link-block-link');
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var topY = document.querySelector(link.hash).getBoundingClientRect().top + window.pageYOffset - 20;
      window.scroll({
        top: topY,
        behavior: 'smooth'
      });
      links.forEach(function (el) {
        el === link ? el.classList.add("is-active") : el.classList.remove("is-active");
      });
    });
  });
  window.addEventListener('scroll', function () {
    var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    anchorHeaders.forEach(function (header) {
      if (header.offsetTop <= scrollPos) {
        var id = "#" + header.id;
        links.forEach(function (el) {
          el.hash === id ? el.classList.add("is-active") : el.classList.remove("is-active");
        });
      }
    });
  });
  var toTop = document.querySelector('#to-top-sidebar');

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/***/ }),

/***/ "./src/frontend.js":
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _accordion_frontend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accordion/frontend.js */ "./src/accordion/frontend.js");
/* harmony import */ var _accordion_frontend_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_accordion_frontend_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _anchor_link_navigation_frontend_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./anchor-link-navigation/frontend.js */ "./src/anchor-link-navigation/frontend.js");
/* harmony import */ var _anchor_link_navigation_frontend_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_anchor_link_navigation_frontend_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _image_toggle_card_frontend_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image-toggle-card/frontend.js */ "./src/image-toggle-card/frontend.js");




/***/ }),

/***/ "./src/image-toggle-card/frontend.js":
/*!*******************************************!*\
  !*** ./src/image-toggle-card/frontend.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);

var toggleImages = document.querySelectorAll('.pu-image-toggle__images img');
var toggleButtons = document.querySelectorAll('.toggle-button');
console.log(toggleButtons);

var activateToggle = function activateToggle(el) {
  el.preventDefault();
  var clickedButton = el.target;
  console.log(clickedButton);

  if (!clickedButton.classList.contains('selected')) {
    // Toggle the button styles
    var previousSelected = document.querySelector('.toggle-button.selected');
    previousSelected.classList.remove('selected');
    clickedButton.classList.add('selected'); // Toggle the images

    var previousImage = document.querySelector('.pu-image-toggle__images img.show');
    var newImage = document.querySelector('.pu-image-toggle__images img:not(.show)');
    previousImage.classList.remove('show');
    newImage.classList.add('show');
  }
};

_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(toggleButtons).forEach(function (button) {
  button.addEventListener('click', activateToggle, false);
});

/***/ })

/******/ });