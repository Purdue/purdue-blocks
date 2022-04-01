const textBlocks = document.querySelectorAll(".pu-text-hero")
if(textBlocks.length>0){
    textBlocks.forEach((t) =>{
        const para= t.querySelector(".pu-text-hero .hero .container .content p")
        if(para.innerHTML===""){
            para.style.display="none"
        }
    })

}