import { LineChart, Line, CartesianGrid, XAxis, YAxis, Brush, Legend, Tooltip } from 'recharts';

function GenerateLine() {
    return (
        <Line type="monotone" dataKey="volume2" stroke="#afafaf" strokeWidth={3} />
    )
}

var generatedLine = GenerateLine();

function GenerateGraph({ data }) {
    return (
        <LineChart id="graph" width={1000} height={400} data={data}>
            <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={3} />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis/>
            <Tooltip />
        </LineChart>
    )
}

export default GenerateGraph