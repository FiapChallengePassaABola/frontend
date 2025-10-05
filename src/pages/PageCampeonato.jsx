import Footer from "../components/Footer"
import HeaderBar from "../components/HeaderBar"
import Titulos from "../components/Titulos"
import PageCalendario from "../components/pageCampeonatos/PageCalendario"
import PageChaveamento from "../components/pageCampeonatos/PageChaveamento"

function PageCampeonato(){
    return(
        <div className="min-h-screen pt-24 sm:pt-28">
            <HeaderBar triggerElementId="page-title"/>
            <div className="px-4 sm:px-6 lg:px-0 flex flex-col items-center">
                <Titulos id="page-title" titulo="CHAVEAMENTO"/>
                <PageChaveamento/>
                <Titulos titulo="CALENDARIO"/>
                <PageCalendario/>
            </div>
            
            <Footer/>
        </div>
    )
}
export default PageCampeonato