import React, { Fragment, useState, useEffect, useCallback } from "react"
import ExerciseLogger from "./ExerciseLogger"
import ExerciseEditor from "./ExerciseEditor"

const ExercisesDisplay = () => {

    const [exercises, setExercises] = useState([
        {   
            id: 0,
            name: "Lat Raise",
            weight: 20,
            reps: 10,
            setsGoal: 4,
            setsLogged: 2,
            editMode: false
        },
        {   
            id: 1,
            name: "Squat",
            weight: 50,
            reps: 10,
            setsGoal: 5,
            setsLogged: 0,
            editMode: false
        }
    ])

    const [isEditing, setIsEditing] = useState(false)

    const getLoadedExercises = async () => {
        try {
            // TODO: get currently loaded exercises from backend

            const jsonData = exercises

            setExercises(jsonData);

        } catch (err) {
            console.error(err.message)
        }
    }

    const deleteExerciseById = useCallback((idToDelete) => {

        setExercises(exercises => exercises.filter(({id}) => id !== idToDelete));

    }, [])

    const updateExerciseById = useCallback((updatedExercise) => {

        setExercises(exercises => exercises.map(exercise => {
            if (exercise.id === updatedExercise.id) {
                return updatedExercise
            } else {
                return exercise
            }
        }))

        setIsEditing(updatedExercise.editMode)

    }, [])

    const addExercise = async () => {

        const newExercise = {   
            id: Math.max(exercises.map(exercise => exercise.id)) + 1,
            name: "",
            weight: 10,
            reps: 10,
            setsGoal: 5,
            setsLogged: 0,
            editMode: true
        }

        setIsEditing(true)

        const updatedExercises = [...exercises]
        updatedExercises.push(newExercise)
        
        setExercises(exercises => updatedExercises)
    }

    const logWorkout = async () => {

        // TODO: confirm all exercises as completed

        setExercises([]);
    }
    

    useEffect(() => {
        getLoadedExercises();
    }, []);

    return (
        <Fragment>
            <h1>Exercises</h1>
            <table>
                <thead>
                    <tr>
                        <th style={{width: 288}}>Name</th>
                        <th style={{width: 96}}>Weight</th>
                        <th style={{width: 96}}>Reps</th>
                        <th style={{width: 96}}>Sets Goal</th>
                        <th style={{width: 96}}>Sets Completed</th>
                        <th style={{width: 96}}>Delete Exercise</th>
                        <th style={{width: 96}}>Log Set</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map(exercise => (
                            exercise.editMode ? 
                                    <ExerciseEditor exercise={exercise} deleteExercise={deleteExerciseById} updateExercise={updateExerciseById} />
                                : 
                                    <ExerciseLogger exercise={exercise} isEditing={isEditing} updateExercise={updateExerciseById} />
                        )
                    )}
                </tbody>
            </table>
            {!isEditing && <button onClick={() => addExercise()}>Add Exercise</button>}
            {!isEditing && <button onClick={() => logWorkout()}>Log Workout</button>}
        </Fragment>
    )
}

export default ExercisesDisplay