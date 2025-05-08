import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://load-backend-pmfq.onrender.com/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setFiltered(data);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleFilter = (type) => {
    setFilterType(type);
    if (type === 'paid') {
      setFiltered(users.filter(user => user.paidThisMonth === 'Yes'));
    } else if (type === 'unpaid') {
      setFiltered(users.filter(user => user.paidThisMonth === 'No'));
    } else {
      setFiltered(users);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete?')) return;
    await fetch(`https://load-backend-pmfq.onrender.com/api/users/${id}`, { method: 'DELETE' });
    setUsers(prev => prev.filter(user => user._id !== id));
    setFiltered(prev => prev.filter(user => user._id !== id));
  };

  return (
    <div className="dashboard">
      <div className="top-bar">
        <h2>Loan Dashboard</h2>
        <button onClick={() => {
          localStorage.removeItem('isAdmin');
          navigate('/');
        }}>Logout</button>
      </div>

      <div className="stats">
        <div className="stat" onClick={() => handleFilter('all')}>
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="stat paid" onClick={() => handleFilter('paid')}>
          <h3>Paid</h3>
          <p>{users.filter(user => user.paidThisMonth === 'Yes').length}</p>
        </div>
        <div className="stat unpaid" onClick={() => handleFilter('unpaid')}>
          <h3>Unpaid</h3>
          <p>{users.filter(user => user.paidThisMonth === 'No').length}</p>
        </div>
        <button className="add-btn" onClick={() => navigate('/add')}>
          + Add User
        </button>
      </div>

      <div className="user-list">
        {filtered.map(user => (
          <div className="user-card" key={user._id}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Total Amount:</strong> {user.totalAmount}</p>
            <p><strong>Paid Till Now:</strong> {user.paidNow}</p>
            <p><strong>Should Have Paid:</strong> {user.willPayNow}</p>
            <p><strong>Loan Start:</strong> {new Date(user.loanStart).toLocaleDateString()}</p>
            <p><strong>Loan End:</strong> {new Date(user.loanEnd).toLocaleDateString()}</p>
            <p><strong>Duration:</strong> {user.duration}</p>
            <p><strong>Paid This Month:</strong> {user.paidThisMonth}</p>
            <div className="btns">
              <button onClick={() => navigate(`/edit/${user._id}`)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(user._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
