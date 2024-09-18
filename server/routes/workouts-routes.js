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
router.delete('/:id', workoutsController.deleteWorkout);

//edit existing workout of an id 
router.put('/',workoutsController.editWorkout);

// take in the id of the workout , as well as a list of id's . from there we will add the exercises from the exercise table to the workout 
// this is added to the workout_exercises table to represent the relationship. 
router.put('/exercises' , workoutsController.addExercises );

//gets the list of the exercises for the specified user 
router.get('/:id/exercise-list' , workoutsController.getExercises);

//takes in a list of exercise ids and removes those from the workout
router.delete('/exercises' , workoutsController.deleteExercises)

//takes in an exercise ids and removes that exercise from the workout
router.delete('/exercise' , workoutsController.deleteExercises)


export default router;



