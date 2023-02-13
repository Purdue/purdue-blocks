const toggleButtons = document.querySelectorAll('.image-gallery-open:not(.image-no-caption)')
const openModal = (e) => {
    const modalTarget = e.currentTarget.dataset.toggle
    const modalToOpen = document.querySelector(`[data-modal="${modalTarget}"]`)
    modalToOpen.classList.add('modal-open')
}

const closeModal = (e) => {
    e.target.classList.remove('modal-open')
}

[...toggleButtons].forEach(button => {
    button.addEventListener('click', openModal, false)
})

const closeButtons = document.querySelectorAll('.image-modal-close');
[...closeButtons].forEach(button => {
    button.addEventListener('click', closeModal, false)
})
