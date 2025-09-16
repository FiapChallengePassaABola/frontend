import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Titulos from "../components/Titulos"
import PageCalendario from "../components/pageCampeonatos/PageCalendario"
import PageChaveamento from "../components/pageCampeonatos/PageChaveamento"

function PageCampeonato(){
    return(
        <div>
            <div className="pb-13">
            <Navbar/>
            </div>
            <div className="px-4 md:px-0">
                <Titulos titulo="CHAVEAMENTO"/>
                <PageChaveamento/>
                <Titulos titulo="CALENDARIO"/>
                <PageCalendario/>
            </div>
            
            <Footer/>
        </div>
    )
}
export default PageCampeonato