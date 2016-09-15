$(document).ready(function(){
  var $payment = $('#payment');
  var $tab= $payment.find('input[type=radio]');

  $payment.children().on('click', function(){
    $tab.prev().removeClass('payment__tab--active');
    $tab.filter(':checked').prev().addClass('payment__tab--active');
  });

});
