import { AiOutlineUser } from "react-icons/ai";
import Titulos from "./Titulos";
import { PiCourtBasketballBold } from "react-icons/pi";
import { TbPlayFootball } from "react-icons/tb";

function Jogar(){
    return(
        <div className="flex flex-col justify-center items-center m-8 md:m-40 px-4 md:px-0">
            
        <Titulos titulo="JOGAR"/>

            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 mt-8 md:mt-20">
                <div className="flex flex-col justify-center items-center bg-[#521E2B] w-full md:w-[30rem] h-[20rem] md:h-[30rem] rounded-2xl">
                    <h1 className="text-white text-2xl md:text-3xl font-semibold mb-6 md:mb-10 text-center">Inscrição de clube</h1>
                    <PiCourtBasketballBold size={100} color="white" className="md:w-[150px] md:h-[150px]" />
                </div>
                <div className="flex flex-col justify-center items-center bg-[#521E2B] w-full md:w-[30rem] h-[20rem] md:h-[30rem] rounded-2xl">
                    <h1 className="text-white text-2xl md:text-3xl font-semibold mb-6 md:mb-10 text-center">Inscrição de Jogadora</h1>
                    <TbPlayFootball size={100} color="white" className="md:w-[150px] md:h-[150px]" />
                </div>
            </div>
        </div>
    )
}
export default Jogar
