import GenerateGraph from "./GraphGenerator";
import { Fragment, useState } from "react";

/* 
    GraphDisplay() returns the entire progress graph GUI segment, including the 
    reactive graph.

    NOTE:   Graph data GET calls are made from this class, hence there are no 
            parameters passed to this function.
*/
function GraphDisplay() {
    let endDate = DateToString(new Date());
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);
    const [data, setData] = useState(FetchPeriod(startDate, new Date()));

    return (
        <Fragment>
            <GenerateGraph data={data} />
            <input id="dateSelector" type="date" max={endDate} />
            <select id="exercise">
                <option>Exercise 1</option>
                <option>Exercise 2</option>
                <option>Exercise 3</option>
                <option>Exercise 4</option>
            </select>
            <select id="periodDropDown">
                <option value="7">Week</option>
                <option value="14">Fortnite</option>
                <option value="28">Month</option>
            </select>
            <button onClick={() => UpdateGraphFromInputs(setData)}>
                CLICK ME
            </button>
        </Fragment>
    );
}

/* 
    DateToString() returns a formatted string in yyyy-mm-dd format corresponding with the
    date parameter. This format is complient with the HTML <input type="date"> element.

    params:
        date:   The JavaScript Date object which should be formatted.
*/
function DateToString(date) {
    let day = String(date.getDate()).padStart(2, "0");
    /* NOTE: Month indexes from 0, hence we add 1 to the month. */
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear();
    return year + "-" + month + "-" + day;
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
function UpdateGraph(startDate, endDate, setData) {
    if (endDate == null || startDate == null || startDate > endDate) {
        alert("Please select a valid date.");
    } else {
        setData(FetchPeriod(startDate, endDate));
    }
}

/* 
    FetchPeriod() returns exercise progress data corresponding with the period between the 
    startDate and endDate parameters (inclusive).

    Params
        startDate:  A JavaScript Date object corresponding with the period start date.
        endDate:    A JavaScript Date object corresponding with the period end date.
*/
function FetchPeriod(startDate, endDate) {
    let data = [];
    for (
        let nextDate = startDate;
        nextDate <= endDate;
        nextDate.setDate(nextDate.getDate() + 1)
    ) {
        data.push({
            date: DateToString(nextDate),
            score: Math.floor(Math.random() * 2400)
        });
    }
    return data;
}

export default GraphDisplay;
