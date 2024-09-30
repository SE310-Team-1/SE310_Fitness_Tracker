// The routes for the routines
import express from 'express';
import * as routinesController from '../controllers/routines-controller.js';

const router = express.Router();

// route path : /routine

// Get all routines
router.get('/', routinesController.getRoutines);

// Get a routine by routine id
router.get('/:id', routinesController.getRoutine);

// create a new routine
router.post('/', routinesController.createRoutine);

//delete a routine by id
router.delete('/:id', routinesController.deleteRoutine);

//edit a routine / must provide atleast one request body value alongside the id of the routine to edit
router.put('/:id',routinesController.editRoutine);

// Get all exercise IDs for a routine
router.get('/:id/exercises', routinesController.getExerciseIdsForRoutine);



export default router;