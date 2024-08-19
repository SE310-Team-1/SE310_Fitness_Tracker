import GenerateGraph from './GraphGenerator';
import { Fragment } from 'react';

function GraphDisplay() {
    let endDate = DateToString(new Date());
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);
    let tempData = FetchPeriod(startDate, new Date());

    return (
        <Fragment>        
            <GenerateGraph data={tempData}/>
            <input id="dateSelector" type="date" max={endDate}></input>
            <select>
                <option>Exercise 1</option>
                <option>Exercise 2</option>
                <option>Exercise 3</option>
                <option>Exercise 4</option>
            </select>
            <button onClick={() => RefreshGraph(document.getElementById('dateSelector').value)}>CLICK ME</button>
        </Fragment>
    )
}

function FetchPeriod(startDate, endDate) {
    let data = [];

    for (let nextDate = startDate; nextDate <= endDate; nextDate.setDate(nextDate.getDate() + 1)) {
        data.push({date: DateToString(nextDate), score: Math.floor(Math.random() * 2400), amt: 2400});
    }

    return data;
}

function DateToString(date) {
    let day = String(date.getDate()).padStart(2, '0');
    /* NOTE: Month indexes from 0, hence we add 1 to the month. */
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    return year + "-" + month + "-" + day;
}

function RefreshGraph(endDate) {
    alert('Showing until ' + endDate);
}

export default GraphDisplay