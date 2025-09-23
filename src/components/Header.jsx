import imgBackground from "../assets/background.png"
import Navbar from "./Navbar"

function Header() {
  return (
    <div className="relative w-full ">
      <img src={imgBackground} alt="background" className="w-full h-full object-cover"/>

      <div className="absolute top-0 left-0 w-full">
        <Navbar />
      </div>
    </div>
  )
}

export default Header
