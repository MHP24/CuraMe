const FAQs = document.querySelectorAll('.faq__item');
FAQs.forEach(element => {
    element.addEventListener("click", () =>{
        FAQs.forEach(prevElement => {
            prevElement.querySelector('.faq__paragraph').classList.remove('faq__paragraph--open');
            prevElement.querySelector('.faq__collapsable').classList.remove('faq__collapsable--open');
        });
        element.querySelector('.faq__paragraph').classList.toggle('faq__paragraph--open');
        element.querySelector('.faq__collapsable').classList.toggle('faq__collapsable--open');
    });
});