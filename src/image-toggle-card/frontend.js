import { previous } from '@wordpress/icons';
import {tabbable, focusable} from 'tabbable';

const toggleImages = document.querySelectorAll('.pu-image-toggle__images img')
const toggleButtons = document.querySelectorAll('.toggle-button')
const btnCtrls = document.querySelectorAll('.pu-image-toggle__buttons');

const activateToggle = (el) => {
  el.preventDefault()
  const clickedButton = el.target

  if(!clickedButton.classList.contains('selected')) {

    // Toggle the button styles
    let previousSelected = clickedButton.nextSibling || clickedButton.previousSibling

    previousSelected.classList.remove('selected')
    clickedButton.classList.add('selected')
    clickedButton.setAttribute('aria-selected', 'true')
    clickedButton.setAttribute('tabindex', '0')
    previousSelected.setAttribute('aria-selected', 'false')
    previousSelected.setAttribute('tabindex', '-1')

    // Toggle the images
    let correspondingParent = clickedButton.parentElement.parentElement
    let imageContainer = correspondingParent.children[1]

    const previousImage = imageContainer.querySelector('.pu-image-toggle__images .show')
    const newImage = imageContainer.querySelector('.pu-image-toggle__images .is-hidden')

    previousImage.classList.remove('show')
    previousImage.classList.add('is-hidden')
    newImage.classList.remove('is-hidden')
    newImage.classList.add('show')
  }
}

[...toggleButtons].forEach((button) => {
  button.addEventListener('click', activateToggle, false)
})

btnCtrls.forEach((btnCtrl) => {
	btnCtrl.addEventListener('keydown', (event) => {
		const key = event.key
		const target = event.target;
		const parent = target.parentElement
		const siblings = [...focusable(parent)];
			if (key.startsWith("Arrow")) {
				event.preventDefault();
				const index = siblings.indexOf(target);
				if (key === 'ArrowRight' || key === 'ArrowDown') {
					if (index < (siblings.length - 1)) {
						siblings[index + 1].click();
						siblings[index + 1].focus();
					}
				}
				if (key === 'ArrowLeft' || key === 'ArrowUp') {
					if (index > (0)) {
						siblings[index - 1].click();
						siblings[index - 1].focus();
					}
				}
			}
			if (key === 'Home') {
				siblings[0].click();
				siblings[0].focus();
				event.preventDefault();
			}
			if (key === 'End') {
				siblings[siblings.length - 1].click();
				siblings[siblings.length - 1].focus();
				event.preventDefault();
			}
		})
})



