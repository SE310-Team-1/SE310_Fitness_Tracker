import React, { Fragment, useState, useEffect} from "react"
import ExerciseLogger from "./ExerciseLogger"
import buttons from '../module_CSS/buttons.module.css'
import styles from '../module_CSS/ExercisesDisplay.module.css'
import ExerciseAdder from "./ExerciseAdder"
import axios from "axios"

const ExercisesDisplay = ({ exercises, setExercises }) => {

    const [exerciseList, setExerciseList] = useState({})
    const [addExerciseMode, setAddExerciseMode] = useState(false)

    // initialExercises when user clicks add to today's workout in the routines
    useEffect(() => {
        axios.get("http://localhost:4001/exercise", { withCredentials: true })
            .then((response) => {
                setExerciseList(response.data)
            })
            .catch((error) => {
                console.error("Error fetching exercises", error)
            })

    }, [])

    const addExercise = (newExercise) => {
        // Let user choose from a list of exercises
        setAddExerciseMode(false)

        // Check if the exercise is already in the list
        if (exercises.find(e => e.id === newExercise.id)) {
            alert("Exercise already added")
            return
        }

        setExercises([...exercises, newExercise])
    }

    const cancelAddExercise = () => {
        setAddExerciseMode(false)
    }

    const handleRemoveExercise = (exercise) => {
        console.log("Removing exercise")
        setExercises(exercises.filter(e => e.id !== exercise.id))
    }

    const logWorkout = () => {
        console.log("Workout logged")
    }

    return (
        <Fragment>
            <div className={styles.container}>
                <h1 className={styles.h1}>Exercises</h1>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Weight</th>
                            <th>Reps</th>
                            <th>Sets Goal</th>
                            <th>Sets Completed</th>
                            <th>Delete Exercise</th>
                            <th>Log Set</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.map(exercise => (
                                <ExerciseLogger exercise={exercise} handleRemoveExercise={handleRemoveExercise} />
                        ))
                        }

                        {addExerciseMode && <ExerciseAdder exerciseList={exerciseList} addExercise={addExercise} cancelAddExercise={cancelAddExercise}/>}
                    </tbody>
                </table>

                <div className={styles.buttonContainer}>
                    <button className={`${buttons.button} ${buttons.addButton}`} onClick={() => setAddExerciseMode(true)}>Add Exercise</button>
                    <button className={`${buttons.button} ${styles.logWorkoutButton}`} onClick={() => logWorkout()}>Log Workout</button>
                </div>

            </div>
        </Fragment>
    )
}

export default ExercisesDisplay 