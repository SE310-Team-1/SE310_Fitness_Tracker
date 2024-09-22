import './App.css';
import { useState, useEffect } from 'react';
import TempWorkoutDisplay from './components/TempWorkoutDisplay';
import TabDisplay from './components/TabDisplay';
import GraphDisplay from './components/GraphDisplay';
import Dashboard from './pages/Dashboard';
import axios from 'axios';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

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

  // This interceptor adds the Authorization header to all requests if a token is present in local storage
  axios.interceptors.request.use ( (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  // Fetch workouts when component mounts
  useEffect(() => {
    fetchWorkouts()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* If the user is logged in, redirect them to the dashboard, otherwise redirect them to the login page. This way
            already logged in users won't have to keep re-loggin in. */}
      <Route path="/" element={localStorage.getItem("token") ? <Navigate to="/dashboard" replace={true} /> : <Navigate to="/login" replace={true} />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="dashboard" element={
          <Dashboard />
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
