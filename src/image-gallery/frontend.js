const toggleButtons = document.querySelectorAll(
  ".image-gallery-open:not(.image-no-caption)"
);
document.addEventListener("DOMContentLoaded", function () {
  const imageGalley = document.querySelectorAll(
    ".image-gallery-open:not(.gallery-open-button), .profile-gallery-open"
  );

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (entry.target.dataset.src && entry.target.dataset.src !== "") {
            entry.target.style.backgroundImage = `url(${entry.target.dataset.src})`;
          }
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });
    if (imageGalley.length > 0) {
      imageGalley.forEach((button) => {
        const image = button.querySelector(".image");
        lazyBackgroundObserver.observe(image);
      });
    }
  }
});
const openModal = (e) => {
  const modalTarget = e.currentTarget.dataset.toggle;
  const window = document.querySelector("html");
  const modalToOpen = document.querySelector(`[data-modal="${modalTarget}"]`);

  window.classList.add("no-scroll-page");
  modalToOpen.classList.add("modal-open");
  if (modalToOpen) {
    modalToOpen.classList.add("modal-open");
  }
};

const closeModal = (e) => {
  e.target.parentElement.classList.remove("modal-open");
};

[...toggleButtons].forEach((button) => {
  button.addEventListener("click", openModal, false);
});

const closeButtons = document.querySelectorAll(".image-modal-close");
[...closeButtons].forEach((button) => {
  button.addEventListener("click", closeModal, false);
});
//slider
import Glide from "@glidejs/glide";

const check_resize = (glide) => {
  // console.log(glide.slides_count)
  if (glide.slides_count <= glide.settings.perView) {
    glide.update({ startAt: 0 }).disable();
    glide.control ? glide.control.classList.add("hidden") : "";
  } else {
    glide.enable();
    glide.control ? glide.control.classList.remove("hidden") : "";
  }
};

document.addEventListener("DOMContentLoaded",function(){
  const galleryLargeImages = document.querySelectorAll(
    ".purdue-gallery-slider-large"
  );
  const galleryThumbImages = document.querySelectorAll(
    ".purdue-gallery-slider-thumbnail"
  );
  if(galleryLargeImages && galleryLargeImages.length>0){
    for (let i = 0; i < galleryLargeImages.length; i++) {
      let glideLarge = new Glide(galleryLargeImages[i], {
        type: 'carousel',
        startAt: 0,
        perView: 1,
        gap: 24,
        breakpoints: {
          1024: {
            perView: 1,
          },
          767: {
            perView: 1,
          },
        },
      });
      glideLarge.slides_count = galleryLargeImages[i].querySelectorAll(".glide__slide").length;
      glideLarge.control = galleryLargeImages[i].querySelector(".glide__arrows");
      glideLarge.on("resize", () => {
        check_resize(glideLarge);
      });
      glideLarge.mount({});
      check_resize(glideLarge);
    
      let glideThumb = new Glide(galleryThumbImages[i], {
        type: "slider",
        startAt: 0,
        perView: 16,
        gap: 12,
        swipeThreshold: false,
        dragThreshold: false,
        breakpoints: {
          1024: {
            perView: 10,
          },
          767: {
            perView: 6,
          },
        },
      });

      glideThumb.mount({});

      const indexIndicator = galleryLargeImages[i].parentElement.parentElement.querySelector(".current-index");

      galleryThumbImages[i].querySelectorAll('.glide__slide').forEach(el => {
        el.addEventListener('click', (e) => {
          console.log(e.target)
          glideLarge.go('='+(e.target.dataset.index))
          glideThumb.go('='+(e.target.dataset.index))

        })
      })
      glideLarge.on('swipe.end', function() {
        glideThumb.go('='+(glideLarge.index))
      })
      
      glideLarge.on('move.after', function() {
        glideThumb.go('='+(glideLarge.index))
        if(indexIndicator){
          indexIndicator.innerHTML=glideLarge.index+1
        }

      })
      const galleryOpenButton = galleryLargeImages[i].parentElement.parentElement.previousElementSibling;
      if (galleryOpenButton) {
        galleryOpenButton.addEventListener("click", () => {
          check_resize(glideLarge);
          glideLarge.update()
          glideThumb.update()
        });
      
      }
    }
  }
  
})

