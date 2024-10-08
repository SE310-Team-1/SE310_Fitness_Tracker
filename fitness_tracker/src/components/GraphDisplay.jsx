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

    let endDate = new Date();
    let startDate = new Date();
    endDate.setDate(startDate.getDate());
    startDate.setDate(startDate.getDate() - 6);

    // Fetch data asynchronously after component mounts
    useEffect(() => {
        UpdateGraphFromInputs();
    }, []);

    // Define UpdateGraphFromInputs inside GraphDisplay
    function UpdateGraphFromInputs() {
        let endDate = document.getElementById("dateSelector").valueAsDate;
        if (endDate == null) {
            endDate = new Date();
        }
        let period = document.getElementById("periodDropDown").value;
        let startDate = GetStartDate(endDate, period);
        UpdateGraph(startDate, endDate, setData);
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
async function UpdateGraph(startDate, endDate, setData) {
        const fetchedData = await FetchPeriod(startDate, endDate);
        setData(fetchedData);
}

/* 
    FetchPeriod() returns exercise progress data corresponding with the period between the 
    startDate and endDate parameters (inclusive).
*/
async function FetchPeriod(startDate, endDate) {
    let data = [];

    for (
        let nextDate = startDate;
        nextDate <= endDate;
        nextDate.setDate(nextDate.getDate() + 1)
    ) {
        try {
            const url = `http://localhost:4001/workout?date=` + dateToString(nextDate);
            console.log(url)
            const response = await axios.get(url, { withCredentials: true });
            const workout = response.data;

            if (workout != null) {
                const workoutTotal = workout.reduce((total, workout) => {
                    return total + workout.score;
                }, 0);

                console.log('Total score: ', workoutTotal);

                data.push({
                    date: dateToString(nextDate),
                    score: workoutTotal,
                })
            } else {
                data.push({
                    date: dateToString(nextDate),
                    score: 0,
                });
            }
        } catch (error) {
            console.error(`Error fetching workout for date ${nextDate}:`, error);
        }
    }
    return data;
}

export default GraphDisplay;
