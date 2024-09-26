import GraphDisplay from "../components/GraphDisplay";
import TabDisplay from "../components/TabDisplay";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [workouts, setWorkouts] = useState([]);
    const [userId, setUserId] = useState("");

    // fetch all workouts from the server
    useEffect(() => {
        console.log("useEffect called");
        axios
            .get("http://localhost:4001/workout/workouts", { withCredentials: true, })
            .then((response) => {
                console.log("API response:", response.data);
                setUserId(response.data[0].user_id);
                console.log("userId is:", response.data[0].user_id);

                setWorkouts(response.data);
                console.log("workouts are:", response.data);
            })
            .catch((error) => {
                // If the user is not logged in (due to directly accessing dashboard path or token expiring), redirect to the login page
                // window.location.href = "/login";
                console.error("Not logged in ", error);
            });
    }, []);

    return (  
        <div className="App">
            <header className="App-header">
                FiTrack
            </header>
            <GraphDisplay />

            <TabDisplay />

            {/* <TempWorkoutDisplay data={workouts}/> */}

        </div>
    );
}
 
export default Dashboard
;