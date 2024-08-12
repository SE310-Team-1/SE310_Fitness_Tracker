// The routes for workouts
// What are routes? Routes are used to determine the structure of the URL. 

const express = require('express')

const workoutsController = require('../controllers/workouts-controller')

const router = express.Router()

// Get all workouts
router.get('/all', workoutsController.workoutsAll)

// Get workout by date, in format 'YYYY-MM-DD'
router.get('/:date', workoutsController.workoutByDate)

router.post('/create/:date', workoutsController.createWorkout)

module.exports = router;