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

      {/*Sidebar on the left*/}
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

        {/*Middle variables*/}
      <div className="main">
        <h2>Current amount</h2>
        <h1>{balance}€</h1>

        <p className="plus">Income: {income}€</p>
        <p className="minus">Expenses: {expense}€</p>
      </div>

      <button className="add-button" onClick={() => navigate("/add")}>
        +
      </button>
    </div>
  );
}