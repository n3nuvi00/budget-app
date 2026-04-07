import { useNavigate } from "react-router-dom";
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

export default function Home({ transactions, deleteTransaction }) {
  const navigate = useNavigate();

  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

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

    return coin1; // fallback jos saldo 0 tai negatiivinen
  };

  return (
    <div className="container">
      {/* Left sidebar */}
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
      </div>

      {/* Center stuff */}
      <div className="main">
        <h2>Current amount:</h2>
        <h1>{balance}€</h1>
        <img
          src={getCoinImage(balance)}
          alt="coin stack"
          className="coin-image"
        />
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