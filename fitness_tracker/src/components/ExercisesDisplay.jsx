import React, { Fragment, useState, useEffect} from "react"
import ExerciseLogger from "./ExerciseLogger"
import buttons from '../module_CSS/buttons.module.css'
import styles from '../module_CSS/ExercisesDisplay.module.css'
import ExerciseAdder from "./ExerciseAdder"
import axios from "axios"

const ExercisesDisplay = ({ exercises, setExercises }) => {

    const [exerciseList, setExerciseList] = useState({})
    const [addExerciseMode, setAddExerciseMode] = useState(false)

    // Create a state to hold an array of the number of sets logged for each exercise. Initialize to 0 for all exercises
    const [setsLogged, setSetsLogged] = useState(exercises.map(exercise => 0))

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
        setSetsLogged([...setsLogged, 0])
    }

    const cancelAddExercise = () => {
        setAddExerciseMode(false)
    }

    const handleRemoveExercise = (exercise) => {
        console.log("Removing exercise")
        setExercises(exercises.filter(e => e.id !== exercise.id))
        setSetsLogged(setsLogged.filter((s, index) => index !== exercises.findIndex(e => e.id === exercise.id)))
    }

    const logWorkout = () => {
        // Calculate the score of the workout
        let score = 0
        exercises.forEach((exercise, index )=> {

            score += (( Number(setsLogged[index]) / Number(exercise.setsGoal)) * Number(exercise.weight))
        })

        score = Math.round(score)

        // Create workout in the database with only score and date
        axios.post("http://localhost:4001/workout", { score: score, date: new Date() }, { withCredentials: true })
            .then((response) => {
                console.log("Workout created", response.data)

                // Get the id of the workout that was just created
                const workoutId = response.data.id.id

                // Create an array of objects with the exercise id and sets completed
                const exercisesToLog = exercises.map((exercise, index) => ({ exercise_id: exercise.id, sets_completed: setsLogged[index] }))

                // Add the exercises to the workout
                axios.post(`http://localhost:4001/workout/${workoutId}/exercises`, exercisesToLog, { withCredentials: true })
                    .then((response) => {
                        console.log("Exercises added to workout", response.data)
                        setExercises([])
                        setSetsLogged([])
                    })
                    .catch((error) => {
                        console.error("Error adding exercises to workout", error)
                    })
                
            })
            .catch((error) => {
                console.error("Error creating workout", error)
            })

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
                                <ExerciseLogger exercise={exercise} handleRemoveExercise={handleRemoveExercise} setsLogged={setsLogged} setSetsLogged={setSetsLogged} index={exercises.findIndex(e=> e.id === exercise.id)} />
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