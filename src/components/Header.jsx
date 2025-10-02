import { Link } from "react-router-dom"
import imgBackground from "../assets/background.png"
import teste from "../assets/teste.png"
import Navbar from "./Navbar"
function Header() {
  return (
    <div className="relative w-full ">
        <Link to="/jogar">
      <img src={imgBackground} alt="background" className="w-full h-screen object-cover"/>
        </Link>
      <div className="absolute top-0 left-0 w-full">
        <Navbar />
      </div>
    </div>
  )
}

export default Header
