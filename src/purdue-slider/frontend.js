import Glide from "@glidejs/glide";

function siblings(node) {
  if (node && node.parentNode) {
    var n = node.parentNode.firstChild;
    var matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== node) {
        matched.push(n);
      }
    }

    return matched;
  }

  return [];
}

var check_resize = (glide) => {
  if (glide.slides_count <= glide.settings.perView) {
    glide.update({ startAt: 0 }).disable();
    glide.bullets.classList.add("hidden");
    glide.control.classList.add("hidden");
  } else {
    glide.enable();
    glide.bullets.classList.remove("hidden");
    glide.control.classList.remove("hidden");
  }
};

const getLiveRegion = (() => {
  let region = null;
  return () => {
    if (!region) {
      region = document.createElement("div");
      region.setAttribute("aria-live", "polite");
      region.setAttribute("aria-atomic", "true");
      region.classList.add("sr-only");
      document.body.appendChild(region);
    }
    return region;
  };
})();

const CustomActiveClass = (Glide, Components, Events) => {
  const liveRegion = getLiveRegion();

  const Component = {
    mount() {
      this.changeActiveSlide();
    },

    changeActiveSlide() {
      const slide = Components.Html.slides[Glide.index];
      const totalSlides = Components.Html.slides.length;
      const bullets = Components.Controls.items[0];
      const bullet = bullets
        ? [...bullets.children].find(
          (bullet) =>
            bullet.getAttribute("data-glide-dir") === `=${Glide.index}`
        )
        : "";

      liveRegion.textContent = "";
      requestAnimationFrame(() => {
        liveRegion.textContent = `Slide ${Glide.index + 1} of ${totalSlides}`;
      });

      if (bullet) {
        bullet.classList.remove("is-next", "is-prev");
        bullet.classList.add("is-active");
        slide.classList.remove("is-next", "is-prev");
        slide.classList.add("is-active");

        if (bullet.nextElementSibling) {
          bullet.nextElementSibling.classList.add("is-next");
        }

        if (bullet.previousElementSibling) {
          bullet.previousElementSibling.classList.add("is-prev");
        }
      }

      siblings(slide).forEach((sibling) => {
        sibling.classList.remove("is-active", "is-next", "is-prev");
        sibling.inert = true;
        slide.removeAttribute("tabIndex");
      });

      siblings(bullet).forEach((sibling) => {
        sibling.classList.remove("is-active", "is-next", "is-prev");
      });

      if (slide.nextElementSibling) {
        slide.nextElementSibling.classList.add("is-next");
      }

      if (slide.previousElementSibling) {
        slide.previousElementSibling.classList.add("is-prev");
      }

      slide.inert = false;
    },
  };

  Events.on("run", () => {
    Component.changeActiveSlide();
  });

  return Component;
};

const sliders = document.querySelectorAll(".purdue-slider--default");
if (sliders && sliders.length > 0) {
  for (let i = 0; i < sliders.length; i++) {
    let glide = new Glide(sliders[i], {
      perView: 4,
      gap: 24,
      breakpoints: {
        1300: {
          perView: 3.5,
        },
        1024: {
          perView: 2.8,
        },
        900: {
          perView: 2.1,
        },
        600: {
          perView: 1.5,
        },
        400: {
          perView: 1.1,
        },
      },
    });

    glide.mount({ CustomActiveClass });
  }
}

const tabs = document.querySelectorAll(".purdue-slider--tabs");
if (tabs && tabs.length > 0) {
  for (let i = 0; i < tabs.length; i++) {
    let glide = new Glide(tabs[i], {
      type: "carousel",
      perView: 1,
    });

    glide.mount({ CustomActiveClass });
  }
}

const rtb = document.querySelectorAll(".purdue-slider--rtb");
if (rtb && rtb.length > 0) {
  for (let i = 0; i < rtb.length; i++) {
    const count = parseInt(rtb[i].dataset.number);
    let newCount = count === 4 ? 3 : count;
    let glide = new Glide(rtb[i], {
      type: "carousel",
      startAt: 0,
      perView: count,
      gap: 0,
      breakpoints: {
        1024: {
          perView: newCount,
        },
        767: {
          perView: 1,
        },
      },
    });

    glide.slides_count = rtb[i].querySelectorAll(".glide__slide").length;
    glide.bullets = rtb[i].querySelector(".glide__bullets");
    glide.control = rtb[i].querySelector(".glide__arrows");
    glide.on("resize", () => {
      check_resize(glide);
    });
    glide.mount({ CustomActiveClass });
    check_resize(glide);
  }
}

const images = document.querySelectorAll(".purdue-slider--img");
if (images && images.length > 0) {
  for (let i = 0; i < images.length; i++) {
    const type = images[i].classList.contains("purdue-slider--img-loop")
      ? "carousel"
      : "slide";
    const count = images[i].classList.contains("purdue-slider--img-vertical")
      ? 3.5
      : 2;
    let newCount = count - 0.5;
    let glide = new Glide(images[i], {
      type: type,
      startAt: 0,
      perView: count,
      gap: 24,
      breakpoints: {
        1024: {
          perView: newCount,
        },
        767: {
          perView: 1.1,
        },
      },
    });
    glide.mount({ CustomActiveClass });
  }
}
