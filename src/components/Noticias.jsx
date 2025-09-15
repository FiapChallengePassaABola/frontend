import VideoYT from "../assets/VideoYT.jpg"
import Titulos from "./Titulos"
import CardNoticias from "./CardNoticias"
import { FaChevronCircleDown } from "react-icons/fa";

function Noticias() {
  return (
    
    <div className="flex flex-col justify-center items-center m-40">

      <Titulos titulo="NOTÍCIAS"/>

      <div className="flex w-full max-w-7xl gap-10">
        <div className="w-2/3">
          <img src={VideoYT} alt="VideoYt" className="w-full rounded-2xl border-[#1B4509] border-4"/>
          <h2 className="text-3xl font-bold text-white mt-4">
            COMO TEM SIDO NOSSOS PRIMEIROS MESES? - FALA, BEBÊ #39
          </h2>
          <p className="text-lg text-[#B0AFAF] mt-2">
            Voltamos pra contar como tem sido nossos dias desde a chegada da Antonella. Foram muitos aprendizados e momentos especiais, e claro que viemos dividir aqui com vocês. Mais uma montanha russa de emoções. Vem conversar e debater com a gente 
          </p>
        </div>

        <div className="w-1/2 grid grid-cols-2 gap-6">
          <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
          <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
          <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
          <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
        </div>
      </div>
      <FaChevronCircleDown size={60} color="green" className="mt-6 -mb-16"/>
    </div>
  )
}

export default Noticias
