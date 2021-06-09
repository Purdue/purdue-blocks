import 'core-js/stable'
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
import "./accordion/frontend.js";
import "./anchor-link-navigation/frontend.js";
import "./image-toggle-card/frontend.js"
import "./custom-side-menu/frontend.js"
import "./podcast/frontend.js"
import "./video-embed/frontend.js"
import "./title-hero/frontend.js"
import "./profile-gallery/frontend.js"
import "./purdue-quote/frontend.js"