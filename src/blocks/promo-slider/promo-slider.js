$(document).ready(function(){
  var $container = $('#promo-slider');
  var $tabs = $container.find('[data-tab=tabs]');
  var $tab = $tabs.children();
  var $toggles = $container.find('[data-toggle=toggler]');
  var $toggle = $toggles.children();
  var position;

  $toggle.hide();
  position = $tab.has('[class$=--active]').data('tab');
  $toggle.filter('[data-toggle=' + position + ']').show();

  $tab.on('click', function(event){
    event.preventDefault();
    $tab.removeClass('promo-slider__tab--active')
        .children().removeClass('promo-slider__link--active');

    $(this).addClass('promo-slider__tab--active')
           .children().addClass('promo-slider__link--active');

    showActive();
  });


  function showActive() {
    $toggle.hide();
    position = $tab.has('[class$=--active]').data('tab');
    $toggle.filter('[data-toggle=' + position + ']').fadeIn();
  }


});
