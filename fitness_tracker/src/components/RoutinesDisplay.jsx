import React, { useEffect, useState } from "react";
import Routine from "./Routine";
import NewRoutineModal from "./NewRoutineModal";
import styles from "../module_CSS/RoutinesDisplay.module.css";
import axios from "axios";

const RoutinesDisplay = ({ onAddToTodayWorkout, darkmode }) => {
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
    axios
      .get("http://localhost:4001/routine", { withCredentials: true })
      .then((response) => {
        response.data.forEach((routine) => {
          fetchExercises(routine);
        });

        // Routine exercises are added in the fetchExercises function, so we can just set the routines here
        setRoutines(response.data);
      })
      .catch((error) => {
        handleAuthError(error);
        console.error("An error occurred while fetching routines:", error);
      });
  }, []);

  // Get exercises for a routine, and add them to the routine object
  const fetchExercises = (routine) => {
    // Get the exercise IDs for the routine
    axios
      .get(`http://localhost:4001/routine/${routine.id}/exercises`, {
        withCredentials: true,
      })
      .then((response) => {
        const exerciseIds = response.data.exerciseIds.join(","); // Make comma separated string of exercise IDs

        // Get the actual exercises info for the routine
        axios
          .get(`http://localhost:4001/exercise/${exerciseIds}`, {
            withCredentials: true,
          })
          .then((response) => {
            routine.exercises = response.data;
          })
          .catch((error) => {
            handleAuthError(error);
            console.error("An error occurred while fetching exercises:", error);
          });
      })
      .catch((error) => {
        handleAuthError(error);
        console.error("An error occurred while fetching exercise ids:", error);
      });
  };

  const addExerciseToRoutine = (routine, exercise) => {
    // Add the exercise to the routine in the backend
    axios
      .post(
        "http://localhost:4001/exercise",
        { routine_id: routine.id, ...exercise },
        { withCredentials: true }
      )
      .then((response) => {
        // Get the exercise ID
        const exerciseId = response.data.id.id;

        routine.exercises.forEach((e) => {
          if (e.name === exercise.name) {
            e.id = exerciseId;
          }
        });
      })
      .catch((error) => {
        handleAuthError(error);
        console.error("An error occurred while adding exercises:", error);
      });
  };

  const handleSaveRoutine = (newRoutine) => {
    setIsModalOpen(false);

    // Extract routine only data
    const { name, muscles, date } = newRoutine;

    // Extract exercises only data
    const exercises = newRoutine.exercises.map(
      ({ name, setsGoal, reps, weight }) => ({ name, setsGoal, reps, weight })
    );

    // Create new routine object with no exercises
    axios
      .post(
        "http://localhost:4001/routine",
        { name: name, muscles: muscles, date: date },
        { withCredentials: true }
      )
      .then((response) => {
        // Get the routine ID from the response and add it to the newRoutine object
        const routineId = response.data.id.id;
        newRoutine.id = routineId;

        // Add exercises to the routine in the backend
        exercises.forEach((exercise) => {
          addExerciseToRoutine(newRoutine, exercise);
        });
        // Add the newRoutine object to the routines array in the frontend so that it is displayed immediately
        setRoutines([...routines, newRoutine]);
      })
      .catch((error) => {
        handleAuthError(error);
        console.error("An error occurred while adding routine:", error);
      });
  };

  const handleDeleteRoutine = (routineToDelete) => {
    // Delete the routine in the backend
    axios
      .delete(`http://localhost:4001/routine/${routineToDelete.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        // Delete the routine in the frontend
        setRoutines(routines.filter((routine) => routine !== routineToDelete));
      })
      .catch((error) => {
        handleAuthError(error);
        console.error("An error occurred while deleting routine:", error);
      });
  };

  const handleEditRoutine = (updatedRoutine, index) => {
    // Update the routine in the backend
    const { id, name, muscles, date } = updatedRoutine;
    // Update the routine information
    axios
      .put(
        `http://localhost:4001/routine/${id}`,
        { name: name, muscles: muscles, date: date },
        { withCredentials: true }
      )
      .then((response) => {
        // Update the exercises in the backend
        updatedRoutine.exercises.forEach((exercise) => {
          axios
            .patch(
              `http://localhost:4001/exercise/${exercise.id}`,
              {
                name: exercise.name,
                setsGoal: exercise.setsGoal,
                reps: exercise.reps,
                weight: exercise.weight,
                routine_id: id,
              },
              { withCredentials: true }
            )
            .then((response) => {
              // Exercise updated successfully, do nothing
            })
            .catch((error) => {
              handleAuthError(error);
              if (error.response.status === 404) {
                // Exercise not found, so we need to create a new exercise
                addExerciseToRoutine(updatedRoutine, exercise);
              } else {
                console.error(
                  "An error occurred while updating exercises:",
                  error
                );
              }
            });
        });
      })
      .catch((error) => {
        handleAuthError(error);
        console.error("An error occurred while updating routine:", error);
      });

    // Update the routine in the frontend
    setRoutines(
      routines.map((routine, i) => (i === index ? updatedRoutine : routine))
    );
  };

  const handleAuthError = (error) => {
    if (error.response && error.response.status === 401) {
      alert(
        "Not logged in (Or an error has occurred), cannot access dashboard"
      );
      window.location.href = "/login";
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={`${styles.h1}`}>Workout Routines</h1>
      {isModalOpen ? (
        <button
          className={`${styles.button} ${styles.cancelButton}`}
          onClick={() => setIsModalOpen(false)}
        >
          ✖
        </button>
      ) : (
        <button className={styles.button} onClick={() => setIsModalOpen(true)}>
          Create New Routine
        </button>
      )}
      {isModalOpen && (
        <NewRoutineModal
          onSave={handleSaveRoutine}
          onClose={() => setIsModalOpen(false)}
        />
      )}
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
