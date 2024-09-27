import knex from './../db.js';

// Create a new exercise
const createExercise = (req, res) => {
    const { name, muscle_group, sets, weight, routine_id } = req.body;
    const user_id = req.session.user.user_id;

    knex('exercises')
        .insert({
            "name": name,
            "muscle_group": muscle_group,
            "sets": sets,
            "weight": weight,
            "user_id": user_id,
            "routine_id": routine_id 
        })
        .returning('id')
        .then((id) => {
            res.status(201).json({ message: 'Exercise created successfully', id: id[0] });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error creating exercise', error: error.message });
        });
};

// Retrive an exercise by id. To facilitate getting multiple exercises, the id can be a comma separated list of IDs
const getExercise = (req, res) => {
    const { id } = req.params;
    const user_id = req.session.user.user_id;

    // If the id is a comma separated list of IDs, split it into an array
    const ids = id.split(',');

    knex('exercises')
        .whereIn('id', ids)
        .where('user_id', user_id)
        .then(exercise => {
            if (exercise.length > 0) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ message: 'Exercises not found or unauthorized' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error retrieving exercise', error: error.message });
        });
};

// Update an existing exercise
const updateExercise = (req, res) => {
    const { id } = req.params;
    const { name, muscle_group, sets, weight, routine_id } = req.body;
    const user_id = req.session.user.user_id;

    knex('exercises')
        .where({ id, user_id }) 
        .update({
            "name": name,
            "muscle_group": muscle_group,
            "sets": sets,
            "weight": weight,
            "user_id": user_id,
            "routine_id": routine_id 
        })
        .then(result => {
            if (result) {
                res.status(200).json({ message: 'Exercise updated successfully' });
            } else {
                res.status(404).json({ message: 'Exercise not found or unauthorized' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error updating exercise', error: error.message });
        });
};

// Delete an exercise
const deleteExercise = (req, res) => {
    const { id } = req.params;
    const user_id = req.session.user.user_id;

    knex('exercises')
        .where({ id, user_id }) 
        .del()
        .then(result => {
            if (result) {
                res.status(200).json({ message: 'Exercise deleted successfully' });
            } else {
                res.status(404).json({ message: 'Exercise not found or unauthorized' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error deleting exercise', error: error.message });
        });
};

export {
    createExercise,
    getExercise,
    updateExercise,
    deleteExercise
};
