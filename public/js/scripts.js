var createProjectButton = document.querySelector('.create-project');
var projectInput = document.querySelector('.project-input');
var generateButton = document.querySelector('.generate-button');
var paletteName = document.querySelector('.palette-name');
var rectangles = document.querySelectorAll('.rectangle')

// generateButton.addEventListener('click', generateHexCode)

class PalettePicker {
	constructor() {
		this.projects = []
	}

	createPalette () {
		rectangles.forEach(rectangle => {
			console.log(rectangle)
			var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);;
			rectangle.setAttribute('style', `fill:${randomColor}`)
		})
	}

// createProject = () => {

// 	}
  
// toggleLocks = () => {

//  	}  
}

const User = new PalettePicker();
User.createPalette()
