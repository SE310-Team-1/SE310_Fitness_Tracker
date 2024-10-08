import GenerateGraph from "./GraphGenerator";
import { Fragment, useState, useEffect } from "react";
import { dateToString } from "../utils/dateUtils";
import styles from '../module_CSS/GraphDisplay.module.css';
import buttons from '../module_CSS/buttons.module.css';
import axios from 'axios';

/* 
    GraphDisplay() returns the entire progress graph GUI segment, including the 
    reactive graph.
*/
function GraphDisplay() {
    const [data, setData] = useState([]);
    const [exerciseList, setExerciseList] = useState({});
    
    let endDate = new Date();
    let startDate = new Date();
    endDate.setDate(startDate.getDate()-1);
    startDate.setDate(startDate.getDate()-7);

    // Fetch data asynchronously after component mounts
    useEffect(() => {
        // Call to fetchExercises can be modified as needed
    }, []);

    // Define UpdateGraphFromInputs inside GraphDisplay
    function UpdateGraphFromInputs() {
        let endDate = document.getElementById("dateSelector").valueAsDate;
        let period = document.getElementById("periodDropDown").value;
        let startDate = GetStartDate(endDate, period);
        UpdateGraph(startDate, endDate, setData, exerciseList, setExerciseList);
    }

    return (
        <Fragment>
            <div className={styles.graphContainer}>
                <GenerateGraph data={data} />

                <div className={styles.inputContainer}>
                    <input id="dateSelector" type="date" max={endDate} className={styles.inputField} />
                    <select id="periodDropDown" className={styles.selectField}>
                        <option value="7">Week</option>
                        <option value="14">Fortnight</option>
                        <option value="28">Month</option>
                    </select>
                    <button className={`${buttons.button} ${buttons.saveButton}`} onClick={UpdateGraphFromInputs}>
                        CLICK ME
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

/* 
    GetStartDate() returns a JavaScript Date object that lies a number of days before the endDate
    which is defined by the period.
*/
function GetStartDate(endDate, period) {
    let startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (period - 1));
    return startDate;
}

/* 
    UpdateGraph() updates the graph's data set and re-renders the graph.
*/
async function UpdateGraph(startDate, endDate, setData, exerciseList, setExerciseList) {
    if (endDate == null) {
        alert("Please select a valid date.");
    } else {
        const fetchedData = await FetchPeriod(startDate, endDate, exerciseList, setExerciseList);
        setData(fetchedData); 
    }
}

/* 
    FetchPeriod() returns exercise progress data corresponding with the period between the 
    startDate and endDate parameters (inclusive).
*/
async function FetchPeriod(startDate, endDate, exerciseList, setExerciseList) {
    let data = [];

    for (
        let nextDate = startDate;
        nextDate <= endDate;
        nextDate.setDate(nextDate.getDate() + 1)
    ) {
        try {
            const response = await axios.get(`http://localhost:4001/workout/${nextDate}`, { withCredentials: true });
            const workout = response.data;

            if (workout != null) {
                const workoutId = workout.id;

                // Fetch the exercises for this workout
                if (!exerciseList[workoutId]) {
                    await fetchExercises(workoutId, setExerciseList);
                }
                const exercises = exerciseList[workoutId] || []; // Default to empty array

                // Calculate the total score for the workout
                let workoutsTotal = 0;
                exercises.forEach((exercise) => {
                    workoutsTotal += parseFloat(getExerciseScore(exercise)); // Sum the scores
                });

                // Add the workout data with total score to the graph data
                data.push({
                    date: dateToString(nextDate),
                    score: workoutsTotal,
                });
            }
        } catch (error) {
            console.error(`Error fetching workout for date ${nextDate}:`, error);
        }
    }
    return data;
}

/* 
    Fetches exercises for a given workout ID and updates the exercise list.
*/
const fetchExercises = async (workoutId, setExerciseList) => {
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

const getExerciseScore = (exercise) => {
    return (
        (exercise.sets_completed / exercise.setsGoal) *
        exercise.reps *
        exercise.weight
    ).toFixed(2);
};

export default GraphDisplay;
