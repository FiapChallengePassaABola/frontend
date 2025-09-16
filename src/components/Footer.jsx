import { BsTwitterX, BsYoutube } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import Logo from "../assets/logoBranca.png";

function Footer(){
    return(
        <div className="bg-[#083825] w-full h-auto flex flex-col">
            <footer className="flex flex-col lg:flex-row items-center justify-around p-4 lg:p-8">
                <div className="flex flex-col items-center justify-center p-6 lg:p-16">
                    <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold p-2 lg:p-3">PASSA A BOLA</h1>
                    <img src={Logo} alt="Logo" className="w-24 sm:w-32 lg:w-40"/>
                </div>
                <div className="mt-4 lg:mt-0">
                    <h1 className="flex items-center justify-center p-3 lg:p-5 text-lg sm:text-xl lg:text-2xl text-white font-semibold">Nossas redes</h1>
                    <ul className="flex flex-row gap-2 sm:gap-3 lg:gap-4 xl:gap-6 flex-wrap justify-center">
                        <li className="bg-white rounded-full p-2 sm:p-3 lg:p-4 hover:bg-gray-200 transition-all duration-300 hover:scale-110">
                            <a target="_blank" href="https://www.facebook.com/oficialpassaabola/?locale=pt_BR" className="block flex items-center justify-center">
                                <FaFacebook className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" color="black"/>
                            </a>
                        </li>
                        <li className="bg-white rounded-full p-2 sm:p-3 lg:p-4 hover:bg-gray-200 transition-all duration-300 hover:scale-110">
                            <a target="_blank" href="https://www.youtube.com/@passabola" className="block flex items-center justify-center">
                                <BsYoutube className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" color="black"/>
                            </a>
                        </li>
                        <li className="bg-white rounded-full p-2 sm:p-3 lg:p-4 hover:bg-gray-200 transition-all duration-300 hover:scale-110">
                            <a target="_blank" href="https://www.instagram.com/passaabola/" className="block flex items-center justify-center">
                                <FaInstagram className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" color="black"/>
                            </a>
                        </li>
                        <li className="bg-white rounded-full p-2 sm:p-3 lg:p-4 hover:bg-gray-200 transition-all duration-300 hover:scale-110">
                            <a target="_blank" href="https://www.tiktok.com/@passabola" className="block flex items-center justify-center">
                                <FaTiktok className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" color="black"/>
                            </a>
                        </li>
                        <li className="bg-white rounded-full p-2 sm:p-3 lg:p-4 hover:bg-gray-200 transition-all duration-300 hover:scale-110">
                            <a target="_blank" href="https://x.com/passaabola" className="block flex items-center justify-center">
                                <BsTwitterX className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" color="black"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
            <hr className="text-gray-600"/>
            <p className="flex items-center justify-center text-white text-xs sm:text-sm lg:text-base p-3 lg:p-4">&copy; Todos os direitos reservados</p>
        </div>
    )
}
export default Footer