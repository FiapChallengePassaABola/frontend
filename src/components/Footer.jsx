import { BsTwitterX, BsYoutube } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import Logo from "../assets/logoBranca.png";

function Footer(){
    return(
        <div className="bg-[#083825] w-full h-auto flex flex-col ">
        <footer className="flex flex-col md:flex-row items-center justify-around p-4 md:p-0">
            <div className="flex flex-col items-center justify-center p-8 md:p-16">
                <h1 className="text-white text-2xl md:text-3xl font-bold p-3">PASSA A BOLA</h1>
                <img src={Logo} alt="Logo" className="w-1/3 md:w-1/4"/>
            </div>
            <div className="mt-4 md:mt-0">
                <h1 className="flex items-center justify-center p-3 md:p-5 text-xl md:text-2xl text-white font-semibold">Nossas redes</h1>
                <ul className="flex flex-row gap-2 md:gap-4">
                    <li className="bg-white rounded-full p-2"><a target="_blank" href="https://www.facebook.com/oficialpassaabola/?locale=pt_BR"></a><FaFacebook size={32} color="black" className="md:w-10 md:h-10"/></li>
                    <li className="bg-white rounded-full p-2"><a target="_blank" href="https://www.youtube.com/@passabola"><BsYoutube size={32} color="black" className="md:w-10 md:h-10"/></a></li>
                    <li className="bg-white rounded-full p-2"><a target="_blank" href="https://www.instagram.com/passaabola/"></a><FaInstagram size={32} color="black" className="md:w-10 md:h-10"/></li>
                    <li className="bg-white rounded-full p-2"><a target="_blank" href="https://www.tiktok.com/@passabola"></a><FaTiktok size={32} color="black" className="md:w-10 md:h-10"/></li>
                    <li className="bg-white rounded-full p-2"><a target="_blank" href="https://x.com/passaabola"><BsTwitterX size={32} color="black" className="md:w-10 md:h-10"/></a></li>
                </ul>
                
            </div>
            
        </footer>
        <hr className="text-gray-600 p-2"/>
        <p className="flex items-center justify-center text-white text-sm md:text-base p-2">&copy; Todos os direitos reservados</p>
        </div>
        
    )
}
export default Footer