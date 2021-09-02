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
window.addEventListener('load', function() {
    if(videoHeroes && videoHeroes.length > 0){
        videoHeroes.forEach((videoHero) => {
            videoHero.classList.add('onload-animation')
        })   
    }
})
const wH=window.innerHeight;
window.addEventListener('scroll', function() {
    if(videoHeroes && videoHeroes.length > 0){
        videoHeroes.forEach((videoHero) => {
            const thisMiddle = videoHero.offsetTop - window.scrollY+0.5*videoHero.offsetHeight;
            const thisBottom = videoHero.getBoundingClientRect().bottom;
            if(thisMiddle<=wH*0.5){
                videoHero.classList.add('scroll-animation')
            }
            if(thisBottom<=wH*0.5){
                videoHero.classList.add('no-animation')
            }
        })   
    }
})