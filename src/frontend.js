import 'core-js/stable'
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
import "./accordion/frontend.js";
import "./anchor-link-navigation/frontend.js";
import "./image-toggle-card/frontend.js"
