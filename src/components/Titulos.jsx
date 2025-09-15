
function Titulos(props){
    return(
        <div className="flex items-center w-full mb-10">
            <div className="flex-grow h-px bg-gray-300"></div>
                <h1 className="text-6xl font-bold text-gray-200 mx-10">{props.titulo}</h1>
            <div className="flex-grow h-px bg-gray-300"></div>
        </div>
    )
}
export default Titulos