!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=14)}({14:function(e,t,n){"use strict";n.r(t);n(15),n(16)},15:function(e,t){var n=document.querySelectorAll(".accordion-title");n.forEach((function(e){e.addEventListener("click",(function(t){n.forEach((function(n){if(n!==t.target)n.setAttribute("aria-expanded","false"),n.parentElement.classList.remove("is-open");else if(n===t.target){var o="false"===e.getAttribute("aria-expanded");n.setAttribute("aria-expanded",o),n.parentElement.classList.contains("is-open")?e.parentElement.classList.remove("is-open"):e.parentElement.classList.add("is-open")}}))}))}))},16:function(e,t){var n=document.querySelectorAll("h2, h3, h4, h5, h6"),o=[];n.forEach((function(e){e.id&&o.push(e)}));var r=document.querySelectorAll(".anchor-link-block-links");window.location.href;if(r&&r.length>0&&o&&o.length>0){r.forEach((function(e){o.forEach((function(t){var n=document.createElement("a"),o=document.createTextNode(t.innerHTML);n.appendChild(o),n.title=t.innerHTML,n.href="#"+t.id,n.classList.add("anchor-link-block-link"),e.appendChild(n)}))}));var i=document.querySelectorAll("a.anchor-link-block-link");i.forEach((function(e){e.addEventListener("click",(function(t){t.preventDefault();var n=document.querySelector(e.hash).getBoundingClientRect().top+window.pageYOffset-20;window.scroll({top:n,behavior:"smooth"}),i.forEach((function(t){t===e?t.classList.add("is-active"):t.classList.remove("is-active")}))}))})),window.addEventListener("scroll",(function(){var e=document.documentElement.scrollTop||document.body.scrollTop;o.forEach((function(t){if(t.offsetTop<=e){var n="#"+t.id;i.forEach((function(e){e.hash===n?e.classList.add("is-active"):e.classList.remove("is-active")}))}}))}));var c=document.querySelector("#to-top-sidebar");c&&c.addEventListener("click",(function(){window.scroll({top:0,behavior:"smooth"})}))}}});