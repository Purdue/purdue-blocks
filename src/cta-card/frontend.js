const ctaCards = [...document.querySelectorAll(".cta-card-small")]
if(ctaCards && ctaCards.length>0){
ctaCards.forEach((card) => {
    const readMore = card.querySelector(".read-more-button")

    if(readMore){
        readMore.addEventListener("mouseover", ()=>{
            card.style.boxShadow = "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
        })
        readMore.addEventListener("mouseout", ()=>{
            card.style.boxShadow = "0 0.5em 1em -0.125em rgba(0, 0, 0, 0.1), 0 0px 0 1px rgba(0, 0, 0, 0.02)"
        })
    }
})
}
