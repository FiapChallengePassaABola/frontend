import Footer from "../components/Footer"
import HeaderBar from "../components/HeaderBar"
import Jogar from "../components/Jogar"
import Titulos from "../components/Titulos"

function PageJogar() {
    return(
        <div className="min-h-screen flex flex-col pt-24 sm:pt-28">
            <HeaderBar triggerElementId="page-title"/>
            <div className="flex-1">
                <Titulos id="page-title" titulo="JOGAR"/>
                <Jogar/>
            </div>
            <Footer/>
        </div>
    )
}
export default PageJogar
