import VideoYT from "../assets/VideoYT.jpg"
import CardNoticias from "../components/CardNoticias"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Titulos from "../components/Titulos"

function PageNoticias(){
    return(
        <div className="min-h-screen">
            <div className="pb-16 sm:pb-20">
                <Navbar/>
            </div>
            <div className="px-4 sm:px-6 lg:px-0">
                <Titulos titulo="ULTIMAS NOTICIAS"/>
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8 xl:p-18">
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