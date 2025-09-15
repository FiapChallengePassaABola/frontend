import Logo from "../assets/logoBranca.png"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

function Footer(){
    return(
        <div className="bg-[#083825] w-full h-auto flex flex-col ">
        <footer className="flex flex-row items-center justify-around">
            <div className="flex flex-col items-center justify-center p-16">
                <h1 className="text-white text-3xl font-bold p-3">PASSA A BOLA</h1>
                <img src={Logo} alt="Logo" className="w-1/4"/>
            </div>
            <div>
                <h1 className="flex items-center justify-center p-5 text-2xl text-white font-semibold">Nossas redes</h1>
                <ul className="flex flex-row gap-4">
                    <li className="bg-white rounded-full p-2"><a target="_blank" href="https://www.facebook.com/oficialpassaabola/?locale=pt_BR"></a><FaFacebook size={40} color="black"/></li>
                    <li className="bg-white rounded-full p-2"><a target="_blank" href="https://www.youtube.com/@passabola"><BsYoutube size={40} color="black"/></a></li>
                    <li className="bg-white rounded-full p-2"><a target="_blank" href="https://www.instagram.com/passaabola/"></a><FaInstagram size={40} color="black"/></li>
                    <li className="bg-white rounded-full p-2"><a target="_blank" href="https://www.tiktok.com/@passabola"></a><FaTiktok size={40} color="black"/></li>
                    <li className="bg-white rounded-full p-2"><a target="_blank" href="https://x.com/passaabola"><BsTwitterX size={40} color="black"/></a></li>
                </ul>
                
            </div>
            
        </footer>
        <hr className="text-gray-600 p-2"/>
        <p className="flex items-center justify-center text-white">&copy; Todos os direitos reservados</p>
        </div>
        
    )
}
export default Footer