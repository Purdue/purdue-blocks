const toggleButtons = document.querySelectorAll('.image-gallery-open:not(.image-no-caption)')
document.addEventListener("DOMContentLoaded", function() {
    const imageGalley = document.querySelectorAll('.image-gallery-open, .profile-gallery-open')

    if ("IntersectionObserver" in window) {
      let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            if(entry.target.dataset.src && entry.target.dataset.src !== ""){
                entry.target.style.backgroundImage = `url(${entry.target.dataset.src})`;
            }
            lazyBackgroundObserver.unobserve(entry.target);
          }
        });
      });
  
      imageGalley.forEach((button)=>{
        const image = button.querySelector(".image");
        lazyBackgroundObserver.observe(image);
      });
    }
  });
const openModal = (e) => {
    const modalToOpen = e.currentTarget.nextElementSibling;
    if(modalToOpen){
        modalToOpen.classList.add('modal-open')
    }
}

const closeModal = (e) => {
    e.target.parentElement.classList.remove('modal-open')
}

[...toggleButtons].forEach(button => {
    button.addEventListener('click', openModal, false)
})

const closeButtons = document.querySelectorAll('.image-modal-close');
[...closeButtons].forEach(button => {
    button.addEventListener('click', closeModal, false)
})
