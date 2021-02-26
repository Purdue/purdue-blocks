const titleHeros=document.querySelectorAll('.pu-title-hero')
if(titleHeros&&titleHeros.length>0){
    titleHeros.forEach((titleHero)=>{
        const h1=titleHero.querySelector('h1')
        const subtext=h1.nextElementSibling
        if(subtext&&subtext.innerHTML===""){
            h1.style.marginBottom="0"
        }
    
        const pauseButton=titleHero.querySelector('.video-pause-button')
        const playButton=titleHero.querySelector('.video-play-button')
        const video=titleHero.querySelector('video')
        if(pauseButton){
            pauseButton.addEventListener('click',()=>{
                video.pause();
                pauseButton.classList.add('hide');
                playButton.classList.remove('hide');
            })
        }        
        if(playButton){
            playButton.addEventListener('click',()=>{
                video.play();
                playButton.classList.add('hide');
                pauseButton.classList.remove('hide');
            })
        }
    })   
}

