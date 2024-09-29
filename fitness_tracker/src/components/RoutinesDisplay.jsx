import React, { useEffect, useState } from 'react';
import Routine from './Routine';
import NewRoutineModal from './NewRoutineModal';
import styles from '../module_CSS/RoutinesDisplay.module.css'
import axios from 'axios';

const RoutinesDisplay = ({ onAddToTodayWorkout }) => {
    const [routines, setRoutines] = useState([]);

    /*
    {
          name: "Leg Routine",
          date: "14th Aug",
          muscles: "Quads, Hamstring, Calves",
          exercises: [
            { id:0, name: "Squat", setsGoal: 4, setsLogged: 0, reps: 10, weight: 30 },
            { id:1, name: "Lunge", setsGoal: 3, setsLogged: 0, reps: 12, weight: 40 },
            { id:2, name: "Leg Press", setsGoal: 4, setsLogged: 0, reps: 8, weight: 50 }
          ]
        }
    */

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Get routines from the backend
    useEffect(() => {
      axios.get("http://localhost:4001/routine", { withCredentials: true, })
        .then((response) => {
          response.data.forEach((routine) => {
            fetchExercises(routine);
          });

          // Routine exercises are added in the fetchExercises function, so we can just set the routines here
          setRoutines(response.data);
          
        })
        .catch((error) => {
          console.error("An error occured while fetching routines:", error);
        });
    } , []);

    // Get exercises for a routine, and add them to the routine object
    const fetchExercises = (routine) => {
      axios.get(`http://localhost:4001/routine/${routine.id}/exercises`, { withCredentials: true, })
      .then((response) => {
        const exerciseIds = response.data.exerciseIds.join(","); // Make comma separated string of exercise IDs

        axios.get(`http://localhost:4001/exercise/${exerciseIds}`, { withCredentials: true, })
        .then((response) => {
          routine.exercises = response.data;
        })
        .catch((error) => {
          console.error("An error occured while fetching exercises:", error);
        });
      })
      .catch((error) => {
        console.error("An error occured while fetching exercise ids:", error);
      });
    };

    const handleSaveRoutine = (newRoutine) => {
        setIsModalOpen(false);
        // routines have to be saved to the backend

        // Extract routine only data
        const { name, muscles, date} = newRoutine;

        // Extract exercises only data
        const exercises = newRoutine.exercises.map(({ name, setsGoal, reps, weight }) => ({ name, setsGoal, reps, weight }));

        // Create new routine object with no exercises
        axios.post("http://localhost:4001/routine", {"name": name, "muscles": muscles, "date": date}, { withCredentials: true, })
        .then((response) => {
            console.log("Routine added successfully:", response.data); // Debug log

          // Get the routine ID
            const routineId = response.data.id.id;
            newRoutine.id = routineId;

            // Add exercises to the routine
            exercises.forEach((exercise) => {
              axios.post("http://localhost:4001/exercise", { "routine_id": routineId, ...exercise }, { withCredentials: true, })
              .then((response) => {
                console.log("Exercise added successfully:", response.data); // Debug log

                // Get the exercise ID
                const exerciseId = response.data.id;

                // Add the exercise ID to the newRoutine object
                newRoutine.exercises.forEach((exercise) => {
                  if (exercise.name === response.data.name) {
                    exercise.id = exerciseId;
                  }
                })   
              })
              .catch((error) => {
                if (error.response.status === 401) {
                  alert("Not logged in (Or an error has occured), cannot access dashboard ");
                  window.location.href = "/login";
                }
                console.error("An error occured while adding exercises:", error);
              });
            });

            setRoutines([...routines, newRoutine]);
        }
        )
        .catch((error) => {
          if (error.response.status === 401) {
            alert("Not logged in (Or an error has occured), cannot access dashboard ");
            window.location.href = "/login";
          }
          console.error("An error occured while adding routine:", error);
          });  
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
        <div className={styles.container}>
            <h1 className={`${styles.h1}`}>Workout Routines</h1>
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
                    onAddToToday={() => onAddToTodayWorkout(routine)}
                />
            ))}
        </div>
    );
};

export default RoutinesDisplay;
