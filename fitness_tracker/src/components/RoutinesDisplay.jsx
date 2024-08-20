import React, { useState } from 'react';
import Routine from './Routine';
import NewRoutineModal from './NewRoutineModal';
import styles from '../module_CSS/RoutinesDisplay.module.css'

const RoutinesDisplay = () => {
    // data should come from the backend
    const [routines, setRoutines] = useState([
        {
          name: "Leg Routine",
          date: "14th Aug",
          muscles: "Quads, Hamstring, Calves",
          exercises: [
            { name: "Squat", sets: 4, reps: 10 },
            { name: "Lunge", sets: 3, reps: 12 },
            { name: "Leg Press", sets: 4, reps: 8 }
          ]
        },
        {
          name: "Arm Routine",
          date: "14th Aug",
          muscles: "Biceps, Triceps, Deltoids",
          exercises: [
            { name: "Bicep Curl", sets: 4, reps: 12 },
            { name: "Tricep Extension", sets: 3, reps: 10 },
            { name: "Shoulder Press", sets: 4, reps: 8 }
          ]
        },
        {
          name: "Core Routine",
          date: "14th Aug",
          muscles: "Abs",
          exercises: [
            { name: "Crunch", sets: 4, reps: 15 },
            { name: "Plank", sets: 3, reps: 1 },
            { name: "Leg Raise", sets: 3, reps: 12 }
          ]
        }
      ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveRoutine = (newRoutine) => {
        setRoutines([...routines, newRoutine]);
        setIsModalOpen(false);
        // routines have to be saved to the backend
    };

    const handleDeleteRoutine = (routineToDelete) => {
        setRoutines(routines.filter(routine => routine !== routineToDelete));
    };

    const handleEditRoutine = (updatedRoutine, index) => {
        console.log("routines:", routines); // Debug log
        console.log("Updated routine:", updatedRoutine); // Debug log
        setRoutines(routines.map((routine, i) => i === index ? updatedRoutine : routine));
        // routines have to be saved to the backend
    };

    const handleAddTodayWorkout = (routine) => {
        console.log(routine); // Debug log
        // the routine information can go to today's workout component
    }
    

    return (
        <div className={styles.container}>
            <h1 className={`${styles.header}`}>Workout Routines</h1>
            {isModalOpen ? 
                <button 
                className={`${styles.button} ${styles.cancelButton}`}
                onClick={() => setIsModalOpen(false)}>✖</button> : 
                <button 
                className={styles.button}
                onClick={() => setIsModalOpen(true)}>Create New Routine</button>
                }
            {isModalOpen && 
                <NewRoutineModal 
                    onSave={handleSaveRoutine} 
                    onClose={() => setIsModalOpen(false)} 
                />
            }
            {routines.map((routine, index) => (
                <Routine 
                    key={index} 
                    routine={routine} 
                    onSave={(updatedRoutine) => handleEditRoutine(updatedRoutine, index)} 
                    onDelete={() => handleDeleteRoutine(routine)}
                    onAddToToday={() => handleAddTodayWorkout(routine)} 
                />
            ))}
        </div>
    );
};

export default RoutinesDisplay;
