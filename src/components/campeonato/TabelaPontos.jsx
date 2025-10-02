import ListaPontos from "./ListaPontos";

function TabelaPontos(){
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

    const topTeams = mockTeams.slice(0, 3);
    const midTeams = mockTeams.slice(3, 6);
    const bottomTeams = mockTeams.slice(6, 8);

    return(
        <div className="w-full max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-[#381d3c97] to-[#200f23ad] p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-2xl">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-4 sm:mb-6 text-white">
                    Tabela de Pontos
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-2">
                        <h3 className="text-white text-sm sm:text-base font-semibold text-center mb-2 bg-gradient-to-r from-[#a2139f] to-[#DD4C9B] border border-[#a2267f] px-3 py-1 rounded-full">
                            TOP 3
                        </h3>
                        <ListaPontos teams={topTeams}/>
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="text-white text-sm sm:text-base font-semibold text-center mb-2 bg-gradient-to-r from-[#a2139f] to-[#DD4C9B] border border-[#a2267f] px-3 py-1 rounded-full">
                            MEIO
                        </h3>
                        <ListaPontos teams={midTeams}/>
                    </div>
                    
                    <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                        <h3 className="text-white text-sm sm:text-base font-semibold text-center mb-2 bg-gradient-to-r from-[#a2139f] to-[#DD4C9B] border border-[#a2267f] px-3 py-1 rounded-full">
                            OUTROS
                        </h3>
                        <ListaPontos teams={bottomTeams}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TabelaPontos