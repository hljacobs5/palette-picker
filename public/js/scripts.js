var createProjectButton = document.querySelector('.create-project');
var projectInput = document.querySelector('.project-input');
var generateButton = document.querySelector('.generate-button');
var paletteName = document.querySelector('.palette-name');
var rectangles = document.querySelectorAll('.rectangle')

class PalettePicker {
	constructor() {
		this.projects = []
	}

	createPalette () {
		rectangles.forEach(rectangle => {
			var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);;
			rectangle.setAttribute('style', `fill:${randomColor}`)
		})
	}

  
	toggleLocks(event) {
		rectangles.forEach(rectangle => {
			rectangle.setAttribute()
		})
	 }  
	 
	// createProject = () => {

	// 	}

	// deleteProject() {

	// }
}

const User = new PalettePicker();

generateButton.addEventListener('click', User.createPalette)
rectangles.addEventListener('click', User.toggleLocks)
