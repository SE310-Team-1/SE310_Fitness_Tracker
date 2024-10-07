  import React from "react";
  import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
  import styles from "../module_CSS/AchivementsDisplay.module.css";

  function AchievementsDisplay() {
    return (
      <TableContainer component={Paper} className={styles.container}>
        <Table className={styles.table}>
          <TableHead className={styles.tableHeaderBgColor}>
            <TableRow>
              <TableCell
                className={styles.primaryTextColor}
                style={{ textAlign: "center" }}
              >
                <strong>Achievements</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  export default AchievementsDisplay;
