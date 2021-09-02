const largeText=[...document.querySelectorAll(".pu-large-text")]
const wH=window.innerHeight;
window.addEventListener('scroll', () => {
    if(largeText&&largeText.length>0){
        largeText.forEach((t)=>{
            const thisTop = t.getBoundingClientRect().top;
            if(thisTop<=wH*0.5){
                t.classList.add('animate')
            }
        })
    }
})