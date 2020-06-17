"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _iterableToArrayLimit(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(r=(i=s.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==s.return||s.return()}finally{if(o)throw a}}return n}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}!function(){("ontouchstart"in window||"msmaxtouchpoints"in window.navigator)&&document.body.classList.add("touchdevice");var e=document.createElement("a");e.id="banner-toggle-button";var t,n,r=document.getElementsByTagName("header")[0];r.parentNode.insertBefore(e,r),e.addEventListener("click",function(e){e.preventDefault(),"none"===window.getComputedStyle(document.querySelector("header.banner")).display?document.body.classList.add("show-menu"):document.body.className=document.body.classList.remove("show-menu")});var o=document.createElement("div"),a=function(e){e.preventDefault(),i()},i=function(){document.body.removeEventListener("click",a),window.clearTimeout(t),o.className="display-shown",n=window.setTimeout(function(){o.className="",o.innerHTML=""},800)};function s(e){o.innerHTML="<span>".concat(e,"</span>"),o.className="display-shown shown",window.clearTimeout(t),window.clearTimeout(n),document.body.removeEventListener("click",a),t=window.setTimeout(i,3500),window.setTimeout(function(){document.body.addEventListener("click",a)},100)}o.id="alert-notice",document.body.appendChild(o),document.getElementById("submit-button").addEventListener("click",function(e){e.preventDefault();var t=document.getElementById("name").value.trim(),n=document.getElementById("company").value.trim(),r=document.getElementById("profession").value.trim(),o=document.getElementById("tel").value.replace(/ /g,"").trim(),a=document.getElementById("email").value.trim();if(t)if(n)if(o)if(/^[\d-.()]+$/g.test(o))if(a)if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(a)){var i=new XMLHttpRequest;i.open("POST","reg.php"),i.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),i.onload=function(){200!==i.status?s("Demande échoué. Statut de retour de ".concat(i.status)):s(i.responseText)},i.send(encodeURI("name=".concat(t,"&company=").concat(n,"&profession=").concat(r,"&tel=").concat(o,"&email=").concat(a)))}else s("Veuillez saisir une adresse e-mail correcte (pas de charactère spéciale pour le nom de domaine). Merci.");else s("Veuillez saisir votre adresse e-mail. Merci.");else s("Veuillez saisir un numéro de téléphone correct. Merci.");else s("Veuillez saisir votre numéro de téléphone. Merci.");else s("Veuillez saisir votre entreprise. Merci.");else s("Veuillez saisir votre nom. Merci.")});var c,l=new(function(){function c(e,t,n,r){_classCallCheck(this,c),this.circumference=2*Math.PI*t;var o="http://www.w3.org/2000/svg",a=document.createElementNS(o,"circle");a.setAttribute("class","progress-max"),a.setAttribute("r",t),a.setAttribute("cx",r/2),a.setAttribute("cy",r/2),a.setAttribute("stroke-width",n),this.progressValueEl=document.createElementNS(o,"circle"),this.progressValueEl.setAttribute("class","progress-value"),this.progressValueEl.setAttribute("r",t),this.progressValueEl.setAttribute("cx",r/2),this.progressValueEl.setAttribute("cy",r/2),this.progressValueEl.setAttribute("stroke-width",n),this.progressValueEl.setAttribute("stroke-dasharray",this.circumference);var i=document.createElementNS(o,"svg");i.setAttribute("class","progress-svg"),i.setAttribute("width",r),i.setAttribute("height",r),i.setAttribute("viewBox","0 0 ".concat(r," ").concat(r));var s=document.createElement("div");s.className="read-text-container",this.readPctEl=document.createElement("span"),this.readPctEl.className="read-percentage",s.appendChild(this.readPctEl),i.appendChild(a),i.appendChild(this.progressValueEl),e.appendChild(i),e.appendChild(s)}return _createClass(c,[{key:"setProgress",value:function(e){var t=this.circumference*(1-e/100);this.progressValueEl.style.strokeDashoffset=t,this.readPctEl.innerHTML="".concat(e,"%")}}]),c}())(document.getElementById("read-container"),54,12,120),d=document.documentElement,u=document.body,m=(d.scrollHeight-d.clientHeight-1)/100,p=function(){c=100<=(c=(d.scrollTop||u.scrollTop)/m)?100:Math.floor(c),l.setProgress(c)};window.addEventListener("scroll",p),window.addEventListener("resize",p),p();var y=document.createElement("div"),v=document.createElement("div"),f=document.createElement("div"),w=document.getElementById("curpose");y.className="curpose-layer curpose-animated-1",v.className="curpose-layer curpose-animated-2",f.className="curpose-layer curpose-animated-3",w.appendChild(y),w.appendChild(v),w.appendChild(f);var h=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,16)},g=document.querySelector(".curpose-container"),b=window.getComputedStyle(g),E=parseFloat(b.width),A=document.querySelector(".curpose-animated-1"),T=document.querySelector(".curpose-animated-2"),L=document.querySelector(".curpose-animated-3");g.addEventListener("mousemove",function(e){var t=e.pageX;h(function(){A.style.backgroundPositionX="".concat((150-t/E*200).toFixed(1),"%"),T.style.backgroundPositionX="".concat((100-t/E*100).toFixed(1),"%"),L.style.backgroundPositionX="".concat((75-t/E*50).toFixed(1),"%")})});var C=function(o,a){return Array.isArray(o)||Object.prototype.isPrototypeOf.call(NodeList.prototype,o)?Array.prototype.some.call(o,a):Object.entries(o).some(function(e){var t=_slicedToArray(e,2),n=t[0],r=t[1];return!!a(r,n,o)})},k=function(e){var t=e.getElementsByClassName("slide-c").length;e.dataset.slide=e.dataset.slide===t?1:parseInt(e.dataset.slide,10)+1},I=function(e,t){return window.setInterval(function(){k(e)},t)};C(document.querySelectorAll(".slide-viewport"),function(e){var o=e.getElementsByClassName("slide-wrapper")[0],t=I(o,2e3);e.addEventListener("mouseover",function(){window.clearInterval(t)}),e.addEventListener("mouseout",function(){t=I(o,2e3)}),e.getElementsByClassName("slide-button-prev")[0].addEventListener("click",function(e){var t,n;e.preventDefault(),n=(t=o).getElementsByClassName("slide-c").length,t.dataset.slide=1===t.dataset.slide?n:parseInt(t.dataset.slide,10)-1}),e.getElementsByClassName("slide-button-next")[0].addEventListener("click",function(e){e.preventDefault(),k(o)}),C(e.getElementsByClassName("slide-button-goto"),function(r){r.addEventListener("click",function(e){var t,n;e.preventDefault(),t=o,n=r.dataset.toslide,t.dataset.slide=n})})});var N,_,B,S=document.documentElement.scrollTop||document.body.scrollTop,P=document.getElementById("parallax-bg-image"),M=P.getBoundingClientRect(),x=Math.round(M.height),V=Math.round(M.top+S),q=V+x,z=function(){S=document.documentElement.scrollTop||document.body.scrollTop,_<S&&S<q&&(P.style.backgroundPositionY="".concat(120*(S-_)/B,"%"))},H=function(){N=Math.max(document.documentElement.clientHeight,window.innerHeight||0),B=q-(_=V-N),window.removeEventListener("scroll",z),window.addEventListener("scroll",z),z()};window.addEventListener("load",H),window.addEventListener("resize",H)}();