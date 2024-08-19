import { LineChart, Line, CartesianGrid, XAxis, YAxis, Brush, Legend, Tooltip } from 'recharts';

function GraphDisplay({ data }) {
    
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    /* NOTE: Month indexes from 0, hence we add 1 to the month. */
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();
    today = year + "-" + month + "-" + day;

    return (
        <div>
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey="volume1" stroke="#8884d8" strokeWidth={3} />
                <Line type="monotone" dataKey="volume2" stroke="#afafaf" strokeWidth={3} />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis/>
                <Tooltip />
            </LineChart>
            <input id="dateSelector" type="date" max={ today }></input>
            <button onClick={() => RefreshGraph(document.getElementById('dateSelector').value)}>CLICK ME</button>
        </div>
    )
}

function RefreshGraph(endDate) {
    alert('Showing until ' + endDate);
}

export default GraphDisplay