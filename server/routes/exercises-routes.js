import express from 'express';
import { createExercise, updateExercise, deleteExercise } from '../controllers/exercises-controller.js';

const router = express.Router();

// Create a new exercise
router.post('/', createExercise);

// Update an existing exercise
router.patch('/', updateExercise);

// Delete an existing exercise by name
router.delete('/delete/:name', deleteExercise);

export default router;
