import React, { useState } from 'react';
import styles from '../module_CSS/Routine.module.css';

const Routine = ({ routine, onSave, onDelete, onAddToToday, darkmode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isExercisesVisible, setIsExercisesVisible] = useState(false);
    const [editedRoutine, setEditedRoutine] = useState(routine);

    const handleExerciseChange = (index, field, value) => {
        const updatedExercises = [...editedRoutine.exercises];
        updatedExercises[index][field] = value;
        setEditedRoutine({ ...editedRoutine, exercises: updatedExercises });
    };

    const handleAddExercise = () => {
        setEditedRoutine({
            ...editedRoutine,
            exercises: [...editedRoutine.exercises, { name: '', setsGoal: '', setsLogged: 0, reps: '', weight: '' }]
        });
    };

    const handleDeleteExercise = (index) => {
        const updatedExercises = editedRoutine.exercises.filter((_, i) => i !== index);
        setEditedRoutine({ ...editedRoutine, exercises: updatedExercises });
    };

    const handleSave = () => {
        console.log("Saving routine:", editedRoutine); // Debug log
        onSave(editedRoutine);
        setIsEditing(false);
    };

    const toggleExercisesVisibility = () => {
        setIsExercisesVisible(!isExercisesVisible);
    };

    return (
        <div className={darkmode ? styles.routineCard : styles.routineCardLight}>
            {isEditing ? (
                // When editing a routine
                <>
                    <input
                        type="text"
                        className={darkmode ? styles.inputField : styles.inputFieldLight}
                        placeholder="Routine Name"
                        value={editedRoutine.name}
                        onChange={(e) => setEditedRoutine({ ...editedRoutine, name: e.target.value })}
                    />

                    <input
                        type="text"
                        className={darkmode ? styles.inputField : styles.inputFieldLight}
                        placeholder="Muscle Groups"
                        value={editedRoutine.muscles}
                        onChange={(e) => setEditedRoutine({ ...editedRoutine, muscles: e.target.value })}
                    />

                    <p className={styles.routineDetails}>Date: {editedRoutine.date}</p>

                    {editedRoutine.exercises.map((exercise, index) => (
                        <div key={index} className={darkmode ? styles.exercise : styles.exerciseLight}>

                            <div className={styles.inputWithSuffix}>
                                <input
                                    type="text"
                                    className={darkmode ? styles.inputField : styles.inputFieldLight}
                                    placeholder="Exercise Name"
                                    value={exercise.name}
                                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                                />
                                <span className={styles.suffix}>Name</span>
                            </div>

                            <div className={styles.inputWithSuffix}>
                                <input
                                    type="number"
                                    className={darkmode ? styles.inputField : styles.inputFieldLight}
                                    placeholder="Sets"
                                    value={exercise.setsGoal}
                                    onChange={(e) => handleExerciseChange(index, 'setsGoal', e.target.value)}
                                />
                                <span className={styles.suffix}>sets</span>
                            </div>


                            <div className={styles.inputWithSuffix}>
                                <input
                                    type="number"
                                    className={darkmode ? styles.inputField : styles.inputFieldLight}
                                    placeholder="Reps"
                                    value={exercise.reps}
                                    onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                                />
                                <span className={styles.suffix}>reps</span>
                            </div>

                            <div className={styles.inputWithSuffix}>
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
                            onClick={() => setIsEditing(false)}
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
                </>
            ) : (
                // When not editing a routine
                <>
                    <div onClick={toggleExercisesVisibility}>
                        <h3 className={styles.routineTitle}>{routine.name}</h3>
                        <p className={styles.routineDetails}>Date: {routine.date}</p>
                        <p className={styles.routineDetails}>Muscles: {routine.muscles}
                            <span className={styles.expandIcon}>
                                {isExercisesVisible ? '↑' : '↓'}
                            </span>
                        </p>
                    </div>

                    {isExercisesVisible &&
                        <div>
                            {routine.exercises.map((exercise, index) => (
                                <div key={index} className={styles.exercise}>
                                    <span className={styles.exerciseName}>{exercise.name}</span>
                                    <span className={styles.sets}>{exercise.setsGoal} </span>sets
                                    <span className={styles.reps}>{exercise.reps} </span>reps
                                    <span className={styles.weight}>{exercise.weight} </span>kg
                                </div>
                            ))}
                        </div>
                    }

                    <div className={styles.buttonContainer}>
                        <button
                            className={`${styles.button} ${styles.deleteButton}`}
                            onClick={onDelete}
                        >
                            Delete Routine
                        </button>

                        <button
                            className={`${styles.button} ${styles.saveButton}`}
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Routine
                        </button>

                        <button
                                className={darkmode ? `${styles.button} ${styles.addToTodayButton}` : `${styles.buttonlight} ${styles.addToTodayButton}`}
                            onClick={() => onAddToToday(routine)}
                        >
                            Add to Today's Workout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Routine;
