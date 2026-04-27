{/* Imports */}
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddExpense.css";


function AddExpense({ addTransaction }) {

{/* Navigation back to home screen after adding a transaction */}
  const navigate = useNavigate();


{/* Form inputs */}
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");


{/* Category options */}
  const categories = {
    expense: ["🍔Food", "🚗Transport", "📄Bills", "🎮Entertainment", "📦Other"],
    income: ["💰Salary", "🎁Gift", "📦Other"]
  };

{/* From submit */}
  const handleSubmit = (e) => {
    e.preventDefault();

{/* Basic validation */}
    if (!amount || !category) return;

{/* Create transaction */}
    const transaction = {
      id: Date.now(),
      text: description || category,
      amount: type === "expense" ? -Number(amount) : Number(amount),
      category,
      date,
      type
    };

{/* Pass data to parent component */}
    addTransaction(transaction);

{/* Redirect back to home page */}
    navigate("/");
  };


  return (
    <div className="container2">
      <h1>Add Transaction</h1>

{/* Toggle between income and expense */}
      <div className="toggle">
        <button
          className={type === "income" ? "income active" : "income"}
          onClick={() => setType("income")}
        >
          Income
        </button>

        <button
          className={type === "expense" ? "expense active" : "expense"}
          onClick={() => setType("expense")}
        >
          Expense
        </button>
      </div>

{/* Form */}
      <form onSubmit={handleSubmit}>

{/* Amount input */}
        <input
          type="number"
          placeholder="Amount (€)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

{/* Category dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>

          {categories[type].map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

{/* Optional description which removes category message */}
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

{/* Submit button */}
        <button className="submit">
          Add Transaction
        </button>
      </form>

{/* Navigation button to get back to home */}
      <button className="back-button" onClick={() => navigate("/")}>
      Back
      </button>
      </div>
  );
}

export default AddExpense;