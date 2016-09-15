$(document).ready(function(){
  var $window = $(window);
  var $body = $('body');
  var $menu = $('.main-nav__list');
  var $btn = $('.main-nav__toggler');

  $btn.click(function () {
    $menu.slideToggle();
    $btn.toggleClass("toggler-burger--open");
  });

  $window.resize(function() {
    $body.css('overflow', 'hidden');
    if ($window.width() > 992) {
      $menu.removeAttr("style");
    }
    $body.css('overflow', 'auto');
  });
});