import React, { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Adduser.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setName, setDuration, setInterest, setLoanEnd, setLoanStart,
  setPaidNow, setPaidThisMonth, setTotalAmount, setMonthlyPayment
 } from '../redux/Slice';

function Adduser() {

  const PORT = "https://loan-backend-hl9g.onrender.com";
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);


  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    
    const res = await axios.post(`${PORT}/users`, user);
   console.log("Response from server:", res.data);
    if (res.status === 201) {
      navigate('/dashboard');
    } else {
      alert('Failed to add user.');
    }
    // Reset the form
    dispatch(setName(''));
    dispatch(setTotalAmount(''));
    dispatch(setDuration(''));
    dispatch(setInterest(''));
    dispatch(setPaidNow(''));
    dispatch(setLoanStart(''));
    dispatch(setLoanEnd(''));
    dispatch(setMonthlyPayment(''));
  };


  return (
    <div className="add-user-page">
      <h2>Add New User</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="User Name" onChange={(e)=> dispatch(setName(e.target.value))} required value={user.name} />
        <input type="number" name="totalAmount" placeholder="Total Loan Amount" onChange={(e)=> dispatch(setTotalAmount(e.target.value))} required value={user.totalAmount} />
        <input type="text" name="duration" placeholder="Loan Duration in Years" onChange={(e)=> dispatch(setDuration(e.target.value))} required value={user.duration} />
        <input type="number" name="interest" placeholder="Interest Rate (%)" onChange={(e)=> dispatch(setInterest(e.target.value))} required value={user.interest} />
        {/* <input type="number" name="monthlyPayment" placeholder="Monthly Payment" onChange={(e)=> dispatch(setMonthlyPayment(e.target.value))} required value={user.monthlyPayment} /> */}
        <input type="number" name="paidNow" placeholder="Paid Till Now" onChange={(e)=> dispatch(setPaidNow(e.target.value))} required value={user.paidNow} />
        <input type="date" name="loanStart" placeholder="Loan Start Date" onChange={(e)=> dispatch(setLoanStart(e.target.value))} required value={user.loanStart.slice(0, 10)} />
        <input type="date" name="loanEnd" placeholder="Loan End Date" onChange={(e)=> dispatch(setLoanEnd(e.target.value))} required value={user.loanEnd.slice(0, 10)} />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default Adduser;