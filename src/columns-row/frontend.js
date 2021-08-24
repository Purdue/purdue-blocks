const columnRowLine=[...document.querySelectorAll(".pu-columns-row--empty-line")]
const wH=window.innerHeight;
window.addEventListener('scroll', () => {
    if(columnRowLine&&columnRowLine.length>0){
        columnRowLine.forEach((t)=>{
            const thisTop = t.getBoundingClientRect().top;
            if(thisTop<=wH*0.5){
                t.classList.add('animate')
            }
        })
    }
})