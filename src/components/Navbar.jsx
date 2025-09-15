import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import Logo from "../assets/logoBranca.png";

function Navbar() {
    return (
        // bg-gradient-to-bl from-[#9C0528] to-[#7D001F] 
        <header className="flex items-center justify-between px-8 pt-12 drop-shadow-xl drop-shadow-[#9c0528d4]" >
            <ul className="flex items-center justify-center text-lg text-white font-bold gap-6 flex-1">
                <li><Link to="/noticias">NOTICIAS</Link></li>
                <li><Link to="/campeonato">CAMPEONATO</Link></li>
                <li><Link to="/"><img src={Logo} alt="Logo" className="w-20" /></Link></li>
                <li>JOGAR</li>
                <li>
                    <a href="https://www.youtube.com/@passabola" target="_blank" className="flex items-center">
                        YOUTUBE
                    </a>
                </li>
            </ul>
            <a href="#" className="ml-auto ">
                <AiOutlineUser size={40} color="white" />
            </a>
        </header>
    )
}
export default Navbar;
