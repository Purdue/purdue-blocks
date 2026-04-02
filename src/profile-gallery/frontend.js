import { FocusTrap } from '@justpie/focustrap';
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const openModal = document.querySelector('.modal-open')
    if (openModal) closeModal();
  })

  const toggleButtons = document.querySelectorAll('.profile-gallery-open:not(.profile-no-bio)')
  const openModal = (e) => {
    const modalTarget = e.currentTarget.dataset.toggle
    const window = document.querySelector('html')
    const modalToOpen = document.querySelector(`[data-modal="${modalTarget}"]`)
    window.classList.add('no-scroll-page')
    modalToOpen.classList.add('modal-open')
    modalToOpen.focus();
    const focusTrap = new FocusTrap(modalToOpen);
  }

  const closeModal = (e) => {
    const window = document.querySelector('html')
    const modalToClose = document.querySelector('.modal-open')
    window.classList.remove('no-scroll-page')
    modalToClose.classList.remove('modal-open')
  }

  [...toggleButtons].forEach(button => {
    button.addEventListener('click', openModal, false)
  })

  const closeButtons = document.querySelectorAll('.modal--close-button');
  const secondaryCloseButtons = document.querySelectorAll('.modal--secondary-close-button');
  [...closeButtons, ...secondaryCloseButtons].forEach(button => {
    button.addEventListener('click', closeModal, false)
  })

})
