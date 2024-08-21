import React, { Fragment, useState } from "react"
import _, { map } from 'underscore'
import Picker from 'react-mobile-picker'

const ExerciseEditor = ({exercise, deleteExercise, updateExercise}) => {

    const selections = {
        name: {
            'Chest': ['Chest Press Machine', 'Barbell Bench Press', 'Chest Fly Machine'],
            'Shoulder': ['Overhead Press', 'Lat Raise', 'Shoulder Press Machine'],
            'Tricep': ['Tricep Dip', 'Tricep Extension'],
            'Bicep': ['Preacher Curl', 'Seated Dumbell Curl'],
            'Back': ['Lat Pulldown', 'Machine Row', 'Dumbbell Row'],
            'Core': ['Seated Crunch'],
            'Leg': ['Squat', 'Calf Raise']
        }, 
        weight: _.range(501),
        reps: _.range(201),
        setsGoal: _.range(101)
    }

    const [selectedName, setSelectedName] = useState(() => {
        for (const [muscleGroup, names] of Object.entries(selections.name)) {
            console.log(muscleGroup, exercise.name)
            if (names.includes(exercise.name)) {
                console.log("Success")
                return {
                    muscleGroup: muscleGroup,
                    selectedValue: exercise.name
                }
            }
        }
        console.log("Failure")
        return {
            muscleGroup: "Chest",
            selectedValue: "Chest Press Machine"
        }
    })
    const [selectedWeight, setSelectedWeight] = useState({selectedValue: exercise.weight})
    const [selectedReps, setSelectedReps] = useState({selectedValue: exercise.reps})
    const [selectedSetsGoal, setSelectedSetsGoal] = useState({selectedValue: exercise.setsGoal})

    const finishEditing = () => {
        exercise.name = selectedName.selectedValue
        exercise.weight = selectedWeight.selectedValue
        exercise.reps = selectedReps.selectedValue
        exercise.setsGoal = selectedSetsGoal.selectedValue
        exercise.editMode = false
        updateExercise(exercise)
    }

    return (
        <Fragment>
            <tr key={exercise.id}>
                <td>
                    <Picker value={selectedName} onChange={setSelectedName} height={96}>
                        <Picker.Column name={"muscleGroup"}>
                            {Object.keys(selections.name)?.map(option => (
                                <Picker.Item key={option} value={option}>
                                    {option}
                                </Picker.Item>
                            ))}
                        </Picker.Column>
                        <Picker.Column name={"selectedValue"}>
                            {selections.name[selectedName.muscleGroup]?.map(option => (
                                <Picker.Item key={option} value={option}>
                                    {option}
                                </Picker.Item>
                            ))}
                        </Picker.Column>
                    </Picker>
                </td>
                <td>
                    <Picker value={selectedWeight} onChange={setSelectedWeight} height={96}>
                        <Picker.Column name={"selectedValue"}>
                            {selections.weight.map(option => (
                                <Picker.Item key={option} value={option}>
                                    {option}
                                </Picker.Item>
                            ))}
                        </Picker.Column>
                    </Picker>
                </td>
                <td>
                    <Picker value={selectedReps} onChange={setSelectedReps} height={96}>
                        <Picker.Column name={"selectedValue"}>
                            {selections.reps.map(option => (
                                <Picker.Item key={option} value={option}>
                                    {option}
                                </Picker.Item>
                            ))}
                        </Picker.Column>
                    </Picker>
                </td>
                <td>
                    <Picker value={selectedSetsGoal} onChange={setSelectedSetsGoal} height={96}>
                        <Picker.Column name={"selectedValue"}>
                            {selections.setsGoal.map(option => (
                                <Picker.Item key={option} value={option}>
                                    {option}
                                </Picker.Item>
                            ))}
                        </Picker.Column>
                    </Picker>
                </td>
                <td>{exercise.setsLogged}</td>
                <td><button onClick={() => finishEditing()}>Save</button></td>
                <td><button onClick={() => deleteExercise(exercise.id)}>Delete</button></td>
            </tr>
        </Fragment>
    );
};

export default ExerciseEditor;
