// This is the controller for the routines route. The controller is responsible for handling the request and response.
const knex = require('./../db')

// Retrieve all workouts
const routinesAll = (req, res) => {
    // Get all routines from database
    knex
        .select('*') // select all routines
        .from('routines') // from 'routines' table
        .then(userData => {
            // Send routines extracted from database in response
            res.json(userData)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving routines: ${err}` })
        }
        )
}

// Retrieve one routine by name and date
const routineByNameAndDate = (req, res) => {
    // Get name and date values from URL
    const name = req.params.name
    const date = req.params.date

    // Get routine from database
    knex
        .select('*') // select all records
        .from('routines') // from 'routines' table
        .where('name', name) // where name is equal to name
        .where('date', date) // where date is equal to date
        .then(userData => {
            if (userData.length > 0) {
                // Send routine extracted from database in response
                res.json(userData)
            } else {
                // Send a error message in response
                res.status(404).json({ message: `Routine with name ${name} and date ${date} not found.` })
            }
        })
        .catch(err => {
            // Send a error message in response
            res.status(500).json({ message: `There was an error retrieving routine: ${err}` })
        }
        )
}

//creates a new routine
const createRoutine = (req, res) => {
    const {name,date} = req.params


    knex('routines')
        .insert({
            'name': name,
            'date': date
        })
        //if error occurs then drops insert apon error
        .onConflict('name').ignore()
        .returning('name')
        .then(name => {
            if (name.length > 0) {
                res.status(201).json({ message: 'routine added successfully'});
            } else {
                res.status(200).json({ message: 'routine already exists, no new entry created' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: `An error occurred while creating a new exercises`, error: error.message });
        });
}

//deletes an existing routine
const deleteRoutine = (req, res) => {
    const {name} = req.params
    const {date} = req.params
    console.log('Deleting routine:', name);

    knex('routines')
    .where('name', name)
    .where('date', date)
      .del()
      .then(result => {
        if (result) {
          res.status(200).json({ message: 'Routine deleted successfully' });
        } else {
          res.status(404).json({ message: 'Routine not found' });
        }
    })
        .catch(error => {
        res.status(500).json({ message: 'An error occurred while deleting an routine', error: error.message });
    });
  
}

module.exports = {
    routinesAll,
    routineByNameAndDate,
    createRoutine,
    deleteRoutine
};