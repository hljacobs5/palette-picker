var createProjectButton = document.querySelector('.create-project');
var projectInput = document.querySelector('.project-input');
var generateButton = document.querySelector('.generate-button');
var paletteName = document.querySelector('.palette-name');
var rectangles = document.querySelectorAll('.rectangle')
var title = document.querySelector('.title')
var savePalette = document.querySelector('.create-palette')

class PalettePicker {
	constructor() {
		this.projects = []
	}

	createPalette() {
		rectangles.forEach(rectangle => {
			let rectangleClasses = rectangle.firstChild.nextSibling.classList;
		  if (rectangleClasses.contains('unlocked')) {
			let randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
			rectangle.setAttribute('style', `background-color:${randomColor}`)
		   }
		})

		let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		title.setAttribute('style', `color:${randomColor}`)
	}

  
	toggleLocks() {
		let rectangleClasses = this.firstChild.nextSibling.classList
		let unlocked = rectangleClasses.contains('unlocked')
		if (unlocked) {
			rectangleClasses.remove('unlocked')
			rectangleClasses.add('locked')	
		} else {
			rectangleClasses.remove('locked')
			rectangleClasses.add('unlocked')
		}
	 }  

	 savePalette() {
	 	let hexCodes = [];
	 	let name = paletteName.value
	 	rectangles.forEach(rectangle => {
			let rgb = rectangle.style['background-color']
			let hexCode = '#' + rgb.substr(4, rgb.indexOf(')') - 4).split(',').map((color) => parseInt(color).toString(16)).join('');
	 		hexCodes.push(hexCode)
	 	})

	 	let postObject = {
	 		title: name,
	 		hexCodes: hexCodes
	 	}

	 	fetch('http://localhost:3000/api/v1/palettes', {
  			method: 'POST',
  			body: JSON.stringify(postObject)
		});
	 }

	// createProject() {

	// 	}

	// deletePalette() {

	// }
}

const User = new PalettePicker();

generateButton.addEventListener('click', User.createPalette)
savePalette.addEventListener('click', User.savePalette)
for(i=0; i < rectangles.length; i++) {
	rectangles[i].addEventListener('click', User.toggleLocks)
}

document.onload = User.createPalette()

