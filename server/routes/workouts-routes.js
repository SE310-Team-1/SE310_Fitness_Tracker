// The routes for workouts
// What are routes? Routes are used to determine the structure of the URL. 

import express from 'express';
import * as workoutsController from '../controllers/workouts-controller.js';

const router = express.Router()

// Get all workouts
router.get('/all', workoutsController.workoutsAll)

// Get workout by date, in format 'YYYY-MM-DD'
router.get('/:date', workoutsController.workoutByDate)

router.post('/create/:date', workoutsController.createWorkout)

router.delete('/delete/:date', workoutsController.deleteWorkout)

router.put('/edit/:date/:newDate',workoutsController.editWorkout);

export default router;
