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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/block.js");
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

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

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

/***/ "./src/accordion/block.js":
/*!********************************!*\
  !*** ./src/accordion/block.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/* eslint-disable react/jsx-key */

/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */
//  Import CSS.
// import './editor.scss';
// import './style.scss';
var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    CheckboxControl = _wp$components.CheckboxControl,
    TextareaControl = _wp$components.TextareaControl,
    TextControl = _wp$components.TextControl,
    RadioControl = _wp$components.RadioControl,
    SelectControl = _wp$components.SelectControl,
    Button = _wp$components.Button;
var _wp$blockEditor = wp.blockEditor,
    RichText = _wp$blockEditor.RichText,
    InspectorControls = _wp$blockEditor.InspectorControls,
    InnerBlocks = _wp$blockEditor.InnerBlocks;
var BLOCKS_TEMPLATE = [['core/paragraph', {
  placeholder: 'Add content'
}]];
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType('purdue-blocks/accordion', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __('Accordion'),
  // Block title.
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#8e6f3e',
    // Specifying a dashicon for the block
    src: 'excerpt-view'
  },
  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks',
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  attributes: {
    title: {
      type: 'string',
      source: 'html',
      selector: '.accordion-title'
    },
    titleLevel: {
      type: 'string',
      default: 'p'
    },
    id: {
      type: 'string',
      default: ''
    }
  },
  supports: {
    className: false
  },
  // Block description in side panel
  description: __('Create a single accordion.'),
  edit: function edit(props) {
    var id = props.clientId;
    props.setAttributes({
      id: id
    });
    return [Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InspectorControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(SelectControl, {
      label: "Heading level of the title",
      value: props.attributes.titleLevel,
      options: [{
        label: 'H2',
        value: 'h2'
      }, {
        label: 'H3',
        value: 'h3'
      }, {
        label: 'H4',
        value: 'h4'
      }, {
        label: 'H5',
        value: 'h5'
      }, {
        label: 'H6',
        value: 'h6'
      }, {
        label: 'P',
        value: 'p'
      }],
      onChange: function onChange(titleLevel) {
        props.setAttributes({
          titleLevel: titleLevel
        });
      }
    })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "accordion-editor"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText, {
      tagname: props.setAttributes.titleLevel,
      value: props.attributes.title,
      className: 'accordion-title',
      onChange: function onChange(text) {
        props.setAttributes({
          title: text
        });
      },
      placeholder: "Add Title",
      keepPlaceholderOnFocus: true,
      allowedFormats: []
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "accordion-content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InnerBlocks, {
      template: BLOCKS_TEMPLATE,
      allowedBlocks: ['core/paragraph', 'core/list', 'core/table']
    })))];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: function save(props) {
    var returned = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "accordion"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText.Content, {
      id: "title-".concat(props.attributes.id),
      className: 'accordion-title',
      tagName: props.attributes.titleLevel,
      value: props.attributes.title,
      "aria-controls": "content-".concat(props.attributes.id),
      "aria-expanded": 'false'
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      id: "content-".concat(props.attributes.id),
      className: 'accordion-content'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InnerBlocks.Content, null)));
    return returned;
  }
});

/***/ }),

/***/ "./src/block.js":
/*!**********************!*\
  !*** ./src/block.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _site_hero_block_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./site-hero/block.js */ "./src/site-hero/block.js");
/* harmony import */ var _cta_hero_block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cta-hero/block.js */ "./src/cta-hero/block.js");
/* harmony import */ var _title_hero_block_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./title-hero/block.js */ "./src/title-hero/block.js");
/* harmony import */ var _list_block_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./list/block.js */ "./src/list/block.js");
/* harmony import */ var _cta_banner_block_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cta-banner/block.js */ "./src/cta-banner/block.js");
/* harmony import */ var _faculty_profile_card_block_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./faculty-profile-card/block.js */ "./src/faculty-profile-card/block.js");
/* harmony import */ var _feature_story_block_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./feature-story/block.js */ "./src/feature-story/block.js");
/* harmony import */ var _proofpoint_block_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./proofpoint/block.js */ "./src/proofpoint/block.js");
/* harmony import */ var _testimonial_block_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./testimonial/block.js */ "./src/testimonial/block.js");
/* harmony import */ var _image_showcase_block_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./image-showcase/block.js */ "./src/image-showcase/block.js");
/* harmony import */ var _title_nav_block_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./title-nav/block.js */ "./src/title-nav/block.js");
/* harmony import */ var _title_nav_title_nav_link_block_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./title-nav/title-nav-link/block.js */ "./src/title-nav/title-nav-link/block.js");
/* harmony import */ var _card_block_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./card/block.js */ "./src/card/block.js");
/* harmony import */ var _accordion_block_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./accordion/block.js */ "./src/accordion/block.js");
/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */















/***/ }),

/***/ "./src/card/block.js":
/*!***************************!*\
  !*** ./src/card/block.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/* eslint-disable react/jsx-key */

/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */
//  Import CSS.
// import './editor.scss';
// import './style.scss';
var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    CheckboxControl = _wp$components.CheckboxControl,
    TextareaControl = _wp$components.TextareaControl,
    TextControl = _wp$components.TextControl,
    RadioControl = _wp$components.RadioControl;
var _wp$blockEditor = wp.blockEditor,
    RichText = _wp$blockEditor.RichText,
    InspectorControls = _wp$blockEditor.InspectorControls,
    MediaUploadCheck = _wp$blockEditor.MediaUploadCheck,
    MediaUpload = _wp$blockEditor.MediaUpload;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType('purdue-blocks/card', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __('Card'),
  // Block title.
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#8e6f3e',
    // Specifying a dashicon for the block
    src: 'excerpt-view'
  },
  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks',
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  attributes: {
    hasLink: {
      type: 'boolean',
      default: false
    },
    title: {
      type: 'string',
      source: 'html',
      selector: 'p.title'
    },
    subText: {
      type: 'string',
      source: 'html',
      selector: 'p.content'
    },
    link: {
      type: 'string',
      default: ''
    },
    linkText: {
      type: 'string',
      default: ''
    },
    imgUrl: {
      type: 'string',
      default: ''
    },
    altText: {
      type: 'string',
      default: ''
    },
    external: {
      type: 'boolean',
      default: false
    },
    backgroundColor: {
      type: 'string',
      default: 'white'
    },
    borderColor: {
      type: 'string',
      default: 'gold'
    }
  },
  supports: {
    className: false
  },
  // Block description in side panel
  description: __('Create a card with an image and text. You can choose to add a link and a call to action button to the card.'),
  edit: function edit(props) {
    return [Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InspectorControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RadioControl, {
      label: "Background Color",
      help: "Choose the background color of the card.",
      selected: props.attributes.backgroundColor,
      options: [{
        label: 'Gold',
        value: 'gold'
      }, {
        label: 'White',
        value: 'white'
      }],
      onChange: function onChange(option) {
        props.setAttributes({
          backgroundColor: option
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RadioControl, {
      label: "Border Color",
      help: "Choose the border color of the card.",
      selected: props.attributes.borderColor,
      options: [{
        label: 'Gold',
        value: 'gold'
      }, {
        label: 'Black',
        value: 'black'
      }],
      onChange: function onChange(option) {
        props.setAttributes({
          borderColor: option
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextareaControl, {
      label: "Image Alt Text",
      value: props.attributes.altText,
      onChange: function onChange(altText) {
        return props.setAttributes({
          altText: altText
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(CheckboxControl, {
      label: "Add a link to this card?",
      checked: props.attributes.hasLink,
      onChange: function onChange() {
        return props.setAttributes({
          hasLink: !props.attributes.hasLink
        });
      }
    })), props.attributes.hasLink ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextControl, {
      label: "Call to action text",
      value: props.attributes.linkText,
      onChange: function onChange(linkText) {
        return props.setAttributes({
          linkText: linkText
        });
      }
    })) : '', props.attributes.hasLink ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextControl, {
      label: "Link address",
      value: props.attributes.link,
      onChange: function onChange(link) {
        return props.setAttributes({
          link: link
        });
      }
    })) : '', props.attributes.hasLink ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(CheckboxControl, {
      label: "Open link in new tab?",
      checked: props.attributes.external,
      onChange: function onChange() {
        return props.setAttributes({
          external: !props.attributes.external
        });
      }
    })) : '')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "box square-card".concat(props.attributes.backgroundColor === 'gold' ? ' background-gold' : '').concat(props.attributes.borderColor === 'black' ? ' border-black' : '')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUploadCheck, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUpload, {
      onSelect: function onSelect(img) {
        props.setAttributes({
          imgUrl: img.url,
          altText: props.attributes.altText !== '' ? props.attributes.altText : img.alt
        });
      },
      render: function render(_ref) {
        var open = _ref.open;
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
          className: 'image',
          role: "img",
          style: {
            backgroundImage: "url(".concat(props.attributes.imgUrl, ")")
          },
          "aria-label": props.attributes.altText
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
          onClick: open
        }, props.attributes.imgUrl !== '' ? 'Select a new image' : 'Select an image (optional)'));
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "title"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText, {
      tagname: "p",
      value: props.attributes.title,
      className: 'title',
      onChange: function onChange(text) {
        props.setAttributes({
          title: text
        });
      },
      placeholder: "Add Title (Optional)",
      keepPlaceholderOnFocus: true,
      allowedFormats: []
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText, {
      tagname: "p",
      value: props.attributes.subText,
      className: 'content',
      onChange: function onChange(text) {
        props.setAttributes({
          subText: text
        });
      },
      placeholder: "Add Text (Optional)",
      allowedFormats: []
    }), props.attributes.hasLink ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "read-more-button"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, props.attributes.linkText)) : ''))];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: function save(props) {
    var returned = props.attributes.hasLink === true ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
      href: props.attributes.link,
      target: props.attributes.external ? '_blank' : '_self',
      className: "square-card".concat(props.attributes.backgroundColor === 'gold' ? ' background-gold' : '').concat(props.attributes.borderColor === 'black' ? ' border-black' : ''),
      rel: "noopener noreferrer"
    }, props.attributes.imgUrl ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("figure", {
      className: "image"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
      src: props.attributes.imgUrl,
      alt: props.attributes.altText
    })) : '', props.attributes.title ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText.Content, {
      className: 'title',
      tagName: "p",
      value: props.attributes.title
    }) : '', props.attributes.subText ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText.Content, {
      className: 'content',
      tagName: "p",
      value: props.attributes.subText
    }) : '', props.attributes.linkText ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "read-more-button"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, props.attributes.linkText)) : '') : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "square-card".concat(props.attributes.backgroundColor === 'gold' ? ' background-gold' : '').concat(props.attributes.borderColor === 'black' ? ' border-black' : '')
    }, props.attributes.imgUrl ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("figure", {
      className: "image"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
      src: props.attributes.imgUrl,
      alt: props.attributes.altText
    })) : '', props.attributes.title ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText.Content, {
      className: 'title',
      tagName: "p",
      value: props.attributes.title
    }) : '', props.attributes.subText ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText.Content, {
      className: 'content',
      tagName: "p",
      value: props.attributes.subText
    }) : '');
    return returned;
  }
});

/***/ }),

/***/ "./src/cta-banner/block.js":
/*!*********************************!*\
  !*** ./src/cta-banner/block.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/* eslint-disable react/jsx-key */

/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */
//  Import CSS.
// import './editor.scss';
// import './style.scss';
var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    TextareaControl = _wp$components.TextareaControl,
    Button = _wp$components.Button,
    RadioControl = _wp$components.RadioControl;
var _wp$blockEditor = wp.blockEditor,
    InspectorControls = _wp$blockEditor.InspectorControls,
    MediaUploadCheck = _wp$blockEditor.MediaUploadCheck,
    MediaUpload = _wp$blockEditor.MediaUpload;
var select = wp.data.select;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType('purdue-blocks/cta-banner', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __('CTA Banner'),
  // Block title.
  icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "object-group",
    className: "svg-inline--fa fa-object-group fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
    fill: "#8E6F3E",
    d: "M480 128V96h20c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v20H64V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v40c0 6.627 5.373 12 12 12h20v320H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-20h384v20c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-20V128zM96 276V140c0-6.627 5.373-12 12-12h168c6.627 0 12 5.373 12 12v136c0 6.627-5.373 12-12 12H108c-6.627 0-12-5.373-12-12zm320 96c0 6.627-5.373 12-12 12H236c-6.627 0-12-5.373-12-12v-52h72c13.255 0 24-10.745 24-24v-72h84c6.627 0 12 5.373 12 12v136z"
  })),
  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks',
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  attributes: {
    type: {
      type: 'string',
      default: 'gold'
    },
    imgUrl: {
      type: 'string',
      default: ''
    },
    altText: {
      type: 'string',
      default: ''
    },
    ctaDesc: {
      type: 'string',
      default: ''
    },
    ctaUrl: {
      type: 'string',
      default: ''
    },
    ctaText: {
      type: 'string',
      default: ''
    }
  },
  supports: {
    className: false
  },
  // Block description in side panel
  description: __('This block is for adding a CTA banner on the page.'),
  edit: function edit(props) {
    return [Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InspectorControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RadioControl, {
      label: "CTA Banner Type",
      help: "Choose the type of Banner.",
      selected: props.attributes.type,
      options: [{
        label: 'Black',
        value: 'black'
      }, {
        label: 'Gold',
        value: 'gold'
      }, {
        label: 'Gray',
        value: 'gray'
      }, {
        label: 'Image',
        value: 'image'
      }],
      onChange: function onChange(option) {
        props.setAttributes({
          type: option
        });
      }
    }))), props.attributes.type === 'image' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextareaControl, {
      label: "Hero Image Alt Text",
      value: props.attributes.altText,
      onChange: function onChange(altText) {
        return props.setAttributes({
          altText: altText
        });
      }
    }))) : ''), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: 'pu-blocks-editor-cta-banner'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "content"
    }, props.attributes.type !== 'image' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("label", {
      className: "label"
    }, "CTA Description Text"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.ctaDesc !== '' ? props.attributes.ctaDesc : '',
      className: "input",
      type: "text",
      placeholder: "CTA Description Text...",
      onChange: function onChange(e) {
        props.setAttributes({
          ctaDesc: e.target.value
        });
      }
    }))) : '', props.attributes.type !== 'gray' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("label", {
      className: "label"
    }, "CTA Button Text"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.ctaText !== '' ? props.attributes.ctaText : '',
      className: "input",
      type: "text",
      placeholder: "CTA Button Text...",
      onChange: function onChange(e) {
        props.setAttributes({
          ctaText: e.target.value
        });
      }
    }))) : '', Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("label", {
      className: "label"
    }, "CTA Link URL"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.ctaUrl !== '' ? props.attributes.ctaUrl : '',
      className: "input",
      type: "text",
      placeholder: "CTA URL...",
      onChange: function onChange(e) {
        props.setAttributes({
          ctaUrl: e.target.value
        });
      }
    })))), props.attributes.type === 'image' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Choose a Background Image"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUploadCheck, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUpload, {
      onSelect: function onSelect(img) {
        props.setAttributes({
          imgUrl: img.url,
          altText: props.attributes.altText !== '' ? props.attributes.altText : img.alt
        });
      },
      render: function render(_ref) {
        var open = _ref.open;
        return props.attributes.imgUrl !== '' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
          className: 'pu-blocks-editor-cta-banner__preview'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("figure", {
          className: 'image'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
          alt: props.attributes.altText,
          src: props.attributes.imgUrl
        })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Button, {
          className: 'pu-blocks-editor-cta-banner__button',
          onClick: open
        }, "Select a New Image")) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
          className: 'pu-blocks-editor-cta-banner__container'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
          className: 'purdue-blocks-editor-cta-banner__description'
        }, "Pick an image from the media library. The recommended aspect ratio is 3:2."), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Button, {
          className: 'pu-blocks-editor-cta-banner__button',
          onClick: open
        }, "Open Media Library"));
      }
    }))) : '')];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: function save(props) {
    var returned = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "pu-cta-banner".concat(props.attributes.type === 'gold' ? ' pu-cta-banner-gold' : '').concat(props.attributes.type === 'black' ? ' pu-cta-banner-black' : '', "\n      ").concat(props.attributes.type === 'gray' ? ' pu-cta-banner-gray' : '').concat(props.attributes.type === 'image' ? ' pu-cta-banner-image' : ''),
      style: props.attributes.type === 'image' && props.attributes.imgUrl ? {
        backgroundImage: "url(".concat(props.attributes.imgUrl, ")")
      } : '',
      "aria-label": props.attributes.type === 'image' && props.attributes.altText ? props.attributes.altText : ''
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "container"
    }, props.attributes.type === 'gray' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
      href: props.attributes.ctaUrl,
      className: "pu-cta-banner-gray__desc"
    }, props.attributes.ctaDesc) : '', props.attributes.type === 'image' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
      href: props.attributes.ctaUrl,
      className: "pu-cta-banner-image__button"
    }, props.attributes.ctaText) : '', props.attributes.type === 'gold' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
      className: "pu-cta-banner-gold__desc"
    }, props.attributes.ctaDesc) : '', props.attributes.type === 'gold' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
      href: props.attributes.ctaUrl,
      className: "pu-cta-banner-gold__button"
    }, props.attributes.ctaText) : '', props.attributes.type === 'black' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
      className: "pu-cta-banner-black__desc"
    }, props.attributes.ctaDesc) : '', props.attributes.type === 'black' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
      href: props.attributes.ctaUrl,
      className: "pu-cta-banner-black__button"
    }, props.attributes.ctaText) : ''));
    return returned;
  }
});

/***/ }),

/***/ "./src/cta-hero/block.js":
/*!*******************************!*\
  !*** ./src/cta-hero/block.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/* eslint-disable react/jsx-key */

/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */
//  Import CSS.
// import './editor.scss';
// import './style.scss';
var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    CheckboxControl = _wp$components.CheckboxControl,
    TextareaControl = _wp$components.TextareaControl,
    Button = _wp$components.Button;
var _wp$blockEditor = wp.blockEditor,
    InspectorControls = _wp$blockEditor.InspectorControls,
    MediaUploadCheck = _wp$blockEditor.MediaUploadCheck,
    MediaUpload = _wp$blockEditor.MediaUpload;
var select = wp.data.select;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType('purdue-blocks/cta-hero', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __('CTA Hero'),
  // Block title.
  icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "object-group",
    className: "svg-inline--fa fa-object-group fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
    fill: "#8E6F3E",
    d: "M480 128V96h20c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v20H64V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v40c0 6.627 5.373 12 12 12h20v320H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-20h384v20c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-20V128zM96 276V140c0-6.627 5.373-12 12-12h168c6.627 0 12 5.373 12 12v136c0 6.627-5.373 12-12 12H108c-6.627 0-12-5.373-12-12zm320 96c0 6.627-5.373 12-12 12H236c-6.627 0-12-5.373-12-12v-52h72c13.255 0 24-10.745 24-24v-72h84c6.627 0 12 5.373 12 12v136z"
  })),
  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks',
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  attributes: {
    pageTitle: {
      type: 'string',
      default: ''
    },
    ctaUrl: {
      type: 'string',
      default: ''
    },
    ctaText: {
      type: 'string',
      default: ''
    },
    imgUrl: {
      type: 'string',
      default: ''
    },
    imgMoUrl: {
      type: 'string',
      default: ''
    },
    altText: {
      type: 'string',
      default: ''
    }
  },
  supports: {
    className: false
  },
  // Block description in side panel
  description: __('This block should be used at the top of the page. Choose a page title, an image, and the settings for the cta button.'),
  edit: function edit(props) {
    if (props.attributes.pageTitle === '') {
      props.setAttributes({
        pageTitle: select('core/editor').getCurrentPost().title
      });
    }

    return [Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InspectorControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextareaControl, {
      label: "Hero Image Alt Text",
      value: props.attributes.altText,
      onChange: function onChange(altText) {
        return props.setAttributes({
          altText: altText
        });
      }
    })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: 'bulma-blocks-editor-cta-hero'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Add Page Title"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.pageTitle !== '' ? props.attributes.pageTitle : '',
      className: "input",
      type: "text",
      placeholder: "Page Title...",
      onChange: function onChange(e) {
        props.setAttributes({
          pageTitle: e.target.value
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Add CTA Button Text and URL"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("label", {
      className: "label"
    }, "CTA Text"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.ctaText !== '' ? props.attributes.ctaText : '',
      className: "input",
      type: "text",
      placeholder: "CTA Text...",
      onChange: function onChange(e) {
        props.setAttributes({
          ctaText: e.target.value
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("label", {
      className: "label"
    }, "CTA URL"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.ctaUrl !== '' ? props.attributes.ctaUrl : '',
      className: "input",
      type: "text",
      placeholder: "CTA URL...",
      onChange: function onChange(e) {
        props.setAttributes({
          ctaUrl: e.target.value
        });
      }
    })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Choose a Hero Image"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUploadCheck, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUpload, {
      onSelect: function onSelect(img) {
        props.setAttributes({
          imgUrl: img.url,
          imgMoUrl: img.sizes ? img.sizes.hero_mobile ? img.sizes.hero_mobile.url : img.url : img.url,
          altText: props.attributes.altText !== '' ? props.attributes.altText : img.alt
        });
      },
      render: function render(_ref) {
        var open = _ref.open;
        return props.attributes.imgUrl !== '' && !props.attributes.imgError ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
          className: 'bulma-blocks-editor-site-hero__preview'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("figure", {
          className: 'image'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
          alt: props.attributes.altText,
          src: props.attributes.imgUrl
        })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Button, {
          className: 'bulma-blocks-editor-site-hero__button',
          onClick: open
        }, "Select a New Image")) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
          className: 'bulma-blocks-editor-site-hero__container'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
          className: 'bulma-blocks-editor-site-hero__description'
        }, "Pick a hero image from the media library."), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Button, {
          className: 'bulma-blocks-editor-site-hero__button',
          onClick: open
        }, "Open Media Library"));
      }
    }))))];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: function save(props) {
    var returned = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "pu-cta-hero"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "hero is-large"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "hero-body"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "background-image",
      "aria-label": props.attributes.altText
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", {
      dangerouslySetInnerHTML: {
        __html: "\n              .background-image {background-image: url(".concat(props.attributes.imgUrl, ");}\n              @media (max-width: 767px) {\n                .background-image {background-image: url(").concat(props.attributes.imgMoUrl, ");}\n              }\n            ")
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "container"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h1", null, props.attributes.pageTitle || select('core/editor').getCurrentPost().title), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
      href: props.attributes.ctaUrl,
      className: "pu-cta-hero__button"
    }, props.attributes.ctaText))))));
    return returned;
  }
});

/***/ }),

/***/ "./src/faculty-profile-card/block.js":
/*!*******************************************!*\
  !*** ./src/faculty-profile-card/block.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint-disable react/jsx-key */

/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */
//  Import CSS.
// import './editor.scss';
// import './style.scss';
var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    CheckboxControl = _wp$components.CheckboxControl,
    TextareaControl = _wp$components.TextareaControl,
    TextControl = _wp$components.TextControl,
    Button = _wp$components.Button;
var _wp$blockEditor = wp.blockEditor,
    InspectorControls = _wp$blockEditor.InspectorControls,
    MediaUploadCheck = _wp$blockEditor.MediaUploadCheck,
    MediaUpload = _wp$blockEditor.MediaUpload;
var select = wp.data.select; // Array of social media share options.

var socials = [{
  faSlug: 'facebook-square',
  name: 'Facebook',
  share: 'https://www.facebook.com/'
}, {
  faSlug: 'twitter-square',
  name: 'Twitter',
  share: 'https://twitter.com/'
}, {
  faSlug: 'linkedin',
  name: 'LinkedIn',
  share: 'https://www.linkedin.com/in/'
}, {
  faSlug: 'instagram',
  name: 'Instagram',
  share: 'https://www.instagram.com/'
}];
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType('purdue-blocks/faculty-profile-card', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __('Faculty Profile Card'),
  // Block title.
  icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "object-group",
    className: "svg-inline--fa fa-object-group fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 576 512"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("path", {
    fill: "#8E6F3E",
    d: "M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-352 96c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H86.4C74 384 64 375.4 64 364.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2zM512 312c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"
  })),
  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks',
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  attributes: {
    profilePhoto: {
      type: 'string',
      default: ''
    },
    altText: {
      type: 'string',
      default: ''
    },
    phone: {
      type: 'string',
      default: ''
    },
    email: {
      type: 'string',
      default: ''
    },
    personalLink: {
      type: 'string',
      default: ''
    },
    includeSocial: {
      type: 'boolean',
      default: false
    },
    checkedSocials: {
      type: 'object',
      default: {}
    }
  },
  supports: {
    className: false
  },
  // Block description in side panel
  description: __('This block renders a card that can contain a photo, the contact information, and the social media links for a faculty member.'),
  edit: function edit(props) {
    var checkedSocials = props.attributes.checkedSocials;

    var setChecked = function setChecked() {
      if (props.attributes.includeSocial) {
        props.setAttributes({
          includeSocial: false
        });
      } else {
        props.setAttributes({
          includeSocial: true
        });
      }
    };

    return [Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(InspectorControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(TextareaControl, {
      label: "Profile Picture Alt Text",
      value: props.attributes.altText,
      onChange: function onChange(altText) {
        return props.setAttributes({
          altText: altText
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(CheckboxControl, {
      label: "Include Social Media Links",
      help: "Would you like to include this faculty member's social media account links?",
      checked: props.attributes.includeSocial,
      onChange: setChecked
    })), props.attributes.includeSocial ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(PanelRow, {
      className: "social-check-list"
    }, socials.map(function (_ref) {
      var faSlug = _ref.faSlug,
          name = _ref.name;
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(CheckboxControl, {
        className: "social-check-list__item",
        label: name,
        checked: checkedSocials[name] ? checkedSocials[name].checked : false,
        onChange: function onChange(check) {
          if (check) {
            checkedSocials[name] = {};
            checkedSocials[name].slug = faSlug;
            checkedSocials[name].checked = true;
            console.log(checkedSocials);
          } else {
            delete checkedSocials[name];
          }

          props.setAttributes({
            includeSocial: true,
            checkedSocials: _objectSpread({}, checkedSocials)
          });
        }
      }), checkedSocials[name] !== undefined && checkedSocials[name].checked === true ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(TextControl, {
        label: "".concat(name, " Profile Link"),
        type: "text",
        value: checkedSocials[name].link,
        onChange: function onChange(link) {
          checkedSocials[name].link = link;
          props.setAttributes({
            checkedSocials: _objectSpread({}, checkedSocials)
          });
        }
      }) : '');
    })) : '')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: 'pu-blocks-editor-faculty-profile'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", null, "Choose a Profile Picture"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(MediaUploadCheck, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(MediaUpload, {
      onSelect: function onSelect(img) {
        props.setAttributes({
          profilePhoto: img.url,
          altText: props.attributes.altText !== '' ? props.attributes.altText : img.alt
        });
      },
      render: function render(_ref2) {
        var open = _ref2.open;
        return props.attributes.profilePhoto !== '' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
          className: 'bulma-blocks-editor-site-hero__preview'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("figure", {
          className: 'image'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("img", {
          alt: props.attributes.altText,
          src: props.attributes.profilePhoto
        })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(Button, {
          className: 'bulma-blocks-editor-site-hero__button',
          onClick: open
        }, "Select a New Image")) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
          className: 'bulma-blocks-editor-site-hero__container'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("p", {
          className: 'bulma-blocks-editor-site-hero__description'
        }, "Pick a hero image from the media library."), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(Button, {
          className: 'bulma-blocks-editor-site-hero__button',
          onClick: open
        }, "Open Media Library"));
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", null, "Add Phone Number"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("input", {
      value: props.attributes.phone !== '' ? props.attributes.phone : '',
      className: "input",
      type: "text",
      placeholder: "Phone Number...",
      onChange: function onChange(e) {
        props.setAttributes({
          phone: e.target.value
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", null, "Add Email Address"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("input", {
      value: props.attributes.email !== '' ? props.attributes.email : '',
      className: "input",
      type: "text",
      placeholder: "Email...",
      onChange: function onChange(e) {
        props.setAttributes({
          email: e.target.value
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", null, "Add Optional Personal Website"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("input", {
      value: props.attributes.personalLink !== '' ? props.attributes.personalLink : '',
      className: "input",
      type: "text",
      placeholder: "Personal Site...",
      onChange: function onChange(e) {
        props.setAttributes({
          personalLink: e.target.value
        });
      }
    })))))];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: function save(props) {
    var returned = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "faculty-profile-card box"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "media"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "media-left"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "image"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("img", {
      src: props.attributes.profilePhoto
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "media-content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("ul", null, props.attributes.phone !== '' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("i", {
      className: "fas fa-phone",
      "aria-hidden": "true"
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "profile-info-item"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("p", null, props.attributes.phone), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", null, "Phone"))) : '', props.attributes.email !== '' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("i", {
      className: "fas fa-envelope",
      "aria-hidden": "true"
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "profile-info-item"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      href: "mailto:".concat(props.attributes.email)
    }, props.attributes.email), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", null, "Email"))) : '', props.attributes.personalLink !== '' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("i", {
      className: "fas fa-desktop",
      "aria-hidden": "true"
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "profile-info-item"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      href: props.attributes.personalLink.includes('https://') ? props.attributes.personalLink : "https://".concat(props.attributes.personalLink)
    }, props.attributes.personalLink), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", null, "Personal Website"))) : '')))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "level is-mobile"
    }, props.attributes.includeSocial ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "level-right content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("p", {
      className: "level-item"
    }, "Follow Me: "), Object.keys(props.attributes.checkedSocials).map(function (social) {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("a", {
        target: "_blank",
        rel: "noopener noreferrer",
        className: "level-item",
        href: "".concat(props.attributes.checkedSocials[social].link)
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("i", {
        className: "fab fa-".concat(props.attributes.checkedSocials[social].slug),
        "aria-hidden": "true"
      }));
    })) : ''));
    return returned;
  }
});

/***/ }),

/***/ "./src/feature-story/block.js":
/*!************************************!*\
  !*** ./src/feature-story/block.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/* eslint-disable react/jsx-key */

/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */
//  Import CSS.
// import './editor.scss';
// import './style.scss';
var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    TextareaControl = _wp$components.TextareaControl,
    Button = _wp$components.Button,
    RadioControl = _wp$components.RadioControl,
    CheckboxControl = _wp$components.CheckboxControl;
var _wp$blockEditor = wp.blockEditor,
    InspectorControls = _wp$blockEditor.InspectorControls,
    MediaUploadCheck = _wp$blockEditor.MediaUploadCheck,
    MediaUpload = _wp$blockEditor.MediaUpload,
    InnerBlocks = _wp$blockEditor.InnerBlocks;
var BLOCKS_TEMPLATE = [['core/paragraph', {
  placeholder: 'Body content copy'
}]];
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType('purdue-blocks/feature-story', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __('Featured story'),
  // Block title.
  icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "object-group",
    className: "svg-inline--fa fa-object-group fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
    fill: "#8E6F3E",
    d: "M480 128V96h20c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v20H64V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v40c0 6.627 5.373 12 12 12h20v320H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-20h384v20c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-20V128zM96 276V140c0-6.627 5.373-12 12-12h168c6.627 0 12 5.373 12 12v136c0 6.627-5.373 12-12 12H108c-6.627 0-12-5.373-12-12zm320 96c0 6.627-5.373 12-12 12H236c-6.627 0-12-5.373-12-12v-52h72c13.255 0 24-10.745 24-24v-72h84c6.627 0 12 5.373 12 12v136z"
  })),
  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks',
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  attributes: {
    style: {
      type: 'boolean',
      default: true
    },
    header: {
      type: 'string',
      default: ''
    },
    imgUrl: {
      type: 'string',
      default: ''
    },
    altText: {
      type: 'string',
      default: ''
    },
    contentAlign: {
      type: 'string',
      default: 'left'
    },
    ctaUrl: {
      type: 'string',
      default: ''
    },
    ctaText: {
      type: 'string',
      default: ''
    }
  },
  supports: {
    className: false
  },
  // Block description in side panel
  description: __('This block adds a feature story row on the page.'),
  edit: function edit(props) {
    var setChecked = function setChecked() {
      if (props.attributes.style) {
        props.setAttributes({
          style: false
        });
      } else {
        props.setAttributes({
          style: true
        });
      }
    };

    return [Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InspectorControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(CheckboxControl, {
      label: "Full width",
      help: "Would you like this featured story row to take up the full screen width?",
      checked: props.attributes.style,
      onChange: setChecked
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RadioControl, {
      label: "Align content",
      help: "Choose to place the content to the left or right.",
      selected: props.attributes.contentAlign,
      options: [{
        label: 'Left',
        value: 'left'
      }, {
        label: 'Right',
        value: 'right'
      }],
      onChange: function onChange(option) {
        props.setAttributes({
          contentAlign: option
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextareaControl, {
      label: "Featured Image Alt Text",
      value: props.attributes.altText,
      onChange: function onChange(altText) {
        return props.setAttributes({
          altText: altText
        });
      }
    })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: 'purdue-blocks-editor-feature-story'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Add A Header"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.header !== '' ? props.attributes.header : '',
      className: "input",
      type: "text",
      placeholder: "Content Header...",
      onChange: function onChange(e) {
        props.setAttributes({
          header: e.target.value
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Add Content Body"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InnerBlocks, {
      template: BLOCKS_TEMPLATE,
      allowedBlocks: ['core/paragraph', 'core/list']
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Add CTA Button Text and URL"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("label", {
      className: "label"
    }, "CTA Text"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.ctaText !== '' ? props.attributes.ctaText : '',
      className: "input",
      type: "text",
      placeholder: "CTA Text...",
      onChange: function onChange(e) {
        props.setAttributes({
          ctaText: e.target.value
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("label", {
      className: "label"
    }, "CTA URL"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.ctaUrl !== '' ? props.attributes.ctaUrl : '',
      className: "input",
      type: "text",
      placeholder: "CTA URL...",
      onChange: function onChange(e) {
        props.setAttributes({
          ctaUrl: e.target.value
        });
      }
    })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Choose a Hero Image"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUploadCheck, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUpload, {
      onSelect: function onSelect(img) {
        props.setAttributes({
          imgUrl: img.url,
          altText: props.attributes.altText !== '' ? props.attributes.altText : img.alt
        });
      },
      render: function render(_ref) {
        var open = _ref.open;
        return props.attributes.imgUrl !== '' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
          className: 'purdue-blocks-editor-feature-story__preview'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("figure", {
          className: 'image'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
          alt: props.attributes.altText,
          src: props.attributes.imgUrl
        })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Button, {
          className: 'purdue-blocks-editor-feature-story__button',
          onClick: open
        }, "Select a New Image")) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
          className: 'purdue-blocks-editor-feature-story__container'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
          className: 'purdue-blocks-editor-feature-story__description'
        }, "Pick an image from the media library. The recommended aspect ratio is 3:2."), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Button, {
          className: 'purdue-blocks-editor-feature-story__button',
          onClick: open
        }, "Open Media Library"));
      }
    }))))];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: function save(props) {
    var returned = props.attributes.style ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "pu-feature-story"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "hero is-medium"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "".concat(props.attributes.contentAlign === 'left' ? 'hero-image' : 'hero-image-reversed')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "background-image",
      role: "img",
      style: {
        backgroundImage: "url(".concat(props.attributes.imgUrl, ")")
      },
      "aria-label": props.attributes.altText
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "".concat(props.attributes.contentAlign === 'left' ? 'shadow' : 'shadow-reversed')
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "hero-body"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "container"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "content".concat(props.attributes.contentAlign === 'left' ? '' : ' content-reversed')
    }, !props.attributes.header ? '' : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h2", null, props.attributes.header), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InnerBlocks.Content, null), !props.attributes.ctaUrl || !props.attributes.ctaText ? '' : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
      href: props.attributes.ctaUrl,
      className: "pu-feature-story__button"
    }, props.attributes.ctaText)))))) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "pu-feature-story pu-feature-story__narrow"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "container pu-feature-story__container".concat(props.attributes.contentAlign === 'left' ? '' : ' pu-feature-story__container-reversed')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "background-image",
      role: "img",
      style: {
        backgroundImage: "url(".concat(props.attributes.imgUrl, ")")
      },
      "aria-label": props.attributes.altText
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "story-content"
    }, !props.attributes.header ? '' : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h2", null, props.attributes.header), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InnerBlocks.Content, null), !props.attributes.ctaUrl || !props.attributes.ctaText ? '' : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
      href: props.attributes.ctaUrl,
      className: "pu-feature-story__button"
    }, props.attributes.ctaText))));
    return returned;
  }
});

/***/ }),

/***/ "./src/image-showcase/block.js":
/*!*************************************!*\
  !*** ./src/image-showcase/block.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/* eslint-disable react/jsx-key */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */
//  Import CSS.
// import './editor.scss';
// import './style.scss';
var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

var Button = wp.components.Button;
var _wp$blockEditor = wp.blockEditor,
    MediaUploadCheck = _wp$blockEditor.MediaUploadCheck,
    MediaUpload = _wp$blockEditor.MediaUpload;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType('purdue-blocks/image-showcase', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __('Image Showcase'),
  // Block title.
  icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "far",
    "data-icon": "file-image",
    className: "svg-inline--fa fa-file-image fa-w-12",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 384 512"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
    fill: "#8E6F3E",
    d: "M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm32-48h224V288l-23.5-23.5c-4.7-4.7-12.3-4.7-17 0L176 352l-39.5-39.5c-4.7-4.7-12.3-4.7-17 0L80 352v64zm48-240c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"
  })),
  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks',
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  attributes: {
    images: {
      type: 'array',
      default: []
    }
  },
  supports: {
    className: false
  },
  // Block description in side panel
  description: __('Add this block and select three square images to showcase in a row.'),
  edit: function edit(props) {
    return [Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: 'editor-image-showcase'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUploadCheck, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUpload, {
      multiple: true,
      gallery: true,
      onSelect: function onSelect(imgs) {
        props.setAttributes({
          images: imgs
        });
      },
      render: function render(_ref) {
        var open = _ref.open;
        return props.attributes.images.length === 3 ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
          className: 'editor-image-showcase__preview'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
          className: 'editor-image-showcase__imgGroup'
        }, props.attributes.images.map(function (img) {
          return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("figure", {
            className: 'image is-128x128'
          }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
            alt: "",
            src: img.url
          }));
        })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Button, {
          className: 'editor-image-showcase__button',
          onClick: open
        }, "Select New Images")) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
          className: 'editor-image-showcase__container'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
          className: 'editor-image-showcase__heading'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
          className: "dashicons dashicons-format-image"
        }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Image Showcase")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
          className: 'editor-image-showcase__description'
        }, "Pick three image from the media library."), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Button, {
          className: 'editor-image-showcase__button',
          onClick: open
        }, "Open Media Library"));
      }
    })))];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: function save(props) {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("section", {
      className: 'section pu-image-showcase'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: 'columns is-centered has-decoration is-mobile'
    }, props.attributes.images.map(function (img) {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
        className: "column is-2-fullhd is-2-widescreen is-4-desktop is-4-tablet is-4-mobile"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("figure", {
        className: "image is-square"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
        alt: img.alt,
        src: img.url
      })));
    })));
  }
});

/***/ }),

/***/ "./src/list/block.js":
/*!***************************!*\
  !*** ./src/list/block.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/* eslint-disable react/jsx-key */

/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */
//  Import CSS.
// import "./editor.scss";
// import "./style.scss";
var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

var InnerBlocks = wp.blockEditor.InnerBlocks;
var BLOCKS_TEMPLATE = [['core/list', {}]];
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType("purdue-blocks/list", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("List"),
  // Block title.
  icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "object-group",
    className: "svg-inline--fa fa-object-group fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
    fill: "#8E6F3E",
    d: "M480 128V96h20c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v20H64V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v40c0 6.627 5.373 12 12 12h20v320H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-20h384v20c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-20V128zM96 276V140c0-6.627 5.373-12 12-12h168c6.627 0 12 5.373 12 12v136c0 6.627-5.373 12-12 12H108c-6.627 0-12-5.373-12-12zm320 96c0 6.627-5.373 12-12 12H236c-6.627 0-12-5.373-12-12v-52h72c13.255 0 24-10.745 24-24v-72h84c6.627 0 12 5.373 12 12v136z"
  })),
  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: "purdue-blocks",
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  attributes: {
    header: {
      type: "string",
      default: ""
    }
  },
  supports: {
    className: false
  },
  // Block description in side panel
  description: __("This block adds a styled list with a header."),
  edit: function edit(props) {
    return [Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "purdue-blocks-editor-list"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Add List Header"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.header !== "" ? props.attributes.header : "",
      className: "input",
      type: "text",
      placeholder: "Content Header...",
      onChange: function onChange(e) {
        props.setAttributes({
          header: e.target.value
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Add List Body"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InnerBlocks, {
      template: BLOCKS_TEMPLATE,
      templateLock: "all"
    })))))];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: function save(props) {
    var returned = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "pu-list"
    }, !props.attributes.header ? '' : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h2", null, props.attributes.header), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InnerBlocks.Content, null));
    return returned;
  }
});

/***/ }),

/***/ "./src/proofpoint/block.js":
/*!*********************************!*\
  !*** ./src/proofpoint/block.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/* eslint-disable react/jsx-key */

/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */
//  Import CSS.
// import "./editor.scss";
// import "./style.scss";
var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    TextareaControl = _wp$components.TextareaControl,
    Button = _wp$components.Button,
    CheckboxControl = _wp$components.CheckboxControl,
    RadioControl = _wp$components.RadioControl;
var _wp$blockEditor = wp.blockEditor,
    InspectorControls = _wp$blockEditor.InspectorControls,
    MediaUploadCheck = _wp$blockEditor.MediaUploadCheck,
    MediaUpload = _wp$blockEditor.MediaUpload,
    InnerBlocks = _wp$blockEditor.InnerBlocks;
var BLOCKS_TEMPLATE = [['core/paragraph', {
  placeholder: 'Body content copy'
}]];
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType("purdue-blocks/proofpoint", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Proof Point"),
  // Block title.
  icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "object-group",
    className: "svg-inline--fa fa-object-group fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
    fill: "#8E6F3E",
    d: "M480 128V96h20c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v20H64V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v40c0 6.627 5.373 12 12 12h20v320H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-20h384v20c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-20V128zM96 276V140c0-6.627 5.373-12 12-12h168c6.627 0 12 5.373 12 12v136c0 6.627-5.373 12-12 12H108c-6.627 0-12-5.373-12-12zm320 96c0 6.627-5.373 12-12 12H236c-6.627 0-12-5.373-12-12v-52h72c13.255 0 24-10.745 24-24v-72h84c6.627 0 12 5.373 12 12v136z"
  })),
  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: "purdue-blocks",
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  attributes: {
    color: {
      type: "string",
      default: "black"
    },
    border: {
      type: "boolean",
      default: false
    },
    buttonColor: {
      type: "string",
      default: "black"
    },
    highlighted: {
      type: "string",
      default: ""
    },
    headerfontStyle: {
      type: "string",
      default: "narrow"
    },
    contentfontStyle: {
      type: "string",
      default: "narrow"
    },
    content: {
      type: "string",
      default: ""
    },
    source: {
      type: "string",
      default: ""
    },
    ctaUrl: {
      type: "string",
      default: ""
    },
    ctaText: {
      type: "string",
      default: ""
    }
  },
  supports: {
    className: false
  },
  // Block description in side panel
  description: __("This block adds a proofpoint card."),
  edit: function edit(props) {
    var setChecked = function setChecked() {
      if (props.attributes.border) {
        props.setAttributes({
          border: false
        });
      } else {
        props.setAttributes({
          border: true
        });
      }
    };

    return [Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InspectorControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RadioControl, {
      label: "Background Color",
      help: "Choose to background color of the proofpoint.",
      selected: props.attributes.color,
      options: [{
        label: 'Black',
        value: 'black'
      }, {
        label: 'White',
        value: 'white'
      }],
      onChange: function onChange(option) {
        props.setAttributes({
          color: option
        });
      }
    }))), props.attributes.color === 'white' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(CheckboxControl, {
      label: "Add border?",
      help: "Would you like to add border to the proofpoint?",
      checked: props.attributes.border,
      onChange: setChecked
    }))) : '', props.attributes.color === 'white' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RadioControl, {
      label: "Button Color",
      help: "Choose the CTA button color.",
      selected: props.attributes.buttonColor,
      options: [{
        label: 'Black',
        value: 'black'
      }, {
        label: 'White',
        value: 'white'
      }],
      onChange: function onChange(option) {
        props.setAttributes({
          buttonColor: option
        });
      }
    }))) : '', Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RadioControl, {
      label: "Highlighted Text Style",
      selected: props.attributes.headerfontStyle,
      options: [{
        label: 'Wide',
        value: 'wide'
      }, {
        label: 'Narrow',
        value: 'narrow'
      }],
      onChange: function onChange(option) {
        props.setAttributes({
          headerfontStyle: option
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RadioControl, {
      label: "Content Text Style",
      selected: props.attributes.contentfontStyle,
      options: [{
        label: 'Wide',
        value: 'wide'
      }, {
        label: 'Narrow',
        value: 'narrow'
      }],
      onChange: function onChange(option) {
        props.setAttributes({
          contentfontStyle: option
        });
      }
    })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "purdue-blocks-editor-proofpoint"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Add Highlighted Text"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.highlighted !== "" ? props.attributes.highlighted : "",
      className: "input",
      type: "text",
      placeholder: "Highlighted Text...",
      onChange: function onChange(e) {
        props.setAttributes({
          highlighted: e.target.value
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Add Content Body"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.content !== "" ? props.attributes.content : "",
      className: "input",
      type: "text",
      placeholder: "Content Text...",
      onChange: function onChange(e) {
        props.setAttributes({
          content: e.target.value
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Add Source of the Proofpoint"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.source !== "" ? props.attributes.source : "",
      className: "input",
      type: "text",
      placeholder: "Source of Text...",
      onChange: function onChange(e) {
        props.setAttributes({
          source: e.target.value
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Add CTA Button Text and URL"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("label", {
      class: "label"
    }, "CTA Text"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.ctaText !== "" ? props.attributes.ctaText : "",
      className: "input",
      type: "text",
      placeholder: "CTA Text...",
      onChange: function onChange(e) {
        props.setAttributes({
          ctaText: e.target.value
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("label", {
      class: "label"
    }, "CTA URL"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.ctaUrl !== "" ? props.attributes.ctaUrl : "",
      className: "input",
      type: "text",
      placeholder: "CTA URL...",
      onChange: function onChange(e) {
        props.setAttributes({
          ctaUrl: e.target.value
        });
      }
    })))))];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: function save(props) {
    var returned = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "pu-proofpoint".concat(props.attributes.color === 'black' ? ' pu-proofpoint__black' : ' pu-proofpoint__white').concat(props.attributes.border ? ' pu-proofpoint__border' : '')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "container"
    }, !props.attributes.highlighted ? '' : props.attributes.headerfontStyle === "wide" ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
      className: "pu-proofpoint__highlighted pu-proofpoint__highlighted-wide"
    }, props.attributes.highlighted) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
      className: "pu-proofpoint__highlighted pu-proofpoint__highlighted-narrow"
    }, props.attributes.highlighted), !props.attributes.content ? '' : props.attributes.contentfontStyle === "wide" ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
      className: "pu-proofpoint__content pu-proofpoint__content-wide"
    }, props.attributes.content) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
      className: "pu-proofpoint__content pu-proofpoint__content-narrow"
    }, props.attributes.content), !props.attributes.source ? '' : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
      className: "pu-proofpoint__source"
    }, props.attributes.source), !props.attributes.ctaUrl || !props.attributes.ctaText ? '' : props.attributes.color === 'white' && props.attributes.buttonColor === "white" ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
      href: props.attributes.ctaUrl,
      className: "pu-proofpoint__button pu-proofpoint__button-white"
    }, props.attributes.ctaText) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
      href: props.attributes.ctaUrl,
      className: "pu-proofpoint__button"
    }, props.attributes.ctaText)));
    return returned;
  }
});

/***/ }),

/***/ "./src/site-hero/block.js":
/*!********************************!*\
  !*** ./src/site-hero/block.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
//  Import CSS.
// import './editor.scss';
// import './style.scss';
var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    CheckboxControl = _wp$components.CheckboxControl,
    TextareaControl = _wp$components.TextareaControl,
    TextControl = _wp$components.TextControl,
    Button = _wp$components.Button,
    ToggleControl = _wp$components.ToggleControl;
var _wp$blockEditor = wp.blockEditor,
    InspectorControls = _wp$blockEditor.InspectorControls,
    MediaUploadCheck = _wp$blockEditor.MediaUploadCheck,
    MediaUpload = _wp$blockEditor.MediaUpload;
var _wp$data = wp.data,
    dispatch = _wp$data.dispatch,
    select = _wp$data.select;
var category = {
  slug: 'purdue-blocks',
  title: __('Purdue Blocks')
};
var currentCategories = select('core/blocks').getCategories().filter(function (item) {
  return item.slug !== category.slug;
});
dispatch('core/blocks').setCategories([category].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(currentCategories))); // Array of social media share options.

var socials = [{
  faSlug: 'facebook-f',
  name: 'Facebook',
  share: 'https://www.facebook.com/sharer/sharer.php?u='
}, {
  faSlug: 'twitter',
  name: 'Twitter',
  share: 'https://twitter.com/intent/tweet?url='
}, {
  faSlug: 'linkedin-in',
  name: 'LinkedIn',
  share: 'https://www.linkedin.com/shareArticle?mini=true&url='
}];
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType('purdue-blocks/site-hero', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __('Site Hero'),
  // Block title.
  icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "object-group",
    className: "svg-inline--fa fa-object-group fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("path", {
    fill: "#8E6F3E",
    d: "M480 128V96h20c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v20H64V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v40c0 6.627 5.373 12 12 12h20v320H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-20h384v20c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-20V128zM96 276V140c0-6.627 5.373-12 12-12h168c6.627 0 12 5.373 12 12v136c0 6.627-5.373 12-12 12H108c-6.627 0-12-5.373-12-12zm320 96c0 6.627-5.373 12-12 12H236c-6.627 0-12-5.373-12-12v-52h72c13.255 0 24-10.745 24-24v-72h84c6.627 0 12 5.373 12 12v136z"
  })),
  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks',
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  attributes: {
    pageTitle: {
      type: 'string',
      default: ''
    },
    subText: {
      type: 'string'
    },
    imgUrl: {
      type: 'string',
      default: ''
    },
    altText: {
      type: 'string',
      default: ''
    },
    imgError: {
      type: 'boolean'
    },
    includeSocial: {
      type: 'boolean'
    },
    includeButton: {
      type: 'boolean'
    },
    anchor: {
      type: 'string',
      default: ''
    },
    styleToggle: {
      type: 'boolean',
      default: false
    },
    checkedSocials: {
      type: 'object',
      default: {}
    },
    currUrl: {
      type: 'string',
      default: ''
    }
  },
  supports: {
    className: false
  },
  // Block description in side panel
  description: __('This block should be used at the top of the page. Choose a page title, intro copy, an image, and whether to include social media share buttons.'),
  edit: function edit(props) {
    var titleField = document.querySelector('#siteHeroTitleInput');
    var titleFieldIsFocused = document.activeElement === titleField;

    if (props.attributes.currUrl === '') {
      props.setAttributes({
        currUrl: select('core/editor').getPermalink()
      });
    }

    if (props.attributes.pageTitle === '' && !titleFieldIsFocused) {
      props.setAttributes({
        pageTitle: select('core/editor').getCurrentPost().title
      });
    }

    var checkedSocials = props.attributes.checkedSocials;

    var setChecked = function setChecked() {
      if (props.attributes.includeSocial) {
        props.setAttributes({
          includeSocial: false
        });
      } else {
        props.setAttributes({
          includeSocial: true
        });
      }
    };

    var setButtonChecked = function setButtonChecked() {
      if (props.attributes.includeButton) {
        props.setAttributes({
          includeButton: false
        });
      } else {
        props.setAttributes({
          includeButton: true
        });
      }
    };

    return [Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(InspectorControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(ToggleControl, {
      label: "Hero Style Toggle",
      help: props.attributes.styleToggle ? '40/60 Hero' : '50/50 Hero',
      checked: props.attributes.styleToggle,
      onChange: function onChange() {
        return props.setAttributes({
          styleToggle: !props.attributes.styleToggle
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(TextareaControl, {
      label: "Hero Image Alt Text",
      value: props.attributes.altText,
      onChange: function onChange(altText) {
        return props.setAttributes({
          altText: altText
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(CheckboxControl, {
      label: "Include Social Share Links",
      help: "Would you like to include links to share this site on social media?",
      checked: props.attributes.includeSocial,
      onChange: setChecked
    })), props.attributes.includeSocial ? socials.map(function (_ref) {
      var faSlug = _ref.faSlug,
          name = _ref.name;
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(CheckboxControl, {
        label: name,
        checked: checkedSocials[faSlug],
        onChange: function onChange(check) {
          if (check) {
            checkedSocials[faSlug] = true;
          } else {
            delete checkedSocials[faSlug];
          }

          props.setAttributes({
            includeSocial: true,
            checkedSocials: _objectSpread({}, checkedSocials)
          });
        }
      });
    }) : ''), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(CheckboxControl, {
      label: "Include a Jump to Article button",
      help: "Would you like to include a Jump to Article button?",
      checked: props.attributes.includeButton,
      onChange: setButtonChecked
    })), props.attributes.includeButton ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(TextControl, {
      label: "ID of the element the button will jump to",
      value: props.attributes.anchor,
      onChange: function onChange(anchor) {
        return props.setAttributes({
          anchor: anchor
        });
      }
    })) : '')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: 'bulma-blocks-editor-site-hero'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("span", null, "Add Page Title"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("input", {
      value: props.attributes.pageTitle,
      className: "input",
      id: "siteHeroTitleInput",
      type: "text",
      placeholder: "Page Title...",
      onChange: function onChange(e) {
        props.setAttributes({
          pageTitle: e.target.value
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("span", null, "Add Intro Copy"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("textarea", {
      value: props.attributes.subText !== '' ? props.attributes.subText : '',
      className: "textarea",
      placeholder: "Add intro copy here...",
      onChange: function onChange(e) {
        props.setAttributes({
          subText: e.target.value
        });
      }
    })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("span", null, "Choose a Hero Image"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(MediaUploadCheck, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(MediaUpload, {
      onSelect: function onSelect(img) {
        var aspectRatio = '';
        img.height ? aspectRatio = img.width / img.height : aspectRatio = img.width / img.media_details.height;

        if (aspectRatio !== 2) {
          props.setAttributes({
            imgError: true
          });
        } else {
          props.setAttributes({
            imgUrl: img.url,
            altText: props.attributes.altText !== '' ? props.attributes.altText : img.alt,
            imgError: false
          });
        }
      },
      render: function render(_ref2) {
        var open = _ref2.open;
        return props.attributes.imgUrl !== '' && !props.attributes.imgError ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
          className: 'bulma-blocks-editor-site-hero__preview'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("figure", {
          className: 'image'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("img", {
          alt: props.attributes.altText,
          src: props.attributes.imgUrl
        })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(Button, {
          className: 'bulma-blocks-editor-site-hero__button',
          onClick: open
        }, "Select a New Image")) : props.attributes.imgError ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
          className: 'bulma-blocks-editor-site-hero__container'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("p", {
          className: 'bulma-blocks-editor-site-hero__description bulma-blocks-editor-site-hero__description--error'
        }, "The image you selected had the wrong aspect ratio. Please make sure your image has a 2:1 aspect ratio."), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(Button, {
          className: 'bulma-blocks-editor-site-hero__button',
          onClick: open
        }, "Open Media Library")) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
          className: 'bulma-blocks-editor-site-hero__container'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("p", {
          className: 'bulma-blocks-editor-site-hero__description'
        }, "Pick an image from the media library. The image should be 2:1 aspect ratio and will be resized automatically."), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(Button, {
          className: 'bulma-blocks-editor-site-hero__button',
          onClick: open
        }, "Open Media Library"));
      }
    }))))];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: function save(props) {
    var returned = !props.attributes.styleToggle ? // 50/50 Hero
    Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "bulma-blocks-50-50-hero"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "hero is-medium"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "hero-body"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "container"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("h1", null, props.attributes.pageTitle || select('core/editor').getCurrentPost().title), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("p", null, props.attributes.subText), props.attributes.includeSocial ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "level is-mobile"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "level-left"
    }, Object.keys(props.attributes.checkedSocials).map(function (faSlug) {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
        className: "level-item"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("a", {
        target: "_blank",
        rel: "noopener noreferrer",
        href: "".concat(socials.find(function (item) {
          return item.faSlug === faSlug;
        }).share).concat(props.attributes.currUrl || select('core/editor').getPermalink()),
        className: "icon"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("i", {
        className: "fab fa-lg fa-".concat(faSlug)
      })));
    }))) : '', props.attributes.includeButton && props.attributes.anchor ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("a", {
      href: "#".concat(props.attributes.anchor),
      className: "jump-button"
    }, "jump to articles ", Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("i", {
      className: "fas fa-arrow-down",
      "aria-hidden": "true"
    })) : ''))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "hero-image"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("span", {
      className: "background-image",
      role: "img",
      style: {
        backgroundImage: "url(".concat(props.attributes.imgUrl, ")")
      },
      "aria-label": props.attributes.altText
    })))) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "bulma-blocks-40-60-hero"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "hero is-medium"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "hero-body"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "container"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("h1", null, props.attributes.pageTitle || select('core/editor').getCurrentPost().title), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("p", null, props.attributes.subText), props.attributes.includeSocial ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "level is-mobile"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "level-left"
    }, Object.keys(props.attributes.checkedSocials).map(function (faSlug) {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
        className: "level-item"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("a", {
        target: "_blank",
        rel: "noopener noreferrer",
        href: "".concat(socials.find(function (item) {
          return item.faSlug === faSlug;
        }).share).concat(props.attributes.currUrl || select('core/editor').getPermalink()),
        className: "icon"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("i", {
        className: "fab fa-lg fa-".concat(faSlug)
      })));
    }))) : '', props.attributes.includeButton && props.attributes.anchor ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("a", {
      href: "#".concat(props.attributes.anchor),
      className: "jump-button"
    }, "jump to articles ", Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("i", {
      className: "fas fa-arrow-down",
      "aria-hidden": "true"
    })) : ''))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "shadow"
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("div", {
      className: "hero-image"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("span", {
      className: "background-image",
      role: "img",
      style: {
        backgroundImage: "url(".concat(props.attributes.imgUrl, ")")
      },
      "aria-label": props.attributes.altText
    }))));
    return returned;
  }
});

/***/ }),

/***/ "./src/testimonial/block.js":
/*!**********************************!*\
  !*** ./src/testimonial/block.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/* eslint-disable react/jsx-key */

/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */
//  Import CSS.
// import './editor.scss';
// import './style.scss';
var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    SelectControl = _wp$components.SelectControl;
var InspectorControls = wp.blockEditor.InspectorControls;
var withSelect = wp.data.withSelect; // Array of social media share options.

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType('purdue-blocks/testimonial', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __('Testimonial'),
  // Block title.
  icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "object-group",
    className: "svg-inline--fa fa-object-group fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
    fill: "#8E6F3E",
    d: "M480 128V96h20c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v20H64V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v40c0 6.627 5.373 12 12 12h20v320H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-20h384v20c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-20V128zM96 276V140c0-6.627 5.373-12 12-12h168c6.627 0 12 5.373 12 12v136c0 6.627-5.373 12-12 12H108c-6.627 0-12-5.373-12-12zm320 96c0 6.627-5.373 12-12 12H236c-6.627 0-12-5.373-12-12v-52h72c13.255 0 24-10.745 24-24v-72h84c6.627 0 12 5.373 12 12v136z"
  })),
  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks',
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  attributes: {
    posts: {
      type: 'array',
      default: []
    },
    selectedPosts: {
      type: 'array',
      default: []
    }
  },
  // Block description in side panel
  description: __('This block adds a row of one or two testimonials to your page.'),
  edit: withSelect(function (select) {
    var posts = wp.data.select('core').getEntityRecords('postType', 'test_post', {
      per_page: -1,
      _embed: true
    });
    return {
      posts: posts
    };
  })(function (props) {
    var posts = props.posts;

    if (!posts) {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
        className: "pu-blocks-editor-testimonial"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
        className: "error-message"
      }, "loading.."));
    }

    if (posts.length === 0) {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
        className: "pu-blocks-editor-testimonial"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
        className: "error-message"
      }, "No testimonial posts"));
    }

    posts.map(function (post) {
      post.img = post._embedded['wp:featuredmedia'][0];
    });
    props.setAttributes({
      posts: posts
    });
    var options = [];

    for (var i = 0; i < posts.length; i++) {
      var option = {
        value: posts[i].id,
        label: posts[i].title.rendered
      };
      options.push(option);
    }

    return [Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InspectorControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(SelectControl, {
      multiple: true,
      label: __('Select one or two testimonials:'),
      value: props.attributes.selectedPosts // e.g: value = [ 'a', 'c' ]
      ,
      onChange: function onChange(selectedPosts) {
        if (selectedPosts.length <= 2) {
          props.setAttributes({
            selectedPosts: selectedPosts
          });
        } else {
          props.setAttributes({
            selectedPosts: selectedPosts.slice(0, 2)
          });
        }
      },
      options: options
    })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "pu-blocks-editor-testimonial"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "testimonial__section container"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h2", null, "Testimonials"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "testimonial__list columns"
    }, props.attributes.posts.map(function (post) {
      if (props.attributes.selectedPosts && props.attributes.selectedPosts.length > 0) {
        return props.attributes.selectedPosts.map(function (selectedPost) {
          if (post.id == selectedPost) {
            return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
              className: "column"
            }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
              className: "testimonial__item"
            }, props.attributes.selectedPosts.length === 2 ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
              className: "testimonial__body testimonial__body--small"
            }, post.img ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
              src: post.img.source_url,
              alt: post.img.alt_text
            }) : '', !post.excerpt.raw ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
              className: "testimonial__content"
            }, "\"", post.content.raw.replace(/<!--(?!>)[\S\s]*?-->/g, '').replace(/(<([^>]+)>)/ig, ''), "\"") : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
              className: "testimonial__content"
            }, "\"", post.excerpt.raw, "\""), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
              className: "testimonial__name"
            }, post.acf.name), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
              className: "testimonial__info"
            }, post.acf.persons_information)) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
              className: "testimonial__body testimonial__body--big"
            }, post.img ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
              src: post.img.source_url,
              alt: post.img.alt_text
            }) : '', !post.excerpt.raw ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
              className: "testimonial__content"
            }, "\"", post.content.raw.replace(/<!--(?!>)[\S\s]*?-->/g, '').replace(/(<([^>]+)>)/ig, ''), "\"") : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
              className: "testimonial__content"
            }, "\"", post.excerpt.raw, "\""), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
              className: "testimonial__name"
            }, post.acf.name), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
              className: "testimonial__info"
            }, post.acf.persons_information)))); // } )
          }
        });
      }
    }))))];
  }),

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: function save(props) {
    var posts = props.attributes.posts;
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "pu-blocks-testimonial"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "testimonial__section container"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h2", null, "Testimonials"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "testimonial__list columns is-multiline"
    }, posts.map(function (post) {
      if (props.attributes.selectedPosts && props.attributes.selectedPosts.length > 0) {
        return props.attributes.selectedPosts.map(function (selectedPost) {
          if (post.id == selectedPost) {
            if (props.attributes.selectedPosts.length === 2) {
              return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
                className: "column is-full-mobile is-full-tablet is-half-desktop"
              }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
                className: "testimonial__item"
              }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
                className: "testimonial__body testimonial__body--small"
              }, post.img ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
                src: post.img.source_url,
                alt: post.img.alt_text
              }) : '', !post.excerpt.raw ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
                className: "testimonial__content"
              }, post.content.raw.replace(/<!--(?!>)[\S\s]*?-->/g, '').replace(/(<([^>]+)>)/ig, '')) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
                className: "testimonial__content"
              }, post.excerpt.raw), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
                className: "testimonial__name"
              }, post.acf.name), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
                className: "testimonial__info"
              }, post.acf.persons_information))));
            }

            return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
              className: "column"
            }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
              className: "testimonial__item testimonial--big"
            }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
              className: "testimonial__body testimonial__body--big"
            }, post.img ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
              src: post.img.source_url,
              alt: post.img.alt_text
            }) : '', !post.excerpt.raw ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
              className: "testimonial__content"
            }, post.content.raw.replace(/<!--(?!>)[\S\s]*?-->/g, '').replace(/(<([^>]+)>)/ig, '')) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
              className: "testimonial__content"
            }, post.excerpt.raw), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
              className: "testimonial__name"
            }, post.acf.name), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
              className: "testimonial__info"
            }, post.acf.persons_information))));
          }
        });
      }
    }))));
  }
});

/***/ }),

/***/ "./src/title-hero/block.js":
/*!*********************************!*\
  !*** ./src/title-hero/block.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/* eslint-disable react/jsx-key */

/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */
//  Import CSS.
// import './editor.scss';
// import './style.scss';
var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    TextareaControl = _wp$components.TextareaControl,
    Button = _wp$components.Button;
var _wp$blockEditor = wp.blockEditor,
    InspectorControls = _wp$blockEditor.InspectorControls,
    MediaUploadCheck = _wp$blockEditor.MediaUploadCheck,
    MediaUpload = _wp$blockEditor.MediaUpload;
var select = wp.data.select;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType('purdue-blocks/title-hero', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __('Title Hero'),
  // Block title.
  icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "object-group",
    className: "svg-inline--fa fa-object-group fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
    fill: "#8E6F3E",
    d: "M480 128V96h20c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v20H64V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v40c0 6.627 5.373 12 12 12h20v320H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-20h384v20c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-20V128zM96 276V140c0-6.627 5.373-12 12-12h168c6.627 0 12 5.373 12 12v136c0 6.627-5.373 12-12 12H108c-6.627 0-12-5.373-12-12zm320 96c0 6.627-5.373 12-12 12H236c-6.627 0-12-5.373-12-12v-52h72c13.255 0 24-10.745 24-24v-72h84c6.627 0 12 5.373 12 12v136z"
  })),
  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks',
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  attributes: {
    pageTitle: {
      type: 'string',
      default: ''
    },
    subText: {
      type: 'string',
      default: ''
    },
    imgUrl: {
      type: 'string',
      default: ''
    },
    imgMoUrl: {
      type: 'string',
      default: ''
    },
    altText: {
      type: 'string',
      default: ''
    }
  },
  supports: {
    className: false
  },
  // Block description in side panel
  description: __('This block should be used at the top of the page. Choose a page title, an image, and the settings for the cta button.'),
  edit: function edit(props) {
    if (props.attributes.pageTitle === '') {
      props.setAttributes({
        pageTitle: select('core/editor').getCurrentPost().title
      });
    }

    return [Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InspectorControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextareaControl, {
      label: "Hero Image Alt Text",
      value: props.attributes.altText,
      onChange: function onChange(altText) {
        return props.setAttributes({
          altText: altText
        });
      }
    })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: 'bulma-blocks-editor-cta-hero'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Add Page Title"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      value: props.attributes.pageTitle !== '' ? props.attributes.pageTitle : '',
      className: "input",
      type: "text",
      placeholder: "Page Title...",
      onChange: function onChange(e) {
        props.setAttributes({
          pageTitle: e.target.value
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Add the intro copy here."), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("textarea", {
      value: props.attributes.subText !== '' ? props.attributes.subText : '',
      className: "textarea",
      placeholder: "Add intro copy here...",
      onChange: function onChange(e) {
        props.setAttributes({
          subText: e.target.value
        });
      }
    })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, "Choose a Hero Image"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUploadCheck, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUpload, {
      onSelect: function onSelect(img) {
        props.setAttributes({
          imgUrl: img.url,
          imgMoUrl: img.sizes ? img.sizes.hero_mobile ? img.sizes.hero_mobile.url : img.url : img.url,
          altText: props.attributes.altText !== '' ? props.attributes.altText : img.alt
        });
      },
      render: function render(_ref) {
        var open = _ref.open;
        return props.attributes.imgUrl !== '' ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
          className: 'bulma-blocks-editor-site-hero__preview'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("figure", {
          className: 'image'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
          alt: props.attributes.altText,
          src: props.attributes.imgUrl
        })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Button, {
          className: 'bulma-blocks-editor-site-hero__button',
          onClick: open
        }, "Select a New Image")) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
          className: 'bulma-blocks-editor-site-hero__container'
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
          className: 'bulma-blocks-editor-site-hero__description'
        }, "Pick a hero image from the media library."), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Button, {
          className: 'bulma-blocks-editor-site-hero__button',
          onClick: open
        }, "Open Media Library"));
      }
    }))))];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: function save(props) {
    var returned = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "pu-title-hero"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "hero is-large"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "hero-body"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "background-image",
      "aria-label": props.attributes.altText
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", {
      dangerouslySetInnerHTML: {
        __html: "\n              .background-image {background-image: url(".concat(props.attributes.imgUrl, ");}\n              @media (max-width: 767px) {\n                .background-image {background-image: url(").concat(props.attributes.imgMoUrl, ");}\n              }\n            ")
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "container"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "content"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h1", null, props.attributes.pageTitle || select('core/editor').getCurrentPost().title), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", null, props.attributes.subText))))));
    return returned;
  }
});

/***/ }),

/***/ "./src/title-nav/block.js":
/*!********************************!*\
  !*** ./src/title-nav/block.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);


/* eslint-disable react/jsx-key */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */
//  Import CSS.
// import './editor.scss';
// import './style.scss';

var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    RangeControl = _wp$components.RangeControl,
    CheckboxControl = _wp$components.CheckboxControl,
    TextControl = _wp$components.TextControl;
var _wp$blockEditor = wp.blockEditor,
    InnerBlocks = _wp$blockEditor.InnerBlocks,
    InspectorControls = _wp$blockEditor.InspectorControls,
    RichText = _wp$blockEditor.RichText;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType('purdue-blocks/title-nav', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __('Titled Navigation'),
  // Block title.
  icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "far",
    "data-icon": "ellipsis-h",
    className: "svg-inline--fa fa-ellipsis-h fa-w-12",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
    fill: "#8E6F3E",
    d: "M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
  })),
  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks',
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  attributes: {
    hasOutline: {
      type: 'boolean',
      default: false
    },
    addButton: {
      type: 'boolean',
      default: false
    },
    numLinks: {
      type: 'number',
      default: 1
    },
    titleText: {
      source: 'html',
      selector: 'h2'
    },
    buttonText: {
      type: 'string',
      default: ''
    },
    buttonLink: {
      type: 'string',
      default: ''
    }
  },
  supports: {
    className: false
  },
  // Block description in side panel
  description: __('Add this block and select navigation items to build a menu that will show above the title of the page.'),
  edit: function edit(props) {
    if (props.attributes.numLinks === 1) {
      updateInner(props, 1, 1);
    }

    return [Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InspectorControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RangeControl, {
      className: 'bulma-columns-range-control',
      label: "Number of Navigation Items",
      value: props.attributes.numLinks,
      min: 1,
      max: 15,
      onChange: function onChange(numLinks) {
        console.log(numLinks);
        updateInner(props, props.attributes.numLinks, numLinks);
        props.setAttributes({
          numLinks: numLinks
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(CheckboxControl, {
      label: "Give Menu Items an Outline?",
      checked: props.attributes.hasOutline,
      onChange: function onChange(checked) {
        return props.setAttributes({
          hasOutline: checked
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(CheckboxControl, {
      label: "Add a CTA Button?",
      checked: props.attributes.addButton,
      onChange: function onChange(checked) {
        return props.setAttributes({
          addButton: checked
        });
      }
    })), props.attributes.addButton ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, {
      title: 'Button Controls'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextControl, {
      label: "Button Text",
      value: props.attributes.buttonText,
      onChange: function onChange(buttonText) {
        return props.setAttributes({
          buttonText: buttonText
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextControl, {
      label: "Button Link",
      value: props.attributes.buttonLink,
      onChange: function onChange(buttonLink) {
        return props.setAttributes({
          buttonLink: buttonLink
        });
      }
    }))) : '')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "editor-title-nav  ".concat(props.attributes.hasOutline ? 'outline-on' : '')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText, {
      tagName: "h2",
      value: props.attributes.titleText,
      className: 'editor-title-nav__title',
      onChange: function onChange(text) {
        props.setAttributes({
          titleText: text
        });
      },
      placeholder: "Nav Title (Optional)",
      keepPlaceholderOnFocus: true
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InnerBlocks, {
      templateLock: "all"
    }))];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: function save(props) {
    return !props.attributes.addButton ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("section", {
      className: "section pu-title-nav ".concat(props.attributes.hasOutline ? 'has-outline' : '')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText.Content, {
      className: "pu-title-nav__title",
      tagName: "h2",
      value: props.attributes.titleText
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("ul", {
      className: "pu-title-nav__menu"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InnerBlocks.Content, null))) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("section", {
      className: "section pu-title-nav ".concat(props.attributes.hasOutline ? 'has-outline' : '')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "columns"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "column is-8 pu-title-nav__left"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText.Content, {
      className: "pu-title-nav__title",
      tagName: "h2",
      value: props.attributes.titleText
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("ul", {
      className: "pu-title-nav__menu"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InnerBlocks.Content, null))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "column is-3 is-offset-1 pu-title-nav__right"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
      className: "pu-title-nav__cta",
      href: props.attributes.buttonLink
    }, " ", props.attributes.buttonText, " "))));
  }
});

var updateInner = function updateInner(props, oldNum, newNum) {
  var select = wp.data.select('core/block-editor');
  var innerBlocks = select.getBlock(props.clientId).innerBlocks;
  console.log("newnum: ".concat(newNum, ", oldnum: ").concat(oldNum));
  var adding = newNum > oldNum;
  var triedZero = newNum === 0;

  if (oldNum === 1 && oldNum === newNum) {
    var firstBlock = Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__["createBlock"])('purdue-blocks/title-nav-link');
    innerBlocks = [firstBlock];
    wp.data.dispatch('core/block-editor').replaceInnerBlocks(props.clientId, innerBlocks, false);
  } else if (adding && !triedZero) {
    var newToAdd = newNum - oldNum;

    for (var i = 0; i < newToAdd; i++) {
      var newLinkToAdd = Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__["createBlock"])('purdue-blocks/title-nav-link');
      innerBlocks.push(newLinkToAdd);
    }

    wp.data.dispatch('core/block-editor').replaceInnerBlocks(props.clientId, innerBlocks, false);
  } else if (!adding && !triedZero) {
    var removingNum = oldNum - newNum;

    for (var _i = 0; _i < removingNum; _i++) {
      innerBlocks.pop();
    }

    wp.data.dispatch('core/block-editor').replaceInnerBlocks(props.clientId, innerBlocks, false);
  }
};

/***/ }),

/***/ "./src/title-nav/title-nav-link/block.js":
/*!***********************************************!*\
  !*** ./src/title-nav/title-nav-link/block.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/* eslint-disable react/jsx-key */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */
//  Import CSS.
// import './editor.scss';
// import './style.scss';
var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    CheckboxControl = _wp$components.CheckboxControl;
var _wp$blockEditor = wp.blockEditor,
    RichText = _wp$blockEditor.RichText,
    InspectorControls = _wp$blockEditor.InspectorControls;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType('purdue-blocks/title-nav-link', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __('Titled Navigation Link'),
  // Block title.
  icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "far",
    "data-icon": "link",
    className: "svg-inline--fa fa-link fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
    fill: "#8E6F3E",
    d: "M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"
  })),
  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks',
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],
  parent: ['purdue-blocks/title-nav'],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  attributes: {
    linkText: {
      source: 'html',
      selector: 'li'
    },
    isCurrent: {
      type: 'boolean',
      default: false
    }
  },
  supports: {
    className: false
  },
  // Block description in side panel
  description: __('Add this block and select navigation items to build a menu that will show above the title of the page.'),
  edit: function edit(props) {
    return [Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InspectorControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelRow, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(CheckboxControl, {
      label: "Is this the current page?",
      checked: props.attributes.isCurrent,
      onChange: function onChange(checked) {
        return props.setAttributes({
          isCurrent: checked
        });
      }
    })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: 'editor-title-nav-link'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText, {
      tagname: "li",
      value: props.attributes.linkText,
      className: "editor-title-nav-link__input ".concat(props.attributes.isCurrent ? 'isCurrent' : ''),
      onChange: function onChange(text) {
        props.setAttributes({
          linkText: text
        });
      }
    }))];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: function save(props) {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText.Content, {
      className: "".concat(props.attributes.isCurrent ? 'isCurrent' : ''),
      tagName: "li",
      value: props.attributes.linkText
    });
  }
});

/***/ }),

/***/ "@wordpress/blocks":
/*!*****************************************!*\
  !*** external {"this":["wp","blocks"]} ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["blocks"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!******************************************!*\
  !*** external {"this":["wp","element"]} ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["element"]; }());

/***/ })

/******/ });