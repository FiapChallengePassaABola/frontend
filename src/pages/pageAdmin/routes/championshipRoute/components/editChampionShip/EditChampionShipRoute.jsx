import edit from "../../assets/edit.png"
import Times from "./components/Times";

function EditChampionShipRoute() {
  return(
  <div>
    <div className="flex flex-col items-center justify-center m-12">
    <div className="flex">
      {/* Title */}
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-bold text-[#D9D9D9] px-15">Campeonato Passa a bola</h1>
        <img src={edit} alt="edit" className="w-[2.8rem]"/>
      </div>

      {/* Select do formato */}
      <div className="flex justify-end mx-8 absolute top-16 right-0 ">
        <select name="formato" id="" className="bg-[#288F73] p-4 text-white text-2xl font-bold rounded-xl">
          <option value="4Times">4 Times</option>
          <option value="8Times">8 Times</option>
          <option value="16Times">16 Times</option>
          <option value="pontosCorridos">Pontos corridos</option>
        </select>
      </div>
    </div>
    <div className="bg-[#828282] w-1/2 h-[1px] mt-7 "></div>
    </div>
    {/* 4 Times */}
    <div className="flex items-center justify-center h-150">
      <div className="flex items-center justify-around w-[80%]">
        <div>
          <div className="flex flex-col mb-15">
            <Times name="nome foda" points="3"/>
            <Times name="nome foda2" points="6"/>
          </div>

          <div className="flex flex-col">
            <Times name="nome foda3" points="6"/>
            <Times name="nome foda4" points="6"/>
          </div>
        </div>

        <div className="flex flex-col">
          <Times name="nome foda3" points="6"/>
          <Times name="nome foda4" points="6"/>
        </div>

        <Times name="nome foda4" points="6"/>
      </div>
    </div>
  </div>
  ) ;
}

export default EditChampionShipRoute;
