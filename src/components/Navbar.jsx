import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import Logo from "../assets/logoBranca.png";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="flex items-center justify-between px-4 md:px-8 pt-6 md:pt-12 drop-shadow-xl drop-shadow-[#9c0528d4]">
            {/* Menu Desktop/Tablet - design original */}
            <ul className="hidden md:flex items-center justify-center text-lg text-white font-bold gap-6 flex-1">
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

            {/* Logo mobile - apenas para mobile */}
            <Link to="/" className="md:hidden">
                <img src={Logo} alt="Logo" className="w-16" />
            </Link>

            {/* Botão de usuário */}
            <a href="#" className="ml-auto">
                <AiOutlineUser size={32} color="white" className="md:w-10 md:h-10" />
            </a>

            {/* Botão hambúrguer apenas para mobile */}
            <button 
                className="md:hidden ml-4 text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <HiX size={32} /> : <HiMenuAlt3 size={32} />}
            </button>

            {/* Menu mobile expandido */}
            {isMenuOpen && (
                <div className="absolute top-20 left-0 right-0 bg-black/90 backdrop-blur-sm z-50 md:hidden">
                    <ul className="flex flex-col items-center text-lg text-white font-bold gap-6 py-8">
                        <li><Link to="/noticias" onClick={() => setIsMenuOpen(false)}>NOTICIAS</Link></li>
                        <li><Link to="/campeonato" onClick={() => setIsMenuOpen(false)}>CAMPEONATO</Link></li>
                        <li>JOGAR</li>
                        <li>
                            <a href="https://www.youtube.com/@passabola" target="_blank" className="flex items-center">
                                YOUTUBE
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    )
}
export default Navbar;
