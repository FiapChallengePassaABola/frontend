import Chaveamento from "./Chaveamento"
import Titulos from "./Titulos"
import CaroucelTimes from "./campeonato/CaroucelTimes"
import TabelaPontos from "./campeonato/TabelaPontos"
function Campeonato() {
    return(
        <div className="flex flex-col justify-center items-center py-6 sm:py-8 lg:py-12 xl:py-16 px-4 sm:px-6 lg:px-0">
            <Titulos titulo="CAMPEONATO"/>
            <div className="w-full max-w-7xl space-y-6 sm:space-y-8 lg:space-y-10 xl:space-y-12">
                <TabelaPontos/>
                <CaroucelTimes/>
                <Chaveamento campeonatoId="1"/>
            </div>
        </div>
    )
}
export default Campeonato

