document.querySelectorAll('.accordion-title').forEach((el) => {

    el.addEventListener('click',(e)=>{
        if (el.getAttribute('aria-expanded') && el !== e.target) {
            el.setAttribute('aria-expanded', 'false');
            el.parentElement.classList.remove('is-open')
        } else if (el === e.target){
            const expanded = el.getAttribute('aria-expanded') === "false" ? true : false;
            el.setAttribute('aria-expanded', expanded);
            el.parentElement.classList.contains('is-open')?el.parentElement.classList.remove('is-open'):el.parentElement.classList.add('is-open')
        }
    })

}) 