const accordions=document.querySelectorAll('.accordion-title');
accordions.forEach((el) => {
    el.addEventListener('click',(event)=>{
        accordions.forEach((element)=>{
            if (element !== event.target) {
                element.setAttribute('aria-expanded', 'false');
                element.parentElement.classList.remove('is-open')
            } else if (element === event.target){
                const expanded = el.getAttribute('aria-expanded') === "false" ? true : false;
                element.setAttribute('aria-expanded', expanded);
                element.parentElement.classList.contains('is-open')?el.parentElement.classList.remove('is-open'):el.parentElement.classList.add('is-open')
            }
        })
    })

}) 