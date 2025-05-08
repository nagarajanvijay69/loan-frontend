import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddUser.css';

function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    totalAmount: '',
    paidNow: '',
    willPayNow: '',
    loanStart: '',
    loanEnd: '',
    duration: '',
    paidThisMonth: 'No'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      navigate('/dashboard');
    } else {
      alert('Failed to add user.');
    }
  };

  return (
    <div className="add-user-page">
      <h2>Add New User</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="User Name" onChange={handleChange} required />
        <input type="number" name="totalAmount" placeholder="Total Loan Amount" onChange={handleChange} required />
        <input type="number" name="paidNow" placeholder="Paid Till Now" onChange={handleChange} required />
        <input type="number" name="willPayNow" placeholder="Should Have Paid Till Now" onChange={handleChange} required />
        <input type="date" name="loanStart" placeholder="Loan Start Date" onChange={handleChange} required />
        <input type="date" name="loanEnd" placeholder="Loan End Date" onChange={handleChange} required />
        <input type="text" name="duration" placeholder="Loan Duration (e.g., 12 Months)" onChange={handleChange} required />
        <select name="paidThisMonth" onChange={handleChange}>
          <option value="No">Paid this month?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
