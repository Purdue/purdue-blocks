const columnRowLine=[...document.querySelectorAll(".pu-columns-row--empty-line")]
const wH=window.innerHeight;
window.addEventListener('scroll', () => {
    if(columnRowLine&&columnRowLine.length>0){
        columnRowLine.forEach((t)=>{
            const thisTop = t.getBoundingClientRect().top;
            const thisBottom = t.getBoundingClientRect().bottom;
            if(thisTop<=wH*0.5){
                t.classList.add('animate')
            }
            if(thisBottom<=wH*0.5){
                t.classList.add('no-animate')
            }
        })
    }
})