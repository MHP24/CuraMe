let navMenu = document.getElementById('menu');
navMenu.addEventListener('click', () => {
    document.querySelector('.navbar').classList.toggle('navbar--active');
});

window.addEventListener('click', ({ target }) => {
    if(target != navMenu && target !== document.querySelector('.navbar')) {
        document.querySelector('.navbar').classList.toggle('navbar--active');
    }
})