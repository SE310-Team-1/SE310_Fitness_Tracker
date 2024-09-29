import React, { useState } from 'react';
import buttons from '../module_CSS/buttons.module.css'
import styles from '../module_CSS/ExerciseLogger.module.css'
import { MenuItem, Select } from '@mui/material';

const ExerciseAdder = ({exerciseList, addExercise, cancelAddExercise }) => {
    const [selectedExercise, setSelectedExercise] = useState(exerciseList[0])

    
    return (
        <tr>
            <td>
                <Select 
                    value={selectedExercise.name} 
                    sx={{
                        width: "100%",
                        color: "white", 
                        border: "1px solid white", 
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'white',
                        }
                    }} 
                    onChange={e => {
                        setSelectedExercise(exerciseList.find(exercise => exercise.name === e.target.value))
                    }}
                >
                    {exerciseList.map((exercise) => (
                        <MenuItem 
                            key={exercise.id} 
                            value={exercise.name}
                            sx={{
                                color: "black",
                                backgroundColor: "white",
                                '&:hover': {
                                    backgroundColor: "#f0f0f0",
                                }
                            }}
                        >
                            {exercise.name}
                        </MenuItem>
                    ))}
                </Select>
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
