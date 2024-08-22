// The routes for exercises
import express from 'express';
import { exercisesAll, exercisesAllHistory, exercisesDay, exerciseByNameDateAndSets, createExercise, logExerciseSet, getScoreByDate, editExercise, editSet, deleteExercise, deleteExerciseHistory } from '../controllers/exercises-controller.js';


const router = express.Router()

// Get all exercises
router.get('/all', exercisesAll)

// Get all exercises in history
router.get('/history', exercisesAllHistory)

// Get all exercises in one day
router.get('/:date', exercisesDay)

// Get exercise by name, date and sets
router.get('/:name/:date/:sets', exerciseByNameDateAndSets)

router.get('/score/:date', getScoreByDate)

//Create a new exercise
router.post('/create/:name/:muscle_group', createExercise)

//Log a set
router.post('/Log/:name/:date/:set/:weight/:rep/:score', logExerciseSet)

//edit a exercise
router.put('/edit/:name/:newname/:muscle_group', editExercise)

//Delete an existing exercise
router.delete('/delete/:name', deleteExercise)

//Delete an existing set from exercise history
router.delete('/delete/:name/:date/:set', deleteExerciseHistory)

//edit a logged set of an exercise
router.put('/edit/log/:name/:date/:set/:newName/:newDate/:newSet/:weight/:rep/:score', editSet)

export default router;