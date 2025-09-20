import { BsTwitterX, BsYoutube } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import Logo from "../assets/logoBranca.png";

function Footer(){
    return(
        <div className="bg-[#083825] w-full h-auto flex flex-col">
            <footer className="flex flex-col lg:flex-row items-center justify-around p-1 lg:p-3">
                <div className="flex flex-col items-center justify-center p-2 lg:p-4">
                    <h1 className="text-white text-base sm:text-lg lg:text-xl font-bold p-1">PASSA A BOLA</h1>
                    <img src={Logo} alt="Logo" className="w-12 sm:w-16 lg:w-20"/>
                </div>
                <div className="mt-1 lg:mt-0">
                    <h1 className="flex items-center justify-center p-2 lg:p-3 text-lg sm:text-xl lg:text-2xl text-white font-semibold">Nossas redes</h1>
                    <ul className="flex flex-row gap-2 sm:gap-3 lg:gap-4 flex-wrap justify-center">
                        <li className="bg-white rounded-full p-2 sm:p-3 lg:p-3 hover:bg-gray-200 transition-all duration-300 hover:scale-110">
                            <a target="_blank" href="https://www.facebook.com/oficialpassaabola/?locale=pt_BR" className="block flex items-center justify-center">
                                <FaFacebook className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" color="black"/>
                            </a>
                        </li>
                        <li className="bg-white rounded-full p-2 sm:p-3 lg:p-3 hover:bg-gray-200 transition-all duration-300 hover:scale-110">
                            <a target="_blank" href="https://www.youtube.com/@passabola" className="block flex items-center justify-center">
                                <BsYoutube className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" color="black"/>
                            </a>
                        </li>
                        <li className="bg-white rounded-full p-2 sm:p-3 lg:p-3 hover:bg-gray-200 transition-all duration-300 hover:scale-110">
                            <a target="_blank" href="https://www.instagram.com/passaabola/" className="block flex items-center justify-center">
                                <FaInstagram className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" color="black"/>
                            </a>
                        </li>
                        <li className="bg-white rounded-full p-2 sm:p-3 lg:p-3 hover:bg-gray-200 transition-all duration-300 hover:scale-110">
                            <a target="_blank" href="https://www.tiktok.com/@passabola" className="block flex items-center justify-center">
                                <FaTiktok className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" color="black"/>
                            </a>
                        </li>
                        <li className="bg-white rounded-full p-2 sm:p-3 lg:p-3 hover:bg-gray-200 transition-all duration-300 hover:scale-110">
                            <a target="_blank" href="https://x.com/passaabola" className="block flex items-center justify-center">
                                <BsTwitterX className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" color="black"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
            <hr className="text-gray-600"/>
            <p className="flex items-center justify-center text-white text-xs sm:text-sm lg:text-sm p-2">&copy; Todos os direitos reservados</p>
        </div>
    )
}
export default Footer