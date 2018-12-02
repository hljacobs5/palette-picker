var createProjectButton = document.querySelector('.create-project');
var projectInput = document.querySelector('.project-input');
var generateButton = document.querySelector('.generate-button');
var paletteName = document.querySelector('.palette-name');
var rectangles = document.querySelectorAll('.rectangle');
var title = document.querySelector('.title');
var savePalette = document.querySelector('.create-palette');
var displayProjects = document.querySelector('.display-projects');
var createProjectButton = document.querySelector('.create-project');
var allPalettes = [];

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
	 		hexCodes: hexCodes,
	 		id: 7
	 	}

	 	fetch('/api/v1/palettes', {
  			method: 'POST',
  			headers:{'contentType': 'application/json'},
  			body: JSON.stringify(postObject)
		})
		.then(response => console.log(response.json()))
	 }

	// createProject() {

	// 	}
	getPalettes() {
		let palettes = [{'id': 1, "title": "hi", "hexcodes": ["#8573a", "#36261f", "#9a6b40", "#12842e", "#87f1"]},
						{'id': 2, "title": "hello", "hexcodes": ["#FFFFFF", "#36261f", "#9a6b40", "#12842e", "#87f1"]}]
		palettes.forEach(palette => {
			allPalettes.push(palette)
		})
	}

	 getProjects() {
	 	let projects = [{id: 1, name: 'project-1', paletteIds: [2]},
	 					{id: 2, name: 'project-2', paletteIds: [1, 2]}
	 				    ]
	 	projects.forEach(project => {
	 		this.appendProject(project)
	 	})
	 }

	 appendProject(project) {
	 	let projectPalettes = [];
	 	project.paletteIds.forEach(paletteId => {
	 		let palette = allPalettes.find(palette => {
	 			return palette.id === paletteId
	 		}) 
	 		projectPalettes.push(palette)
	 	})

	 	let article = document.createElement('article');
	 	let articleTitle = document.createTextNode(project.name);
	 	article.appendChild(articleTitle)

	 	projectPalettes.forEach(projPal =>{
	 		console.log(projPal)
	 		let articleHexes = document.createTextNode(projPal.hexcodes)
	 		article.appendChild(articleHexes)
	 	})

	 	displayProjects.appendChild(article)

	 }

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
document.onload = User.getPalettes()
document.onload = User.getProjects()


