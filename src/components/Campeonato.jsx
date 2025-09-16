import Chaveamento from "./Chaveamento"
import Titulos from "./Titulos"
import CaroucelTimes from "./campeonato/CaroucelTimes"
import TabelaPontos from "./campeonato/TabelaPontos"
function Campeonato() {
    return(
        <div className="flex flex-col justify-center items-center py-8 md:py-16 px-4">
            <Titulos titulo="CAMPEONATO"/>
            <div className="w-full max-w-7xl space-y-8 md:space-y-12">
                <TabelaPontos/>
                <CaroucelTimes/>
                <Chaveamento campeonatoId="1"/>
            </div>
        </div>
    )
}
export default Campeonato

