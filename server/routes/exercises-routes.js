import express from 'express';
import { createExercise, getExercise, updateExercise, deleteExercise } from '../controllers/exercises-controller.js';

const router = express.Router();

// Create a new exercise
router.post('/', createExercise);

// Retrive an exercise by id
router.get('/:id', getExercise);

// Update an existing exercise by id
router.patch('/:id', updateExercise);

// Delete an existing exercise by id
router.delete('/:id', deleteExercise);

export default router;
