import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Edituser.css';
import axios from 'axios';

function Edituser() {
  const PORT = "https://loan-backend-hl9g.onrender.com";


  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    totalAmount: '',
    paidNow: '',
    willPayNow: '',
    monthlyPayment: '',
    loanStart: '',
    loanEnd: '',
    duration: '',
    paidThisMonth: 'No',
    interest: '',
    totalAmountInterest: ''
  });

  useEffect(() => {
    axios.get(`${PORT}/api/users/${id}`)
      .then(res => {
        if (res.status === 200) {
          setFormData(res.data);
        } else {
          console.error('Failed to fetch user:', res.status);
        }
      })
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
    const res = await axios.put(`${PORT}/api/users/${id}`, formData);

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
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label htmlFor="totalAmount">Loan Amount</label>
        <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} required />
        <label htmlFor="duration">Duration</label>
        <input type="text" name="duration" value={formData.duration} onChange={handleChange} required />
        <label htmlFor="interest">Interest</label>
        <input type="number" name="interest" value={formData.interest} onChange={handleChange} required />
        <label htmlFor="monthlyPayment">Monthly Payment</label>
        <input type="number" name="monthlyPayment" value={formData.monthlyPayment} onChange={handleChange} required />
        <label htmlFor="paidNow">Paid Amount</label>
        <input type="number" name="paidNow" value={formData.paidNow} onChange={handleChange} required />
        <label htmlFor="loanStart">Loan Start Date</label>
        <input type="date" name="loanStart" value={formData.loanStart.slice(0, 10)} onChange={handleChange} required />
        <label htmlFor="loanEnd">Loan End Date</label>
        <input type="date" name="loanEnd" value={formData.loanEnd.slice(0, 10)} onChange={handleChange} required />
        {/* <label htmlFor="paidThisMonth">Paid This Month</label>
        <select name="paidThisMonth" value={formData.paidThisMonth} onChange={handleChange} required>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select> */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Edituser;