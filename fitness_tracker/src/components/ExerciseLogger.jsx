import React, { Fragment } from "react";

const ExerciseLogger = ({exercise, isEditing, updateExercise}) => {

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
            <tr key={exercise.id} style={{height: 96}}>
                <td>{exercise.name}</td>
                <td>{exercise.weight}</td>
                <td>{exercise.reps}</td>
                <td>{exercise.setsGoal}</td>
                <td>{exercise.setsLogged}</td>
                <td>{!isEditing && <button onClick={() => startEditing()}>Edit</button>}</td>
                <td><button onClick={() => logSet()}>Log Set</button></td>
            </tr>
        </Fragment>
    );
};

export default ExerciseLogger;
