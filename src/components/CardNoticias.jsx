function CardNoticias(props){
    return(
        <div className="hover:scale-105 transition-transform duration-300">
            <img src={props.imgNoticia} alt="VideoYt" className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border-[#1B4509] border-2 sm:border-4"/>
            <h3 className="text-xs sm:text-sm lg:text-base font-bold text-white mt-2 line-clamp-2">
                {props.tituloNoticia}
            </h3>
            <p className="text-xs sm:text-sm text-[#B0AFAF] mt-1 line-clamp-3">
                {props.descricaoNoticia}
            </p>
        </div>
    )
}
export default CardNoticias