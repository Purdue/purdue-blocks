const storylines=[...document.querySelectorAll(".purdue-blocks-storyline")]
const wH=window.innerHeight;
let w=window.innerWidth;
let contents=[]
if(storylines&&storylines.length>0){
    storylines.forEach((s)=>{
        const content=s.querySelector('.column-align-bottom')
        if(content){
            const image=s.querySelector('.image').offsetHeight
            if(w>1024){
                content.style.paddingTop=image+"px"
            }

            contents.push({img:image,con:content})
        }

    })
    window.addEventListener('scroll', () => {
        storylines.forEach((t)=>{
            const thisTop = t.offsetTop - window.scrollY;
            if(thisTop<=wH*0.5){
                t.classList.add('animate')
            }
        })
    })
}
if(contents.length>0){
    window.addEventListener('resize', () => {
        w=window.innerWidth;
        if(w>1024){
            contents.forEach((s)=>{
                s.content.style.paddingTop=s.image+"px"
            })
        }else{
            s.content.style.paddingTop=12+"px"
        }
    })
}

