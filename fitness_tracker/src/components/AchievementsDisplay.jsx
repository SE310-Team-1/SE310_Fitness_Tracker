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
import styles from "../module_CSS/WorkoutHistory.module.css";

function AchievementsDisplay() {
  const [workouts, setWorkouts] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

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

      // Calculate the total score from all workouts
      const total = workoutsData.reduce((sum, workout) => sum + workout.score, 0);
      setTotalScore(total);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const getAchievementMessageScore = (score) => {
    if (score > 1000000000) {
      return "Achievement unlocked! You passed 1,000,000,000 points!";
    } else if (score > 10000) {
      return "Achievement unlocked! You passed 10,000 points!";
    } else if (score > 0) {
      return "Achievement unlocked! You passed 0 points!";
    } else if (score === 0) {
      return "Keep going! You'll reach the first achievement soon!";
    }
  };
  

  return (
    <TableContainer component={Paper} className={styles.container}>
      <Table className={styles.table}>
        <TableHead className={styles.tableHeaderBgColor}>
          <TableRow>
            <TableCell
              className={styles.tableDate}
              style={{ textAlign: "left" }}
            >
              <strong>Achievements:</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* First row with achievement message */}
          <TableRow>
            <TableCell
              className={styles.primaryTextColor}
              style={{ textAlign: "center" }}
            >
              {getAchievementMessageScore(totalScore)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AchievementsDisplay;
