import CardNoticias from "../components/CardNoticias"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Titulos from "../components/Titulos"
import VideoYT from "../assets/VideoYT.jpg"

function PageNoticias(){
    return(
        <div>
            <div className="pb-13">
                <Navbar/>
            </div>
            <Titulos titulo="ULTIMAS NOTICIAS"/>
            <div className="w-1/1 grid grid-cols-4 gap-6 p-18">
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


            <Footer/>
        </div>
    )
}
export default PageNoticias