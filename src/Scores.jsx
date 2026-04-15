import { useEffect, useState } from "react";
import { Link } from "react-router";

function HighScores() {
  const [scores, setScores] = useState(null);

  useEffect(() => {
    const getScores = async () => {
      // `${import.meta.env.VITE_SERVER_URL}/api/scores`, for dev only, for production it will be /api/scores because of the proxy in vercel.json
      const req = await fetch(`/api/scores`);
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
    <>
      <div className=" flex px-4 bg-white border-double border-12 border-red-500">
        <h1 className="text-red-500 flex-1"> Leaderboard</h1>
        <Link to="/" className="text-amber-400">
          Play again
        </Link>
      </div>
      <div className="flex flex-1 justify-center grid-cols-4 items-center px-2 p-10 bg-white border-double border-12 border-red-500  ">
        {scores ? (
          <ul className="grid text-center gap-2">
            {scores.map((score, index) => (
              <li
                key={index}
                className="grid grid-cols-3 py-1 border-b border-gray-300"
              >
                <div className="text-center">{index + 1}.</div>
                <div className="text-amber-400">{score.name}</div>

                <div className="">-- {formatTime(score.time)}</div>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            <p className="text-red-500 text-xl">Loading...</p>
          </ul>
        )}
      </div>
    </>
  );
}

export default HighScores;
