import Campeonato from "../components/Campeonato"
import Caroucel from "../components/Caroucel"
import Footer from "../components/Footer"
import Jogar from "../components/Jogar"
import Navbar from "../components/Navbar"
import Noticias from "../components/Noticias"

function Home() {
    return(
        <div className="min-h-screen">
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