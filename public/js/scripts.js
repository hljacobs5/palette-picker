var createProjectButton = document.querySelector('.create-project');
var projectInput = document.querySelector('.project-input');
var generateButton = document.querySelector('.generate-button');
var paletteName = document.querySelector('.palette-name');
var rectangles = document.querySelectorAll('.rectangle');
var title = document.querySelector('.title');
var savePalette = document.querySelector('.create-palette');
var displayProjects = document.querySelector('.display-projects');
var createProjectButton = document.querySelector('.create-project');
var projectSelector = document.querySelector('.select-project');
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

	convertRgbToHex(rgb) {
	    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	    function hex(x) {
	        return ("0" + parseInt(x).toString(16)).slice(-2);
	    }
	    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}

	 savePalette() {
	 	let hexCodes = [];
	 	var selectedProject = projectSelector[projectSelector.selectedIndex].value;
	 	let name = paletteName.value

	 	rectangles.forEach(rectangle => {
			let rgb = rectangle.style['background-color']
	 		let hexCode = this.convertRgbToHex(rgb)
			// let hexCode = '#' + rgb.substr(4, rgb.indexOf(')') - 4).split(',').map((color) => parseInt(color).toString(16)).join('');
	 		hexCodes.push(hexCode)
	 	})

	 	let postObject = {
	 		title: name,
	 		hexCodes: hexCodes,
	 		project_id: selectedProject
	 	}

	 	fetch('/api/v1/palettes', {
  			method: 'POST',
  			headers:{'Content-Type': 'application/json'},
  			body: JSON.stringify(postObject)
		})
		.then(response => console.log(response.json()))
	 }

	createProject() {
		let postObject = {
			name: projectInput.value,
		}
		fetch('/api/v1/projects', {
			method: 'POST',
  			headers:{'Content-Type': 'application/json'},
			body: JSON.stringify(postObject)
		})
		.then(response => {return response.json()})
		.then(jsonResponse => this.getProjects())
	}

	// getPalettes() {
	// 	palettes.forEach(palette => {
	// 		allPalettes.push(palette)
	// 	})
	// }

	 getProjects() {
		fetch('/api/v1/projects', {
			method: 'GET'
		})
		.then(response => {return response.json()})
		.then(jsonResponse => {

			for(let project of jsonResponse) {
				this.fetchPalettes(project)
			}
		})	
	 }

	 fetchPalettes(project) {
	 	fetch(`/api/v1/${project.id}/palettes`, {
	 		method: 'GET'
	 	})
	 	.then(response => {return response.json()})
	 	.then(jsonResponse => { 
	 		project.palettes = jsonResponse
	 		this.appendProject(project)
	 	})

	 }

	 appendProject(project) {
	 	let article = document.createElement('article');
	 	let articleH4 = document.createElement('h4')
	 	let articleTitle = document.createTextNode(project.name);
	 	let newOption = document.createElement('option')
	 	let projectOptions = document.createTextNode(project.name)
	 	projectSelector.appendChild(newOption)
	 	newOption.appendChild(projectOptions)
	 	newOption.setAttribute('value', project.id)
	 	articleH4.appendChild(articleTitle)
	 	article.appendChild(articleH4)
	 	this.appendPalettes(project.palettes, article)
	 }

	 appendPalettes(projectPalettes, article) {
	 	projectPalettes.forEach(projPal =>{
	 		let paletteDiv = document.createElement('div')
	 		paletteDiv.setAttribute('style', 'display: flex; justify-content: space-around; align-items: center; width: 33%;')
	 		
	 		let paletteTitleH6 = document.createElement('h6')
	 		let paletteTitle = document.createTextNode(projPal.title)
	 		
	 		paletteTitleH6.appendChild(paletteTitle)
	 		paletteDiv.appendChild(paletteTitleH6)
	 		
	 		let paletteDisplayDiv = document.createElement('div')
	 		paletteDisplayDiv.classList.add('palette-display-div')

	 		for(i=0; i < projPal['hexCodes'].length; i++) {
	 			let paletteHexDiv = document.createElement('div')
	 			paletteHexDiv.setAttribute('style', `background-color:${projPal.hexCodes[i]}; height: 20px; width: 20px;`)
	 			paletteDisplayDiv.append(paletteHexDiv)
	 		}

	 		paletteDiv.appendChild(paletteDisplayDiv)


	 		article.appendChild(paletteDiv)



	 		// let articleHexes = document.createTextNode(projPal.hexcodes)
	 		// article.appendChild(articleHexes)
	 	})
	 	displayProjects.appendChild(article)
	 }

	// deletePalette() {

	// }
}

const User = new PalettePicker();

generateButton.addEventListener('click', User.createPalette.bind(User))
savePalette.addEventListener('click', User.savePalette.bind(User))
createProjectButton.addEventListener('click', User.createProject.bind(User))

for(i=0; i < rectangles.length; i++) {
	rectangles[i].addEventListener('click', User.toggleLocks)
}
document.onload = User.createPalette()
// document.onload = User.getPalettes()
document.onload = User.getProjects()


