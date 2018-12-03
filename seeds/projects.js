exports.seed = function(knex, Promise) {

  return knex('palettes').del() // delete all footnotes first
    .then(() => knex('projects').del()) // delete all palettes

    // Now that we have a clean slate, we can re-insert our projects data
    .then(() => {
      return Promise.all([
        
        // Insert a single projects, return the projects ID, insert 2 footnotes
        knex('projects').insert({
          name: 'Project-1'
        }, 'id')
        .then(projects => {
          return knex('palettes').insert([
            {title: 'Warm Colors', hexCodes: '#CCC,#FFF', project_id: projects[0] },
            {title: 'Cool Colors', hexCodes: '#000,#CCC', project_id: projects[0] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`)),

        // Insert a single projects, return the projects ID, insert 2 footnotes
        knex('projects').insert({
          name: 'Project-2'
        }, 'id')
        .then(projects => {
          return knex('palettes').insert([
            {title: 'Nature', hexCodes: '#FFF,#000', project_id: projects[0] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};