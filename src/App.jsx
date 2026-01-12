import waldoFilmSet from "./assets/waldo-filmset.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router";

function App() {
  const characters = ["Waldo", "Odlaw", "Wizard Whitebeard", "Woof", "Wenda"];

  const [found, setFound] = useState(new Set());
  const [isRunning, setIsRunning] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  const finishGame = async () => {
    setIsRunning(false);
    console.log("Finished game. Your time:", elapsedTime);
    setElapsedTime(elapsedTime);
    const userInput = prompt("Please enter your name:");

    console.log(`elapsed time ${elapsedTime}, user: ${userInput}`);

    const api = await fetch("http://localhost:3000/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ time: elapsedTime, user: userInput }),
    });

    console.log(`appjsx api response`, api);
  };

  function getCoords(e) {
    if (!isRunning) return;
    const img = e.target;
    const rect = img.getBoundingClientRect();
    const leftRect = rect.left;
    const topRect = rect.top;

    //Get coords.
    const xCoord = e.clientX - leftRect;
    const yCoord = e.clientY - topRect;

    //Get coords in percentages
    const relativeX = Number(((xCoord / rect.width) * 100).toFixed(2));
    const relativeY = Number(((yCoord / rect.height) * 100).toFixed(2));

    console.log(`coords are: X${relativeX}% and Y${relativeY}%`);

    compareCoordinates(relativeX, relativeY);
  }

  async function compareCoordinates(userX, userY) {
    const imageId = 2;
    try {
      const response = await fetch(`http://localhost:3000/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userX, userY, imageId }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`api call result`, result);

        if (result.id && !found.has(result.id)) {
          const newFound = new Set(found);
          newFound.add(result.id);
          setFound(newFound);
          console.log(`newfound`, newFound);
          if (newFound.size === 5) {
            finishGame();
          }
        }
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  return (
    <div className="p-0.5 bg-sky-400 min-w-xl min-h-dvh font-display lg:grid grid-cols-6 text-2xl xl:text-4xl">
      <div className=" flex gap-1.5 pl-2  bg-white border-double border-12 border-red-500 lg:col-span-full lg:items-center cursor-pointer">
        <h1 className=" text-blue-500">Where's</h1>
        <h1 className="text-red-500"> Waldo?</h1>
        <div className="timer">{formatTime(elapsedTime)}</div>
        <Link to="/scores">Leaderboard</Link>
      </div>

      <div className=" p-1 flex  gap-8 text-nowrap text-lg bg-white border-double border-12 border-red-500 lg:col-end-2 lg:text-lg  ">
        {characters.map((character, index) => (
          <p key={index}>{character}</p>
        ))}
      </div>

      <div className="bg-white border-double border-12 border-red-500 lg:col-start-2 col-end-7 ">
        <img
          onClick={(e) => getCoords(e)}
          className="border-4 border-white "
          src={waldoFilmSet}
          alt=""
        />
      </div>

      <footer className="text-center bg-white border-double border-12 border-red-500 lg:col-start-1 col-end-7  ">
        © 2025 Coded by
        <a
          href="https://github.com/MpZero"
          className="text-red-500 hover:text-red-300"
        >
          {" "}
          Gonzalo Gomez
        </a>
      </footer>
    </div>
  );
}

export default App;
