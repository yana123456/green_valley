$(document).ready(function(){
  var $window = $(window);
  var $body = $('body');
  var $owl = $('#place-carousel');
  var $slides = $owl.find('.place');

  carousel();

  $window.on('resize', function(){
    carousel();
  });



  function carousel () {
    var $width;
    $width = $window.width();

    $body.css("overflow", "hidden");

    if ($width >= 0 && $width < 768 ) {
      $owl.trigger('destroy.owl.carousel');
      $slides.filter(':last').removeClass('place--active');
    }
    else if ($width >= 768 && $width < 992) {
      $owl.owlCarousel({
        items: 2,
        margin: 20
      });
      $slides.addClass('place--active');
    }
    else if ($width >= 992) {
      $owl.trigger('destroy.owl.carousel');
      $slides.addClass('place--active');
    }

      $body.css("overflow", "auto");
  }
});
