const accordions=document.querySelectorAll('.accordion-title');

accordions.forEach((el) => {
    el.addEventListener('click', (event) => {
        const element = el.parentElement;
        const sameLevelAccordions = element.parentElement.querySelectorAll(':scope > .accordion');
        console.log(element)
        console.log(sameLevelAccordions)
        purdueBlocksToggleAccordion(element, (element.classList.contains('is-open')) ? true : false);
        sameLevelAccordions.forEach((ele) => {
            const control = ele.querySelector('.accordion-title');
            if(control !== event.target) {
                purdueBlocksToggleAccordion(ele, true);
            }
        });        
    })
})

const id = window.location.hash;

function purdueBlocksToggleAccordion(el, close = false) {
    const content = el.querySelector('.accordion-content');
    const control = el.querySelector('.accordion-title');
    
    (close) ? el.classList.remove('is-open') : el.classList.add('is-open');

    content.setAttribute('hidden', close)
    content.setAttribute('aria-hidden', close);
    control.setAttribute('aria-expanded', close ? false : true); 
}

if(id){
    const el=document.querySelector(id);
    if(el){
        if(el.classList.contains('accordion')){
            window.scrollTop=el.offsetTop;
            el.setAttribute('aria-expanded', 'true');
            el.classList.add('is-open')
        }
        if(el.parentElement&&el.parentElement.classList.contains('accordion')){
            window.scrollTop=el.parentElement.offsetTop;
            console.log(el.parentElement.offsetTop)
            el.parentElement.setAttribute('aria-expanded', 'true');
            el.parentElement.classList.add('is-open');
        }
        if(el.parentElement&&el.parentElement.classList.contains('accordion-content')){
            window.scrollTop=el.offsetTop;
            el.parentElement.parentElement.setAttribute('aria-expanded', 'true');
            el.parentElement.parentElement.classList.add('is-open')
        }
    }
}