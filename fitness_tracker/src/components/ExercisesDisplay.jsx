import React, { Fragment, useState, useEffect} from "react"
import ExerciseLogger from "./ExerciseLogger"
import buttons from '../module_CSS/buttons.module.css'
import styles from '../module_CSS/ExercisesDisplay.module.css'
import ExerciseAdder from "./ExerciseAdder"
import axios from "axios"

const ExercisesDisplay = ({ exercises: initialExercises }) => {

    const [exerciseList, setExerciseList] = useState({})
    const [addExerciseMode, setAddExerciseMode] = useState(false)

    // initialExercises when user clicks add to today's workout in the routines
    const [exercises, setExercises] = useState(initialExercises);
    useEffect(() => {
        axios.get("http://localhost:4001/exercise", { withCredentials: true })
            .then((response) => {
                setExerciseList(response.data)
            })
            .catch((error) => {
                console.error("Error fetching exercises", error)
            })

    }, [])

    const addExercise = () => {
        // Let user choose from a list of exercises
        setAddExerciseMode(true)
    }

    const handleRemoveExercise = (exercise) => {
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
                                <ExerciseLogger exercise={exercise} />
                        ))
                        }

                        {addExerciseMode && <ExerciseAdder exerciseList={exerciseList} addExercise={setExercises} />}
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