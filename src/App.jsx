import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";


export default function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home transactions={transactions} />}
        />
        <Route
          path="/add"
          element={<AddExpense addTransaction={addTransaction} />}
        />
      </Routes>
    </Router>
  );
}