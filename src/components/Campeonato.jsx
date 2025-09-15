import TabelaPontos from "./campeonato/TabelaPontos"
import CaroucelTimes from "./campeonato/CaroucelTimes"
import Titulos from "./Titulos"
import Chaveamento from "./Chaveamento"
function Campeonato() {
    return(
        <div className="flex flex-col justify-center items-center m-40">
            <Titulos titulo="CAMPEONATO"/>
            <TabelaPontos/>
            <CaroucelTimes/>
            <Chaveamento/>
        </div>
    )
}
export default Campeonato

