import {FocusTrap} from "@justpie/focustrap";

const toggleButtons = document.querySelectorAll(
  ".image-gallery-open:not(.image-no-caption)"
);

const openModal = (e) => {
  const modalTarget = e.currentTarget.dataset.toggle;
  const window = document.querySelector("html");
  let modalToOpen;
  if (
    e.currentTarget.classList.contains("image-gallery-open") &&
    !e.currentTarget.classList.contains("image-no-caption") &&
    !e.currentTarget.classList.contains("gallery-open-button")
  ) {
    modalToOpen = e.currentTarget.nextElementSibling;
    modalToOpen.classList.add("modal-open");
  } else {
    modalToOpen = document.querySelector(`[data-modal="${modalTarget}"]`);
    window.classList.add("no-scroll-page");
    modalToOpen.classList.add("modal-open");
  }

  console.log(modalToOpen);
  const focusTrap = new FocusTrap(modalToOpen);

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
  if (glide.slides_count <= glide.settings.perView) {
    glide.update({ startAt: 0 }).disable();
    glide.control ? glide.control.classList.add("hidden") : "";
  } else {
    glide.enable();
    glide.control ? glide.control.classList.remove("hidden") : "";
  }
};

function updateControls(Glide) {
  const galleryThumbImages = document.querySelectorAll(
    ".purdue-gallery-slider-thumbnail .glide__slide"
  );

  galleryThumbImages.forEach((img, index) => {
    const activeImg = img.classList.contains(
        'glide__slide--active'
      );
    img.setAttribute(
      'aria-current',
      activeImg ? 'true' : 'false'
    );
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const galleryLargeImages = document.querySelectorAll(
    ".purdue-gallery-slider-large"
  );
  const galleryThumbImages = document.querySelectorAll(
    ".purdue-gallery-slider-thumbnail"
  );
  if (galleryLargeImages && galleryLargeImages.length > 0) {

    for (let i = 0; i < galleryLargeImages.length; i++) {
      const center = galleryLargeImages[i].querySelectorAll(".glide__slide").length / 2;

      let glideLarge = new Glide(galleryLargeImages[i], {
        type: "slider",
        startAt: center,
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
      glideLarge.slides_count =
        galleryLargeImages[i].querySelectorAll(".glide__slide").length;
      glideLarge.control =
        galleryLargeImages[i].querySelector(".glide__arrows");
      glideLarge.on("resize", () => {
        check_resize(glideLarge);
      });
      glideLarge.mount({});
      check_resize(glideLarge);

      let glideThumb = new Glide(galleryThumbImages[i], {
        type: "slider",
        startAt: center,
        perView: 16,
        gap: 12,
        focusAt: "center",
        swipeThreshold: false,
        dragThreshold: false,
        breakpoints: {
          1024: {
            perView: 12,
          },
          767: {
            perView: 6,
          },
        },
      });
      glideThumb.slides_count =
        galleryThumbImages[i].querySelectorAll(".glide__slide").length;

      glideThumb.on(['mount.after', 'run.after'], updateControls);

      glideThumb.mount({});
      glideThumb.on("resize", () => {
        glideThumb.update();
      });
      const indexIndicator =
        galleryLargeImages[i].parentElement.parentElement.querySelector(
          ".current-index"
        );

      galleryThumbImages[i].querySelectorAll(".glide__slide").forEach((el) => {
        el.addEventListener("click", (e) => {
          glideLarge.go("=" + e.target.dataset.index);
          glideThumb.go("=" + e.target.dataset.index);
        });
      });
      glideLarge.on("swipe.end", function () {
        glideThumb.go("=" + glideLarge.index);
      });

      glideLarge.on("move.after", function () {
        glideThumb.go("=" + glideLarge.index);
        if (indexIndicator) {
          indexIndicator.innerHTML = glideLarge.index + 1;
        }
      });
      glideThumb.on("run", () => {
        let focusAt = "center";
        if (glideThumb.slides_count <= glideThumb.settings.perView) {
          focusAt = glideThumb.index;
        } else if (
          glideThumb.index >=
          glideThumb.slides_count - glideThumb.settings.perView/2
        ) {
          focusAt =
            glideThumb.settings.perView -
            (glideThumb.slides_count - glideThumb.index);
        }else if (
          glideThumb.index <=glideThumb.settings.perView/2
        ) {
          focusAt =glideThumb.index;
        } else {
          focusAt = "center";
        }
        glideThumb.update({
          focusAt: focusAt,
        });
      });

      const galleryOpenButton =
        galleryLargeImages[i].parentElement.parentElement
          .previousElementSibling;
      if (galleryOpenButton) {
        galleryOpenButton.addEventListener("click", () => {
          check_resize(glideLarge);
          glideLarge.update();
          glideThumb.update();
        });
      }
    }
  }
});
