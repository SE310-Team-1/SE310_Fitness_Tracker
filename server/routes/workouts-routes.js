// The routes for workouts
// What are routes? Routes are used to determine the structure of the URL. 

import express from 'express';
import * as workoutsController from '../controllers/workouts-controller.js';

const router = express.Router()

// Get all workouts of a user
router.get('/workouts', workoutsController.workoutsAll);

// Get workout by id
router.get('/:id', workoutsController.workoutByDate);

//create a workout with a given date.
router.post('/', workoutsController.createWorkout);

//delete workout of a given id 
router.delete('/', workoutsController.deleteWorkout);

//edit existing workout of an id 
router.put('/',workoutsController.editWorkout);

//add a list of routines to the workout of a given id:
router.put('/routines' , workoutsController.addRoutines );

//gets the list of the routines for the specified user 
router.get('/routines' , workoutsController.getRoutines);
//takes in a list of routine ids and removes those from the workout
router.delete('/routines' , workoutsController.deleteRoutines)


export default router;



