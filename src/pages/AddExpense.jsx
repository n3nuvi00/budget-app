import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/add.css";

export default function AddExpense({ addTransaction }) {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text || !amount) return;

    addTransaction({
      id: Date.now(),
      text,
      amount: +amount
    });

    navigate("/"); // takaisin etusivulle
  };

  return (
    <div className="form-container">
      <h2>Lisää tapahtuma</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Kuvaus"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="number"
          placeholder="+ tulo / - meno"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">Lisää</button>
      </form>

      <button onClick={() => navigate("/")}>
        Takaisin
      </button>
    </div>
  );
}