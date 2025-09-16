import { FaChevronCircleDown } from "react-icons/fa";
import VideoYT from "../assets/VideoYT.jpg";
import CardNoticias from "./CardNoticias";
import Titulos from "./Titulos";
import { Link } from "react-router-dom";

function Noticias() {
  return (
    
    <div className="flex flex-col justify-center items-center m-8 md:m-40 px-4 md:px-0">

      <Titulos titulo="NOTÍCIAS"/>

      <div className="flex flex-col md:flex-row w-full max-w-7xl gap-10">
        <div className="w-full md:w-2/3">
          <img src={VideoYT} alt="VideoYt" className="w-full rounded-2xl border-[#1B4509] border-4"/>
          <h2 className="text-xl md:text-3xl font-bold text-white mt-4">
            COMO TEM SIDO NOSSOS PRIMEIROS MESES? - FALA, BEBÊ #39
          </h2>
          <p className="text-sm md:text-lg text-[#B0AFAF] mt-2">
            Voltamos pra contar como tem sido nossos dias desde a chegada da Antonella. Foram muitos aprendizados e momentos especiais, e claro que viemos dividir aqui com vocês. Mais uma montanha russa de emoções. Vem conversar e debater com a gente 
          </p>
        </div>

        <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
          <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
          <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
          <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
        </div>
      </div>
      <Link to="/noticias"><FaChevronCircleDown size={40} color="green" className="mt-6 -mb-8 md:-mb-16 md:w-16 md:h-16"/></Link>
    </div>
  )
}

export default Noticias
