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

// Retrieve one workout by date
const workoutByDate = (req, res) => {
  // Get date value from URL
  const id = req.params.id

  // Get workout from database
  knex
    .select('*') // select all records
    .from('workouts') // from 'workouts' table
    .where('id', id)
    .andWhere('user_id' ,req.session.user.user_id) // where date is equal to date
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

    knex('workouts')
        .insert({
            'date': date ,
            'user_id' : req.session.user.user_id
        })
        //if error occurs then drops insert apon error
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

const setScore = (req, res) => {
  const { score, workout_id } = req.body;

  knex('workouts')
    .where('id', workout_id)
    .andWhere('user_id', req.session.user.user_id)
    .update({ score })
    .returning('score') 
    .then(updatedScore => {
      if (updatedScore.length > 0) {
        res.status(201).json({ message: 'Score updated successfully', score: updatedScore[0] });
      } else {
        res.status(400).json({ message: 'Error updating score in the setscore function' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `There was an error updating the score in the setscore function: ${err}` });
    });
};

//deletes an existing workout
const deleteWorkout = (req, res) => {
  const {id} = req.params

  knex('workouts')
  .where('id', id)
  .andWhere('user_id' , req.session.user.user_id)
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
 
const addExercises = async (req, res) => {
  const { workoutId, exercise_ids } = req.body; // Expecting workoutId and list of exerciseIds in the request body

  if (!workoutId || !Array.isArray(exercise_ids) || exercise_ids.length === 0) {
    return res.status(400).json({ error: 'Workout ID and a list of exercise IDs are required.' });
  }

  try {
    // Map the exerciseIds to the workoutId and prepare the insert data for the join table
    const workoutExercises = exercise_ids.map(exerciseId => ({
      workout_id: workoutId,
      exercise_id: exerciseId,
      user_id : req.session.user.user_id
    }));

    // Insert the workout-exercise relationships into the join table
    await knex('workout_exercises').insert(workoutExercises);

    res.status(200).json({ message: 'Exercises successfully added to the workout.' });
  } catch (error) {
    console.error(`Error adding exercises to workout: ${error}`);
    res.status(500).json({ error: 'An error occurred while adding exercises to the workout.' });
  }
};


const getExercises = async (req, res) => {
  const { id } = req.params; // Expecting workoutId in the URL parameters
  console.log("id is " + id)
  if (!id) {
    return res.status(400).json({ error: 'Workout ID is required.' });
  }

  try {
    const exercises = await knex('workout_exercises as we')
      .join('exercises as e', 'e.id', 'we.exercise_id')
      .where('we.workout_id', id)
      .andWhere('we.user_id', req.session.user.user_id) // Use session user ID for filtering
      .select('e.id', 'e.name', 'e.muscle_group', 'e.Sets', 'e.weight', 'we.sets_completed'); // Including sets_completed from workout_exercises

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
  const { workoutId } = req.params; // Expecting workoutId in the URL parameters

  if (!workoutId) {
    return res.status(400).json({ error: 'Workout ID is required.' });
  }

  try {
    // Delete all records in workout_exercises related to the workoutId
    const result = await knex('workout_exercises')
      .where('workout_id', workoutId)
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
const deleteExercise = async (req, res) => {
  const { workoutId, exerciseId } = req.params; // Expecting workoutId and exerciseId in the URL parameters

  if (!workoutId || !exerciseId) {
    return res.status(400).json({ error: 'Workout ID and Exercise ID are required.' });
  }

  try {
    // Delete the specific exercise from the workout_exercises table
    const result = await knex('workout_exercises')
      .where('workout_id', workoutId)
      .andWhere('exercise_id', exerciseId)
      .andWhere('user_id', req.session.user.id) // Ensure the user is the owner
      .del();

    if (result > 0) {
      res.status(200).json({ message: 'Exercise deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Exercise not found for this workout.' });
    }
  } catch (error) {
    console.error(`Error deleting exercise: ${error}`);
    res.status(500).json({ error: 'An error occurred while deleting the exercise.' });
  }
};


export {
  workoutsAll,
  workoutByDate,
  createWorkout,
  getExercises,
  editWorkout,
  deleteWorkout,
  addExercises,
  deleteExercises,
  deleteExercise
}
