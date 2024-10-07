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
import styles from "../module_CSS/WorkoutHistory.module.css";
import { dark } from "@mui/material/styles/createPalette";

const WorkoutHistoryRow = ({ workout, exercises, darkmode }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Toggle expanded view containing exercise details
  const handleRowClick = () => {
    setShowDetails(!showDetails);
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
      <TableRow className={darkmode ? styles.tableOddRowsColor : styles.tableOddRowsColorLight} hover>
        <TableCell className={darkmode ? styles.tableDate : styles.tableDateLight} style={{ textAlign: "center" }}>
          {new Date(workout.date).toLocaleString()}
        </TableCell>
        <TableCell
          className={darkmode ? styles.primaryTextColor : styles.primaryTextColorLight}
          style={{ textAlign: "right", width: "5%" }}
        >
          <IconButton
            className={darkmode ? styles.iconButton : styles.iconButtonLight}
            aria-label="expand row"
            size="small"
            onClick={handleRowClick}
          >
            {showDetails ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Expanded View */}
      <TableRow className={darkmode ? styles.tableEvenRowsColor : styles.tableEvenRowsColorLight}>
        <TableCell colSpan={2} style={{ padding: 0 }}>
          <Collapse in={showDetails} timeout="auto" unmountOnExit>
            <Box margin={2}>
              {/* Total Score Display */}
              <Typography
                variant="h6"
                align="left"
                className={darkmode ? styles.primaryTextColor : styles.primaryTextColorLight}
                style={{ marginBottom: "16px", fontWeight: "bold" }}
              >
                TOTAL SCORE: {workout.score}
              </Typography>

              {/* Exercise Breakdown */}
              <TableContainer>
                <Table size="small" className={darkmode ? styles.table : styles.tableLight}>
                  <TableHead className={darkmode ? styles.tableHeaderBgColor : styles.tableHeaderBgColorLight}>
                    <TableRow>
                      <TableCell
                        className={darkmode ? styles.tableExerciseData : styles.tableExerciseDataLight}
                        style={{ width: "18%" }}
                      >
                        <strong>Exercise</strong>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={darkmode ? styles.tableExerciseData : styles.tableExerciseDataLight}
                        style={{ width: "15%" }}
                      >
                        <strong>Sets Completed</strong>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={darkmode ? styles.tableExerciseData : styles.tableExerciseDataLight}
                        style={{ width: "15%" }}
                      >
                        <strong>Reps</strong>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={darkmode ? styles.tableExerciseData : styles.tableExerciseDataLight}
                        style={{ width: "15%" }}
                      >
                        <strong>Weight (kg)</strong>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={darkmode ? styles.tableExerciseData : styles.tableExerciseDataLight}
                        style={{ width: "15%" }}
                      >
                        <strong>Score</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {exercises && exercises.length > 0 ? (
                      exercises.map((exercise, index) => (
                        <TableRow
                          key={index}
                          className={darkmode ? styles.tableOddRowsColor : styles.tableOddRowsColorLight}
                        >
                          <TableCell className={darkmode ? styles.tableExerciseData : styles.tableExerciseDataLight}>
                            {exercise.name}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={darkmode ? styles.tableExerciseData : styles.tableExerciseDataLight}
                          >
                            {exercise.sets_completed} / {exercise.setsGoal}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={darkmode ? styles.tableExerciseData : styles.tableExerciseDataLight}
                          >
                            {exercise.reps}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={darkmode ? styles.tableExerciseData : styles.tableExerciseDataLight}
                          >
                            {exercise.weight}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={darkmode ? styles.tableExerciseData : styles.tableExerciseDataLight}
                          >
                            {getExerciseScore(exercise)}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                        <TableRow className={darkmode ? styles.tableOddRowsColor : styles.tableOddRowsColorLight}>
                        <TableCell
                          colSpan={5}
                          align="center"
                            className={darkmode ? styles.primaryTextColor: styles.primaryTextColorLight}
                        >
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
