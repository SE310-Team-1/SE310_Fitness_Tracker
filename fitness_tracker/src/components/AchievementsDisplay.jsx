import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import styles from "../module_CSS/WorkoutHistory.module.css";

function AchievementsDisplay() {
  const [workouts, setWorkouts] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [workoutCount, setWorkoutCount] = useState(0);

  // Fetch workouts on component mount
  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get("http://localhost:4001/workout", {
        withCredentials: true,
      });
      const workoutsData = response.data;
      setWorkouts(workoutsData);

      // Calculate the total score and other metrics from all workouts
      const total = workoutsData.reduce((sum, workout) => sum + workout.score, 0);
      const count = workoutsData.length;

      setTotalScore(total);
      setWorkoutCount(count);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const getAchievementMessages = (score, count) => {
    let achievements = [];

    // Achievements based on total score
    if (score > 1000000) {
      achievements.push("Achievement unlocked! Your total score passed 1,000,000 points!");
    }
    if (score > 100000) {
      achievements.push("Achievement unlocked! Your total score passed 100,000 points!");
    }
    if (score > 10000) {
      achievements.push("Achievement unlocked! Your total score passed 10,000 points!");
    }
    if (score > 1000) {
      achievements.push("Achievement unlocked! Your total score passed 1,000 points!");
    }
    if (score > 100) {
      achievements.push("Achievement unlocked! Your total score passed 100 points!");
    }
    if (score > 0) {
      achievements.push("Achievement unlocked! You got your first score!");
    }

    // Achievements based on workout count
    if (count > 100) {
      achievements.push("Achievement unlocked! You completed 100 workouts!");
    } 
    if (count > 10) {
      achievements.push("Achievement unlocked! You completed 10 workouts!");
    }
    if (count > 0) {
      achievements.push("Achievement unlocked! You completed your first workout!");
    }

    // If no achievements, provide a default message
    if (achievements.length === 0) {
      achievements.push("Keep going! You'll reach your first achievement soon!");
    }

    return achievements;
  };

  const calculateNextAchievementProgress = (score, count) => {
    const nextScoreTargets = [100, 1000, 10000, 100000, 1000000];
    const nextWorkoutTargets = [1, 10, 100];

    const nextScoreTarget = nextScoreTargets.find(target => score < target) || nextScoreTargets[nextScoreTargets.length - 1];
    const nextWorkoutTarget = nextWorkoutTargets.find(target => count < target) || nextWorkoutTargets[nextWorkoutTargets.length - 1];

    const scoreProgress = ((score / nextScoreTarget) * 100) || 100;
    const workoutProgress = ((count / nextWorkoutTarget) * 100) || 100;

    return { scoreProgress, workoutProgress, nextScoreTarget, nextWorkoutTarget };
  };

  const { scoreProgress, workoutProgress, nextScoreTarget, nextWorkoutTarget } = calculateNextAchievementProgress(totalScore, workoutCount);

  return (
    <TableContainer component={Paper} className={styles.container}>
      <Table className={styles.table}>
        <TableHead className={styles.tableHeaderBgColor}>
          <TableRow>
            <TableCell
              className={styles.tableDate}
              style={{ textAlign: "left", color: "white" }} // Set text color to white
            >
              <strong>Achievements:</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Display achievement messages based on total score and workout count */}
          {getAchievementMessages(totalScore, workoutCount).map((message, index) => (
            <TableRow key={index}>
              <TableCell
                className={styles.primaryTextColor}
                style={{ textAlign: "center", color: "white" }} // Set text color to white
              >
                {message}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableHead className={styles.tableHeaderBgColor}>
          <TableRow>
            <TableCell
              className={styles.tableDate}
              style={{ textAlign: "left", color: "white" }} // Set text color to white
            >
              <strong>Upcoming Achievements:</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <div style={{ display: "flex", justifyContent: "space-between", color: "white" }}> {/* Set text color to white */}
                <span>Next Score Achievement: {nextScoreTarget} points</span>
                <span>{scoreProgress.toFixed(2)}%</span>
              </div>
              <LinearProgress
                variant="determinate"
                value={scoreProgress}
                sx={{ height: 20 }} // Increase vertical size of the progress bar
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div style={{ display: "flex", justifyContent: "space-between", color: "white" }}> {/* Set text color to white */}
                <span>Next Workout Achievement: {nextWorkoutTarget} workouts</span>
                <span>{workoutProgress.toFixed(2)}%</span>
              </div>
              <LinearProgress
                variant="determinate"
                value={workoutProgress}
                sx={{ height: 20 }} // Increase vertical size of the progress bar
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AchievementsDisplay;
