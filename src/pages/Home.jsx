{/* Imports */}
import { useNavigate, Link } from "react-router-dom";
import "../styles/Home.css";
import coin1 from "../assets/Coins_1.png";
import coin2 from "../assets/Coins_2.png";
import coin3 from "../assets/Coins_3.png";
import coin4 from "../assets/Coins_4.png";
import coin5 from "../assets/Coins_5.png";
import coin25 from "../assets/Coins_25.png";
import coin100 from "../assets/Coins_100.png";
import coin250 from "../assets/Coins_250.png";
import coin1000 from "../assets/Coins_1000.png";
import coin10000 from "../assets/Coins_10000.png";

{/* Exports */}
export default function Home({ transactions, deleteTransaction, clearAllTransactions }) {
  const navigate = useNavigate();

  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const goal = Number(localStorage.getItem("budget_goal_value")) || 0;

  const progress = goal > 0 
  ? Math.min((balance / goal) * 100, 100) 
  : 0;


{/* Coin image logic */}
  const getCoinImage = (balance) => {
    if (balance >= 10000) return coin10000;
    if (balance >= 1000) return coin1000;
    if (balance >= 250) return coin250;
    if (balance >= 100) return coin100;
    if (balance >= 25) return coin25;
    if (balance >= 5) return coin5;
    if (balance >= 4) return coin4;
    if (balance >= 3) return coin3;
    if (balance >= 2) return coin2;
    if (balance >= 1) return coin1;
    if (balance <= 0) return null;
  };


{/* Latest transactions sidebar */}
  return (
    <div className="container">
      <div className="sidebar">
        <h3>Latest transactions:</h3>
        {transactions.slice(-5).reverse().map((t) => (
          <div key={t.id} className="transaction">
            <span>{t.text}</span>
            <span className={t.amount > 0 ? "plus" : "minus"}>
              {t.amount}€
            </span>
            <button onClick={() => deleteTransaction(t.id)}>
              Delete
            </button>
          </div>
        ))}


{/* Clear all transactions button */}
        {transactions.length > 0 && (
        <button className="clear-button" onClick={clearAllTransactions}>
        Clear All
        </button>
        )} 
      </div>


{/* Savings goal xp bar */}
      <div className="top-right-box">
        {goal === 0 ? (
          <button 
            className="goal-button"
            onClick={() => navigate("/tracker")}
          >
            Set saving goal
          </button>
        ) : (
          <div 
            className="xp-bar-wrapper"
            onClick={() => navigate("/tracker")}
          >
            <div className="xp-bar-container">
              <div
                className="xp-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="xp-bar-text">
              {balance}€ / {goal}€
            </div>
          </div>
        )}
      </div>


{/* Coin image text and placing */}
      <div className="main">
        <h2>Current budget:</h2>
        <h1>{balance}€</h1>
        {balance > 0 && (
          <img 
            src={getCoinImage(balance)} 
            alt="coin stack" 
            className="coin-image"
          />
        )}
      </div>

{/* Transaction tracker for the current session */}
      <div className="right-panel">
        <div className="summary-box">
          <h3>Current session:</h3>
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


{/* Navigation button for AddExpenses */}
      <div className="add-wrapper">
        <span className="add-text">Add transactions 👉</span>
        <button
          className="add-button"
          onClick={() => navigate("/add")}
        >
          +
        </button>

      </div>
    </div>
  );
}