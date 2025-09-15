import { AiOutlineUser } from "react-icons/ai";
import Titulos from "./Titulos"

function Jogar(){
    return(
        <div className="flex flex-col justify-center items-center m-40">
            
        <Titulos titulo="JOGAR"/>

            <div className="flex flex-row justify-center gap-20 mt-20">
                <div className="flex flex-col justify-center items-center bg-[#521E2B] w-[30rem] h-[30rem] rounded-2xl">
                    <h1 className="text-white text-3xl font-semibold mb-10">Inscrição de clube</h1>
                    <AiOutlineUser size={150} color="white" />
                </div>
                <div className="flex flex-col justify-center items-center bg-[#521E2B] w-[30rem] h-[30rem] rounded-2xl">
                    <h1 className="text-white text-3xl font-semibold mb-10">Inscrição de Jogadora</h1>
                    <AiOutlineUser size={150} color="white" />
                </div>
            </div>
        </div>
    )
}
export default Jogar
