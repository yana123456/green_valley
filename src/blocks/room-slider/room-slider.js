$(document).ready(function () {
  $owl = $('#room-slider');
  $left = $owl.parent().find('.room-slider__left');
  $right = $owl.parent().find('.room-slider__right');
  $popup = $owl.parent().find('.room-slider__popup');


  $owl.owlCarousel({
    items: 1,
    loop: true,
    dots: false
  });

  $owl.magnificPopup({
    type: 'image',
    delegate: 'picture',
    gallery:{
      enabled:true,
      navigateByImgClick: false
    }
  });

  $owl.on('click', function (e) {
    e.preventDefault();
  });

  $left.on('click', function(){
    $owl.trigger('prev.owl.carousel');
  });

  $right.on('click', function(){
    $owl.trigger('next.owl.carousel');
  });

  $popup.on('click', function () {
    $owl.magnificPopup('open');
  });

});