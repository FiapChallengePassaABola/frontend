import Navbar from "../components/Navbar"
import Caroucel from "../components/Caroucel"
import Campeonato from "../components/Campeonato"
import Jogar from "../components/Jogar"
import Noticias from "../components/Noticias"
import Footer from "../components/Footer"

function Home() {
    return(
        <div>
            <Navbar/>
            <Caroucel/>
            <Noticias/>
            <Campeonato/>
            <Jogar/>
            <Footer/>
        </div>
    )

}
export default Home