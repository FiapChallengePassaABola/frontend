
function Titulos(props){
    return(
        <div className="flex items-center w-full mb-4 sm:mb-6 lg:mb-8 xl:mb-10 px-4 sm:px-6 lg:px-0">
            <div className="flex-grow h-px bg-gray-300"></div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-200 mx-3 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 text-center">{props.titulo}</h1>
            <div className="flex-grow h-px bg-gray-300"></div>
        </div>
    )
}
export default Titulos