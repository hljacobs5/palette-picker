const express = require('express')
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'))
app.use(bodyParser.json());

app.locals.title = 'Stored Palettes';
app.locals.palettes = [
	{id: 1, title: 'Warm Colors', hexCodes: ['#CCC', '#FFF']},
	{id: 2, title: 'Cool Colors', hexCodes: ['#000', '#CCC']},
	{id: 3, title: 'Nature', hexCodes: ['#FFF', '#000']}
];

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
	response.send('palette picker');
});

// app.get('/api/v1/projects', (request, response) => {
	
// })

app.get('/api/v1/palettes', (request, response) => {
	const palettes = app.locals.palettes;

	return response.json(palettes)
})

app.post('/api/v1/palettes', (request, response) => {
	console.log(request.body, response.body)
	const palette = request.body;
	const id = app.locals.palettes[app.locals.palettes.length - 1].id + 1;

	if (!palette) {
		return response.status(422).json({ error: 'No palette object provided' })
	}

	// for (let requiredParameter in ['title', 'hexCodes']) {
	// 	if (!palette[requiredParameter]) {
	// 		return response.status(422).json({error: `Expected format: {title: <STRING>, hexCodes: 
	// 			<STRING>. Missing the required parameter of ${requiredParameter}.`})
	// 	}
	// }

	app.locals.palettes.push({ id, ...palette });

	return response.status(201).json({id});
})

// app.post('/api/v1/projects', (request, response) => {
	
// })

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});