import { gsap } from "gsap";

const sectionContainer = document.querySelector('.vertical-slides-container');
const sections = gsap.utils.toArray(".vertical-slide");
const bullets = gsap.utils.toArray(".slider-bullet");
let maxH = 0;
let currentIndex = 0; // track active slide

if (sections.length > 0) {

  // --- Height equalization ---
  const getMaxH = () => {
    maxH = 0;
    sections.forEach((section) => {
      if (maxH < section.offsetHeight) maxH = section.offsetHeight;
    });
    sections.forEach((section) => { section.style.height = maxH + "px"; });
    sectionContainer.style.height = maxH + "px";
    return maxH;
  };
  getMaxH();
  window.addEventListener("resize", getMaxH);

  // --- Initialize slide visibility ---
  // Show only the first slide, hide the rest immediately (no animation)
  sections.forEach((section, i) => {
    if (i === 0) {
      gsap.set(section, { autoAlpha: 1, visibility: "visible"});
      section.inert = false;
      section.setAttribute("tabindex", "0");
    } else {
      gsap.set(section, { autoAlpha: 0, visibility: "hidden"});
      section.inert = true;
    }
  });

  // Mark first bullet active
  if (bullets[0]) {
    bullets[0].classList.add("active");
    bullets[0].setAttribute("aria-current", "true");
  }

  // --- Core slide switcher ---
  const goToSlide = (targetIndex) => {
    if (targetIndex === currentIndex) return;

    const incoming = sections[targetIndex];
    const outgoing = sections[currentIndex];

    gsap.killTweensOf([incoming, outgoing]);

    // Fade out, then hide
    gsap.to(outgoing, {
      autoAlpha: 0,
      duration: 0.3,
      onComplete: () => {
        outgoing.inert = true;
        outgoing.removeAttribute("tabindex");
      }
    });

    // Show first, then fade in
    gsap.to(incoming, {
      autoAlpha: 1,
      duration: 0.3,
      delay: 0.3,           // wait for outgoing to finish
      onStart: () => {

      },
      onComplete: () => {
        incoming.inert = false;
        incoming.setAttribute("tabindex", "0");
        incoming.focus();
      }
    });

    bullets.forEach((b, i) => {
      const isActive = i === targetIndex;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-current", isActive ? "true" : "false");
    });

    currentIndex = targetIndex;
  };

  // --- Bullet click handlers ---
  bullets.forEach((bullet, i) => {
    bullet.addEventListener("click", () => goToSlide(i));
  });
}
