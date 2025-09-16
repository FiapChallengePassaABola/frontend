
function ListaPontos({ teams = [] }){
    // Dados mock de times para demonstração
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
        switch(position) {
            case 0: return "bg-gradient-to-r from-yellow-500 to-yellow-600";
            case 1: return "bg-gradient-to-r from-gray-400 to-gray-500";
            case 2: return "bg-gradient-to-r from-orange-500 to-orange-600";
            default: return "bg-gradient-to-r from-[#14020A] to-[#2A0A15]";
        }
    };

    return(
        <div className="w-full">
            <ol className="space-y-2 md:space-y-4">
                {displayTeams.map((team, index) => (
                    <li key={team.id} className={`
                        ${getPositionColor(index)}
                        text-sm md:text-lg font-bold text-white 
                        flex items-center justify-between
                        p-2 md:p-4 rounded-xl md:rounded-2xl
                        border-2 border-opacity-50
                        transition-all duration-300 hover:scale-105
                        shadow-lg
                    `}>
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <div className="text-lg md:text-2xl">
                                {team.logo}
                            </div>
                            <span className="truncate">
                                {team.name}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-white/80 text-xs md:text-sm">
                                {team.points} pts
                            </span>
                            <div className={`h-4 w-4 md:h-6 md:w-6 rounded-full ${getPositionColor(index)} border-2 border-white`}></div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}
export default ListaPontos