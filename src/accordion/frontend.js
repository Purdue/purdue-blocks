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
const id=window.location.hash;
if(id){
    const el=document.querySelector(id);
    console.log(el)

    if(el){
        if(el.classList.contains('accordion')){
            console.log("test")
            window.scrollTop=el.offsetTop;
            el.setAttribute('aria-expanded', 'true');
            el.classList.add('is-open')
        }
        if(el.parentElement&&el.parentElement.classList.contains('accordion')){
            window.scrollTop=el.offsetTop;
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