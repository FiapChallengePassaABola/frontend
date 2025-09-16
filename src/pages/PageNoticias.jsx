import VideoYT from "../assets/VideoYT.jpg"
import CardNoticias from "../components/CardNoticias"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Titulos from "../components/Titulos"

function PageNoticias(){
    return(
        <div>
            <div className="pb-13">
                <Navbar/>
            </div>
            <div className="px-4 md:px-0">
                <Titulos titulo="ULTIMAS NOTICIAS"/>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 md:p-18">
                    <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
                    <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
                    <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
                    <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
                    <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
                    <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
                    <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
                    <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
                    <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
                    <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
                    <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
                    <CardNoticias imgNoticia={VideoYT} tituloNoticia="Titulo de teste sobre a empresa passa a bola" descricaoNoticia="Descrição basica sobre a noticia"/>
                </div>
            </div>

            <Footer/>
        </div>
    )
}
export default PageNoticias