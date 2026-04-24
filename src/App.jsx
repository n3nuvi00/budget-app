import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";
import Tracker from "./pages/Tracker";

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const clearAllTransactions = () => {
  if (window.confirm("Are you sure you want to delete all transactions?")) {
    localStorage.removeItem("transactions");
    setTransactions([]);
  }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
           <Home
            transactions={transactions}
            deleteTransaction={deleteTransaction}
            clearAllTransactions={clearAllTransactions}
          />
          }
        />

        <Route
          path="/add"
          element={<AddExpense addTransaction={addTransaction} />}
        />

        <Route
          path="/tracker"
          element={<Tracker transactions={transactions} />}
        />
      </Routes>
    </Router>
  );
}