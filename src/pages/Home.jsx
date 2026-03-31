import { useState } from "react";
import "../styles/Home.css";

export default function Home() {
  const [transactions, setTransactions] = useState([
    { id: 1, type: "income", amount: 1000, text: "Salary" },
    { id: 2, type: "expense", amount: -50, text: "Groceries" }
  ]);

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

      {/* Main content */}
      <div className="main">
        <h2>Saldo</h2>
        <h1 className="balance">{balance}€</h1>

        <div className="summary">
          <div>
            <h4>Tulot</h4>
            <p className="plus">{income}€</p>
          </div>
          <div>
            <h4>Menot</h4>
            <p className="minus">{expense}€</p>
          </div>
        </div>
      </div>

      {/* Floating button */}
      <button className="add-button" onClick={() => alert("Siirry lisäyssivulle")}>+
      </button>
    </div>
  );
}
