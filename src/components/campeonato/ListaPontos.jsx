
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

    const getTierClasses = (position) => {
        if (position === 0) return "from-emerald-500 to-lime-500 border-emerald-300"; // 1º
        if (position === 1) return "from-emerald-400 to-lime-400 border-emerald-300"; // 2º
        if (position === 2) return "from-emerald-300 to-lime-300 border-emerald-200"; // 3º
        return "from-[#123524] to-[#0f2a1f] border-[#1e4b35]"; // demais
    };

    return(
        <div className="w-full">
            <ol className="space-y-2 sm:space-y-3 lg:space-y-4">
                {displayTeams.map((team, index) => (
                    <li
                        key={team.id}
                        className={`relative overflow-hidden text-white rounded-xl sm:rounded-2xl border-2 shadow-xl
                        p-2 sm:p-3 lg:p-4 flex items-center justify-between gap-3
                        bg-gradient-to-r ${getTierClasses(index)}
                        transition-transform duration-300 hover:scale-[1.02]`}
                    >
                        <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0px,rgba(255,255,255,0.12)_8px,transparent_8px,transparent_16px)]"></div>

                        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                            <div className="relative grid place-items-center w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-black/30 border border-white/40">
                                <span className="text-xs sm:text-sm lg:text-base font-extrabold">{index + 1}</span>
                                <div className="absolute -inset-[2px] rounded-full ring-1 ring-white/20"></div>
                            </div>
                            <div className="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-white/10 border border-white/40">
                                <span className="text-base sm:text-lg lg:text-xl xl:text-2xl">
                                    {team.logo || "⚽"}
                                </span>
                            </div>
                            <span className="truncate text-xs sm:text-sm lg:text-base font-semibold">
                                {team.name}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="hidden sm:block h-6 w-px bg-white/30" />
                            <div className="px-2 sm:px-3 py-1 rounded-full bg-black/25 border border-white/30 backdrop-blur-[1px] flex items-center gap-1">
                                <span className="text-[10px] sm:text-xs opacity-90">⚽</span>
                                <span className="text-xs sm:text-sm font-bold">{team.points}</span>
                                <span className="text-[10px] sm:text-xs opacity-80">pts</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}
export default ListaPontos