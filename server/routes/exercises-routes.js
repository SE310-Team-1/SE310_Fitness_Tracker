// The routes for exercises

const express = require('express')

const exercisesController = require('../controllers/exercises-controller')

const router = express.Router()

// Get all exercises
router.get('/all', exercisesController.exercisesAll)

// Get exercise by name, date and set
router.get('/:name/:date/:set', exercisesController.exerciseByNameDateAndSets)

router.get('/score/:date', exercisesController.getScoreByDate)

//Create a new exercise
router.post('/create/:name/:muscle_group', exercisesController.createExercise)

//Log a set
router.post('/Log/:name/:date/:set/:weight/:rep/:score', exercisesController.logExerciseSet)


module.exports = router;