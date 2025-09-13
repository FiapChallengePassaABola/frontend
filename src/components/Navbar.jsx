import Logo from "../assets/logoBranca.png"
import { AiOutlineUser } from "react-icons/ai";
import { BsYoutube } from "react-icons/bs";

function Navbar() {
    return (
        <header className="bg-[#9C0528] flex items-center justify-between px-8 p-8">
            <ul className="flex items-center justify-center text-lg text-white font-bold gap-6 flex-1">
                <li>NOTICIAS</li>
                <li>CAMPEONATO</li>
                <li><img src={Logo} alt="Logo" className="w-20" /></li>
                <li>JOGAR</li>
                <li>
                    <a href="https://www.youtube.com/@passabola" target="_blank" className="flex items-center">
                        <BsYoutube size={20} className="mr-1" /> YOUTUBE
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
