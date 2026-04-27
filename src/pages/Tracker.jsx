{/* Imports */}
import React, { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Tracker.css";

{/* LocalStorage  */}
const STORAGE_KEY = "budget_goal_value";
export default function Tracker({ transactions = [] }) {
  const [goal, setGoal] = useState(() => {
    const savedGoal = localStorage.getItem(STORAGE_KEY);
    return savedGoal ? Number(savedGoal) : 0;
  });


{/* Calculations for the total saved amount from transactions */}
  const netSaved = useMemo(() => {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(goal));
  }, [goal]);

  
{/* Ensuring that there are no negative values and cap progress at 100% */}
  const saved = Math.max(netSaved, 0);
  const percentage = Math.min(saved / goal || 0, 1);
  const remaining = Math.max(goal - saved, 0);


return (
  <div className="tracker-page">
    <div className="tracker-box">

      <h2 className="tracker-title">Saving goal tracker</h2>


{/* Progress bar for savings */}
      <div className="xp-section">
        <div className="xp-bar-container">
          <div
            className="xp-bar-fill"
            style={{ width: `${percentage * 100}%` }}
          />
        </div>


{/* Current saved amount vs goal */}
        <div className="xp-text">
          €{saved} / €{goal}
        </div>


{/* Progress percentage */}
        <div className="xp-percent">
          {Math.round(percentage * 100)}%
        </div>
      </div>


{/* Additional user info */}
      <div className="stats">
        <div className="stat">
          <span>Remaining</span>
          <strong>{remaining}€</strong>
        </div>
      </div>

{/* Input section */}
      <div className="goal-input-section">
        <label>Set budget goal (€)</label>

        <input
          type="number"
          min="0"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value) || 0)}
        />
      </div>

{/* Navigation back to home section */}
      <Link to="/" className="back-button">
        ← Back Home
      </Link>
    </div>
  </div>
);
}