// The routes for the routines
import express from 'express';
import * as routinesController from '../controllers/routines-controller.js';

const router = express.Router();

// Get all routines
router.get('/', routinesController.routinesAll);

// Get a routine by name and date
router.get('/:name/:date', routinesController.routineByNameAndDate);

// create a new routine
router.post('/:name/:date', routinesController.createRoutine);

router.delete('/delete/:name/:date', routinesController.deleteRoutine);

//edit a routine
router.put('/edit/:name/:date/:newName/:newDate',routinesController.editRoutine);

//get all routine information
router.get('/all/:name/:date', routinesController.getAllRoutineInfo);


export default router;