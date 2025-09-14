import TabelaPontos from "./campeonato/TabelaPontos"
import CaroucelTimes from "./campeonato/CaroucelTimes"
function Campeonato() {
    return(
        <div className="flex flex-col justify-center items-center m-40">
            <div className="flex items-center w-full">

                <div className="flex-grow h-px bg-gray-300"></div>
                <span>
                    <h1 className="text-6xl font-bold text-white mx-10 ">CAMPEONATO</h1>
                </span>
                <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            <TabelaPontos/>
            <CaroucelTimes/>
        </div>
    )
}
export default Campeonato

