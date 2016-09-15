$(document).ready(function () {
  var $window = $(window);
  var $body = $('body');
  var $container = $('#reviews');
  var $owl = $('#review-slider');
  var $slides = $owl.find('.review-slider__item');
  var $leftOwl = $container.find('.reviews__left');
  var $rightOwl = $container.find('.reviews__right');
  var $openBtn = $container.find('.reviews__btn');
  var $closeBtn = $container.find('.reviews__btn-close');


  $body.css('overflow', 'hidden');
  if ($window.width() >= 1200) {
    initCarousel($owl);
  }
  else if ($window.width() >= 768){
    $slides.eq(1).addClass('review-slider__item--active');
  }
  $body.css('overflow', 'auto');
  

  $window.resize(function() {
    $body.css('overflow', 'hidden');

    if ($openBtn.is(':visible')) {
      $slides.removeAttr('style');
    }

    $leftOwl.removeAttr('style');
    $rightOwl.removeAttr('style');

    if ($window.width() >= 1200) {
      initCarousel($owl);
    }
    else if ($window.width() >= 768) {
      destroy($owl);
      $slides.eq(1).addClass('review-slider__item--active');
    }
    else if ($window.width() > 0) {
      destroy($owl);
      if ($openBtn.is(':visible')) {
        $slides.eq(1).removeClass('review-slider__item--active');
      }
    }
    $body.css('overflow', 'auto');
  });

  $openBtn.on('click', function (e) {
    e.preventDefault();

    $body.css('overflow', 'hidden');
    if ($window.width() >= 1200) {
      destroy($owl);
      $slides.hide();
      $leftOwl.hide();
      $rightOwl.hide();
      var i = 0;
      var timer = setInterval(function() {
        $slides.eq(i).fadeIn();
        i++;
      }, 300);
      setTimeout(function(){
        clearInterval(timer)
      }, 5000);
    }
    else if ($window.width() >= 768) {
      $slides.not(':lt(2)').slideDown().addClass('review-slider__item--active');
    }
    else if ($window.width() >= 0) {
      $slides.not(':lt(1)').slideDown().addClass('review-slider__item--active');
    }
    $body.css('overflow', 'auto');

    $(this).hide();
    $closeBtn.show();

  });

  $closeBtn.hide();

  $closeBtn.on('click', function (e) {
    e.preventDefault();

    $body.css('overflow', 'hidden');
    if ($window.width() >= 1200) {
      initCarousel($owl);
      $leftOwl.show();
      $rightOwl.show();
      $window.scrollTop($container.position().top);
    }
    else if ($window.width() >= 768) {
      $slides.not(':lt(2)').slideUp().removeClass('review-slider__item--active');
    }
    else if ($window.width() >= 0) {
      $slides.not(':lt(1)').slideUp().removeClass('review-slider__item--active');
    }
    $body.css('overflow', 'auto');

    $(this).hide();
    $openBtn.show();

  });

  $leftOwl.on('click', function (event) {
    event.preventDefault();
    $owl.trigger('prev.owl.carousel');
  });

  $rightOwl.on('click', function (event) {
    event.preventDefault();
    $owl.trigger('next.owl.carousel');
  });

  function destroy(carouselItem){
    carouselItem.trigger('destroy.owl.carousel')
  }

  function initCarousel(carouselItem) {
    carouselItem.owlCarousel({
      items: 2,
      loop: true,
      dots: false,
      margin: 20,
      smartSpeed: 200,
      fluidSpeed: 200,
      navSpeed: 0,
      slideBy: 2
    });
  }
});