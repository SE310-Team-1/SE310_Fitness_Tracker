import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

/* 
    GenerateGraph() returns a Recharts ResponsiveContainer wrapping a line chart representing the
    data set passed in the { data } parameter.

    Parameters
        data:   An array of objects in which each object contains an attribute for date and score.

    Data Format:
        data:   [obj1, obj2, ..., objN]
        obj:    {date: "yyyy-mm-dd", score: num}
        E.g.:   [{date: "1970-01-01", score: 100}, {date: "1970-01-02", score: 120}]
*/
function GenerateGraph({ data }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8884d8"
                    strokeWidth={3}
                />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default GenerateGraph;
