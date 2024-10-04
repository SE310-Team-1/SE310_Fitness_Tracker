import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Typography,
  Box,
  List,
  ListItem,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import axios from "axios";

function WorkoutHistoryDisplay() {
  const [workouts, setWorkouts] = useState([]);
  const [exerciseList, setExerciseList] = useState({});
  // State to handle open/close status for each workout's exercises
  const [openRows, setOpenRows] = useState({});

  const handleRowClick = (id) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [id]: !prevOpenRows[id], // Toggle the open/close state for this row
    }));
  };

  const fetchExercises = async (workoutId) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/workout/${workoutId}/exercises`,
        { withCredentials: true }
      );
      console.log("Exercises for workout", workoutId, "are:", response.data);
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

      // Call fetchExercises for each workout
      workoutsData.forEach((workout) => {
        fetchExercises(workout.id); // Fetch exercises for each workout by ID
      });
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  // useEffect to fetch workouts when the component mounts
  useEffect(() => {
    fetchWorkouts();
  }, []);

  //TODO remove useEffect console logs
  useEffect(() => {
    console.log("Workouts are:", workouts);
  }, [workouts]);

  useEffect(() => {
    console.log("Exercise list is:", exerciseList);
  }, [exerciseList]);
  //TODO remove useEffect console logs

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Workout Date</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workouts.map((workout) => (
            <React.Fragment key={workout.id}>
              <TableRow>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => handleRowClick(workout.id)}
                  >
                    {openRows[workout.id] ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>
                  {new Date(workout.date).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">{workout.score}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={3}
                >
                  <Collapse
                    in={openRows[workout.id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                        Exercises
                      </Typography>
                      <List>
                        {exerciseList[workout.id] &&
                        exerciseList[workout.id].length > 0 ? (
                          exerciseList[workout.id].map((exercise, index) => (
                            <ListItem key={index}>
                              {exercise.name} - Sets Completed:
                              {exercise.sets_completed}, Sets Goal:
                              {exercise.setsGoal}, Reps:{exercise.reps}, Score:{" "}
                              {Number(
                                exercise.sets_completed / exercise.setsGoal
                              ) *
                                exercise.reps *
                                exercise.weight}
                            </ListItem>
                          ))
                        ) : (
                          <ListItem>
                            No exercises found for this workout.
                          </ListItem>
                        )}
                      </List>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WorkoutHistoryDisplay;
