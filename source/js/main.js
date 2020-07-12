(function() {
  var coachesSlider = new Swiper('.coaches-slider__container', {
    slideClass: 'coaches-slider__slide',
    wrapperClass: 'coaches-slider__wrapper',
    speed: 400,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    breakpoints: {
      767: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30
      },
      1199: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 40
      }
    },
    navigation: {
      nextEl: '.coaches-slider__ctrl--next',
      prevEl: '.coaches-slider__ctrl--prev',
    },
  });

  var testimonialsSlider = new Swiper('.testimonials-slider__container', {
    slideClass: 'testimonials-slider__slide',
    wrapperClass: 'testimonials-slider__wrapper',
    speed: 400,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.testimonials-slider__ctrl--next',
      prevEl: '.testimonials-slider__ctrl--prev',
    },
  });

  function smoothScroll(target, duration) {

    var target = document.querySelector(target);

    var targetPos = target.getBoundingClientRect().top;
    var startPos = window.pageYOffset;
    var distance = targetPos - startPos;
    var startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      var timeElapsed = currentTime - startTime;

      var run = ease(timeElapsed, startPos, targetPos, duration);
      window.scrollTo(0, run);
      if(timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  var navLinks = document.querySelectorAll('[data-js=\'nav\']');

  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var clickTarget = e.target

      if (clickTarget.tagName != "A") return;

      var linkTarget = clickTarget.getAttribute('href');

      smoothScroll(linkTarget, 1000);
    })
  });

})();
