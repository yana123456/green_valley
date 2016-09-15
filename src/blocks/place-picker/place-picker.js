$(document).ready(function(){
  //var $container = $('#place-picker');
  //var $checkbox = $container.find('.place-picker__item');
  //var $icon = $container.find('.place-picker__icon');
  //
  //$checkbox.filter(':checked').siblings('.place-picker__icon').css('opacity', '1');
  //
  //$icon.on('click', function(){
  //
  //});


  var $window = $(window);
  var $body = $('body');
  var $container = $('#place-picker');
  var $tabs = $container.find('input[type=radio]');
  var $toggles = $('#reservations__step-three').find('.reservations__inner');
  var position;

  showActive();

  $tabs.on('click', function(){
    showActive();
  });

  $window.on('resize', function () {
    showActive()
  });

  function showActive() {

    $body.css('hidden','overflow');

    $toggles.hide();
    position = $tabs.filter(':checked').parent().data('tabs');
    $toggles.eq(position - 1).fadeIn();
    $tabs.parent().removeClass('place-picker--active').eq(position - 1).addClass('place-picker--active');

    $body.css('hidden','auto');
  }

});