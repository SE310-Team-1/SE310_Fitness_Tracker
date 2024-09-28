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
            console.log(userData)
            res.json(userData)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving routines: ${err}` })
        }
        )
}

// Retrieve routine by id. 
const getRoutine = (req, res) => {
    // Get exercise ID from request
    const { id } = req.params;


    // Get routine from database
    knex
        .select('*') // select all records
        .from('routines') // from 'routines' table
        .where('id', id) // where id is equal to routine ID
        .where('user_id', req.session.user.user_id) // where user_id is equal to the user's ID
        .then(userData => {
            if (userData.length > 0) {
                // Send routine extracted from database in response
                res.json(userData)
            } else {
                // Send a error message in response
                res.status(404).json({ message: `Routine with IDs ${ids} not found or unauthorised` })
            }
        })
        .catch(err => {
            // Send a error message in response
            res.status(500).json({ message: `There was an error retrieving routine: ${err}` })
        }
        )
}

// Creates a new routine
const createRoutine = async (req, res) => {
    const {name, muscles, date} = req.body
    const user_id = req.session.user.user_id

    knex('routines')
        .insert({
            'name': name,
            'muscles': muscles,
            'date': date,
            'user_id' : user_id ,
        })
        .returning('id')
        .then(id => {
            res.status(201).json({ message: `Routine created successfullys`, id: id[0] });
        })        
        .catch(error => {
            res.status(500).json({ message: `An error occurred while creating a new routine`, error: error.message });
        });
}

// Edit a routine allowing its name to be updated
const editRoutine = (req, res) => {
    const { id } = req.params; // Get routine ID from the request params
    const { name, muscles, date } = req.body; // Fields that might be updated

    // Build the update object with only the fields that are provided
    let updateFields = {};

    if (name) updateFields.name = name; // Add new name if provided
    if (muscle_group) updateFields.muscles = muscles; // Add new muscle_group if provided
    if (date) updateFields.date = date; // Add new date if provided

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

// Deletes an existing routine
const deleteRoutine = (req, res) => {
    const { id } = req.params;

    // Delete the routine and all exercises associated with it
    knex('routines')
        .where({ 'id': id, 'user_id': req.session.user.user_id }) // Make sure we delete the right routine and user
        .del()
        .then(data => {
            if (data) {
                knex('exercises')
                    .where({ 'routine_id': id, 'user_id': req.session.user.user_id }) // Make sure we delete the right exercises and user
                    .del()
                    .then(() => {
                        res.status(200).json({ message: 'Routine and associated exercises deleted successfully' });
                    })
                    .catch(error => {
                        res.status(500).json({ message: 'An error occurred while deleting the exercises associated with the routine', error: error.message });
                    });
            } else {
                res.status(404).json({ message: `Routine with ID ${id} not found or you do not have permission to delete it` });
            }
        })
        .catch(error => {
            // Handle errors
            res.status(500).json({ message: 'An error occurred while deleting the routine', error: error.message });
        });

    
  
}

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
    getExerciseIdsForRoutine
}
