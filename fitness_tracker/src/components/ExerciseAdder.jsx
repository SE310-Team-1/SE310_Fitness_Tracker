import React, { Fragment, useState } from 'react';
import buttons from '../module_CSS/buttons.module.css'
import styles from '../module_CSS/ExerciseLogger.module.css'

const ExerciseAdder = ({exerciseList, addExercise, cancelAddExercise }) => {
    const [selectedExercise, setSelectedExercise] = useState(exerciseList[0])

    
    return (
        <tr>
            <td>
                <select onChange={(e) => setSelectedExercise(exerciseList.find(exercise => exercise.name === e.target.value))}>
                    {exerciseList.map(exercise => (
                        <option key={exercise.name} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>
            </td>
            <td>
                {selectedExercise.weight}
            </td>
            <td>
                {selectedExercise.reps}
            </td>
            <td>
                {selectedExercise.setsGoal}
            </td>
            <td>
                0
            </td>

            <td><button className={`${buttons.button} ${buttons.editButton}`} onClick={cancelAddExercise}>Remove</button></td>
            <td><button className={`${buttons.button} ${styles.addButton}`} onClick={() => addExercise(selectedExercise)}>Add</button></td>
        </tr>
    )
}

export default ExerciseAdder;
