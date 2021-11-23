import {
  slide
} from '../global'

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
            slide(quoteGroup, quoteWrapper, quotes, left, right, dots, ".purdue-block-quote",null,false,null,null)
        }else if(quotes&&quotes.length===1){
            quoteWrapper.style.left=0;
            quoteWrapper.style.width="100%";
            quotes[0].style.width="100%";
        }
    })
}


