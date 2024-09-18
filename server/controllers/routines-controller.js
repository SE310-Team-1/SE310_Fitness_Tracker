// This is the controller for the routines route. The controller is responsible for handling the request and response.
import knex from './../db.js';

// Retrieve all routines
const getRoutines = (req, res) => {
    // Get all routines from database
    knex
        .select('*') // select all routines
        .from('routines')// from 'routines' table
        .where('user_id' , req.session.user.user_id) //that matches our users id 
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
const getRoutine = (req, res) => {
    //get the id from the params
    const id = req.params.user_id;

    // Get routine from database
    knex
        .select('*') // select all records
        .from('routines') // from 'routines' table
        .where('id', id) // where name is equal to name
        .where('user_id', req.session.user.user_id) // where date is equal to date
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
const createRoutine = async (req, res) => {
    const {name , workout_id} = req.body
    const user_id = req.session.user.user_id

    // const workout = await knex('workouts').select('id').where('id', workout_id).first();

    knex('routines')
        .insert({
            'name': name,
            // 'date': date,
            'user_id' : user_id ,
            // 'workout_id' : workout
        })
        //if error occurs then drops insert apon error
        // .onConflict(['name','date']).ignore()
        .returning('name')
        .then(name => {
            if (name.length > 0) {
                res.status(201).json({ message: 'routine added successfully'});
            } else {
                res.status(200).json({ message: 'routine already exists, no new entry created' });
            }
        })        
        .catch(error => {
            res.status(500).json({ message: `An error occurred while creating a new routine`, error: error.message });
        });
}

//edit a routine allowing its name and date to change
const editRoutine = (req, res) => {
    const { id } = req.params; // Get routine ID from the request params
    const { name } = req.body; // Fields that might be updated

    // Build the update object with only the fields that are provided
    let updateFields = {};

    if (name) updateFields.name = name; // Add new name if provided

    // Check if there is something to update
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    // Update the routine only with the fields provided
    knex('routines')
        .where({ 'id': id, 'user_id': req.session.user.user_id }) // Make sure we update the right routine and user
        .update(updateFields, ['id', 'name']) // Return the updated fields
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({ message: 'Routine updated successfully', routine: data[0] });
            } else {
                res.status(404).json({ message: `Routine with ID ${id} not found or you do not have permission to edit it` });
            }
        })
        .catch(error => {
            // Handle errors
            res.status(500).json({ message: 'An error occurred while editing the routine', error: error.message });
        });
};

//deletes an existing routine
const deleteRoutine = (req, res) => {
    const { id } = req.params;

  
    knex('routines')
    .where('id' , id)
    .where('user_id', req.session.user.user_id)
      .del()
      .then(result => {
        if (result) {
          res.status(200).json({ message: 'Routine deleted successfully' });
        } else {
          res.status(404).json({ message: 'Routine not found' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'An error occurred while deleting a routine', error: error.message });
      });
  
}

const getAllRoutineInfo = (req, res) => {
    
    knex('routines')
        .join('exercises_history', 'routines.date', '=', 'exercises_history.date')
        .join('exercises', 'exercises_history.name', '=', 'exercises.name')
        .select('routines.name as routine_name', 'routines.date', 'exercises_history.sets', 'exercises.name as exercise_name', 'exercises_history.weight', 'exercises.muscle_group')
        .where('user_id', req.session.user.user_id)
        .then(result => {
            // Send the query result back as a JSON response
            res.status(200).json(result);
        })
        .catch(error => {
            // Handle any errors that occurred during the query
            console.error('Error fetching routine information:', error);
            res.status(500).json({ error: 'An error occurred while fetching routine information' });
        });

};
// Get all exercise IDs for a specific routine
const getExerciseIdsForRoutine = (req, res) => {
    const { id } = req.params; // Routine ID
    const user_id = req.session.user.user_id;

    knex('exercises')
        .select('id')
        .where({
            routine_id: id,
            user_id: user_id
        })
        .then(exercises => {
            if (exercises.length > 0) {
                res.status(200).json({ exerciseIds: exercises.map(exercise => exercise.id) });
            } else {
                res.status(404).json({ message: 'No exercises found for this routine or you do not have access.' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error retrieving exercises', error: error.message });
        });
};


export {
    getRoutines,
    getRoutine,
    createRoutine,
    deleteRoutine,
    editRoutine,
    getAllRoutineInfo,
    getExerciseIdsForRoutine
}
