const largeStory=[...document.querySelectorAll(".pu-large-image")]
const wH=window.innerHeight;
window.addEventListener('scroll', () => {
    if(largeStory&&largeStory.length>0){
        largeStory.forEach((t)=>{
            const thisTop = t.getBoundingClientRect().top;
            if(thisTop<=wH*0.5){
                t.classList.add('animate')
            }
        })
    }
})
//Lightbox 
if(largeStory&&largeStory.length>0){
    largeStory.forEach((t)=>{
        const button = t.querySelector(".pu-lightbox-button");
        if(button){
            const lightbox = t.querySelector(".pu-lightbox");
            button.addEventListener("click", ()=>{
                lightbox.classList.add("modal-open")
                const window = document.querySelector('html')         
                window.classList.add('no-scroll-page')
            })
        }
        //close modal code in profile-gallery block
    })
}