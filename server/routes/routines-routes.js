// The routes for the routines

const express = require('express');

const routinesController = require('../controllers/routines-controller');

const router = express.Router();

// Get all routines
router.get('/', routinesController.routinesAll);

// Get a routine by name and date
router.get('/:name/:date', routinesController.routineByNameAndDate);

// create a new routine
router.post('/:name/:date', routinesController.createRoutine);

router.delete('/delete/:name/:date', routinesController.deleteRoutine);


module.exports = router;