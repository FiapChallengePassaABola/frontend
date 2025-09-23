import Campeonato from "../components/Campeonato"
import Caroucel from "../components/Caroucel"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Noticias from "../components/Noticias"
import Header from "../components/Header"

function Home() {
    return(
        <div className="min-h-screen">
            <Header/>
            <Campeonato/>
            <Noticias/>
            <Footer/>
        </div>
    )
}
export default Home