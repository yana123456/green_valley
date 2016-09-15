$(document).ready(function(){
  var $window = $(window);
  var $body = $('body');
  var $hotel = $('#hotel-picker');
  var $cottage = $('#cottage-picker');
  var $tabHotel = $hotel.find('input[type=radio]');
  var $tabCottage = $cottage.find('input[type=radio]');
  var $toggleHottel = $('#hotel-description').find('.hotel-description');
  var $toggleCottage = $('#cottage-description').find('.hotel-description');
  var position;

  showActive($tabHotel, $toggleHottel);
  showActive($tabCottage, $toggleCottage);

  $tabHotel.on('click', function(){
    showActive($tabHotel, $toggleHottel);
  });

  $tabCottage.on('click', function(){
    showActive($tabCottage, $toggleCottage);
  });


  $window.on('resize', function () {
    showActive($tabHotel, $toggleHottel);
    showActive($tabCottage, $toggleCottage);
  });

  function showActive(tab, item) {

    $body.css('hidden','overflow');

    item.hide();
    position = tab.filter(':checked').parent().data('tabs');

    if ($window.width() >= 768) {
      item.eq(position - 1).fadeIn();
    }

    tab.parent().removeClass('hotel-picker--active').eq(position - 1).addClass('hotel-picker--active');

    $body.css('hidden','auto');
  }
});
