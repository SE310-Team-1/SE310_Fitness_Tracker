import React, { Fragment, useState, useEffect, useCallback } from "react"
import ExerciseLogger from "./ExerciseLogger"
import ExerciseEditor from "./ExerciseEditor"

const ExercisesDisplay = () => {

    const [completedSets, setCompletedSets] = useState([])

    const [exerciseList, setExerciseList] = useState({})
    
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

    const getExerciseList = async () => {
        try {
            const response = await fetch(`http://localhost:4001/exercises/all`);
            const jsonData = await response.json();
            console.log(jsonData)

            const loadedExerciseList = {}

            for (var i in jsonData) {
                const {name, muscle_group} = jsonData[i]
                if (Object.keys(loadedExerciseList).includes(muscle_group)) {
                    console.log(`add ${name} to ${muscle_group} exercises`)
                    loadedExerciseList[muscle_group].push(name)
                } else {
                    console.log(`create new muscle group ${muscle_group}`)
                    loadedExerciseList[muscle_group] = [name]
                }
            }
            console.log(loadedExerciseList)
            setExerciseList(loadedExerciseList);

        } catch (err) {
            console.error(err.message)
        }
    }

    const deleteExerciseById = useCallback((idToDelete) => {

        setExercises(exercises => exercises.filter(({id}) => id !== idToDelete));

    }, [])

    const updateExerciseById = useCallback((updatedExercise) => {

        setCompletedSets(completedSets => (
            [...completedSets, {
                name: updatedExercise.name,
                date: getTodaysDateAsString(),
                set: updatedExercise.setsLogged,
                weight: updatedExercise.weight,
                rep: updatedExercise.reps,
                score: updatedExercise.weight * updatedExercise.reps
            }]
          )
        );
      
        setExercises(exercises => exercises.map(exercise => {
            if (exercise.id === updatedExercise.id) {
                return updatedExercise
            } else {
                return exercise
            }
        }))

        setIsEditing(updatedExercise.editMode)

    }, [])

    const getTodaysDateAsString = () => {
        const today = new Date()
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
        var yyyy = today.getFullYear();
        return dd + '-' + mm + '-' + yyyy;
    }

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

    const logExercise = async (name, date, set, weight, rep, score) => {
        try {
            const response = await fetch(`http://localhost:4001/exercises/Log/${name}/${date}/${set}/${weight}/${rep}/${score}`, {
                method: 'POST'
            });
            const jsonData = await response.json();
            console.log(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    };

    const logWorkout = async () => {

        for (var i in completedSets) {
            console.log(completedSets[i])
            logExercise(
                completedSets[i].name, 
                completedSets[i].date, 
                completedSets[i].set,
                completedSets[i].weight, 
                completedSets[i].rep, 
                completedSets[i].score
            )
        }

        setExercises([]);
    }
    

    useEffect(() => {
        getExerciseList();
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
                                    <ExerciseEditor exercise={exercise} exerciseList={exerciseList} deleteExercise={deleteExerciseById} updateExercise={updateExerciseById} />
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