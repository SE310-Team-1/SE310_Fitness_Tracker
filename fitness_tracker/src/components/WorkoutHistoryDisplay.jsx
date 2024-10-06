import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import WorkoutHistoryRow from "./WorkoutHistoryRow";
import styles from "../module_CSS/WorkoutHistory.module.css";

function WorkoutHistoryDisplay({ darkmode }) {
  const [workouts, setWorkouts] = useState([]);
  const [exerciseList, setExerciseList] = useState({});

  // Fetch workouts and its associated exercises on component mount
  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchExercises = async (workoutId) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/workout/${workoutId}/exercises`,
        { withCredentials: true }
      );
      const exercisesData = response.data;
      setExerciseList((prevState) => ({
        ...prevState,
        [workoutId]: exercisesData, // Map exercises by workout ID
      }));
    } catch (error) {
      console.error(
        `Error fetching exercises for workout ${workoutId}:`,
        error
      );
    }
  };

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get("http://localhost:4001/workout", {
        withCredentials: true,
      });
      const workoutsData = response.data;
      setWorkouts(workoutsData);

      // Fetch exercises for each workout
      workoutsData.forEach((workout) => {
        fetchExercises(workout.id);
      });
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  return (
    <TableContainer component={Paper} className={darkmode ? styles.container : styles.containerLight}>
      <Table className={darkmode ? styles.table : styles.tableLight}>
        <TableHead className={darkmode ? styles.tableHeaderBgColor : styles.tableHeaderBgColorLight}>
          <TableRow>
            <TableCell
              className={darkmode ? styles.tableDate : styles.tableDateLight}
              style={{ textAlign: "center" }}
            >
              <strong>Workout Date</strong>
            </TableCell>
            <TableCell
              className={darkmode ? styles.primaryTextColor: styles.primaryTextColorLight}
              style={{ width: "5%" }}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {workouts.map((workout) => (
            <WorkoutHistoryRow
              darkmode={darkmode}
              key={workout.id}
              workout={workout}
              exercises={exerciseList[workout.id] || []} // Pass exercises dynamically
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WorkoutHistoryDisplay;
