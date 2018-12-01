var createProjectButton = document.querySelector('.create-project');
var projectInput = document.querySelector('.project-input');
var generateButton = document.querySelector('.generate-button');
var paletteName = document.querySelector('.palette-name');
const rectangles = document.querySelectorAll('.rectangle')
var title = document.querySelector('.title')

class PalettePicker {
	constructor() {
		this.projects = []
	}

	createPalette () {
		//filter out those rectangles with locked class
		rectangles.forEach(rectangle => {
			let randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
			rectangle.setAttribute('style', `background-color:${randomColor}`)
		})

		let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		title.setAttribute('style', `color:${randomColor}`)
	}

  
	toggleLocks() {
		console.log('hit')
		rectangles.forEach(rectangle => {
			console.log(rectangle)
			rectangle.locked = !rectangle.locked;
		})
	 }  

	 // lockColor() {

	 // }

	 // savePalette() {

	 // }

	// createProject() {

	// 	}

	// deletePalette() {

	// }
}

const User = new PalettePicker();

generateButton.addEventListener('click', User.createPalette)
rectangles.addEventListener('click', User.toggleLocks)
