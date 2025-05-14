import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const Slice = createSlice({
     name: 'user',
     initialState : {
          name: '',
          totalAmount: '',
          duration: '',
          interest: '',
          totalAmountInterest: '',
          paidNow: '',
          willPayNow: '',
          loanStart: '',
          monthlyPayment: '',
          loanEnd: '',
          paidThisMonth: 'No' 
     },
     reducers : {
          setName: (state, action) => {
               state.name = action.payload
          },
          setTotalAmount: (state, action) => {
               state.totalAmount = action.payload
          },
          setDuration: (state, action) => {
               state.duration = action.payload
          },
          setInterest: (state, action) => {
               state.interest = action.payload
          },
          setTotalAmountInterest: (state, action) => {
               state.totalAmountInterest = action.payload
          },
          setPaidNow: (state, action) => {
               state.paidNow = action.payload
          },
          setWillPayNow: (state, action) => {
               state.willPayNow = action.payload
          },
          setLoanStart: (state, action) => {
               state.loanStart = action.payload
          },
          setLoanEnd: (state, action) => {
               state.loanEnd = action.payload
          },
          setPaidThisMonth: (state, action) => {
               state.paidThisMonth = action.payload
          },
          setMonthlyPayment: (state, action) => {
               state.monthlyPayment = action.payload
          }
     }
})

export const { setName, setTotalAmount, setDuration, setInterest, setInterestType, setTotalAmountInterest, setPaidNow, setWillPayNow, setLoanStart, setLoanEnd, setPaidThisMonth, setMonthlyPayment } = Slice.actions
export const selectUser = (state) => state.user
export default Slice