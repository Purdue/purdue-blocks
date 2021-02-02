const titleHero=document.querySelector('.pu-title-hero')
if(titleHero){
    const h1=titleHero.querySelector('h1')
    const subtext=h1.nextElementSibling
    if(subtext&&subtext.innerHTML===""){
        h1.style.marginBottom="0"
    }
}
