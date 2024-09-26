import './App.css';

import Dashboard from './pages/Dashboard';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* If the user is logged in, redirect them to the dashboard, otherwise redirect them to the login page. This way
            already logged in users won't have to keep re-loggin in. */}
      <Route path="/" element={<Navigate to="/dashboard" replace={true} />} />
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
