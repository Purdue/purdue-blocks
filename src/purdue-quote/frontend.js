const quoteGroups=[...document.querySelectorAll(".purdue-block-quote-group")]

if(quoteGroups&&quoteGroups.length>0){
    quoteGroups.forEach((quoteGroup)=>{
        const quoteWrapper=quoteGroup.querySelector(".purdue-block-quote-wrapper")
        const quotes=[...quoteGroup.querySelectorAll(".purdue-block-quote")]
        quotes.forEach((quote)=>{
            quote.style.width=quoteGroup.offsetWidth+"px";
        })
        if(quotes&&quotes.length>1){
            const left=quoteGroup.querySelector(".purdue-block-quote-group__arrow-left")
            const right=quoteGroup.querySelector(".purdue-block-quote-group__arrow-right")
            const dots=[...quoteGroup.querySelectorAll(".purdue-block-quote-group__dot")]
            quoteWrapper.style.left=-quoteGroup.offsetWidth+"px"
            // Clone first and last slide
            let firstSlide = quotes[0]
            let lastSlide = quotes[quotes.length - 1]
            let cloneFirst = firstSlide.cloneNode(true)
            let cloneLast = lastSlide.cloneNode(true)
            quoteWrapper.appendChild(cloneFirst);
            quoteWrapper.insertBefore(cloneLast, firstSlide);           
            slide(quoteGroup, quoteWrapper, quotes, left, right, dots)
        }else if(quotes&&quotes.length===1){
            quoteWrapper.style.left=0;
            quoteWrapper.style.width="100%";
            quotes[0].style.width="100%";
        }
    })
}

function slide(itemContainer,items, slides, prev, next, dots) {
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
        newSlides = [...items.querySelectorAll(".purdue-block-quote")]

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
    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });

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

    function dragStart (e) {
      e = e || window.event;
      e.stopPropagation();
      posInitial = items.offsetLeft;
      if(allowShift){
        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
            posY1 = e.touches[0].clientY;           
            items.addEventListener('touchmove', dragAction, passiveIfSupported);
            items.addEventListener('touchend', dragEnd, false);
          } else {
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
            dots.forEach((dot, ind)=>{
                dot.classList.remove("active")
                if(ind===index){
                    dot.classList.add("active")
                }
            }) 
            allowShift = true;
        }, 500)    
        allowShift = false;
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
            console.log(slideSize)
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

    }
    window.addEventListener('resize', resize)
  }
