import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Home.css";

export default function Home({ transactions }) {
  const navigate = useNavigate();

  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);

  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  return (
<div className="container">
  
  {/* Left sidebar */}
  <div className="sidebar">
    <h3>Latest transactions:</h3>
    {transactions.slice(-5).reverse().map(t => (
      <div key={t.id} className="transaction">
        <span>{t.text}</span>
        <span className={t.amount > 0 ? "plus" : "minus"}>
          {t.amount}€
        </span>
      </div>
    ))}
  </div>

  {/* Center stuff */}
  <div className="main">
    <h2>Current amount:</h2>
    <h1>{balance}€</h1>
  </div>

  {/* Right side stuff */}
  <div className="right-panel">
    <div className="summary-box">
      <h3>Current month:</h3>

      <div className="summary-row">
        <span>Income</span>
        <span className="plus">{income}€</span>
      </div>

      <div className="summary-row">
        <span>Expenses</span>
        <span className="minus">{expense}€</span>
      </div>
    </div>
  </div>

  <button className="add-button" onClick={() => navigate("/add")}>
    +
  </button>
</div>
  );
}