const burger = document.querySelector('.hamburger-menu');
const overlay = document.querySelector('.header__menu');
const links = overlay.querySelectorAll('.menu__link');

const toggleClassMenu = () => {
    burger.classList.toggle('hamburger-menu_active');
    overlay.classList.toggle('header__menu_active');
};

const removeClassMenu = () => {
    burger.classList.remove('hamburger-menu_active');
    overlay.classList.remove('header__menu_active');
};

links.forEach(function(e) {
    e.addEventListener('click', removeClassMenu);
})

burger.addEventListener('click', toggleClassMenu);