
const sideMenu=document.querySelectorAll(".custom-side-menu")
const href=window.location.href
function is_IE() {
    return (window.navigator.userAgent.match(/MSIE|Trident/) !== null);
}
if(sideMenu&&sideMenu.length>0){
    sideMenu.forEach((block)=>{
        const sideMenuLinks=block.querySelectorAll("a")
        sideMenuLinks.forEach((link)=>{
            if(link.href===href&&!link.classList.contains("is-active")){
                link.classList.add("is-active");
            }
        })
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


