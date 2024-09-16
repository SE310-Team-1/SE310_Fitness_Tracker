// This is the controller for the workouts route. The controller is responsible for handling the request and response.
import knex from './../db.js';

// Retrieve all workouts
const workoutsAll = (req, res) => {
  // Get all workouts from database for the specified user
  knex
    .select('*') // select all records
    .from('workouts').where('user_id')
    .where('user_id' , req.session.user.id) // from 'workouts' table
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
    .where('date', date)
    .andWhere('user_id' ,req.session.user.id) // where date is equal to date
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
    const {date} = req.body

    const user_id = req.session.user.user_id;
  console.log("the id of the session that will be sent is : " + user_id);
    knex('workouts')
        .insert({
            'date': date ,
            'user_id' : req.session.user.id
        })
        //if error occurs then drops insert apon error
        .onConflict('user_id').ignore()
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
  const {date} = req.params

  knex('workouts')
  .where('date', date)
  .andWhere('user_id' , req.session.user.id)
    .del()
    .then(result => {
      if (result) {
        res.status(200).json({ message: 'Workout deleted successfully' });
      } else {
        res.status(404).json({ message: 'Workout not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'An error occurred while deleting a workout', error: error.message });
    });

}


const editWorkout = (req, res) => {
  let date = req.body.date
  let newDate = req.body.newDate

  knex('workouts').where({'date': date})
      .update({
          'date': newDate
          },['date'])

      .then(data => {
          if (data.length > 0) {
              res.status(200).json({ message: 'Workout was edited successfully'});
          } else {
              res.status(404).json({ message: `No workout on date: ${date}` });
          }
      })

      .catch(error => {
          // Error: Something went wrong
          res.status(500).json({ message: `An error occurred while editing Workout`, error: error.message });
      });
}
 
// Function to add routines to a workout
const addRoutines = async (req, res) => {
  const { workoutId, routineIds } = req.body; // Expecting workoutId and list of routineIds in the request body

  if (!workoutId || !Array.isArray(routineIds) || routineIds.length === 0) {
    return res.status(400).json({ error: 'Workout ID and a list of routine IDs are required.' });
  }

  try {
    // Map the routineIds to the workoutId and prepare the insert data for the join table
    const workoutRoutines = routineIds.map(routineId => ({
      workout_id: workoutId,
      routine_id: routineId,
    }));

    // Insert the workout-routine relationships into the join table
    await knex('workout_routines').insert(workoutRoutines);

    res.status(200).json({ message: 'Routines successfully added to the workout.' });
  } catch (error) {
    console.error(`Error adding routines to workout: ${error}`);
    res.status(500).json({ error: 'An error occurred while adding routines to the workout.' });
  }
};

// Retrieve all routines for a specific workout
const getRoutines = async (req, res) => {
  const { workoutId } = req.params; // Expecting workoutId in the URL parameters

  if (!workoutId) {
    return res.status(400).json({ error: 'Workout ID is required.' });
  }

  try {
    const routines = await knex('routines')
      .join('workout_routines', 'routines.id', 'workout_routines.routine_id')
      .where('workout_routines.workout_id', workoutId)
      .select('routines.*'); // Select all routine data

    if (routines.length === 0) {
      return res.status(404).json({ message: 'No routines found for this workout.' });
    }

    res.status(200).json(routines);
  } catch (error) {
    console.error(`Error retrieving routines for workout: ${error}`);
    res.status(500).json({ error: 'An error occurred while retrieving routines.' });
  }
};
// Delete all routines for a specific workout
const deleteRoutines = async (req, res) => {
  const { workoutId } = req.params; // Expecting workoutId in the URL parameters

  if (!workoutId) {
    return res.status(400).json({ error: 'Workout ID is required.' });
  }

  try {
    // Delete all records in workout_routines related to the workoutId
    const result = await knex('workout_routines')
      .where('workout_id', workoutId)
      .del();

    if (result > 0) {
      res.status(200).json({ message: 'All routines deleted successfully.' });
    } else {
      res.status(404).json({ message: 'No routines found for this workout.' });
    }
  } catch (error) {
    console.error(`Error deleting routines for workout: ${error}`);
    res.status(500).json({ error: 'An error occurred while deleting routines.' });
  }
};
export {
  workoutsAll,
  workoutByDate,
  createWorkout,
  getRoutines,
  editWorkout,
  deleteWorkout,
  addRoutines,
  deleteRoutines
}
