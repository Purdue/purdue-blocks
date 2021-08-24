
document.addEventListener('DOMContentLoaded', () => {
    const storylines=[...document.querySelectorAll(".purdue-blocks-storyline")]
    const wH=window.innerHeight;
    let w=window.innerWidth;
    let contents=[]
    if(storylines&&storylines.length>0){
        storylines.forEach((s)=>{
            const content=s.querySelector('.column-align-bottom')
            if(content){
                const image=s.querySelector('img.image')   
                if(w>1024&&image){
                    content.style.paddingTop=0.5*image.offsetHeight+12+"px"
                    contents.push({img:image,con:content})
                }else{
                    content.style.paddingTop=0
                }
            }

        })
        window.addEventListener('scroll', () => {
            storylines.forEach((t)=>{
                const thisTop = t.getBoundingClientRect().top;
                if(thisTop<=wH*0.5){
                    t.classList.add('animate')
                }
            })
        })
    }
    if(contents.length>0){
        window.addEventListener('resize', () => {
            w=window.innerWidth;
            if(w>768){
                contents.forEach((s)=>{
                    s.con.style.paddingTop=0.5*s.img.offsetHeight+12+"px"
                })
            }else{
                contents.forEach((s)=>{
                    s.con.style.paddingTop=0
                })

            }
        })
    }
})
