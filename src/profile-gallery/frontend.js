const toggleButtons = document.querySelectorAll('.profile-gallery-open')
const openModal = (e) => {
    const modalTarget = e.currentTarget.dataset.toggle
    const window = document.querySelector('html')
    const modalToOpen = document.querySelector(`[data-modal="${modalTarget}"]`)

    window.classList.add('no-scroll')
    modalToOpen.classList.add('modal-open')
}

const closeModal = (e) => {
    const window = document.querySelector('html')
    const modalToClose = document.querySelector('.modal-open')
    window.classList.remove('no-scroll')
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