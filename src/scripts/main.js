(() => {
  // // --css-var polyfill
  // if (
  //   !(
  //     window.CSS &&
  //     window.CSS.supports &&
  //     window.CSS.supports('--fake-css-var', 0)
  //   )
  // ) {
  //   // support --css-var
  //   document.write("<script src='css-vars-ponyfill.min.js'></script>")
  // }

  if (
    !!('ontouchstart' in window) ||
    !!('msmaxtouchpoints' in window.navigator)
  ) {
    document.body.classList.add('touchdevice')
  }

  // banner toggle button
  const btb = document.createElement('a')
  btb.id = 'banner-toggle-button'
  const he = document.getElementsByTagName('header')[0]
  he.parentNode.insertBefore(btb, he)
  btb.addEventListener('click', (e) => {
    e.preventDefault()
    if (
      window.getComputedStyle(document.querySelector('header.banner'))
        .display === 'none'
    ) {
      document.body.classList.add('show-menu')
    } else {
      document.body.className = document.body.classList.remove('show-menu')
      // .className.replace(
      //   /\bshow-menu\b/g,
      //   '',
      // )
    }
  })

  // pop up window
  let to
  let to2

  const an = document.createElement('div')

  const clickEventListener = (e) => {
    e.preventDefault()
    // eslint-disable-next-line no-use-before-define
    closePopup()
  }

  const closePopup = () => {
    document.body.removeEventListener('click', clickEventListener)
    window.clearTimeout(to)
    an.className = 'display-shown'
    to2 = window.setTimeout(() => {
      an.className = ''
      an.innerHTML = ''
    }, 800)
  }

  an.id = 'alert-notice'
  document.body.appendChild(an)

  function popup(text) {
    an.innerHTML = `<span>${text}</span>`
    an.className = 'display-shown shown'
    window.clearTimeout(to)
    window.clearTimeout(to2)
    document.body.removeEventListener('click', clickEventListener)
    to = window.setTimeout(closePopup, 3500)
    window.setTimeout(() => {
      document.body.addEventListener('click', clickEventListener)
    }, 100)
  }

  // ajax submit
  document.getElementById('submit-button').addEventListener('click', (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value.trim()
    const company = document.getElementById('company').value.trim()
    const profession = document.getElementById('profession').value.trim()
    const tel = document.getElementById('tel').value.replace(/ /g, '').trim()
    const email = document.getElementById('email').value.trim()
    if (!name) {
      popup('Veuillez saisir votre nom. Merci.')
      return
    }
    if (!company) {
      popup('Veuillez saisir votre entreprise. Merci.')
      return
    }
    if (!tel) {
      popup('Veuillez saisir votre numéro de téléphone. Merci.')
      return
    }
    if (!/^[\d-.()]+$/g.test(tel)) {
      popup('Veuillez saisir un numéro de téléphone correct. Merci.')
      return
    }
    if (!email) {
      popup('Veuillez saisir votre adresse e-mail. Merci.')
      return
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
        email,
      )
    ) {
      popup(
        'Veuillez saisir une adresse e-mail correcte (pas de charactère spéciale pour le nom de domaine). Merci.',
      )
      return
    }
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'reg.php')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onload = () => {
      if (xhr.status !== 200) {
        popup(`Demande échoué. Statut de retour de ${xhr.status}`)
      } else {
        popup(xhr.responseText)
      }
    }
    xhr.send(
      encodeURI(
        `name=${name}&company=${company}&profession=${profession}&tel=${tel}&email=${email}`,
      ),
    )
  })

  // progress bar

  class ProgressRing {

    constructor(
      containerElement,
      radius,
      strokeWidth,
      imageSize,
    ) {
      this.circumference = 2 * Math.PI * radius

      const xmlns = 'http://www.w3.org/2000/svg'

      const progressMaxEl = document.createElementNS(xmlns, 'circle');
      progressMaxEl.setAttribute('class', 'progress-max')
      progressMaxEl.setAttribute('r', radius)
      progressMaxEl.setAttribute('cx', imageSize / 2)
      progressMaxEl.setAttribute('cy', imageSize / 2)
      progressMaxEl.setAttribute('stroke-width', strokeWidth)

      this.progressValueEl = document.createElementNS(xmlns, 'circle')
      this.progressValueEl.setAttribute('class', 'progress-value')
      this.progressValueEl.setAttribute('r', radius)
      this.progressValueEl.setAttribute('cx', imageSize / 2)
      this.progressValueEl.setAttribute('cy', imageSize / 2)
      this.progressValueEl.setAttribute('stroke-width', strokeWidth)
      this.progressValueEl.setAttribute('stroke-dasharray', this.circumference)

      const svgEl = document.createElementNS(xmlns, 'svg');
      svgEl.setAttribute('class', 'progress-svg')
      svgEl.setAttribute('width', imageSize)
      svgEl.setAttribute('height', imageSize)
      svgEl.setAttribute('viewBox', `0 0 ${imageSize} ${imageSize}`)

      const readPctContainerEl = document.createElement('div');
      readPctContainerEl.className = 'read-text-container'
      this.readPctEl = document.createElement('span')
      this.readPctEl.className = 'read-percentage'
      // const readTextEl = document.createElement('span');
      // readTextEl.className = 'read-text'
      // readTextEl.innerHTML = containerElement.dataset.readString

      readPctContainerEl.appendChild(this.readPctEl)
      // readPctContainerEl.appendChild(readTextEl)

      svgEl.appendChild(progressMaxEl)
      svgEl.appendChild(this.progressValueEl)

      containerElement.appendChild(svgEl)
      containerElement.appendChild(readPctContainerEl)
    }

    setProgress(percentage) {
      const dashoffset = this.circumference * (1 - percentage / 100)
      this.progressValueEl.style.strokeDashoffset = dashoffset
      this.readPctEl.innerHTML = `${percentage}%`
    }
  }

  const containerEl = document.getElementById('read-container')
  const progressRingEl = new ProgressRing(containerEl, 54, 12, 120)

  // const footerEl = document.querySelector("footer");
  // // others
  // const d = document.documentElement
  // // Edge
  // const b = document.body
  // const curScrPctDenom = (d.scrollHeight - footerEl.scrollHeight - d.clientHeight) / 100;
  // let curScrPct;
  // const setCurrentProgress = () => {
  //     curScrPct = (d.scrollTop || b.scrollTop) / curScrPctDenom;//this is the scroll percentage WITHOUT FOOTER!
  //     if (curScrPct >= 100) {
  //         curScrPct = 100;
  //     } else {
  //         curScrPct = Math.floor(curScrPct);
  //     }
  //     progressRingEl.setProgress(curScrPct);
  // };

  // others
  const d = document.documentElement

  // Edge
  const b = document.body

  const curScrPctDenom = (d.scrollHeight - d.clientHeight - 1) / 100
  let curScrPct

  const setCurrentProgress = () => {
    curScrPct = (d.scrollTop || b.scrollTop) / curScrPctDenom
    if (curScrPct >= 100) {
      curScrPct = 100
    } else {
      curScrPct = Math.floor(curScrPct)
    }
    progressRingEl.setProgress(curScrPct)
  }

  window.addEventListener('scroll', setCurrentProgress)
  window.addEventListener('resize', setCurrentProgress)
  setCurrentProgress()

  // Cursor Position Effect

  const curpose1 = document.createElement('div')
  const curpose2 = document.createElement('div')
  const curpose3 = document.createElement('div')
  const curpose = document.getElementById('curpose')
  curpose1.className = 'curpose-layer curpose-animated-1'
  curpose2.className = 'curpose-layer curpose-animated-2'
  curpose3.className = 'curpose-layer curpose-animated-3'
  curpose.appendChild(curpose1)
  curpose.appendChild(curpose2)
  curpose.appendChild(curpose3)

  const rAF =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    ((callback) => {
      window.setTimeout(callback, 16)
    })

  const el = document.querySelector('.curpose-container')
  const styles = window.getComputedStyle(el)
  const elWidth = parseFloat(styles.width)
  // const elHeight = parseFloat(styles.height)
  const layer1 = document.querySelector('.curpose-animated-1')
  const layer2 = document.querySelector('.curpose-animated-2')
  const layer3 = document.querySelector('.curpose-animated-3')

  el.addEventListener('mousemove', ({ pageX }) => {
    rAF(() => {
      // -100 mousePos coef + 50 + 50 coef, mousePos = mouseEvent.pagePos / elSize
      // coef = 2
      layer1.style.backgroundPositionX = `${(
        150 -
        (pageX / elWidth) * 200
      ).toFixed(1)}%`
      // coef = 1
      layer2.style.backgroundPositionX = `${(
        100 -
        (pageX / elWidth) * 100
      ).toFixed(1)}%`
      // coef = 0.5
      layer3.style.backgroundPositionX = `${(
        75 -
        (pageX / elWidth) * 50
      ).toFixed(1)}%`
    })
  })

  // carousel

  const forEach = (obj, callBack) => {
    // Array or NodeList or Object's forEach. obj can be undefined where the function returns false
    if (
      Array.isArray(obj) ||
      Object.prototype.isPrototypeOf.call(NodeList.prototype, obj)
    ) {
      // is Array or NodeList
      return Array.prototype.some.call(obj, callBack) // callBack(currentValue, index, array) return truthy value to break forEach
    }
    // assumed to be Object {}
    return Object.entries(obj).some(([property, value]) => {
      if (callBack(value, property, obj)) {
        return true
      }
      return false
    })
  } // return true once broken; if never broken, return false

  const goToSlideNumber = ({ dataset }, number) => {
    // eslint-disable-next-line no-param-reassign
    dataset.slide = number
  }
  const goToNextSlide = (slideWrapperEl) => {
    const {length} = slideWrapperEl.getElementsByClassName('slide-c')
    // eslint-disable-next-line no-param-reassign
    slideWrapperEl.dataset.slide =
      slideWrapperEl.dataset.slide === length
        ? 1
        : parseInt(slideWrapperEl.dataset.slide, 10) + 1
  }
  const goToPrevSlide = (slideWrapperEl) => {
    const {length} = slideWrapperEl.getElementsByClassName('slide-c')
    // eslint-disable-next-line no-param-reassign
    slideWrapperEl.dataset.slide =
      slideWrapperEl.dataset.slide === 1
        ? length
        : parseInt(slideWrapperEl.dataset.slide, 10) - 1
  }
  const setTimer = (slideWrapperEl, interval) =>
    window.setInterval(() => {
      goToNextSlide(slideWrapperEl) // got to next slide
    }, interval)
  const interval = 2000
  forEach(
    document.querySelectorAll('.slide-viewport'),
    (curSlideViewportEl) => {
      const slideWrapperEl = curSlideViewportEl.getElementsByClassName(
        'slide-wrapper',
      )[0]
      // const slideContainerEls = slideWrapperEl.getElementsByClassName('slide-c')
      let timer = setTimer(slideWrapperEl, interval)
      curSlideViewportEl.addEventListener('mouseover', () => {
        window.clearInterval(timer)
      })
      curSlideViewportEl.addEventListener('mouseout', () => {
        timer = setTimer(slideWrapperEl, interval)
      })
      curSlideViewportEl
        .getElementsByClassName('slide-button-prev')[0]
        .addEventListener('click', (e) => {
          e.preventDefault()
          goToPrevSlide(slideWrapperEl)
        })
      curSlideViewportEl
        .getElementsByClassName('slide-button-next')[0]
        .addEventListener('click', (e) => {
          e.preventDefault()
          goToNextSlide(slideWrapperEl)
        })
      forEach(
        curSlideViewportEl.getElementsByClassName('slide-button-goto'),
        (curButtonGoTo) => {
          curButtonGoTo.addEventListener('click', (e) => {
            e.preventDefault()
            goToSlideNumber(slideWrapperEl, curButtonGoTo.dataset.toslide)
          })
        },
      )
    },
  )

  // parallax

  let curScrollTop =
    document.documentElement.scrollTop || document.body.scrollTop
  const parallaxBgImageEl = document.getElementById('parallax-bg-image')
  const parallaxBgImageBcrs = parallaxBgImageEl.getBoundingClientRect()
  const parallaxBgImageHeight = Math.round(parallaxBgImageBcrs.height)
  const parallaxBgImageTop = Math.round(parallaxBgImageBcrs.top + curScrollTop)
  let browserViewportHeight
  let startTop
  const endTop = parallaxBgImageTop + parallaxBgImageHeight
  let sizeTop

  const parallaxScrollFunc = () => {
    curScrollTop = document.documentElement.scrollTop || document.body.scrollTop
    if (curScrollTop > startTop && curScrollTop < endTop) {
      parallaxBgImageEl.style.backgroundPositionY = `${
        ((curScrollTop - startTop) * 120) / sizeTop
      }%`
    }
  }

  const initParallax = () => {
    browserViewportHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0,
    )
    startTop = parallaxBgImageTop - browserViewportHeight
    sizeTop = endTop - startTop
    window.removeEventListener('scroll', parallaxScrollFunc)
    window.addEventListener('scroll', parallaxScrollFunc)
    parallaxScrollFunc()
  }
  window.addEventListener('load', initParallax)
  window.addEventListener('resize', initParallax)

})()
