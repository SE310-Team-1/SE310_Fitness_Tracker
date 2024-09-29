import React, { Fragment, useState } from "react";
import buttons from '../module_CSS/buttons.module.css'
import styles from '../module_CSS/ExerciseLogger.module.css'

const ExerciseLogger = ({ exercise, handleRemoveExercise }) => {

    const [setsLogged, setSetsLogged] = useState(0)

    const logSet = () => {
        setSetsLogged(setsLogged + 1);
    }

    return (
        <Fragment>
            <tr key={exercise.id}>
                <td data-label={"Name"}>{exercise.name}</td>
                <td data-label={"Weight"}>{exercise.weight}</td>
                <td data-label={"Reps"}>{exercise.reps}</td>
                <td data-label={"Goal"}>{exercise.setsGoal}</td>
                <td data-label={"Sets"}>{setsLogged}</td>
                <td><button onClick={handleRemoveExercise} className={`${buttons.button} ${buttons.editButton}`}>Remove</button></td>
                <td><button className={`${buttons.button} ${styles.logSetButton}`} onClick={() => logSet()}>Log Set</button></td>
            </tr>
        </Fragment>
    );
};

export default ExerciseLogger;
