// This is the controller for the workouts route. The controller is responsible for handling the request and response.
import knex from './../db.js';

// Retrieve all workouts
const workoutsAll = (req, res) => {
  // Get all workouts from database for the specified user
  console.log(req.session.user.user_id)
  knex
    .select('*') // select all records
    .from('workouts')
    .where('user_id' , req.session.user.user_id) // from 'workouts' table
    .then(userData => {
      // Send workouts extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving workouts: ${err}` })
    })
}

// Retrieve one workout by id
const workoutById = (req, res) => {
  // Get date value from URL
  const id = req.params.id

  // Get workout from database
  knex
    .select('*') // select all records
    .from('workouts') // from 'workouts' table
    .where('id', id) // where id is the specified id
    .andWhere('user_id' ,req.session.user.user_id) // where user_id is the specified user
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
    const {date, score} = req.body

    knex('workouts')
    .insert({
      date: date,
      score: score,
      user_id : req.session.user.user_id
    })
    .returning('id')
    .then(id => {
      res.status(200).json({ message: 'Workout created successfully', id: id[0] });
    })
    .catch(error => {
      res.status(500).json({ message: 'An error occurred while creating a workout', error: error.message });
    });
}

//deletes an existing workout
const deleteWorkout = (req, res) => {
  const {id} = req.params

  knex('workouts')
  .where('id', id)
  .andWhere('user_id' , req.session.user.user_id)
    .del()
    .then(result => {
      if (result) {
        knex('workout_exercises')
          .where('workout_id', id)
          .del()
          .then(() => {
            res.status(200).json({ message: 'Workout deleted successfully' });
          })
          .catch(error => {
            res.status(500).json({ message: 'An error occurred while deleting exercises', error: error.message });
          })
      } else {
        res.status(404).json({ message: 'Workout not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'An error occurred while deleting a workout', error: error.message });
    });

}

const editWorkout = (req, res) => {
  let id = req.params.id;
  let { date, score } = req.body;

  knex('workouts').where({'date': date})
      .update({
          'score': score,
          'date': date,
      })
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
 
// Takes in a list of exercise ids and sets completed and adds them to the workout
const addExercises = async (req, res) => {
  const { id } = req.params; // Expecting workoutId in the URL parameters
  const { exercises } = req.body; // Expecting workoutId and list of exerciseIds (with sets completed) in the request body

  if (!id || !Array.isArray(exercises) || exercises.length === 0) {
    return res.status(400).json({ error: 'Workout ID and a list of exercise IDs (with sets completed) are required.' });
  }

  // Map the exerciseIds to the workoutId and prepare the insert data for the join table
  const workoutExercises = exercises.map(({exercise_id, sets_completed}) => ({
    workout_id: id,
    exercise_id: exercise_id,
    sets_completed: sets_completed,
    user_id : req.session.user.user_id
  }));
  
  // Insert the workout-exercise relationships into the join table
  knex('workout_exercises')
    .insert(workoutExercises)
    .then(() => {
      res.status(200).json({ message: 'Exercises successfully added to the workout.' });
    })
    .catch(error => {
      console.error(`Error adding exercises to workout: ${error}`);
      res.status(500).json({ error: 'An error occurred while adding exercises to the workout.' });
    });
};

const getExercises = async (req, res) => {
  const { id } = req.params; 

  if (!id) {
    return res.status(400).json({ error: 'Workout ID is required.' });
  }

  try {
    const exercises = await knex('workout_exercises as we')
      .join('exercises as e', 'e.id', 'we.exercise_id')
      .where('we.workout_id', id)
      .andWhere('we.user_id', req.session.user.user_id) 
      .select('e.id', 'we.id', 'e.name', 'e.reps', 'e.setsGoal', 'e.weight', 'we.sets_completed');

    if (exercises.length === 0) {
      return res.status(404).json({ message: 'No exercises found for this workout.' });
    }

    res.status(200).json(exercises);
  } catch (error) {
    console.error(`Error retrieving exercises for workout: ${error}`);
    res.status(500).json({ error: 'An error occurred while retrieving exercises.' });
  }
};

const deleteExercises = async (req, res) => {
  const { id } = req.params; // Expecting workoutId in the URL parameters

  if (!id) {
    return res.status(400).json({ error: 'Workout ID is required.' });
  }

  try {
    // Delete all records in workout_exercises related to the workoutId
    const result = await knex('workout_exercises')
      .where('workout_id', id)
      .where('user_id' ,req.session.user.user_id)
      .del();

    if (result > 0) {
      res.status(200).json({ message: 'All exercises deleted successfully.' });
    } else {
      res.status(404).json({ message: 'No exercises found for this workout.' });
    }
  } catch (error) {
    console.error(`Error deleting exercises for workout: ${error}`);
    res.status(500).json({ error: 'An error occurred while deleting exercises.' });
  }
};

const editExercise = async (req, res) => {
  const { id, exerciseId } = req.params; // Expecting workput id and exerciseId in the URL parameters
  const { sets_completed } = req.body; // Expecting sets completed in the request body

  if (!id || !exerciseId || !sets_completed) {
    return res.status(400).json({ error: 'Workout ID, exercise ID, and sets completed are required.' });
  }

  try {
    // Update the sets completed for the specified workout and exercise
    const result = await knex('workout_exercises')
      .where('workout_id', id)
      .andWhere('exercise_id', exerciseId)
      .andWhere('user_id' ,req.session.user.user_id)
      .update({ sets_completed });

    if (result > 0) {
      res.status(200).json({ message: 'Exercise sets completed updated successfully.' });
    } else {
      res.status(404).json({ message: 'No exercises found for this workout.' });
    }
  } catch (error) {
    console.error(`Error updating exercise sets completed: ${error}`);
    res.status(500).json({ error: 'An error occurred while updating exercise sets completed.' });
  }
}

const getWorkoutScoreByDate = async (req, res) => {
  const { date } = req.params;

  if (!date) {
    return res.status(400).json({ error: 'Date is required.' });
  }

  try {
    const workout = await knex('workouts')
      .where('date', date)
      .andWhere('user_id', req.session.user.user_id)
      .first();

    if (!workout) {
      return res.status(404).json({ message: 'No workout found for this date.' });
    }

    res.status(200).json({ score: workout.score });
  } catch (error) {
    console.error(`Error retrieving workout score: ${error}`);
    res.status(500).json({ error: 'An error occurred while retrieving workout score.' });
  }
}

export {
  workoutsAll,
  workoutById,
  createWorkout,
  editWorkout,
  deleteWorkout,
  addExercises,
  getExercises,
  deleteExercises,
  editExercise,
  getWorkoutScoreByDate
}
