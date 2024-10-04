import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return <div></div>;
}

export default WorkoutHistoryDisplay;
