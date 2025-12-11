import waldoFilmSet from "./assets/waldo-filmset.jpg";

function App() {
  const characters = ["Waldo", "Odlaw", "Wizard Whitebeard", "Woof", "Wenda"];

  function getCoords(e) {
    const img = e.target;
    const rect = img.getBoundingClientRect();
    const leftRect = rect.left;
    const topRect = rect.top;

    //Get coords.
    const xCoord = e.clientX - leftRect;
    const yCoord = e.clientY - topRect;

    //Get coords in percentages
    const relativeX = Math.round((100 * xCoord) / rect.width);
    const relativeY = Math.round((100 * yCoord) / rect.height);

    console.log(`coords are: X${relativeX}% and Y${relativeY}%`);
  }

  return (
    <div className="p-0.5 bg-sky-400 min-w-xl min-h-dvh font-display lg:grid grid-cols-6 text-2xl xl:text-4xl">
      <div className=" flex gap-1.5 pl-2  bg-white border-double border-12 border-red-500 lg:col-span-full lg:items-center cursor-pointer">
        <h1 className=" text-blue-500">Where's</h1>
        <h1 className="text-red-500"> Waldo?</h1>
      </div>

      <div className=" p-2 flex flex-col gap-2 bg-white border-double border-12 border-red-500 lg:col-end-2 lg:text-lg  ">
        {characters.map((character, index) => (
          <p key={index} className=" border-b-2 border-double border-red-500 ">
            {character}
          </p>
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
