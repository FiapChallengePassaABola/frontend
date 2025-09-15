import Navbar from "./Navbar"
import Caroucel from "./Caroucel"
import Campeonato from "./Campeonato"
import Jogar from "./Jogar"
import Noticias from "./Noticias"
import Footer from "./Footer"

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