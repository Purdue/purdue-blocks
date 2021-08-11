const videoHeroes = document.querySelectorAll('.video-hero')
if(videoHeroes && videoHeroes.length > 0){
    videoHeroes.forEach((videoHero) => {
    
        const pauseButton = videoHero.querySelector('.video-hero--pause-button')
        const playButton = videoHero.querySelector('.video-hero--play-button')
        const video = videoHero.querySelector('video')
        if(pauseButton) {
            pauseButton.addEventListener('click', () => {
                video.pause();
                pauseButton.classList.add('hide');
                playButton.classList.remove('hide');
            })
        }        
        if(playButton) {
            playButton.addEventListener('click', () => {
                video.play();
                playButton.classList.add('hide');
                pauseButton.classList.remove('hide');
            })
        }
    })   
}

