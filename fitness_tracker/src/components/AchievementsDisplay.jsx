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

function AchievementsDisplay({ darkmode }) {
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

    const nextScoreTarget = nextScoreTargets.find(target => score < target) || null;
    const nextWorkoutTarget = nextWorkoutTargets.find(target => count < target) || null;

    const scoreProgress = nextScoreTarget ? ((score / nextScoreTarget) * 100) || 100 : 100;
    const workoutProgress = nextWorkoutTarget ? ((count / nextWorkoutTarget) * 100) || 100 : 100;

    return { scoreProgress, workoutProgress, nextScoreTarget, nextWorkoutTarget };
  };

  const { scoreProgress, workoutProgress, nextScoreTarget, nextWorkoutTarget } = calculateNextAchievementProgress(totalScore, workoutCount);

  return (
    <TableContainer component={Paper} className={darkmode ? styles.container : styles.containerLight}>
      <Table className={darkmode ? styles.table : styles.tableLight}>
        <TableHead className={darkmode ? styles.tableHeaderBgColor : styles.tableHeaderBgColorLight}>
          <TableRow>
            <TableCell className={darkmode ? styles.tableDate : styles.tableDateLight}
              style={{ textAlign: "center" }}>
              <strong>Achievements:</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getAchievementMessages(totalScore, workoutCount).map((message, index) => (
            <TableRow key={index}>
              <TableCell className={darkmode ? styles.primaryTextColor : styles.primaryTextColorLight} style={{ textAlign: "center" }}>
                {message}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableHead className={darkmode ? styles.tableHeaderBgColor : styles.tableHeaderBgColorLight}>
          <TableRow>
            <TableCell className={darkmode ? styles.tableDate : styles.tableDateLight} style={{ textAlign: "left" }}>
              <strong>Upcoming Achievements:</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nextScoreTarget && (
            <TableRow>
              <TableCell>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Next Score Achievement: {nextScoreTarget} points</span>
                  <span>{totalScore} / {nextScoreTarget} points</span>
                </div>
                <LinearProgress variant="determinate" value={scoreProgress} sx={{ height: 20 }} />
              </TableCell>
            </TableRow>
          )}
          {nextWorkoutTarget && (
            <TableRow>
              <TableCell>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Next Workout Achievement: {nextWorkoutTarget} workouts</span>
                  <span>{workoutCount} / {nextWorkoutTarget} workouts</span>
                </div>
                <LinearProgress variant="determinate" value={workoutProgress} sx={{ height: 20 }} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AchievementsDisplay;
