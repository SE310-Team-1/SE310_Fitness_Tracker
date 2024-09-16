// The routes for the routines
import express from 'express';
import * as routinesController from '../controllers/routines-controller.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// route path : /routines

// Get all routines
router.get('/', routinesController.getRoutines);

// Get a routine by routine id
router.get('/:id', routinesController.getRoutine);

// create a new routine with name and date
router.post('/', routinesController.createRoutine);

//delete a routine by id
router.delete('/:id', routinesController.deleteRoutine);


//edit a routine / must provide atleast one request body value alongside the id of the routine to edit
router.put('/:id',routinesController.editRoutine);

//get all routine information for the specified user
router.get('/info-list', routinesController.getAllRoutineInfo);



export default router;