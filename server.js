const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

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

app.get('/api/v1/projects', (request, response) => {
	database('projects').select()
    .then((projects) => {
      response.status(200).json(projects);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
})

app.get('/api/v1/palettes', (request, response) => {
	database('palettes').select()
    .then((palettes) => {
      const fixedPalettes = getFixedPalettes(palettes)
      response.status(200).json(fixedPalettes);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
})

app.get('/api/v1/:projectId/palettes', (request, response) => {
	database('palettes').where('project_id', request.params.projectId).select()
    .then(palettes => {
     const fixedPalettes = getFixedPalettes(palettes)
     response.status(200).json(fixedPalettes);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
})

function getFixedPalettes(palettes) {
	const fixedPalettes = []
      for(let palette of palettes) {
      	palette.hexCodes = palette.hexCodes.split(',')
      	fixedPalettes.push(palette)
      }
      return fixedPalettes
}

app.post('/api/v1/palettes', (request, response) => {
	const palette = request.body;

	if (!palette) {
		return response.status(422).json({ error: 'No palette object provided' })
	}

	for (let requiredParameter of ['title', 'hexCodes', 'project_id']) {
		if (!palette[requiredParameter]) {
			return response.status(422).json({error: `Expected format: {title: <STRING>, hexCodes: 
				<STRING>. Missing the required parameter of ${requiredParameter}.`})
		}

	}

	palette.hexCodes = palette.hexCodes.join(',')
	database('palettes').insert(palette, 'id')
		.then(palette => {
	      response.status(201).json({ id: palette[0] })
	    })
	    .catch(error => {
	      response.status(500).json({ error });
	    });
})

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for (let requiredParameter of ['name']) {
    if (!project[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('projects').insert(project, 'id')
    .then(project => {
      response.status(201).json({ id: project[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });	
})

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});