import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Adduser from './pages/Adduser';
import Edituser from './pages/Edituser';

function App() {
  const isLoggedIn =  localStorage.getItem('isAdmin') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/add"
          element={isLoggedIn ? <Adduser /> : <Navigate to="/" />}
        />
        <Route
          path="/edit/:id"
          element={isLoggedIn ? <Edituser /> : <Navigate to="/" />}
        />
        {/* Fallback for undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;