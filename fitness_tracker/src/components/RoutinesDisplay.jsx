import React, { useState } from 'react';
import Routine from './Routine';
import NewRoutineModal from './NewRoutineModal';
import styles from '../module_CSS/RoutinesDisplay.module.css'

const RoutinesDisplay = ({ onAddToTodayWorkout, darkmode }) => {
    // data should come from the backend
    const [routines, setRoutines] = useState([
        {
          name: "Leg Routine",
          date: "14th Aug",
          muscles: "Quads, Hamstring, Calves",
          exercises: [
            { id:0, name: "Squat", setsGoal: 4, setsLogged: 0, reps: 10, weight: 30 },
            { id:1, name: "Lunge", setsGoal: 3, setsLogged: 0, reps: 12, weight: 40 },
            { id:2, name: "Leg Press", setsGoal: 4, setsLogged: 0, reps: 8, weight: 50 }
          ]
        },
        {
          name: "Arm Routine",
          date: "14th Aug",
          muscles: "Biceps, Triceps, Deltoids",
          exercises: [
            { id:0, name: "Bicep Curl", setsGoal: 4, setsLogged: 0, reps: 12, weight: 30 },
            { id:1, name: "Tricep Extension", setsGoal: 3, setsLogged: 0, reps: 10, weight: 40 },
            { id:2, name: "Shoulder Press", setsGoal: 4, setsLogged: 0, reps: 8, weight: 50 }
          ]
        },
        {
          name: "Core Routine",
          date: "14th Aug",
          muscles: "Abs",
          exercises: [
            { id:0, name: "Crunch", setsGoal: 4, setsLogged: 0, reps: 15, weight: 30 },
            { id:1, name: "Plank", setsGoal: 3, setsLogged: 0, reps: 1, weight: 40 },
            { id:2, name: "Leg Raise", setsGoal: 3, setsLogged: 0, reps: 12, weight: 50 }
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
        // edited routines have to be saved to the backend
    };

    return (
      <div className={darkmode ? styles.container : styles.containerLight}>
        <h1 className={darkmode ? `${styles.heading}` : `${styles.headingLight}`}>Workout Routines</h1>
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
                    darkmode={darkmode} 
                />
            }
            {routines.map((routine, index) => (
                <Routine 
                    darkmode={darkmode}
                    key={index} 
                    routine={routine} 
                    onSave={(updatedRoutine) => handleEditRoutine(updatedRoutine, index)} 
                    onDelete={() => handleDeleteRoutine(routine)}
                    onAddToToday={() => onAddToTodayWorkout(routine)}
                />
            ))}
        </div>
    );
};

export default RoutinesDisplay;
