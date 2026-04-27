{/* Imports, Routing, React hooks */}
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";


{/* Pages */}
import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";
import Tracker from "./pages/Tracker";

export default function App() {

{/* Global transactions state which is shared across pages */}
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

{/* Persist transactions to localStorage when they are changed */}
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

{/* Add new transactions */}
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

{/* Remove transactions */}
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

{/* Clear all transactions with confirmation required */}
  const clearAllTransactions = () => {
  if (window.confirm("Are you sure you want to delete all transactions?")) {
    localStorage.removeItem("transactions");
    setTransactions([]);
  }
  };


{/* Routing */}
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


{/* Transaction page */}
        <Route
          path="/add"
          element={<AddExpense addTransaction={addTransaction} />}
        />


{/* Goal tracker page */}
        <Route
          path="/tracker"
          element={<Tracker transactions={transactions} />}
        />
      </Routes>
    </Router>
  );
}