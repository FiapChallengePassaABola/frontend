import Footer from "../components/Footer"
import Jogar from "../components/Jogar"
import Navbar from "../components/Navbar"

function PageJogar() {
    return(
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <div className="flex-1">
                <Jogar/>
            </div>
            <Footer/>
        </div>
    )
}
export default PageJogar
