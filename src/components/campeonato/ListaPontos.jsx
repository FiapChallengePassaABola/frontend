
function ListaPontos({ teams = [] }){
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

    const displayTeams = teams.length > 0 ? teams : mockTeams.slice(0, 3);

    const getPositionColor = (position) => {
        return "bg-gradient-to-r from-[#14020A] to-[#2A0A15] border-[#6B2A3A]";
    };

    return(
        <div className="w-full">
            <ol className="space-y-2 sm:space-y-3 lg:space-y-4">
                {displayTeams.map((team, index) => (
                    <li key={team.id} className={`
                        ${getPositionColor(index)}
                        text-sm sm:text-base lg:text-lg font-bold text-white 
                        flex items-center justify-between
                        p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl lg:rounded-2xl
                        border-2 border-opacity-50
                        transition-all duration-300 hover:scale-105
                        shadow-lg
                    `}>
                        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                            <div className="text-base sm:text-lg lg:text-xl xl:text-2xl">
                                {team.logo}
                            </div>
                            <span className="truncate text-xs sm:text-sm lg:text-base">
                                {team.name}
                            </span>
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <span className="text-white/80 text-xs sm:text-sm">
                                {team.points} pts
                            </span>
                            <div className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 rounded-full bg-gradient-to-r from-[#14020A] to-[#2A0A15] border-2 border-white"></div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}
export default ListaPontos