// This is the controller for the routines route. The controller is responsible for handling the request and response.
const knex = require('./../db')

// Retrieve all exercises
const exercisesAll = (req, res) => {
    // Get all exercises from database
    knex
        .select('*') // select all exercises
        .from('exercise_history') // from 'exercise_history' table
        .then(userData => {
            // Send exercises extracted from database in response
            res.json(userData)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving exercises: ${err}` })
        }
        )
}

// Retrieve one exercise by name, date and sets
const exerciseByNameDateAndSets = (req, res) => {

    const name = req.params.name
    const date = req.params.date
    const sets = req.params.sets

    knex
        .select('exercise_history.name', 'exercise_history.date', 'exercise_history.sets', 'exercise_history.reps', 'exercise_history.weight', 'exercise_history.score', 'exercises.muscle_group')
        .from('exercise_history')
        .where('name', name)
        .where('date', date)
        .where('sets', sets)
        // Join with exercises table to get muscle group
        .join('exercises', 'exercise_history.name', 'exercises.name')

        .then(userData => {
            if (userData.length > 0) {
                res.json(userData)
            } else {
                res.status(404).json({ message: `Exercise with name ${name} and date ${date} not found.` })
            }
        })

        .catch(err => {
            res.status(500).json({ message: `There was an error retrieving exercise: ${err}` })
        }
        )

}

const getScoreByDate = (req, res) => {
    const {date} = req.params

    knex
        .select('exercises.muscle_group','exercises_history.date').sum('exercises_history.score')
        .from('exercises_history')

       
        // Join with exercises table to get muscle group
        .join('exercises', 'exercises_history.name', 'exercises.name')
        .where('exercises_history.date', date)
        .groupBy('exercises_history.date','exercises.muscle_group')

        .then(userData => {
            if (userData.length > 0) {
                res.json(userData)
            } else {
                res.status(404).json({ message: `Workout on date: ${date} not found.` })
            }
        })

        .catch(err => {
            res.status(500).json({ message: `There was an error retrieving exercise: ${err}` })
        }
        )


}


//creates a new exercise
const createExercise = (req, res) => {
    const {name,muscleGroup} = req.params


    knex('exercises')
        .insert({
            'name': name,
            'muscle_group': muscleGroup
        })
        //if error occurs then drops insert apon error
        .onConflict('name').ignore()
        .returning('name')
        .then(name => {
            if (name.length > 0) {
                res.status(201).json({ message: 'Exercise added successfully'});
            } else {
                res.status(200).json({ message: 'Exercise already exists, no new entry created' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: `An error occurred while creating a new exercises`, error: error.message });
        });
}

//logs new exercise Set
const logExerciseSet = (req, res) => {
    const {name,date,set,weight,rep,score}= req.params


    knex('exercises_history')
        .insert({
            'name': name,
            'date': date,
            'set': set,
            'weight': weight,
            'rep':rep,
            'score':score
        })
        //if conflict occurs then drops current insert apon error
        .onConflict(['name','date','set']).ignore()
        .returning('name')  
        .then(name => {
            if (name.length > 0) {
                res.status(201).json({ message: 'Exercise set added successfully'});
            } else {
                res.status(200).json({ message: 'Conflicting exercise name, date of completion, or set number. no new entry created' });
            }
        })
        .catch(error => {
            // Error: Something went wrong
            res.status(500).json({ message: `An error occurred while creating a new exercises`, error: error.message });
        });
}

module.exports = {
    exercisesAll,
    exerciseByNameDateAndSets,
    createExercise,
    logExerciseSet,
    getScoreByDate
  };
