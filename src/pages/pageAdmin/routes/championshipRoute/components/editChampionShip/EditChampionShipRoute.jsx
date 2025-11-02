import edit from "../../assets/edit.png"
import Times from "./components/Times";

function EditChampionShipRoute() {
  return(
  <div>
    <div className="flex flex-col items-center justify-center">

    {/* Title */}
    <div className="flex items-center justify-center">
      <h1 className="text-5xl font-bold text-[#D9D9D9] px-15">Campeonato Passa a bola</h1>
      <img src={edit} alt="edit" className="w-[2.8rem]"/>
    </div>

    <div className="bg-[#828282] w-1/2 h-[1px] mt-7 "></div>
    </div>
    {/* Select do formato */}
    <div className="flex justify-end mx-8 ">
      <select name="formato" id="" className="bg-[#288F73] p-4 text-white text-2xl font-bold rounded-xl">
        <option value="4Times">4 Times</option>
        <option value="8Times">8 Times</option>
        <option value="16Times">16 Times</option>
        <option value="pontosCorridos">Pontos corridos</option>
      </select>
    </div>
    {/* 4 Times */}
    <div className="flex flex-col">
      <Times name="nome foda" points="3"/>
      <Times name="nome foda2" points="6"/>
    </div>

    <div className="flex flex-col">
      <Times name="nome foda3" points="6"/>
      <Times name="nome foda4" points="6"/>
    </div>
  </div>
  ) ;
}

export default EditChampionShipRoute;
