
function TimesChaveamento({ team, isWinner = false, position = 0 }){
    const mockTeams = [
        { id: 1, name: "Flamengo", points: 15, logo: "🦅", image: null },
        { id: 2, name: "Palmeiras", points: 12, logo: "🌿", image: null },
        { id: 3, name: "São Paulo", points: 10, logo: "⚽", image: null },
        { id: 4, name: "Santos", points: 8, logo: "🐋", image: null },
        { id: 5, name: "Corinthians", points: 7, logo: "⚡", image: null },
        { id: 6, name: "Vasco", points: 6, logo: "⚓", image: null },
        { id: 7, name: "Botafogo", points: 5, logo: "⭐", image: null },
        { id: 8, name: "Fluminense", points: 4, logo: "🌊", image: null }
    ];

    const currentTeam = team || mockTeams[position] || mockTeams[0];

    const getPositionColor = (pos) => {
        return "bg-gradient-to-r from-[#14020A] to-[#2A0A15] border-[#6B2A3A]";
    };

    return(
        <div className={`
            ${getPositionColor(position)}
            w-full h-10 sm:h-12 lg:h-14 rounded-lg sm:rounded-xl 
            p-2 sm:p-3 flex items-center justify-between
            border-2 transition-all duration-300 hover:scale-105
            ${isWinner ? 'ring-2 ring-green-400 ring-opacity-50' : ''}
            shadow-lg m-1
        `}>
            <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                    {currentTeam.image ? (
                        <img 
                            src={currentTeam.image} 
                            alt={currentTeam.name}
                            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full object-cover"
                        />
                    ) : (
                        <div className="text-sm sm:text-base lg:text-lg">
                            {currentTeam.logo}
                        </div>
                    )}
                </div>
                <h1 className="text-white font-semibold text-xs sm:text-sm lg:text-base truncate">
                    {currentTeam.name}
                </h1>
            </div>
            
            <div className="flex items-center space-x-1">
                <span className="text-white/80 text-xs sm:text-sm font-medium">
                    {currentTeam.points} pts
                </span>
                {isWinner && (
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
            </div>
        </div>
    )
}
export default TimesChaveamento