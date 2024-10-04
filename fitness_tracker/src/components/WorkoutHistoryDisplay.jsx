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

function WorkoutHistoryDisplay() {
  const [workouts, setWorkouts] = useState([]);
  const [exerciseList, setExerciseList] = useState({});

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

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{ textAlign: "center"}}>Workout Date</TableCell>
            <TableCell style={{ textAlign: "center"}}>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workouts.map((workout) => (
            <WorkoutHistoryRow
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
