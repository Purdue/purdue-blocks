const accordions = document.querySelectorAll('.accordion-title>button');
const id = window.location.hash;

accordions.forEach((el) => {
    el.addEventListener('click', (event) => {
        const element = el.parentElement.parentElement;
        const sameLevelAccordions = element.parentElement.querySelectorAll(':scope > .accordion');
        purdueBlocksToggleAccordion(element, (element.classList.contains('is-open')) ? true : false);
        sameLevelAccordions.forEach((ele) => {
            const control = ele.querySelector('.accordion-title > button');
            if(control !== event.target) {
                purdueBlocksToggleAccordion(ele, true);
            }
        });
    })
})


if (id) {
    const el = document.querySelector(id);
    if (el) {
        if (el.classList.contains('accordion')) {
            window.scrollTop = el.offsetTop;
            purdueBlocksToggleAccordion(el, false);
            let close = el.parentElement.closest('.accordion'); 
            while(close) {
                purdueBlocksToggleAccordion(close, false);
                close = close.parentElement.closest('.accordion'); 
            }            
        }
    }
}

function purdueBlocksToggleAccordion(el, close = false) {
    const content = el.querySelector('.accordion-content');
    const control = el.querySelector('.accordion-title > button');
    
    (close) ? el.classList.remove('is-open') : el.classList.add('is-open');

    content.setAttribute('hidden', close)
    content.setAttribute('aria-hidden', close);
    control.setAttribute('aria-expanded', close ? false : true); 
}