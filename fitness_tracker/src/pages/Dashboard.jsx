import GraphDisplay from "../components/GraphDisplay";
import TabDisplay from "../components/TabDisplay";

const Dashboard = () => {
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