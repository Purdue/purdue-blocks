import { gsap } from "gsap";
//import ScrollTrigger from 'gsap/ScrollTrigger.js';

//gsap.registerPlugin(ScrollTrigger);

const sectionContainer = document.querySelector('.vertical-slides-container');
const sections = gsap.utils.toArray(".vertical-slide");
const bullets = gsap.utils.toArray(".slider-bullet");
let maxH = 0;
if(sections.length>0){
  const getMaxH = () => {
    maxH = 0;
  sections.forEach((section) => {
    if(maxH < section.offsetHeight){
        maxH = section.offsetHeight;
    }
  });
    sections.forEach((section) => {
        section.style.height=maxH+"px"
      });
      sectionContainer.style.height=maxH+"px"
  return maxH;
};

getMaxH();
window.addEventListener("resize",getMaxH);
//ScrollTrigger.addEventListener("refreshInit", getMaxH);

var slidesTL = gsap.timeline({
    paused: true
    /*scrollTrigger: {
        trigger: ".purdue-slider-vertical",
        start: 'top top+='+81,
        // end: `+=${(sections.length-1) *maxH}`,
        end: "bottom -300%",
        scrub: 1,
        pin: ".site-content",
        // pin: ".site",
        snap: 1 / (sections.length - 1),
        markers: false,
        invalidateOnRefresh: true,
        // anticipatePin: true,
        defaults: {
          ease: "none",
          duration: 500
        },
        onUpdate: (self) => {
            bullets.forEach((bullet, index) => {
                const threshold = index / (bullets.length - 1);
                if(Math.abs(self.progress - threshold)<0.01){
                    bullets.forEach((bullet, index) => {
                        bullet.classList.remove("active")
                    })
                    bullet.classList.add("active")
                }
              });
        },
    }*/
}),
wrap = gsap.utils.wrap(sections),
count = sections.length;
sections.reverse();

for (let i = 0; i < count-1; i++) {
    slidesTL.to(wrap(i), {
      duration: 0.3,
      autoAlpha: 0,
      delay: 2
    }, ">");

    slidesTL.to(wrap(i+1), {
      duration: 0.3,
      autoAlpha: 1,
      delay: 2
    }, ">");
  }
  bullets.forEach((bullet, i) => {
    bullet.addEventListener("click", () => {
      const targetIndex = sections.length - 1 - i;
      bullets.forEach((b) => {
        b.classList.remove("active")
        b.setAttribute('aria-current', false);
      });
      bullet.classList.add("active");
      bullet.setAttribute('aria-current', true);

      sections.forEach((section, j) => {
        if (j === targetIndex) {
          section.inert = false;
          section.setAttribute("tabindex", "0");
          gsap.to(section, {
            autoAlpha: 1,
            duration: 0.3,
            display: "block",
            onComplete: () => section.focus()
          });
        } else {
          section.removeAttribute("tabindex");
          gsap.to(section, {
            autoAlpha: 0,
            duration: 0.3,
            onComplete: () => {
              section.inert = true;
              setTimeout(() => {
                section.style.display = 'none';
              }, 1000);
            }
          });
        }
      });
    });
  });
}
