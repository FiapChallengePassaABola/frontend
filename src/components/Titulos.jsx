
function Titulos({ titulo, variant = "default", id }) {
    const variants = {
        default: "text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]",
        large: "text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-wide text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]",
        medium: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]",
        small: "text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wide text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]"
    };

    return (
        <div id={id} className="flex items-center w-full mb-8 sm:mb-12 lg:mb-16 xl:mb-20 px-4 sm:px-6 lg:px-0">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <h1 className={`${variants[variant]} uppercase mx-6 sm:mx-8 md:mx-10 lg:mx-12 xl:mx-16 text-center relative`}>
                {titulo}
                <div className="absolute -inset-2 bg-white/5 rounded-xl blur-xl -z-10"></div>
            </h1>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
    )
}
export default Titulos