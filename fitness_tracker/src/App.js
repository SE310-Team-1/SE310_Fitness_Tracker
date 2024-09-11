import './App.css';
import { useState, useEffect } from 'react';
import TempWorkoutDisplay from './components/TempWorkoutDisplay';
import TabDisplay from './components/TabDisplay';
import GraphDisplay from './components/GraphDisplay';

function App() {
// State for storing workouts
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    // Send GET request to 'workouts/all' endpoint
    const response = await fetch('http://localhost:4001/workouts/all')

      // Parse JSON of response
      const workouts = await response.json()

      // Set state with workouts
      setWorkouts(workouts)

      // Log workouts to console
      console.log(workouts)
  }

  // Fetch workouts when component mounts
  useEffect(() => {
    fetchWorkouts()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        FiTrack
      </header>
      <GraphDisplay />

      <TabDisplay/>

      {/* <TempWorkoutDisplay data={workouts}/> */}

    </div>
  );
}

export default App;
