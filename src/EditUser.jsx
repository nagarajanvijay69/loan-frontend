import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditUser.css';
import axios from 'axios';

function EditUser() {
  const { id } = useParams();
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

  useEffect(() => {
    axios.get(`https://loan-backend-ijdt.onrender.com/api/users/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => console.error('Failed to fetch user:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(`https://loan-backend-ijdt.onrender.com/api/users/${id}`, formData);

    if (res.status === 200) {
      navigate('/dashboard');
    } else {
      alert('Update failed.');
    }
  };

  return (
    <div className="edit-user-page">
      <h2>Edit User</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required  placeholder='Enter name'/>
        <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} required  placeholder='Enter total amount'/>
        <input type="number" name="paidNow" value={formData.paidNow} onChange={handleChange} required placeholder='Enter amount paid' />
        <input type="number" name="willPayNow" value={formData.willPayNow} onChange={handleChange} required />
        <input type="date" name="loanStart" value={formData.loanStart?.slice(0,10)} onChange={handleChange} required />
        <input type="date" name="loanEnd" value={formData.loanEnd?.slice(0,10)} onChange={handleChange} required />
        <input type="text" name="duration" value={formData.duration} onChange={handleChange} required />
        <select name="paidThisMonth" value={formData.paidThisMonth} onChange={handleChange}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditUser;
