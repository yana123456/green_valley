$(document).ready (function(){
  var $form = $('#reservations-form');
  var $dateArrive = $('#date-picker__arrive-day');
  var $monthArrive = $('#date-picker__arrive-month');
  var $yearArrive = $('#date-picker__arrive-year');
  var $dateLeave = $('#date-picker__leave-day');
  var $monthLeave = $('#date-picker__leave-month');
  var $yearLeave = $('#date-picker__leave-year');
  var $name = $('#personal-info__name');
  var $lastName = $('#personal-info__lastname');
  var $phone = $('#personal-info__phone');
  var $email = $('#personal-info__email');
  var $result = $('#result');
  var $paymentRef = $('#payment-now');
  var $bankCard = $('#payment__number');
  var $personName = $('#payment__owner');
  var $cvv =  $('#payment__cvv');
  var $valid = $('#payment__valid');

  var error = {
    link: $result.find('.result__link'),
    value: false,
    href: '',
    message: ''
  };

  var day = /\d{2}/;
  var month = /\d{2}/;
  var year = /\d{4}/;
  var letters = /^[a-zа-яё]+$/i;
  var number = /^[\d-\s]{6,}$/i;
  var email = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
  var cardNum = /^[0-9]{4}(-[0-9]{4}){3}$/;
  var name = /^[a-zа-яё]+\s[a-zа-яё]+$/i;
  var cvv = /^\d{3}$/i;
  var valid = /^[0-9]{1,2}\s?\/\s?[0-9]{4}$/;


  $name.on('blur', function () {
    checkForm(letters, this, true);
  });

  $lastName.on('blur', function () {
    checkForm(letters, this, true);
  });

  $phone.on('blur', function () {
    checkForm(number, this, true);
  });

  $email.on('blur', function () {
    checkForm(email, this, true);
  });

  $bankCard.on('blur', function() {
    if ($paymentRef.is(':checked')) {
      checkForm(cardNum, this, true);
    }
  });

  $personName.on('blur', function() {
    if ($paymentRef.is(':checked')) {
      checkForm(name, this, true);
    }
  });

  $cvv.on('blur', function() {
    if ($paymentRef.is(':checked')) {
      checkForm(cvv, this, true);
    }
  });

  $valid.on('blur', function() {
    if ($paymentRef.is(':checked')) {
      checkForm(valid, this, true);
    }
  });


  $result.on('check', function(){
    var formList = [
      $dateArrive,
      $monthArrive,
      $yearArrive,
      $dateLeave,
      $monthLeave,
      $yearLeave,
      $name,
      $lastName,
      $phone,
      $email
    ];
    var rule = [
      day,
      month,
      year,
      day,
      month,
      year,
      letters,
      letters,
      number,
      email
    ];
    var messageList = [
      "выберете дату,",
      "выберете месяц,",
      "выберете год,",
      "выберете дату,",
      "выберете месяц,",
      "выберете год,",
      "введите имя,",
      "введите фамилию,",
      "введите телефонный номер,",
      "введите email,"
    ];

    for (var i = 0; i < formList.length; i++) {
      if (formList[i].val() === '') {
        error.value = true;
        error.href = formList[i];
        error.message = messageList[i];
        break;
      }
      else if (!checkForm(rule[i], formList[i], false)){
        error.value = true;
        error.href = formList[i];
        error.message = messageList[i];
        break;
      }
      else {
        error.value = false;
      }
    }

    if (error.value == true) {
      error.link.text(error.message);
      error.link.attr('href', "#" + error.href.attr('id'));
      $result.find('.result__price').text('-');
      $result.find('.result__help').show();

    }
    else {
      $result.find('.result__price').text(payment());
      $result.find('.result__help').hide();
    }

    if ($paymentRef.is(':checked')) {

      formList = [
        $bankCard,
        $personName,
        $cvv,
        $valid
      ];
      rule = [
        cardNum,
        name,
        cvv,
        valid
      ];
      messageList = [
        "введите номер карты,",
        "введите владельца карты,",
        "введите cvv,",
        "введите годен до,"
      ];

      for (var i = 0; i < formList.length; i++) {
        if (formList[i].val() === '') {
          error.value = true;
          error.href = formList[i];
          error.message = messageList[i];
          break;
        }
        else if (!checkForm(rule[i], formList[i], false)){
          error.value = true;
          error.href = formList[i];
          error.message = messageList[i];
          break;
        }
        else {
          error.value = false;
        }
      }

      if (error.value == true) {
        error.link.text(error.message);
        error.link.attr('href', "#" + error.href.attr('id'));
        $result.find('.result__price').text('-');
        $result.find('.result__help').show();

      }
      else {
        $result.find('.result__price').text(payment());
        $result.find('.result__help').hide();
      }
    }
    else {
      $bankCard.val('').parent().find('.icon').hide();
      $personName.val('').parent().find('.icon').hide();
      $cvv.val('').parent().find('.icon').hide();
      $valid.val('').parent().find('.icon').hide();
    }

  });

  setInterval(validate, 1000);

  error.link.on('click', function(event){
    event.preventDefault();
    var position = $('body').find(error.link.attr('href')).offset().top;
    $('body').animate({scrollTop: position - 50}, 500);
  });

  $form.submit( function(e) {
    if (error.value) {
      e.preventDefault();
      $result.find('.result__help').addClass('tada');

      setTimeout(function () {
        $result.find('.result__help').removeClass('tada');
      }, 1000);
    }
  });

  // Проверка формы
  function checkForm(pattern, element, icon) {
    var str = $(element).val();
    if (pattern.test(str)) {
      if (icon) $(element).parent().find('.icon--close').hide().end().find('.icon--check').fadeIn();
      return true;
    }
    else {
      if (icon) $(element).parent().find('.icon--check').hide().end().find('.icon--close').fadeIn();
      return false;
    }
  }

  // Расчет суммы
  function payment() {
    return 14000;
  }

  function validate() {
    $result.trigger('check');
  }

});