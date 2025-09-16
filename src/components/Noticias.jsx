import { FaChevronCircleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import VideoYT from "../assets/VideoYT.jpg";
import CardNoticias from "./CardNoticias";
import Titulos from "./Titulos";

function Noticias() {
  return (
    <div className="flex flex-col justify-center items-center m-6 sm:m-8 lg:m-20 xl:m-40 px-4 sm:px-6 lg:px-0">
      <Titulos titulo="NOTÍCIAS"/>

      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6 lg:gap-10">
        <div className="w-full lg:w-2/3">
          <img src={VideoYT} alt="VideoYt" className="w-full rounded-xl sm:rounded-2xl border-[#1B4509] border-2 sm:border-4"/>
          <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white mt-3 sm:mt-4">
            COMO TEM SIDO NOSSOS PRIMEIROS MESES? - FALA, BEBÊ #39
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#B0AFAF] mt-2">
            Voltamos pra contar como tem sido nossos dias desde a chegada da Antonella. Foram muitos aprendizados e momentos especiais, e claro que viemos dividir aqui com vocês. Mais uma montanha russa de emoções. Vem conversar e debater com a gente 
          </p>
        </div>

        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
          <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
          <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
          <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
        </div>
      </div>
      <Link to="/noticias" className="mt-6 -mb-4 sm:-mb-6 lg:-mb-8 xl:-mb-16">
        <FaChevronCircleDown size={32} color="green" className="sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 hover:opacity-80 transition-opacity"/>
      </Link>
    </div>
  )
}

export default Noticias
