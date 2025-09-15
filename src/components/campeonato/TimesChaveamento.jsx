import { IoClose } from "react-icons/io5";

function TimesChaveamento(){
    return(
        <div className="bg-[#14020A] w-auto h-auto rounded-2xl p-3 flex flex-row m-3" >
            <div className="h-10 w-10 bg-amber-300 rounded-full"></div>
            <IoClose size={40} color="white"/>
            <div className="h-10 w-10 bg-amber-300 rounded-full"></div>
        </div>
    )
}
export default TimesChaveamento