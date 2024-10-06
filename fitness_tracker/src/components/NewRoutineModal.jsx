import React, { useState } from 'react';
import styles from '../module_CSS/NewRoutineModal.module.css';
import { formatDate } from '../utils/dateUtils.js'
import { dark } from '@mui/material/styles/createPalette.js';

const NewRoutineModal = ({ onSave, onClose, darkmode }) => {
    const today = new Date();
    const formattedDate = formatDate(today); // 14 Aug 2024
    var id=0;

    const [routine, setRoutine] = useState({
        id: id++,
        name: '',
        date: formattedDate,
        muscles: '',
        exercises: [{ name: '', reps: '', setsGoal: '', setsLogged: 0, weight: '' }]
    });

    const handleExerciseChange = (index, field, value) => {
        const updatedExercises = [...routine.exercises];
        updatedExercises[index][field] = value;
        setRoutine({ ...routine, exercises: updatedExercises });
    };

    const handleAddExercise = () => {
        setRoutine({ ...routine, exercises: [...routine.exercises, {id: id++, name: '', setsGoal: '', setsLogged:0, reps: '', weight: '' }] });
    };

    const handleDeleteExercise = (index) => {
        const updatedExercises = routine.exercises.filter((_, i) => i !== index);
        setRoutine({ ...routine, exercises: updatedExercises });
    };

    const handleSave = () => {
        onSave(routine);
    };

    return (
        <div className={darkmode ? styles.modalContainer : styles.modalContainerLight} >
            <h2 className={styles.modalTitle}>Create New Routine</h2>
            <input
                type="text"
                className={darkmode ? styles.inputField : styles.inputFieldLight}
                placeholder="Routine Name"
                value={routine.name}
                onChange={(e) => setRoutine({ ...routine, name: e.target.value })}
            />
            <input
                type="text"
                className={darkmode ? styles.inputField : styles.inputFieldLight}
                placeholder="Muscle Groups"
                value={routine.muscles}
                onChange={(e) => setRoutine({ ...routine, muscles: e.target.value })}
            />
            <p className={styles.dateDisplay}>Date: {routine.date}</p>
            <h3>Add Exercises</h3>
            {routine.exercises.map((exercise, index) => (
                <div key={index} className={darkmode ? styles.exerciseContainer : styles.exerciseContainerLight}>
                    <input
                        type="text"
                        className={darkmode ? styles.inputField : styles.inputFieldLight}
                        placeholder="Exercise Name"
                        value={exercise.name}
                        onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                    />

                    <div className={darkmode ? styles.inputWithSuffix : styles.inputWithSuffixLight}>
                        <input
                            type="number"
                            className={darkmode ? styles.inputField : styles.inputFieldLight}
                            placeholder="Sets"
                            value={exercise.sets}
                            onChange={(e) => handleExerciseChange(index, 'setsGoal', e.target.value)}
                        />
                        <span className={styles.suffix}>sets</span>
                    </div>

                    <div className={darkmode ? styles.inputWithSuffix : styles.inputWithSuffixLight}>
                        <input
                            type="number"
                            className={darkmode ? styles.inputField : styles.inputFieldLight}
                            placeholder="Reps"
                            value={exercise.reps}
                            onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                        />
                        <span className={styles.suffix}>reps</span>
                    </div>

                    <div className={darkmode ? styles.inputWithSuffix : styles.inputWithSuffixLight}>
                        <input
                            type="number"
                            className={darkmode ? styles.inputField : styles.inputFieldLight}
                            placeholder="Weight"
                            value={exercise.weight}
                            onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)}
                        />
                        <span className={styles.suffix}>kg</span>
                    </div>

                    <button
                        className={`${styles.button} ${styles.deleteButton}`}
                        onClick={() => handleDeleteExercise(index)}
                    >
                        Delete
                    </button>
                </div>
            ))}

            <button
                className={`${styles.button} ${styles.addButton}`}
                onClick={handleAddExercise}
            >
                Add Exercise
            </button>

            <div className={styles.buttonContainer}>
                <button
                    className={`${styles.button} ${styles.cancelButton}`}
                    onClick={onClose}
                >
                    Cancel
                </button>

                <button
                    className={`${styles.button} ${styles.saveButton}`}
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default NewRoutineModal;
