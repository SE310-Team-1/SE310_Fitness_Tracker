// This is the controller for the workouts route. The controller is responsible for handling the request and response.
const knex = require('./../db')

// Retrieve all workouts
const workoutsAll = (req, res) => {
  // Get all workouts from database
  knex
    .select('*') // select all records
    .from('workouts') // from 'workouts' table
    .then(userData => {
      // Send workouts extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving workouts: ${err}` })
    })
}

// Retrieve one workout by date
const workoutByDate = (req, res) => {
  // Get date value from URL
  const date = req.params.date

  // Get workout from database
  knex
    .select('*') // select all records
    .from('workouts') // from 'workouts' table
    .where('date', date) // where date is equal to date
    .then(userData => {
      // Send workout extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving workout: ${err}` })
    })
}


//creates a new workout
const createWorkout = (req, res) => {
    const {date} = req.params


    knex('workouts')
        .insert({
            'date': date
        })
        //if error occurs then drops insert apon error
        .onConflict('date').ignore()
        .returning('date')
        .then(date => {
            if (date.length > 0) {
                res.status(201).json({ message: 'workout added successfully'});
            } else {
                res.status(200).json({ message: 'workout already exists, no new entry created' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: `An error occurred while creating a new exercises`, error: error.message });
        });
}

//deletes an existing workout
const deleteWorkout = (req, res) => {
  const workoutDate = req.params.date
  
  knex('workouts')
      .where('date', workoutDate).del();

  /*knex('workouts')
      .insert({
          'date': date
      })
      //if error occurs then drops insert apon error
      .onConflict('date').ignore()
      .returning('date')
      .then(date => {
          if (date.length > 0) {
              res.status(201).json({ message: 'workout added successfully'});
          } else {
              res.status(200).json({ message: 'workout already exists, no new entry created' });
          }
      })
      .catch(error => {
          res.status(500).json({ message: `An error occurred while creating a new exercises`, error: error.message });
      });*/
}

module.exports = {
  workoutsAll,
  workoutByDate,
  createWorkout

};