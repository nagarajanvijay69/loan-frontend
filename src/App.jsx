import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
import AddUser from './AddUser';
import EditUser from './EditUser';

function App() {
  const isLoggedIn = localStorage.getItem('isAdmin') === 'true';

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
          element={isLoggedIn ? <AddUser /> : <Navigate to="/" />}
        />
        <Route
          path="/edit/:id"
          element={isLoggedIn ? <EditUser /> : <Navigate to="/" />}
        />
        {/* Fallback for undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
