import React, { Fragment, useState } from 'react';
import buttons from '../module_CSS/buttons.module.css'
import styles from '../module_CSS/ExerciseLogger.module.css'

const ExerciseAdder = ({exerciseList, addExercise }) => {
    const [selectedExercise, setSelectedExercise] = useState(exerciseList[0])
    
    return (
        <Fragment>
            <tr>
                <td>
                    <select value={selectedExercise} onChange={(e) => setSelectedExercise(e.target.value)}>
                        {exerciseList.map(exercise => (
                            <option key={exercise.id} value={exercise}>{exercise.name}</option>
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

                <td><button className={`${buttons.button} ${buttons.addButton}`}>Delete</button></td>
                <td><button className={`${buttons.button} ${styles.cancelButton}`} onClick={() => addExercise(selectedExercise)}>Add</button></td>
            </tr>
        </Fragment>
    )
}

export default ExerciseAdder;
