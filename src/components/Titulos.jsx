
function Titulos(props){
    return(
        <div className="flex items-center w-full mb-6 md:mb-10 px-4 md:px-0">
            <div className="flex-grow h-px bg-gray-300"></div>
                <h1 className="text-2xl md:text-6xl font-bold text-gray-200 mx-4 md:mx-10">{props.titulo}</h1>
            <div className="flex-grow h-px bg-gray-300"></div>
        </div>
    )
}
export default Titulos