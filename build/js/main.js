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

  var navLinks = document.querySelectorAll('[data-js=\'nav\']');

  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var clickTarget = e.target;

      if (clickTarget.tagName != 'A') return;

      var linkTarget = clickTarget.getAttribute('href');

      smoothScroll(linkTarget, 1000);
    })
  });

  var tabs = function (tabsContainer){
    var tabsNav = document.querySelector(tabsContainer + ' *[data-js=\'tabsNav\']');
    console.log(tabsNav);

    tabsNav.addEventListener('click', function(e) {
      e.preventDefault();

      var clickTarget = e.target;

      if (clickTarget.dataset.js != 'tabsSwitcher') return;
      if (clickTarget.classList.contains('active')) return;

      var activeSwitcher = tabsNav.querySelector('.active');

      if (activeSwitcher) {
        var activeTab = document.getElementById(activeSwitcher.dataset.targetId);
        activeSwitcher.classList.remove('active');
        activeTab.classList.remove('active');
      }

      clickTarget.classList.add('active');
      var target = document.getElementById(clickTarget.dataset.targetId);

      target.classList.add('active');

    })


  }

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

  //форма
  var form = document.querySelector(".request-form");
  var telInput = document.querySelector("input[type=\"tel\"]");
  var errorMsg = document.querySelector(".request-form__error-notice");

  var telValidation = function() {
    var errorStatus = -1;

    if (telInput.value.search((/[^\+?\d]/g)) === -1) {
      errorStatus = 1;
    }
    return errorStatus;

  };

  var showValidErrorMsg = function () {

    telInput.classList.add("request-form__field--error");
    errorMsg.classList.add("request-form__error-notice--visible");

  }

  var sendData = function () {
    var request = new XMLHttpRequest();
    request.open("POST", "https://echo.htmlacademy.ru");
    request.send(new FormData(form));

    request.onload = request.onerror = function() {
      if (this.status == 200) {
        alert( "Ваша заявка принята!" );
      } else {
        alert( "Произошла ошибка при загрузке данных. Пожалуйста, обновите страницу!" );
      }
    };

  }


  telInput.addEventListener("keyup", function(){
    if (telInput.classList.contains("request-form__field--error")) {
      telInput.classList.remove("request-form__field--error");
      errorMsg.classList.remove("request-form__error-notice--visible");
    }
  });


  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(telValidation());
    (telValidation() === 1) ? sendData() : showValidErrorMsg();
  });


  //видео
  var createYTPlayer = function(){
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;

    onYouTubeIframeAPIReady = function () {
        player = new YT.Player("player", {
            height: "100%",
            width: "100%",
            videoId: "0QUDap93rjM",
            playerVars: {
                "autoplay": 0,
                "rel": 0,
                "showinfo": 0
            },
            events: {
              "onReady": onPlayerReady,
            }
        });
    }

    function onPlayerReady(event) {
      event.target.playVideo();
    }
  }

  var playButton = document.querySelector(".video__btn");
  var videoCover = document.querySelector(".video__cover");

  playButton.addEventListener("click", function(e) {
    e.preventDefault();
    createYTPlayer();
    playButton.hidden = true;
    videoCover.hidden = true;

   })


   //lazy-load
   document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll(".lazy > source"));
    var active = false;

    var lazyLoad = function() {
      if (active === false) {
        active = true;

        setTimeout(function() {
          lazyImages.forEach(function(lazyImage) {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
              lazyImage.srcset = lazyImage.dataset.srcset;
              lazyImage.nextElementSibling.src = lazyImage.nextElementSibling.dataset.src;
              lazyImage.nextElementSibling.srcset = lazyImage.nextElementSibling.dataset.srcset;
              lazyImage.parentElement.classList.remove("lazy");

              lazyImages = lazyImages.filter(function(image) {
                return image !== lazyImage;
              });

              if (lazyImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationchange", lazyLoad);
              }
            }
          });

          active = false;
        }, 200);
      }
    };

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
  });


  tabs('.memberships-tabs');

})();
