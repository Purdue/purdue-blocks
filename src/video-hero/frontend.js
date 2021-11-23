import {
    slide
} from '../global'
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
const carouselHeros=[...document.querySelectorAll(".video-hero--carousel")]

if(carouselHeros&&carouselHeros.length>0){
    carouselHeros.forEach((carouselHero)=>{
        const carouselWrapper=carouselHero.querySelector(".video-hero--carousel__wrapper")
        const images=[...carouselHero.querySelectorAll(".video-hero--carousel__image")]
        images.forEach((image)=>{
            image.style.width=carouselHero.offsetWidth+"px";
        })
        if(images&&images.length>1){
            const left=carouselHero.querySelector(".video-hero--carousel__arrow-left")
            const right=carouselHero.querySelector(".video-hero--carousel__arrow-right")
            const number=carouselHero.querySelector(".video-hero--carousel__current")
            const pause=carouselHero.querySelector(".video-hero--pause-button")
            const play=carouselHero.querySelector(".video-hero--play-button")

            carouselWrapper.style.left=-carouselHero.offsetWidth+"px"
            // Clone first and last slide
            let firstSlide = images[0]
            let lastSlide = images[images.length - 1]
            let cloneFirst = firstSlide.cloneNode(true)
            let cloneLast = lastSlide.cloneNode(true)
            carouselWrapper.appendChild(cloneFirst);
            carouselWrapper.insertBefore(cloneLast, firstSlide); 
            let autoplay=true;  
            slide(carouselHero, carouselWrapper, images, left, right, null, ".video-hero--carousel__image", number, autoplay, pause, play)
        }else if(images&&images.length===1){
            carouselWrapper.style.left=0;
            carouselWrapper.style.width="100%";
            images[0].style.width="100%";
        }
    })
}