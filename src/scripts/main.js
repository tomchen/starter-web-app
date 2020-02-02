(function(){



  // --css-var polyfill
  if (!(window.CSS && window.CSS.supports && window.CSS.supports('--fake-css-var', 0))) {// support --css-var
    document.write('<script src=\'css-vars-ponyfill.min.js\'><\/script>');
  }



  if (!!('ontouchstart' in window) || !!('msmaxtouchpoints' in window.navigator)) {
    document.body.className += ' touchdevice';
  }


  // banner toggle button
  var btb = document.createElement('a');
  btb.id = 'banner-toggle-button';
  var he = document.getElementsByTagName('header')[0];
  he.parentNode.insertBefore(btb, he);
  btb.addEventListener('click', function(e){
    e.preventDefault();
    if (window.getComputedStyle(document.querySelector('header.banner')).display == 'none') {
      document.body.className += ' show-menu';
    } else {
      document.body.className = document.body.className.replace(/\bshow-menu\b/g, '');
    }
  });


  //pop up window
  var to;
  var to2;

  var clickEventListener = function(e){
    e.preventDefault();
    closePopup();
  };

  var closePopup = function() {
    document.body.removeEventListener('click', clickEventListener);
    window.clearTimeout(to);
    an.className = 'display-shown';
    to2 = window.setTimeout(function() {
      an.className = '';
      an.innerHTML = '';
    }, 800);
  };

  var an = document.createElement('div');

  an.id = 'alert-notice';
  document.body.appendChild(an);

  function popup(text) {
    an.innerHTML = '<span>' + text + '</span>';
    an.className = 'display-shown shown';
    window.clearTimeout(to);
    window.clearTimeout(to2);
    document.body.removeEventListener('click', clickEventListener);
    to = window.setTimeout(closePopup, 3500);
    window.setTimeout(function() {
      document.body.addEventListener('click', clickEventListener);
    }, 100);
  }


  //ajax submit
  document.getElementById('submit-button').addEventListener('click', function(e){
    e.preventDefault();
    var name       = document.getElementById('name').value.trim();
    var company    = document.getElementById('company').value.trim();
    var profession = document.getElementById('profession').value.trim();
    var tel        = document.getElementById('tel').value.replace(/ /g, '').trim();
    var email      = document.getElementById('email').value.trim();
    if (!name) {
      popup('Veuillez saisir votre nom. Merci.');
      return;
    }
    if (!company) {
      popup('Veuillez saisir votre entreprise. Merci.');
      return;
    }
    if (!tel) {
      popup('Veuillez saisir votre numéro de téléphone. Merci.');
      return;
    }
    if (!/^[\d-\.\(\)]+$/g.test(tel)) {
      popup('Veuillez saisir un numéro de téléphone correct. Merci.');
      return;
    }
    if (!email) {
      popup('Veuillez saisir votre adresse e-mail. Merci.');
      return;
    }
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(email)) {
      popup('Veuillez saisir une adresse e-mail correcte (pas de charactère spéciale pour le nom de domaine). Merci.');
      return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'reg.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status !== 200) {
        popup('Demande échoué. Statut de retour de ' + xhr.status);
      } else {
        popup(xhr.responseText);
      }
    };
    xhr.send(encodeURI('name=' + name + '&company=' + company + '&profession=' + profession + '&tel=' + tel + '&email=' + email));
  });


  //progress bar
  var progressRing = function(containerElement, radius, strokeWidth, imageSize) {

    var circumference = 2 * Math.PI * radius;

    var xmlns = 'http://www.w3.org/2000/svg';

    var progressMaxEl = document.createElementNS(xmlns, 'circle');
    progressMaxEl.setAttribute('class', 'progress-max');
    progressMaxEl.setAttribute('r', radius);
    progressMaxEl.setAttribute('cx', imageSize / 2);
    progressMaxEl.setAttribute('cy', imageSize / 2);
    progressMaxEl.setAttribute('stroke-width', strokeWidth);

    var progressValueEl = document.createElementNS(xmlns, 'circle');
    progressValueEl.setAttribute('class', 'progress-value');
    progressValueEl.setAttribute('r', radius);
    progressValueEl.setAttribute('cx', imageSize / 2);
    progressValueEl.setAttribute('cy', imageSize / 2);
    progressValueEl.setAttribute('stroke-width', strokeWidth);
    progressValueEl.setAttribute('stroke-dasharray', circumference);

    var svgEl = document.createElementNS(xmlns, 'svg');
    svgEl.setAttribute('class', 'progress-svg');
    svgEl.setAttribute('width', imageSize);
    svgEl.setAttribute('height', imageSize);
    svgEl.setAttribute('viewBox', '0 0 '+ imageSize + ' ' + imageSize);

    var readPctContainerEl = document.createElement('div');
    readPctContainerEl.className = 'read-text-container';
    var readPctEl = document.createElement('span');
    readPctEl.className = 'read-percentage';
    var readTextEl = document.createElement('span');
    readTextEl.className = 'read-text';
    readTextEl.innerHTML = 'lu';

    readPctContainerEl.appendChild(readPctEl);
    readPctContainerEl.appendChild(readTextEl);

    svgEl.appendChild(progressMaxEl);
    svgEl.appendChild(progressValueEl);

    containerElement.appendChild(svgEl);
    containerElement.appendChild(readPctContainerEl);

    this.setProgress = function(percentage) {
      var dashoffset = circumference * (1 - percentage / 100);
      progressValueEl.style.strokeDashoffset = dashoffset;
      readPctEl.innerHTML = percentage + '%';
    }
  }

  var containerEl = document.getElementById('read-container');
  var progressRingEl = new progressRing(containerEl, 54, 12, 120);

  // var footerEl = document.querySelector("footer"),
  // 	d = document.documentElement,//others
  // 	b = document.body,//Edge
  // 	curScrPctDenom = (d.scrollHeight - footerEl.scrollHeight - d.clientHeight) / 100,
  // 	curScrPct,
  // 	setCurrentProgress = function() {
  // 		curScrPct = (d.scrollTop || b.scrollTop) / curScrPctDenom;//this is the scroll percentage WITHOUT FOOTER!
  // 		if (curScrPct >= 100) {
  // 			curScrPct = 100;
  // 		} else {
  // 			curScrPct = Math.floor(curScrPct);
  // 		}
  // 		progressRingEl.setProgress(curScrPct);
  // 	};
  var	d = document.documentElement,//others
    b = document.body,//Edge
    curScrPctDenom = (d.scrollHeight - d.clientHeight - 1) / 100,
    curScrPct,
    setCurrentProgress = function() {
      curScrPct = (d.scrollTop || b.scrollTop) / curScrPctDenom;
      if (curScrPct >= 100) {
        curScrPct = 100;
      } else {
        curScrPct = Math.floor(curScrPct);
      }
      progressRingEl.setProgress(curScrPct);
    };
  window.addEventListener('scroll', setCurrentProgress);
  window.addEventListener('resize', setCurrentProgress);
  setCurrentProgress();


  //Cursor Position Effect

  var curpose1 = document.createElement('div');
  var curpose2 = document.createElement('div');
  var curpose3 = document.createElement('div');
  var curpose = document.getElementById('curpose');
  curpose1.className = 'curpose-layer curpose-animated-1';
  curpose2.className = 'curpose-layer curpose-animated-2';
  curpose3.className = 'curpose-layer curpose-animated-3';
  curpose.appendChild(curpose1);
  curpose.appendChild(curpose2);
  curpose.appendChild(curpose3);

    var rAF =
      window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function( callback ){
        window.setTimeout(callback, 16);
      };

    var el = document.querySelector('.curpose-container');
    var styles = window.getComputedStyle(el);
    var elWidth = parseFloat(styles.width);
    var elHeight = parseFloat(styles.height);
    var layer1 = document.querySelector('.curpose-animated-1');
    var layer2 = document.querySelector('.curpose-animated-2');
    var layer3 = document.querySelector('.curpose-animated-3');

    el.addEventListener('mousemove', function(e){

      rAF(function(){
        // -100 mousePos coef + 50 + 50 coef, mousePos = mouseEvent.pagePos / elSize
        // coef = 2
        layer1.style.backgroundPositionX = (150 - e.pageX / elWidth * 200).toFixed(1) + '%';
        // coef = 1
        layer2.style.backgroundPositionX = (100 - e.pageX / elWidth * 100).toFixed(1) + '%';
        // coef = 0.5
        layer3.style.backgroundPositionX = (75 - e.pageX / elWidth * 50).toFixed(1) + '%';
      });

    });



  // carousel

  var forEach = function(obj, callBack) { // Array or NodeList or Object's forEach. obj can be undefined where the function returns false
    if (Array.isArray(obj) || NodeList.prototype.isPrototypeOf(obj)) { // is Array or NodeList
      return Array.prototype.some.call(obj, callBack); // callBack(currentValue, index, array); return truthy value to break forEach
    } else { // assumed to be Object {}
      for (var property in obj) {
        if (obj.hasOwnProperty(property)){
          if (callBack(obj[property], property, obj)) {
            return true;
          }
        }
      }
    }
    return false;
  }; // return true once broken; if never broken, return false


  var goToSlideNumber = function(slideWrapperEl, number) {
    slideWrapperEl.dataset.slide = number;
  };
  var goToNextSlide = function(slideWrapperEl) {
    var length = slideWrapperEl.getElementsByClassName('slide-c').length;
    slideWrapperEl.dataset.slide = slideWrapperEl.dataset.slide == length ? 1 : parseInt(slideWrapperEl.dataset.slide) + 1 ;
  };
  var goToPrevSlide = function(slideWrapperEl) {
    var length = slideWrapperEl.getElementsByClassName('slide-c').length;
    slideWrapperEl.dataset.slide = slideWrapperEl.dataset.slide == 1 ? length : parseInt(slideWrapperEl.dataset.slide) - 1 ;
  };
  var setTimer = function(slideWrapperEl, interval){
    return window.setInterval(function() {
      goToNextSlide(slideWrapperEl); // got to next slide
    }, interval);
  }
  var interval = 2000;
  forEach(document.querySelectorAll('.slide-viewport'), function(curSlideViewportEl, index){
    var slideWrapperEl = curSlideViewportEl.getElementsByClassName('slide-wrapper')[0];
    var slideContainerEls = slideWrapperEl.getElementsByClassName('slide-c');
    var timer = setTimer(slideWrapperEl, interval);
    curSlideViewportEl.addEventListener('mouseover', function(){
      window.clearInterval(timer);
    });
    curSlideViewportEl.addEventListener('mouseout', function(){
      timer = setTimer(slideWrapperEl, interval);
    });
    curSlideViewportEl.getElementsByClassName('slide-button-prev')[0].addEventListener('click', function(e){
      e.preventDefault();
      goToPrevSlide(slideWrapperEl);
    });
    curSlideViewportEl.getElementsByClassName('slide-button-next')[0].addEventListener('click', function(e){
      e.preventDefault();
      goToNextSlide(slideWrapperEl);
    });
    forEach(curSlideViewportEl.getElementsByClassName('slide-button-goto'), function(curButtonGoTo){
      curButtonGoTo.addEventListener('click', function(e){
        e.preventDefault();
        goToSlideNumber(slideWrapperEl, curButtonGoTo.dataset.toslide);
      });
    });
  });


  //parallax

  var curScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var parallaxBgImageEl = document.getElementById('parallax-bg-image');
  var parallaxBgImageBcrs = parallaxBgImageEl.getBoundingClientRect();
  var parallaxBgImageHeight = Math.round(parallaxBgImageBcrs.height);
  var parallaxBgImageTop = Math.round(parallaxBgImageBcrs.top + curScrollTop);
  var browserViewportHeight;
  var startTop;
  var endTop = parallaxBgImageTop + parallaxBgImageHeight;
  var sizeTop;

  var parallaxScrollFunc = function(){
    curScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (curScrollTop > startTop && curScrollTop < endTop) {
      parallaxBgImageEl.style.backgroundPositionY = (curScrollTop - startTop) * 120 / sizeTop + '%';
    }
  };

  var initParallax = function(){
    browserViewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    startTop = parallaxBgImageTop - browserViewportHeight;
    sizeTop = endTop - startTop;
    window.removeEventListener('scroll', parallaxScrollFunc);
    window.addEventListener('scroll', parallaxScrollFunc);
    parallaxScrollFunc();
  };
  window.addEventListener('load', initParallax);
  window.addEventListener('resize', initParallax);

}());
