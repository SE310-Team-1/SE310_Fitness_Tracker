import React, { Fragment, useState } from "react"
import _, { map } from 'underscore'
import Picker from 'react-mobile-picker'
import buttons from '../module_CSS/buttons.module.css'
import styles from '../module_CSS/ExerciseEditor.module.css'

const ExerciseEditor = ({exercise, exerciseList, deleteExercise, updateExercise}) => {

    const selections = {
        name: exerciseList, 
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
    const [selectedWeight, setSelectedWeight] = useState({ selectedValue: exercise.weight })
    const [selectedReps, setSelectedReps] = useState({ selectedValue: exercise.reps })
    const [selectedSetsGoal, setSelectedSetsGoal] = useState({ selectedValue: exercise.setsGoal })

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
                <td data-label={"Weight"}>
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
                <td data-label={"Reps"}>
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
                <td data-label={"Goal"}>
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
                <td><button className={`${buttons.button} ${buttons.saveButton}`} onClick={() => finishEditing()}>Save</button></td>
                <td><button className={`${buttons.button} ${buttons.deleteButton}`} onClick={() => deleteExercise(exercise.id)}>Delete</button></td>
            </tr>
        </Fragment>
    );
};

export default ExerciseEditor;
