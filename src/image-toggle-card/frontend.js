const toggleImages = document.querySelectorAll('.pu-image-toggle__images img')
const toggleButtons = document.querySelectorAll('.toggle-button')

console.log(toggleButtons)

const activateToggle = (el) => {
  el.preventDefault()
  const clickedButton = el.target

  console.log(clickedButton)


  if(!clickedButton.classList.contains('selected')) {

    // Toggle the button styles
    let previousSelected = document.querySelector('.toggle-button.selected')

    previousSelected.classList.remove('selected')
    clickedButton.classList.add('selected')

    // Toggle the images
    const previousImage = document.querySelector('.pu-image-toggle__images img.show')
    const newImage = document.querySelector('.pu-image-toggle__images img:not(.show)')

    previousImage.classList.remove('show')
    newImage.classList.add('show')
  }
}

[...toggleButtons].forEach((button) => {
  button.addEventListener('click', activateToggle, false)
})
