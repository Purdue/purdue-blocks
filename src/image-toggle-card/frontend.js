const toggleImages = document.querySelectorAll('.pu-image-toggle__images img')
const toggleButtons = document.querySelectorAll('.toggle-button')


const activateToggle = (el) => {
  el.preventDefault()
  const clickedButton = el.target

  if(!clickedButton.classList.contains('selected')) {

    // Toggle the button styles
    let previousSelected = clickedButton.nextSibling || clickedButton.previousSibling

    previousSelected.classList.remove('selected')
    clickedButton.classList.add('selected')

    // Toggle the images
    let correspondingParent = clickedButton.parentElement.parentElement
    let imageContainer = correspondingParent.children[1]

    const previousImage = imageContainer.querySelector('.pu-image-toggle__images img.show')
    const newImage = imageContainer.querySelector('.pu-image-toggle__images img:not(.show)')

    previousImage.classList.remove('show')
    newImage.classList.add('show')
  }
}

[...toggleButtons].forEach((button) => {
  button.addEventListener('click', activateToggle, false)
})
