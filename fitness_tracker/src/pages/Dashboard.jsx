import GraphDisplay from "../components/GraphDisplay";
import TabDisplay from "../components/TabDisplay";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardSignout from "../components/DashboardSignout";
import DashboardLightmode from "../components/DashboardLightmode";

const Dashboard = () => {
    const [workouts, setWorkouts] = useState([]);
    const [darkmode, setDarkmode] = useState(true);

    // fetch all workouts from the server
    useEffect(() => {
        console.log("useEffect called");
        axios
            .get("http://localhost:4001/workout/workouts", { withCredentials: true, })
            .then((response) => {

                setWorkouts(response.data);
                console.log("workouts are:", response.data);
            })
            .catch((error) => {
                // If the user is not logged in (due to directly accessing dashboard path or cookie expiring), redirect to the login page\
                alert("Not logged in (Or an error has occured), cannot access dashboard ");
                window.location.href = "/login";
                console.error("Not logged in ", error);
            });
    }, []);

    const toggleDarkmode = () => {
        setDarkmode(!darkmode);
    }

    return (  
        <div className={darkmode ? "App" : "App-light"}>
            <header className={darkmode ? "App-header" : "App-header-light"}>
                FiTrack
                <DashboardSignout />
                <DashboardLightmode toggleDarkmode={toggleDarkmode} darkmode={darkmode}/>
            </header>
            <GraphDisplay darkmode={darkmode} />

            <TabDisplay darkmode={darkmode} />

            {/* <TempWorkoutDisplay data={workouts}/> */}

        </div>
    );
}
 
export default Dashboard
;