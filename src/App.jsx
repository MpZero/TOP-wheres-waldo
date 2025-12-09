import waldoFilmSet from "./assets/waldo-filmset.jpg";

function App() {
  return (
    <div className="p-2 bg-sky-400 min-w-xl min-h-dvh">
      <h1 className="">Where's Waldo?</h1>
      <div className="bg-white border-double border-12 border-red-500 ">
        <img className="border-4 border-white " src={waldoFilmSet} alt="" />
      </div>
    </div>
  );
}

export default App;
