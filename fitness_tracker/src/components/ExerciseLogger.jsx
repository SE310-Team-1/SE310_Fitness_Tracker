import React, { Fragment, useState } from "react";
import buttons from '../module_CSS/buttons.module.css'
import styles from '../module_CSS/ExerciseLogger.module.css'

const ExerciseLogger = ({ exercise, handleRemoveExercise, setsLogged, setSetsLogged, index, darkmode }) => {
    console.log("Sets logged", setsLogged)

    const logSet = () => {
        // Increment the number of sets logged for the exercise
        const newSetsLogged = [...setsLogged]
        newSetsLogged[index] += 1

        // Update the setsLogged state
        setSetsLogged(newSetsLogged)
    }

    return (
        <Fragment>
            <tr key={exercise.id}>
                <td data-label={"Name"}>{exercise.name}</td>
                <td data-label={"Weight"}>{exercise.weight}</td>
                <td data-label={"Reps"}>{exercise.reps}</td>
                <td data-label={"Goal"}>{exercise.setsGoal}</td>
                <td data-label={"Sets"}>{setsLogged[index]}</td>
                <td><button onClick={() => handleRemoveExercise(exercise)} className={`${buttons.button} ${buttons.editButton}`}>Remove</button></td>
                <td><button className={darkmode ? `${buttons.button} ${styles.logSetButton}` : `${buttons.buttonLight} ${styles.logSetButton}`} onClick={() => logSet()}>Log Set</button></td>
            </tr>
        </Fragment>
    );
};

export default ExerciseLogger;
