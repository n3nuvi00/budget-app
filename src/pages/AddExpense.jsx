import React, { useState } from "react";
import "../styles/AddExpense.css";

function AddExpense() {

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const categories = {
    expense: ["Food", "Transport", "Bills", "Entertainment"],
    income: ["Salary", "Gift", "Other"]
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transaction = {
      type,
      amount,
      category,
      date,
      description
    };

    console.log(transaction);
  };

  return (
    <div className="container">

      <h1>Add Transaction</h1>

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

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          placeholder="Amount (€)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Select Category</option>

          {categories[type].map((cat) => (
            <option key={cat}>{cat}</option>
          ))}

        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="submit">
          Add Transaction
        </button>

      </form>

    </div>
  );
}

export default AddExpense;