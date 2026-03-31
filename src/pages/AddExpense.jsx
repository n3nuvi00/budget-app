import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddExpense.css";

function AddExpense({ addTransaction }) {
  const navigate = useNavigate();

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

    if (!amount || !category) return;

    const transaction = {
      id: Date.now(),
      text: description || category,
      amount: type === "expense" ? -Number(amount) : Number(amount),
      category,
      date,
      type
    };

    addTransaction(transaction);   // 🔥 TÄRKEIN RIVI
    navigate("/");                // 🔥 takaisin etusivulle
  };

  return (
    <div className="container2">
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
          <option value="">Select Category</option>

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

      <button onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
}

export default AddExpense;