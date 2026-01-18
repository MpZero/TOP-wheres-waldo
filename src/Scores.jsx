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

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div className=" flex justify-between px-2  bg-white border-double border-12 border-red-500 lg:col-span-full lg:items-center cursor-pointer">
        <div className="flex gap-1.5">
          <h1 className="text-red-500"> Leaderboard</h1>
        </div>
        <Link to="/">Play again</Link>
      </div>

      <div className="flex justify-center px-2  bg-white border-double border-12 border-red-500 text-2xl ">
        <ul className="">
          {scores.map((score, index) => (
            <li key={index}>
              {score.name}: {formatTime(score.time)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HighScores;
