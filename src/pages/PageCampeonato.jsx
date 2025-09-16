import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Titulos from "../components/Titulos"
import PageCalendario from "../components/pageCampeonatos/PageCalendario"
import PageChaveamento from "../components/pageCampeonatos/PageChaveamento"

function PageCampeonato(){
    return(
        <div className="min-h-screen">
            <div className="pb-16 sm:pb-20">
                <Navbar/>
            </div>
            <div className="px-4 sm:px-6 lg:px-0 flex flex-col items-center">
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