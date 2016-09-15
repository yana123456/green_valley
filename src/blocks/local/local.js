var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:  60.193, lng: 29.650},
    zoom: 15,
    disableDefaultUI: true
  });

  var marker = new google.maps.Marker({
    position: {lat:  60.192, lng: 29.640},
    map: map,
    title: 'Green Valley'
  });
}
