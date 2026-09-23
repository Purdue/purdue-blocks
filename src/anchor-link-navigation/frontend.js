const anchorLinkBlocks=document.querySelectorAll(".anchor-link-block-links")
const href=window.location.href
let anchorHeaders=[]
function is_IE() {
    return (window.navigator.userAgent.match(/MSIE|Trident/) !== null);
}
if(anchorLinkBlocks&&anchorLinkBlocks.length>0){

    anchorLinkBlocks.forEach((block)=>{
        let hasAccordion=block.classList.contains("has-accordion")?true:false;
        let headers=[]
        !block.classList.contains("no-H2")?headers.push("h2"):"";
        block.classList.contains("has-H3")?headers.push("h3"):"";
        block.classList.contains("has-H4")?headers.push("h4"):"";
        block.classList.contains("has-H5")?headers.push("h5"):"";
        block.classList.contains("has-H6")?headers.push("h6"):"";

        let string=headers.join(", ")
        let headings
        if(headers.length>0){
            headings=block.classList.contains("pull-from-section")?block.parentElement.parentElement.parentElement.querySelectorAll(string):document.querySelectorAll(string)
            headings.forEach((header)=>{
                if(header.id){
                    anchorHeaders.push(header)
                }
            })
        }
        if(anchorHeaders.length>0){
        anchorHeaders.forEach((header)=>{
            if((!hasAccordion&&!header.classList.contains("accordion-title"))||hasAccordion){
                let anchor=document.createElement('a')
                let text = document.createTextNode(header.innerHTML)
                anchor.appendChild(text)
                anchor.title=header.innerHTML
                anchor.href="#"+header.id
                anchor.classList.add("anchor-link-block-link")
                block.appendChild(anchor)
            }
        })
    }
    })
  const links = document.querySelectorAll('a.anchor-link-block-link')
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      is_IE() ? '' : e.preventDefault();
      const target = document.querySelector(link.hash);
      const topY = target.getBoundingClientRect().top + window.pageYOffset - 20;

      window.scroll({
        top: topY,
        behavior: 'smooth'
      });

      links.forEach((el) => {
        el === link ? el.classList.add("is-active") : el.classList.remove("is-active")
      });

      // Set focus after scroll completes
      const onScrollEnd = () => {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => {
          target.removeAttribute('tabindex');
        }, { once: true });
      };

      if ('onscrollend' in window) {
        window.addEventListener('scrollend', onScrollEnd, { once: true });
      } else {
        setTimeout(onScrollEnd, 500);
      }
    });
  });
    window.addEventListener('scroll', () => {
        setTimeout(function(){
            if(anchorHeaders && anchorHeaders.length>0){
                anchorHeaders.forEach((header)=>{
                    if ( header.getBoundingClientRect().top <= 30 ) {
                        const id = "#"+header.id
                        links.forEach((el)=>{
                            el.hash===id?el.classList.add("is-active"):el.classList.remove("is-active")
                        })
                    }
                })
            }
        }, 100)
    })
    const toTop = document.querySelector('#to-top-sidebar')
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scroll({ top: 0, behavior: 'smooth' });

      const topElement = document.querySelector('h1') || document.body;
      topElement.setAttribute('tabindex', '-1');

      // Wait for scroll to finish before moving focus
      const onScrollEnd = () => {
        topElement.focus({ preventScroll: true });
        topElement.addEventListener('blur', () => {
          topElement.removeAttribute('tabindex');
        }, { once: true });
      };

      // scrollend fires when smooth scroll completes
      window.addEventListener('scrollend', onScrollEnd, { once: true });
    });
  }
}


