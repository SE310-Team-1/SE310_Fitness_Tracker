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
  Collapse,
  Typography,
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
      {/* Workout Date Row (Collapsed View) */}
      <TableRow>
        <TableCell style={{ textAlign: "center" }}>
          {new Date(workout.date).toLocaleDateString()}
        </TableCell>
        <TableCell style={{ textAlign: "right", width: '5%' }}>
          <IconButton aria-label="expand row" size="small" onClick={handleRowClick}>
            {showDetails ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Expanded View */}
      <TableRow>
        <TableCell colSpan={2} style={{ padding: 0 }}>
          <Collapse in={showDetails} timeout="auto" unmountOnExit>
            <Box margin={2}>
              {/* Total Score Display */}
              <Typography variant="h6" align="left" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
                TOTAL SCORE: {workout.score}
              </Typography>

              {/* Exercise Breakdown */}
              <TableContainer>
                <Table size="small" style={{marginBottom:'8px'}}>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '20%' }}><strong>Exercise</strong></TableCell>
                      <TableCell align="center" style={{ width: '15%' }}><strong>Sets Completed</strong></TableCell>
                      <TableCell align="center" style={{ width: '15%' }}><strong>Reps</strong></TableCell>
                      <TableCell align="center" style={{ width: '15%' }}><strong>Weight (kg)</strong></TableCell>
                      <TableCell align="center" style={{ width: '15%' }}><strong>Score</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {exercises && exercises.length > 0 ? (
                      exercises.map((exercise, index) => (
                        <TableRow key={index}>
                          <TableCell>{exercise.name}</TableCell>
                          <TableCell align="center">{exercise.sets_completed} / {exercise.setsGoal}</TableCell>
                          <TableCell align="center">{exercise.reps}</TableCell>
                          <TableCell align="center">{exercise.weight}</TableCell>
                          <TableCell align="center">{getExerciseScore(exercise)}</TableCell>
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
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default WorkoutHistoryRow;
