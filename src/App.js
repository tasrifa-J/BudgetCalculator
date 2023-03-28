
import './App.css';
import Alert from './components/Alert';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import uuid from 'react-uuid'
import React, { useState } from 'react';
import { FaRegFrown, FaRegSmileBeam } from "react-icons/fa";

const initialExpense = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 }
]


function App() {
  //all expense, add expense
  const [expenses, setExpenses] = useState(initialExpense);
  //single expense
  const [charge, setCharge] = useState('');
  //single amount
  const [amount, setAmount] = useState('');
  //alert setting
  const [alert, setAlert] = useState({show:false})
  //edit
  const [edit, setEdit] = useState(false);
  //edit item
  const [id, setId] = useState(0)
  //*********** functionality **************
  const handleCharge = (e) => {
    setCharge(e.target.value)
  }
  const handleAmount = (e) => {
    setAmount(e.target.value)
  }

  //handle alert
  const handleAlert = ({type,text}) => {
    setAlert({show:true, type, text});
    setTimeout(() => {
      setAlert({show:false})
    }, 8000);
  }

  //handle submit

  const handleSubmit = (e) => {
     e.preventDefault();
    
    if(charge !== "" && amount > 0){
      if(edit){
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        })
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({type:'success', text:`Item Edited Successfully!`})
      }else{
        const singleExpense = {id: uuid(), charge, amount};
        setExpenses([...expenses, singleExpense]);
        handleAlert({type:'success', text:`Item Added!`})  
      }
      setCharge('');
      setAmount('');
    }
    else{
      handleAlert({type:'danger', text:`Charge cannot be empty value and 
      amount must me bigger than zero!`})
    }
  }

  //clear all items
  const clearItems = () =>{
    setExpenses([]);
  }

  //handle delete single
  const handleDelete =(id) =>{
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({type:'danger', text:'Item Deleted!'})
  }

  //handle edit
  const handleEdit =(id) =>{
    let expense = expenses.find(item => item.id === id);
    let {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);

  }
  


  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget Calculator</h1>
      <main className='App'>
        <ExpenseForm 
        charge={charge} 
        amount={amount}
        handleAmount={handleAmount} 
        handleCharge={handleCharge} 
        handleSubmit={handleSubmit}
        edit={edit} />

        <ExpenseList 
        expenses={expenses} 
        handleDelete={handleDelete} 
        handleEdit={handleEdit} 
        clearItems={clearItems} />
      </main>
      <h1>
        Total Spending : <span className='total'>
          $ {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>

    </>
  );
}

export default App;
