const largeStory=[...document.querySelectorAll(".pu-large-image")]
const wH=window.innerHeight;
window.addEventListener('scroll', () => {
    if(largeStory&&largeStory.length>0){
        largeStory.forEach((t)=>{
            const thisTop = t.offsetTop - window.scrollY;
            if(thisTop<=wH*0.5){
                t.classList.add('animate')
            }
        })
    }
})