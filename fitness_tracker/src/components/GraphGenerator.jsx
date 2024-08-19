import { LineChart, Line, CartesianGrid, XAxis, YAxis, Brush, Legend, Tooltip } from 'recharts';

function GenerateGraph({ data }) {
    return (
        <LineChart width={400} height={400} data={data}>
            <Line type="monotone" dataKey="volume1" stroke="#8884d8" strokeWidth={3} />
            <Line type="monotone" dataKey="volume2" stroke="#afafaf" strokeWidth={3} />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis/>
            <Tooltip />
        </LineChart>
    )
}

export default GenerateGraph