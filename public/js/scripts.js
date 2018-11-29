var createProjectButton = document.querySelector('.create-project');
var projectInput = document.querySelector('.project-input');
var generateButton = document.querySelector('.generate-button');
var paletteName = document.querySelector('.palette-name');
var rectangles = document.querySelectorAll('.rectangle')

generateButton.addEventListener('click', generateHexCode)

function generateHexCode {
	var randomColor = Math.floor(Math.random()*16777215).toString(16);
}

function createPalette(event) {
	var palettes = [];
	
}

// function toggleLocks(event) {

// }
