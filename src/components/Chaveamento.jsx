import TimesChaveamento from "./campeonato/TimesChaveamento"

function Chaveamento(){
    return(
        <div className="flex flex-row bg-[#521E2B] p-10 rounded-2xl m-16">
            <div className="flex flex-col">
                <TimesChaveamento/>
                <TimesChaveamento/>
                <TimesChaveamento/>
                <TimesChaveamento/>
            </div>
            <div className="flex flex-col items-center justify-around">
                <TimesChaveamento/>
                <TimesChaveamento/>
            </div>
            <div className="flex flex-col items-center justify-center">
                <TimesChaveamento/>
            </div>
            <div className="flex flex-col items-center justify-center">
                <TimesChaveamento/>
            </div>
            <div className="flex flex-col items-center justify-around">
                <TimesChaveamento/>
                <TimesChaveamento/>
            </div>
            <div className="flex flex-col">
                <TimesChaveamento/>
                <TimesChaveamento/>
                <TimesChaveamento/>
                <TimesChaveamento/>
            </div>
        </div>
    )
}
export default Chaveamento