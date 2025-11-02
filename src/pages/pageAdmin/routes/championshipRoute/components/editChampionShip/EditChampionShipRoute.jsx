import Titulo from "./components/Titulo";


function EditChampionshipRoute() {

  return (
    <div>
      {/* Titulo */}
      <Titulo/>
      {/* Adcionar Times */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-white text-3xl">Adcionar Times</h1>
        <div className="flex items-center my-5">
          <input type="text" className="bg-white rounded-sm p-3 text-2xl"/>
          <button className="bg-[#288F73] text-4xl w-10 h-10 text-white rounded-md flex items-center justify-center ml-4">+</button>
        </div>
      </div>

    </div>
  );
}

export default EditChampionshipRoute;
