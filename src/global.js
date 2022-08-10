export var slide=(itemContainer,items, slides, prev, next, dots, className, number,animate, pause, play)=> {
    var posX1 = 0,
        posX2 = 0,
        posY1 = 0,
        posY2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slidesLength = slides.length,
        slideSize = slides[0].offsetWidth,
        index = 0,
        allowShift = true,
        dirDetected = false,
        newSlides = [...items.querySelectorAll(className)],
        isPlaying =false,
        press=false

     //feature detection
    let passiveIfSupported = false;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
        get: function() {passiveIfSupported = {passive: false};}
        }));
    } catch(err) {}

    // Mouse events
    items.onmousedown = dragStart;
    
    // Touch events
    items.addEventListener('touchstart', dragStart, passiveIfSupported);
    
    // Click events

    prev.addEventListener('click', function () { autoplayStop(); shiftSlide(-1) });
    next.addEventListener('click', function () { autoplayStop(); shiftSlide(1) });
    if(pause&&play){
      pause.addEventListener('click', ()=>{ 
        autoplayStop();
      });
      play.addEventListener('click', ()=>{ 
        autoplayStart();
      });
    }
    if(dots){
      dots.forEach((dot, ind)=>{
        dot.addEventListener("click", ()=>{   
            dots.forEach((d, i)=>{
                if([...d.classList].includes("active")&&ind!==i){
                    d.classList.remove("active")
                    allowShift=false
                    items.classList.add('shifting');
                    posInitial = items.offsetLeft;
                    items.style.left = (posInitial - (ind-i)*slideSize) + "px";
                    index=ind
                    dot.classList.add("active")
                    setTimeout(function(){
                        allowShift=true
                        items.classList.remove('shifting');
                    },500)
                    
                }

            })
        }) 
    })                
  }
    function dragStart (e) {
      autoplayStop();
      e = e || window.event;
      e.preventDefault();
      posInitial = items.offsetLeft;
      press=true;
      if(allowShift){
        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
            posY1 = e.touches[0].clientY;           
            items.addEventListener('touchmove', dragAction, passiveIfSupported);
            items.addEventListener('touchend', dragEnd, false);
          } else if(e.type == 'mousedown'){
            posX1 = e.clientX;
            posY1 = e.clientY;
            document.onmousemove = dragAction;
            document.onmouseup = dragEnd;
          }
        }
    }
  
    function dragAction (e) {
      e = e || window.event;
      if (e.type == 'touchmove') {
        posX2 = posX1 - e.touches[0].clientX;
        posY2 = posY1 - e.touches[0].clientY;
        posX1 = e.touches[0].clientX;
        posY1 = e.touches[0].clientY;
      } else {
        posX2 = posX1 - e.clientX;
        posY2 = posY1 - e.clientY;
        posX1 = e.clientX;
        posY1 = e.clientY;
      }
      if (!dirDetected) {
        if (Math.abs(posY2) > Math.abs(posX2)) {
          items.removeEventListener("touchmove", dragAction, passiveIfSupported);
          return;
        }
        e.preventDefault();
      }
      items.style.left = (items.offsetLeft - posX2) + "px";
    }
    
    function dragEnd (e) {
      posFinal = items.offsetLeft;
      if (posFinal - posInitial < -threshold) {
        shiftSlide(1, 'drag');
      } else if (posFinal - posInitial > threshold) {
        shiftSlide(-1, 'drag');
      } else {
        items.style.left = (posInitial) + "px";
      }
      press = false;
      dirDetected = false;
      document.onmouseup = null;
      document.onmousemove = null;
      items.removeEventListener("touchmove", dragAction, passiveIfSupported);
      items.removeEventListener('touchend', dragEnd, false);
    }
    
    function shiftSlide(dir, action) {
      items.classList.add('shifting');
      if (allowShift) {
        if (!action) { posInitial = items.offsetLeft; }
  
        if (dir == 1) {
          items.style.left = (posInitial - slideSize) + "px";
          index++;  
        } else if (dir == -1) {
          items.style.left = (posInitial + slideSize) + "px";
          index--;  
        }
      };  

        setTimeout(function(){

            items.classList.remove('shifting');
            if (index == -1) {
                items.style.left = -(slidesLength * slideSize) + "px";
                index = slidesLength - 1;
            }
        
            if (index == slidesLength) {
                items.style.left = -(1 * slideSize) + "px";
                index = 0;
            }    
            if(dots){
              dots.forEach((dot, ind)=>{
                  dot.classList.remove("active")
                  if(ind===index){
                      dot.classList.add("active")
                  }
              }) 
            }
            allowShift = true;
        }, 500)    
        allowShift = false;
        if(number){
          if(index===-1){
            number.innerHTML=slides.length;
          }else if(index===slides.length){
            number.innerHTML=1;
          }else{
            number.innerHTML=index+1;
          }
        }
    }
    let autoplay = null;
    function autoplayStart() {
      autoplay = setInterval(()=>shiftSlide(1), 5000);
      isPlaying=true;
      if(pause&&play){
          play.classList.add('hide');
          pause.classList.remove('hide');
      }
    }

    function autoplayStop() {
      clearInterval(autoplay);
      isPlaying=false;
      if(pause&&play){
        pause.classList.add('hide');
        play.classList.remove('hide');
      }
    }
    let width=window.innerWidth; 
    if(animate&&width>767){
      autoplayStart();
    }

    var rtime;
    var timeout = false;
    var delta = 200;
 
    function resizeend() {
        if (new Date() - rtime < delta) {
            setTimeout(resizeend, delta);
        } else {
            timeout = false;
            slideSize = itemContainer.offsetWidth
            newSlides.forEach((slide)=>{
                slide.style.width=slideSize+"px";
            })
            items.style.left = -(slideSize * (index+1)) + "px";
        }               
    }
    function resize(){
        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            setTimeout(resizeend, delta);
        }
        width=window.innerWidth; 
        if(width>767&&animate&&!isPlaying){
          autoplayStart();
        }else if(width<=767&&animate&&isPlaying){
          autoplayStop();
        }
    }
    window.addEventListener('resize', resize)
  }