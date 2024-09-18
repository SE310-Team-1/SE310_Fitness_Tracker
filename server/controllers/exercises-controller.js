import knex from './../db.js';

// Create a new exercise
const createExercise = (req, res) => {
    const { name, muscle_group, routine_id } = req.body;
    const user_id = req.session.user.user_id;

    knex('exercises')
        .insert({
            name,
            muscle_group,
            routine_id,
            user_id
        })
        .then(() => {
            res.status(201).json({ message: 'Exercise created successfully' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error creating exercise', error: error.message });
        });
};

// Update an existing exercise
const updateExercise = (req, res) => {
    const { id, name, muscle_group, routine_id } = req.body;
    const user_id = req.session.user.user_id;

    knex('exercises')
        .where({ id, user_id }) 
        .update({
            name,
            muscle_group,
            routine_id
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
    const { name } = req.body;
    const user_id = req.session.user.user_id;

    knex('exercises')
        .where({ name, user_id }) 
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
    updateExercise,
    deleteExercise
};
