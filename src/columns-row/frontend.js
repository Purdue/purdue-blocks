const columnRowTops=[...document.querySelectorAll(".pu-columns-row--line-top")]
const columnRowTBottoms=[...document.querySelectorAll(".pu-columns-row--line-bottom")]
const wH=window.innerHeight;
window.addEventListener('scroll', () => {
    if(columnRowTops&&columnRowTops.length>0){
        columnRowTops.forEach((t)=>{
            const thisTop = t.offsetTop - window.scrollY;
            if(thisTop<=wH*0.5){
                t.classList.add('top-line-animate')
            }
        })
    }
    if(columnRowTBottoms&&columnRowTBottoms.length>0){
        columnRowTBottoms.forEach((t)=>{
            const thisMiddle = t.offsetTop - window.scrollY+0.5*t.offsetHeight;
            if(thisMiddle<=wH*0.5){
                t.classList.add('bottom-line-animate')
            }
        })
    }
})