import React, { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Tracker.css";

const STORAGE_KEY = "budget_goal_value";

export default function Tracker({ transactions = [] }) {
  const [goal, setGoal] = useState(() => {
    const savedGoal = localStorage.getItem(STORAGE_KEY);
    return savedGoal ? Number(savedGoal) : 3000;
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
  const angle = -90 + percentage * 180;

  const polarToCartesian = (cx, cy, r, deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const needle = polarToCartesian(120, 120, 70, angle);
  const progressEnd = polarToCartesian(120, 120, 85, angle);

  return (
    <div className="tracker-page">
      <div className="summary-box tracker-box">
        <h3 className="tracker-title">Goal Tracker</h3>

        <svg viewBox="0 0 240 180" className="tracker-svg">
          <path
            d="M 35 120 A 85 85 0 0 1 205 120"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="18"
            strokeLinecap="round"
          />

          <path
            d={`M 35 120 A 85 85 0 ${percentage > 0.5 ? 1 : 0} 1 ${progressEnd.x} ${progressEnd.y}`}
            fill="none"
            stroke="#22c55e"
            strokeWidth="18"
            strokeLinecap="round"
          />

          <line
            x1="120"
            y1="120"
            x2={needle.x}
            y2={needle.y}
            stroke="#111827"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <circle cx="120" cy="120" r="7" fill="#111827" />

          <text x="120" y="145" textAnchor="middle" className="tracker-value">
            €{saved}
          </text>

          <text x="120" y="162" textAnchor="middle" className="tracker-target">
            / €{goal} target
          </text>
        </svg>

        <div className="tracker-goal-section">
          <label className="tracker-label">Set goal (€)</label>

          <input
            type="number"
            min="1"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value) || 1)}
            className="tracker-input"
          />
        </div>

        <div className="summary-row">
          <span>Progress</span>
          <span>{Math.round(percentage * 100)}%</span>
        </div>

        <div className="summary-row">
          <span>Remaining</span>
          <span>{remaining}€</span>
        </div>

        <Link to="/" className="back-button">
          ← Back Home
        </Link>
      </div>
    </div>
  );
}