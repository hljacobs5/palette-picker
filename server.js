const express = require('express');
const app = express();

app.use(express.static('public'))

app.get('/', (request, response) => {
	response.send('palette picker');
});

app.get('/api/v1/projects', (request, response) => {
	
})

app.get('/api/v1/palettes', (request, response) => {

})

app.post('/api/v1/palettes', (request, response) => {

})

app.post('/api/v1/projects', (request, response) => {
	
})

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});