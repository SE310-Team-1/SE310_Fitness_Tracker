// The routes for the routines
import express from 'express';
import * as routinesController from '../controllers/routines-controller.js';

const router = express.Router();

// Get all routines
router.get('/', routinesController.routinesAll);

// Get a routine by name and date
router.get('/:name/:date', routinesController.routineByNameAndDate);

export default router;