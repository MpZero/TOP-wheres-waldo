import { useEffect, useState } from "react";
import { Link } from "react-router";

function HighScores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const getScores = async () => {
      const req = await fetch("http://localhost:3000/scores");
      const data = await req.json();
      setScores(data.scores);
    };
    getScores();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.name}: {score.time}
          </li>
        ))}
      </ul>
      <Link to="/">Play again</Link>
    </div>
  );
}

export default HighScores;
