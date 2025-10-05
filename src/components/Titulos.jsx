
function Titulos({ titulo, variant = "default" }) {
    const variants = {
        default: "heading-2 text-white",
        large: "heading-1 text-white",
        medium: "heading-3 text-white",
        small: "heading-4 text-white"
    };

    return (
        <div className="flex items-center w-full mb-8 sm:mb-12 lg:mb-16 xl:mb-20 px-4 sm:px-6 lg:px-0">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary-600/30 to-transparent"></div>
            <h1 className={`${variants[variant]} mx-6 sm:mx-8 md:mx-10 lg:mx-12 xl:mx-16 text-center relative`}>
                {titulo}
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-600/20 to-accent-600/20 rounded-xl blur-xl -z-10"></div>
            </h1>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary-600/30 to-transparent"></div>
        </div>
    )
}
export default Titulos