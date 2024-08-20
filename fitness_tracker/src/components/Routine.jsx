import React, { useState } from 'react';
import styles from '../module_CSS/Routine.module.css';

const Routine = ({ routine, onSave, onDelete, onAddToToday }) => {
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
            exercises: [...editedRoutine.exercises, { name: '', sets: '', reps: '', weight: '' }] 
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
        <div className={styles.routineCard}>
            {isEditing ? (
                // When editing a routine
                <>
                    <input 
                        type="text" 
                        className={styles.inputField}
                        placeholder="Routine Name" 
                        value={editedRoutine.name} 
                        onChange={(e) => setEditedRoutine({ ...editedRoutine, name: e.target.value })} 
                    />

                    <input 
                        type="text" 
                        className={styles.inputField}
                        placeholder="Muscle Groups" 
                        value={editedRoutine.muscles} 
                        onChange={(e) => setEditedRoutine({ ...editedRoutine, muscles: e.target.value })} 
                    />

                    <p className={styles.routineDetails}>Date: {editedRoutine.date}</p>

                    {editedRoutine.exercises.map((exercise, index) => (
                        <div key={index} className={styles.exercise}>  

                            <div className={styles.inputWithSuffix}>
                                <input 
                                    type="text" 
                                    className={styles.inputField}
                                    placeholder="Exercise Name" 
                                    value={exercise.name} 
                                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)} 
                                />
                                <span className={styles.suffix}>Name</span>
                            </div>       

                            <div className={styles.inputWithSuffix}>
                                <input 
                                    type="number" 
                                    className={styles.inputField}
                                    placeholder="Sets" 
                                    value={exercise.sets} 
                                    onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)} 
                                />
                                <span className={styles.suffix}>sets</span>
                            </div>          
                            

                            <div className={styles.inputWithSuffix}>
                                <input 
                                    type="number" 
                                    className={styles.inputField}
                                    placeholder="Reps" 
                                    value={exercise.reps} 
                                    onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)} 
                                />
                                <span className={styles.suffix}>reps</span>
                            </div>
                            
                            <div className={styles.inputWithSuffix}>
                                <input 
                                    type="number" 
                                    className={styles.inputField}
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
                            <span>{exercise.name}</span> {exercise.sets} sets {exercise.reps} reps {exercise.weight} kg
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
                            className={`${styles.button} ${styles.addToTodayButton}`} 
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
