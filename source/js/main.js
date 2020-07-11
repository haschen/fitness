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
})();
