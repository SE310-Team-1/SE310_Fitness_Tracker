// The routes for workouts
// What are routes? Routes are used to determine the structure of the URL. 

import express from 'express';
import * as workoutsController from '../controllers/workouts-controller.js';

const router = express.Router()

// Get all workouts of a user
router.get('/', workoutsController.workoutsAll);

// Get workout by id
router.get('/:id', workoutsController.workoutById);

//create a workout with a given date.
router.post('/', workoutsController.createWorkout);

//delete workout of a given id 
router.delete('/:id', workoutsController.deleteWorkout);

//edit existing workout of an id 
router.put('/:id',workoutsController.editWorkout);

// take in the id of the workout , as well as a list of id's . from there we will add the exercises from the exercise table to the workout 
// this is added to the workout_exercises table to represent the relationship. 
router.post('/:id/exercises' , workoutsController.addExercises );

//gets the list of the exercises for the specified user 
router.get('/:id/exercises' , workoutsController.getExercises);

//takes in a list of exercise ids in the body and removes those from the workout
router.delete('/:id/exercises' , workoutsController.deleteExercises)

// Edits the sets completed for a given exercise in a workout
router.put('/:id/exercises/:exerciseId', workoutsController.editExercise);

export default router;



