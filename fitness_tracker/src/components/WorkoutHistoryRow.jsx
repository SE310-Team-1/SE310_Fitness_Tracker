import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const WorkoutHistoryRow = ({ workout, exercises }) => {
  const [showDetails, setShowDetails] = useState(false); // State to toggle between views

  const handleRowClick = () => {
    setShowDetails(!showDetails); // Toggle between overview and exercise details
  };

  const getExerciseScore = (exercise) => {
    return (
      (exercise.sets_completed / exercise.setsGoal) *
      exercise.reps *
      exercise.weight
    ).toFixed(2);
  };

  return (
    <>
      {!showDetails ? (
        // Workout Overview: Shows Date and Total Score
        <TableRow>
          <TableCell padding="none" style={{ width: '5%' }}>
            <IconButton aria-label="expand row" size="small" onClick={handleRowClick}>
              {showDetails ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell padding="none" style={{ textAlign: "center", width: '70%' }}>
            {new Date(workout.date).toLocaleDateString()}
          </TableCell>
          <TableCell padding="none" style={{ textAlign: "center", width: '25%' }}>
            {workout.score}
          </TableCell>
        </TableRow>
      ) : (
        // Exercise Details: Shows Exercise Info instead of Workout Overview
        <TableRow>
          <TableCell padding="none" style={{ width: '5%', padding: '0px' }}>
            <IconButton aria-label="collapse row" size="small" onClick={handleRowClick}>
              {showDetails ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell colSpan={2}>
            <Box margin={1}>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '35%' }}><strong>Exercise</strong></TableCell>
                      <TableCell align="center" style={{ width: '15%' }}><strong>Sets Completed</strong></TableCell>
                      <TableCell align="center" style={{ width: '15%' }}><strong>Reps</strong></TableCell>
                      <TableCell align="center" style={{ width: '15%' }}><strong>Weight (kg)</strong></TableCell>
                      <TableCell align="center" style={{ width: '20%' }}><strong>Score</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {exercises && exercises.length > 0 ? (
                      exercises.map((exercise, index) => (
                        <TableRow key={exercise.id}>
                          <TableCell style={{ width: '35%' }}>{exercise.name}</TableCell>
                          <TableCell align="center" style={{ width: '15%' }}>{exercise.sets_completed} / {exercise.setsGoal}</TableCell>
                          <TableCell align="center" style={{ width: '15%' }}>{exercise.reps}</TableCell>
                          <TableCell align="center" style={{ width: '15%' }}>{exercise.weight}</TableCell>
                          <TableCell align="center" style={{ width: '20%' }}> {getExerciseScore(exercise)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No exercises found for this workout.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default WorkoutHistoryRow;
