import React from 'react'
import { FaPen, FaTrash } from 'react-icons/fa';

const ExpenseItem = ({ expense, handleDelete, handleEdit }) => {

  const { id, charge, amount } = expense;
  return (<li className='item'>
    <div className='info'>
      <span className='expense'>{charge}</span>
      <span className='amount'>${amount}</span>
    </div>
    <div>
      <button className='edit-btn' 
      aria-label='edit button'
      onClick={()=> handleEdit(id)} >
        <FaPen />
      </button>
      <button className='clear-btn' 
      aria-label='delete button'
      onClick={()=> handleDelete(id)} >
        <FaTrash />
      </button>
    </div>
  </li>
  )
}

export default ExpenseItem