import React, { Fragment } from "react";
import buttons from '../module_CSS/buttons.module.css'
import styles from '../module_CSS/ExerciseLogger.module.css'

const ExerciseLogger = ({ exercise, isEditing, updateExercise, darkmode }) => {

    const logSet = () => {
        exercise.setsLogged += 1
        updateExercise(exercise)
    }

    const startEditing = () => {
        exercise.editMode = true
        updateExercise(exercise)
    }

    return (
        <Fragment>
            <tr key={exercise.id}>
                <td data-label={"Name"}>{exercise.name}</td>
                <td data-label={"Weight"}>{exercise.weight}</td>
                <td data-label={"Reps"}>{exercise.reps}</td>
                <td data-label={"Goal"}>{exercise.setsGoal}</td>
                <td data-label={"Sets"}>{exercise.setsLogged}</td>
                <td>{!isEditing && <button className={`${buttons.button} ${buttons.editButton}`} onClick={() => startEditing()}>Edit</button>}</td>
                <td><button className={darkmode ? `${buttons.button} ${styles.logSetButton}` : `${buttons.buttonLight} ${styles.logSetButton}`} onClick={() => logSet()}>Log Set</button></td>
            </tr>
        </Fragment>
    );
};

export default ExerciseLogger;
