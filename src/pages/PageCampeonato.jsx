import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import PageChaveamento from "../components/pageCampeonatos/PageChaveamento"
import Titulos from "../components/Titulos"

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
            </div>
            
            <Footer/>
        </div>
    )
}
export default PageCampeonato