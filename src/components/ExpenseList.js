import React from 'react'
import ExpenseItem from './ExpenseItem';
import { FaTrashAlt } from "react-icons/fa";

const ExpenseList = ({expenses, handleDelete, handleEdit, clearItems}) => {
  return (
    <>
    <ul className='list'>
      {expenses.map(expense => {
        return <ExpenseItem key={expense.id} 
        expense={expense}
        handleDelete={handleDelete}
        handleEdit={handleEdit} />
      })}
    </ul>
    {expenses.length >0 && <button className='btn' onClick={clearItems}>
      Clear All Expenses 
      <FaTrashAlt className='btn-icon' /></button>}
    </>
  )
}

export default ExpenseList