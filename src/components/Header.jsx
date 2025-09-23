import imgBackground from "../assets/background.png"
import Navbar from "./Navbar"
import { Link } from "react-router-dom"
function Header() {
  return (
    <div className="relative w-full ">
        <Link to="PageJogar">
      <img src={imgBackground} alt="background" className="w-full h-full object-cover"/>
        </Link>
      <div className="absolute top-0 left-0 w-full">
        <Navbar />
      </div>
    </div>
  )
}

export default Header
