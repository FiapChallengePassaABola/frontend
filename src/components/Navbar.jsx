import Logo from "../assets/logoBranca.png"
import { AiOutlineUser } from "react-icons/ai";

function Navbar() {
    return (
        // bg-gradient-to-bl from-[#9C0528] to-[#7D001F] 
        <header className="flex items-center justify-between px-8 pt-12 drop-shadow-xl drop-shadow-[#9c0528d4]" >
            <ul className="flex items-center justify-center text-lg text-white font-bold gap-6 flex-1">
                <li>NOTICIAS</li>
                <li><a href="../pages/PageCampeonato">CAMPEONATO</a></li>
                <li><img src={Logo} alt="Logo" className="w-20" /></li>
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
