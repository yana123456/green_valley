$(document).ready(function(){
  var $currentDate = new Date();

  //----------------------------------------
  // Работа с датой заезда
  //----------------------------------------
  var $containerArrive = $('#date-arrive');
  var $arriveDay = $('#date-picker__arrive-day');
  var $arriveMonth = $('#date-picker__arrive-month');
  var $arriveYear = $('#date-picker__arrive-year');

  if ($containerArrive.length == 0) return;


  // Создать календарь для даты заезда
  var $dateArrive = $containerArrive.pickadate({
    today: false,
    clear: false,
    close: false,

    labelMonthNext: 'Следующий месяц',
    labelMonthPrev: 'Предыдущий месяц',

    format: 'dd/mm/yyyy',

    min: $currentDate,
    max: 180,

    container: '#date-arrive'
  });


  var dateArrivePicker = $dateArrive.pickadate('picker');

  // Скрыть календарь при нажатии вне его поля
  $(document).on('click', function () {
    dateArrivePicker.close();
  });

  // Вызвать календарь по нажатию на любое из 3х полей
  $arriveDay.on('click', function(event){
    arriveOpen(event);
  });

  $arriveMonth.on('click', function(event){
    arriveOpen(event);
  });

  $arriveYear.on('click', function(event){
    arriveOpen(event);
  });

  function arriveOpen(event) {
    event.stopPropagation();
    dateArrivePicker.open(false);
    dateLeavePicker.close();
  }

  // При выборе даты записать ее в нужные поля
  dateArrivePicker.on('render', function () {
    var arriveDate = dateArrivePicker.get();
    var leaveDate = dateLeavePicker.get();

    var arriveArray = arriveDate.split('/');
    var leaveArray = leaveDate.split('/');

    if (!arriveDate) return;

    $arriveDay.val(arriveArray[0]);
    $arriveMonth.val(arriveArray[1]);
    $arriveYear.val(arriveArray[2]);

    dateLeavePicker.set('min', arriveDate);
    if ((!!leaveDate) && (leaveArray[2] <= arriveArray[2]) && (leaveArray[1] <= arriveArray[1]) && (leaveArray[0] <= arriveArray[0])) {
      dateLeavePicker.set('select', arriveDate);
    }

  });

  //----------------------------------------
  // Работа с датой выезда
  //----------------------------------------
  var $containerLeave = $('#date-leave');
  var $leaveDay = $('#date-picker__leave-day');
  var $leaveMonth = $('#date-picker__leave-month');
  var $leaveYear = $('#date-picker__leave-year');

  // Создать календарь для даты заезда
  var $dateLeave = $containerLeave.pickadate({
    today: false,
    clear: false,
    close: false,

    labelMonthNext: 'Следующий месяц',
    labelMonthPrev: 'Предыдущий месяц',

    format: 'dd/mm/yyyy',

    min: $currentDate,
    max: 200,

    container: '#date-leave'
  });

  var leaveDate;
  var dateLeavePicker = $dateLeave.pickadate('picker');

  // Скрыть календарь при нажатии вне его поля
  $(document).on('click', function () {
    dateLeavePicker.close();
  });

  // Вызвать календарь по нажатию на любое из 3х полей
  $leaveDay.on('click', function(event){
    leaveOpen(event);
  });

  $leaveMonth.on('click', function(event){
    leaveOpen(event);
  });

  $leaveYear.on('click', function(event){
    leaveOpen(event);
  });

  function leaveOpen(event) {
    event.stopPropagation();
    dateLeavePicker.open(false);
    dateArrivePicker.close();
  }

  // При выборе даты записать ее в нужные поля
  dateLeavePicker.on('render', function () {
    leaveDate = dateLeavePicker.get();
    var dateArray = leaveDate.split('/');
    if (!leaveDate) return;

    $leaveDay.val(dateArray[0]);
    $leaveMonth.val(dateArray[1]);
    $leaveYear.val(dateArray[2]);
  })


});