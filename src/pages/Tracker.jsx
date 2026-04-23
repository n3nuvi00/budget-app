import React, { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Tracker.css";

const STORAGE_KEY = "budget_goal_value";

export default function Tracker({ transactions = [] }) {
  const [goal, setGoal] = useState(() => {
    const savedGoal = localStorage.getItem(STORAGE_KEY);
    return savedGoal ? Number(savedGoal) : 0;
  });

  const netSaved = useMemo(() => {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(goal));
  }, [goal]);

  const saved = Math.max(netSaved, 0);
  const percentage = Math.min(saved / goal || 0, 1);
  const remaining = Math.max(goal - saved, 0);

return (
  <div className="tracker-page">
    <div className="tracker-box">

      <h2 className="tracker-title">Goal Tracker</h2>

      {/* XP BAR */}
      <div className="xp-section">
        <div className="xp-bar-container">
          <div
            className="xp-bar-fill"
            style={{ width: `${percentage * 100}%` }}
          />
        </div>

        <div className="xp-text">
          €{saved} / €{goal}
        </div>

        <div className="xp-percent">
          {Math.round(percentage * 100)}%
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stat">
          <span>Remaining</span>
          <strong>{remaining}€</strong>
        </div>
      </div>

      {/* INPUT */}
      <div className="goal-input-section">
        <label>Set goal (€)</label>

        <input
          type="number"
          min="0"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value) || 0)}
        />
      </div>

      <Link to="/" className="back-button">
        ← Back Home
      </Link>
    </div>
  </div>
);
}