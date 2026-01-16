import waldoFilmSet from "./assets/waldo-filmset.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import classNames from "classnames";

function App() {
  //change this later
  const characters = [
    { id: 2, name: "Waldo" },
    { id: 3, name: "Wenda" },
    { id: 4, name: "Odlaw" },
    { id: 5, name: "Wizard Whitebeard" },
    { id: 6, name: "Woof" },
  ];

  const [found, setFound] = useState(new Set());
  const [isRunning, setIsRunning] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [markers, setMarkers] = useState([]);

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
          setMarkers((prevMarkers) => [
            ...prevMarkers,
            { id: result.id, x: userX, y: userY },
          ]);
          if (newFound.size === 5) {
            finishGame();
          }
        }
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  const toggleClasses = classNames({
    "line-through decoration-red-500": found,
  });

  const styles = {
    markerCircle: {
      position: "absolute",
      width: "75px",
      height: "75px",
      borderRadius: "50%",
      border: "3px solid rgb(255, 255, 255)",
      backgroundColor: "rgba(255, 225, 200, 0.5)",
      boxShadow: "0 0 10px rgba(0,0,0))",
      pointerEvents: "none",
      transform: "translate(-50%, -50%)",
      zIndex: 10,
    },
  };

  return (
    <div className="p-0.5 bg-sky-400 min-w-xl min-h-dvh font-display lg:grid grid-cols-6 text-2xl xl:text-4xl">
      <div className=" flex justify-between px-2  bg-white border-double border-12 border-red-500 lg:col-span-full lg:items-center cursor-pointer">
        <div className="flex gap-1.5">
          <h1 className=" text-blue-500">Where's</h1>
          <h1 className="text-red-500"> Waldo?</h1>
        </div>
        <div className="timer">{formatTime(elapsedTime)}</div>
        <Link to="/scores" className="text-amber-400">
          Leaderboard
        </Link>
      </div>

      <div className=" px-2 flex  gap-8 text-nowrap text-lg bg-white border-double border-12 border-red-500 lg:col-end-2 lg:text-lg  ">
        {characters.map((char) => (
          <p key={char.id} className={found.has(char.id) ? toggleClasses : ""}>
            {char.name}
          </p>
        ))}
      </div>

      <div className="bg-white border-double border-12 border-red-500 lg:col-start-2 col-end-7 relative">
        <img src={waldoFilmSet} alt="" onClick={getCoords} />
        {markers.map((marker) => (
          <div
            key={marker.id}
            style={{
              ...styles.markerCircle,
              left: `${marker.x}%`,
              top: `${marker.y}%`,
            }}
          ></div>
        ))}
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
