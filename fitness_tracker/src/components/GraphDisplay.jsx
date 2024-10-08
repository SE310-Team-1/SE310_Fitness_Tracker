import GenerateGraph from "./GraphGenerator";
import { Fragment, useState, useEffect } from "react";
import { dateToString } from "../utils/dateUtils"
import styles from '../module_CSS/GraphDisplay.module.css'
import buttons from '../module_CSS/buttons.module.css'
import axios from 'axios';

/* 
    GraphDisplay() returns the entire progress graph GUI segment, including the 
    reactive graph.

    NOTE:   Graph data GET calls are made from this class, hence there are no 
            parameters passed to this function.
*/
function GraphDisplay() {
    let endDate = new Date();
    let startDate = new Date();
    endDate.setDate(startDate.getDate()-1);
    startDate.setDate(startDate.getDate()-7);
    const [data, setData] = useState([]);

    // Fetch data asynchronously after component mounts
    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await FetchPeriod(startDate, endDate);
            setData(fetchedData);
        };
        fetchData();
    }, []);

    return (
        <Fragment>
            <div className={styles.graphContainer}>
                <GenerateGraph data={data} />

                <div className={styles.inputContainer}>
                    <input id="dateSelector" type="date" max={endDate} className={styles.inputField} />
                    <select id="periodDropDown" className={styles.selectField}>
                        <option value="7">Week</option>
                        <option value="14">Fortnite</option>
                        <option value="28">Month</option>
                    </select>
                    <button className={`${buttons.button} ${buttons.saveButton}`} onClick={() => UpdateGraphFromInputs(setData)}>
                        CLICK ME
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

function UpdateGraphFromInputs(setData) {
    let endDate = document.getElementById("dateSelector").valueAsDate;
    let period = document.getElementById("periodDropDown").value;
    let startDate = GetStartDate(endDate, period);
    UpdateGraph(startDate, endDate, setData);
}

/* 
    GetStartDate() returns a JavaScript Date object that lies a number of days before the endDate
    which is defined by the period.

    params:
        endDate:    The JavaScript Date object specifying the period end date.
        period:     A numeric value defining the period length in days.
*/
function GetStartDate(endDate, period) {
    let startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (period - 1));
    return startDate;
}

/* 
    UpdateGraph(), given a valid start and end date, will use the passed setData state 
    function to update the graph's data set and re-render the graph.
    If the start and end date set is invalid an alert will be displayed instead.

    params:
        startDate:  The JavaScript Date object specifying the display period start date.
        endDate:    The JavaScript Date object specifying the display period end date.
        setDate:    The useState setter function linked to the progress graph's data set.
*/
async function UpdateGraph(startDate, endDate, setData) {
    if (endDate == null) {
        alert("Please select a valid date.");
    } else {
        const fetchedData = await FetchPeriod(startDate, endDate);
        setData(fetchedData); 
    }
}

/* 
    FetchPeriod() returns exercise progress data corresponding with the period between the 
    startDate and endDate parameters (inclusive).

    Params
        startDate:  A JavaScript Date object corresponding with the period start date.
        endDate:    A JavaScript Date object corresponding with the period end date.
*/
async function FetchPeriod(startDate, endDate) {
    let data = [];
    for (
        let nextDate = startDate;
        nextDate <= endDate;
        nextDate.setDate(nextDate.getDate() + 1)
    ) {
        let fetchedScore = await getScore(`/${dateToString(nextDate)}`);

        data.push({
            date: dateToString(nextDate),
            score: fetchedScore,
        });
    }
    return data;
}

const getScore = async (date) => {
    try {
        const response = await axios.get(`http://localhost:4001/workout${date}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${date}:`, error);
        throw error;
    }
}

export default GraphDisplay;
