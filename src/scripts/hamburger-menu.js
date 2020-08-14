let burger = document.querySelector('.hamburger-menu');
let overlay = document.querySelector('.header__menu');
let links = overlay.querySelectorAll('.menu__link');

const toggleMenu = () => {
    burger.classList.toggle('hamburger-menu_active');
    overlay.classList.toggle('header__menu_active');
}

links.forEach(function(e) {
    e.addEventListener('click', toggleMenu);
})

burger.addEventListener('click', toggleMenu);