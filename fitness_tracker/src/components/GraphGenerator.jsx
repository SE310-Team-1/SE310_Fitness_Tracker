import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import styles from '../module_CSS/GraphGenerator.module.css';

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
        <ResponsiveContainer width="100%" height={300} className={styles.rechartWrapper}>
            <LineChart data={data}>
                <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#E10000"
                    strokeWidth={2}
                    dot={{ stroke: "#fff", strokeWidth: 1, r: 4}}
                />
                <CartesianGrid className={styles["rechartsCartesianGrid"]}/>
                <XAxis dataKey="date" className={styles["recharts-cartesian-axis-tick"]}/>
                <YAxis className={styles["recharts-cartesian-axis-tick"]}/>
                <Tooltip 
                    contentStyle={{
                        backgroundColor: "#333333",  // Dark background for tooltip
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                    labelStyle={{ color: "#fff" }} // White text for the date label
                    itemStyle={{ color: "#fff", fontWeight: "bold" }} // Red text for the score value
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default GenerateGraph;
