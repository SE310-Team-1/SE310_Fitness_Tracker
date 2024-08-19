import GenerateGraph from './GraphGenerator';

const tempData = [{date: 'Monday', volume1: 400, volume2: 900, amt: 2400}, 
    {date: 'Tuesday', volume1: 200, volume2: 2400, amt: 2400},
    {date: 'Wednesday', volume1: 300, volume2: 1100, amt: 2400},
    {date: 'Thursday', volume1: 100, volume2: 800, amt: 2400},
    {date: 'Friday', volume1: 100, volume2: 600, amt: 2400}];

function GraphDisplay() {
    var today = DateToString(new Date());

    return (
        <div>        
            <GenerateGraph data={tempData}/>
            <input id="dateSelector" type="date" max={today}></input>
            <button onClick={() => RefreshGraph(document.getElementById('dateSelector').value)}>CLICK ME</button>
        </div>
    )
}

function DateToString(date) {
    var day = String(date.getDate()).padStart(2, '0');
    /* NOTE: Month indexes from 0, hence we add 1 to the month. */
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();
    return year + "-" + month + "-" + day;
}

function RefreshGraph(endDate) {
    alert('Showing until ' + endDate);
}

export default GraphDisplay