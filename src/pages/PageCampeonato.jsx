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
            <Titulos titulo="CHAVEAMENTO"/>
            <PageChaveamento/>
            <Titulos titulo="CALENDARIO"/>
            
            <Footer/>
        </div>
    )
}
export default PageCampeonato