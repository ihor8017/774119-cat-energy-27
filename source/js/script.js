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
