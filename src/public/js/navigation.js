let navMenu = document.getElementById('nav__menu');
navMenu.addEventListener('click', () => {
    document.querySelector('.nav__list').classList.toggle('nav__list--open');
})