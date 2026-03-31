import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
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
      <div className="sidebar">
        <h3>Viimeisimmät</h3>
        {transactions.slice(-5).reverse().map(t => (
          <div key={t.id} className="transaction">
            <span>{t.text}</span>
            <span className={t.amount > 0 ? "plus" : "minus"}>
              {t.amount}€
            </span>
          </div>
        ))}
      </div>

      <div className="main">
        <h2>Saldo</h2>
        <h1>{balance}€</h1>

        <p className="plus">Tulot: {income}€</p>
        <p className="minus">Menot: {expense}€</p>
      </div>

      <button className="add-button" onClick={() => navigate("/add")}>
        +
      </button>
    </div>
  );
}