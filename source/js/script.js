let navMain = document.querySelector('.header-navigation');
let navToggle = document.querySelector('.header-navigation__toggle');

navMain.classList.remove('header-navigation--nojs');
navToggle.classList.remove('header-navigation__toggle--nojs');

navToggle.addEventListener('click', function () {
  if (navToggle.classList.contains('header-navigation__toggle--closed')) {
    navToggle.classList.remove('header-navigation__toggle--closed');
    navToggle.classList.add('header-navigation__toggle--open');
  } else {
    navToggle.classList.add('header-navigation__toggle--closed');
    navToggle.classList.remove('header-navigation__toggle--open');
  }
});

function initMap() {
  // The location of CatEnergy
  var markerPath = "../img/map/marker-mobile@1x.png";
  const positionCat = { lat: 59.938751949263754, lng: 30.323061521022623 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: positionCat,
  });
  const marker = new google.maps.Marker({
    position: positionCat,
    map: map,
    icon: markerPath,
  });
}

window.initMap = initMap;
