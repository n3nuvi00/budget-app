import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";
import Tracker from "./pages/Tracker";

export default function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
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