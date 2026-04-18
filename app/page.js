"use client";
import { useState } from "react";

const POINTS = {
  UFB: 50,
  MVP: 25,
  PA: 32,
  VA: 50,
  FIRST: 16,
  SECOND: 8,
  CROWNS: 32,
  TITLES: 16,
};

function getTier(score) {
  if (score >= 1600) return "ULTRA";
  if (score >= 1200) return "LEGEND";
  if (score >= 850) return "SUPERSTAR";
  if (score >= 600) return "SPECIALIST";
  if (score >= 400) return "VETERAN";
  if (score >= 250) return "ALL PRO";
  if (score >= 100) return "PRO";
  return "UNRANKED";
}

export default function Home() {
  const [players, setPlayers] = useState([]);

  const addPlayer = () => {
    setPlayers([...players, {
      name: "",
      UFB: 0, MVP: 0, PA: 0, VA: 0,
      FIRST: 0, SECOND: 0, CROWNS: 0, TITLES: 0
    }]);
  };

  const updatePlayer = (i, field, value) => {
    const updated = [...players];
    updated[i][field] = field === "name" ? value : Number(value);
    setPlayers(updated);
  };

  const scored = players.map(p => {
    const score =
      p.UFB * POINTS.UFB +
      p.MVP * POINTS.MVP +
      p.PA * POINTS.PA +
      p.VA * POINTS.VA +
      p.FIRST * POINTS.FIRST +
      p.SECOND * POINTS.SECOND +
      p.CROWNS * POINTS.CROWNS +
      p.TITLES * POINTS.TITLES;

    return { ...p, score, tier: getTier(score) };
  }).sort((a, b) => b.score - a.score);

  return (
    <div style={{ padding: 20, color: "white", background: "#111", minHeight: "100vh" }}>
      <h1>🏆 for6ix legacy</h1>

      <button onClick={addPlayer}>Add Player</button>

      <table style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Tier</th>
            <th>UFB</th>
            <th>MVP</th>
            <th>PA</th>
            <th>VA</th>
            <th>1ST</th>
            <th>2ND</th>
            <th>Crowns</th>
            <th>Titles</th>
          </tr>
        </thead>

        <tbody>
          {scored.map((p, i) => (
            <tr key={i}>
              <td>
                <input value={p.name} onChange={e => updatePlayer(i, "name", e.target.value)} />
              </td>
              <td>{p.score}</td>
              <td>{p.tier}</td>

              {["UFB","MVP","PA","VA","FIRST","SECOND","CROWNS","TITLES"].map(stat => (
                <td key={stat}>
                  <input
                    type="number"
                    value={p[stat]}
                    onChange={e => updatePlayer(i, stat, e.target.value)}
                    style={{ width: 50 }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
