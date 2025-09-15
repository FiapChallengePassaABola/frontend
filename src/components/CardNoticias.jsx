import VideoYT from "../assets/VideoYT.jpg"
function CardNoticias(props){
    return(
        <div>
        <img src={props.imgNoticia} alt="VideoYt" className="w-full rounded-2xl border-[#1B4509] border-4"/>
            <h3 className="text-sm font-bold text-white mt-2">
                {props.tituloNoticia}
            </h3>
            <p className="text-xs text-[#B0AFAF] mt-1">
                {props.descricaoNoticia}
            </p>
        </div>
    )
}
export default CardNoticias