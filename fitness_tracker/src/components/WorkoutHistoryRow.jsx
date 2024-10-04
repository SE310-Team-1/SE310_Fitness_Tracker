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
import styles from '../module_CSS/WorkoutHistory.module.css';


const WorkoutHistoryRow = ({ workout, exercises }) => {
  const [showDetails, setShowDetails] = useState(false); 
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
      <TableRow className={styles.tableOddRowsColor} hover>
        <TableCell className={styles.primaryTextColor} style={{ textAlign: "center" }}>
          {new Date(workout.date).toLocaleDateString()}
        </TableCell>
        <TableCell className={styles.primaryTextColor} style={{ textAlign: "right", width: '5%' }}>
          <IconButton className={styles.iconButton} aria-label="expand row" size="small" onClick={handleRowClick}>
            {showDetails ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Expanded View */}
      <TableRow className={styles.tableEvenRowsColor}>
        <TableCell colSpan={2} style={{ padding: 0 }}>
          <Collapse in={showDetails} timeout="auto" unmountOnExit>
            <Box margin={2}>
              {/* Total Score Display */}
              <Typography variant="h6" align="left" className={styles.primaryTextColor} style={{ marginBottom: '16px', fontWeight: 'bold' }}>
                TOTAL SCORE: {workout.score}
              </Typography>

              {/* Exercise Breakdown */}
              <TableContainer>
                <Table size="small" className={styles.table}>
                  <TableHead className={styles.tableHeaderBgColor}>
                    <TableRow>
                      <TableCell className={styles.primaryTextColor} style={{ width: '20%' }}><strong>Exercise</strong></TableCell>
                      <TableCell align="center" className={styles.primaryTextColor} style={{ width: '15%' }}><strong>Sets Completed</strong></TableCell>
                      <TableCell align="center" className={styles.primaryTextColor} style={{ width: '15%' }}><strong>Reps</strong></TableCell>
                      <TableCell align="center" className={styles.primaryTextColor} style={{ width: '15%' }}><strong>Weight (kg)</strong></TableCell>
                      <TableCell align="center" className={styles.primaryTextColor} style={{ width: '15%' }}><strong>Score</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {exercises && exercises.length > 0 ? (
                      exercises.map((exercise, index) => (
                        <TableRow key={index} className={ styles.tableOddRowsColor }>
                          <TableCell className={styles.primaryTextColor}>{exercise.name}</TableCell>
                          <TableCell align="center" className={styles.primaryTextColor}>{exercise.sets_completed} / {exercise.setsGoal}</TableCell>
                          <TableCell align="center" className={styles.primaryTextColor}>{exercise.reps}</TableCell>
                          <TableCell align="center" className={styles.primaryTextColor}>{exercise.weight}</TableCell>
                          <TableCell align="center" className={styles.primaryTextColor}>{getExerciseScore(exercise)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow className={styles.tableOddRowsColor}>
                        <TableCell colSpan={5} align="center" className={styles.primaryTextColor}>
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
