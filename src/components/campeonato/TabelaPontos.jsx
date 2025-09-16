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
            <div className="bg-gradient-to-br from-[#521E2B] to-[#3A1520] p-4 md:p-6 rounded-2xl shadow-2xl border border-[#6B2A3A]">
                <h2 className="text-lg md:text-2xl font-bold text-center mb-4 md:mb-6 text-white">
                    Tabela de Pontos
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="space-y-2">
                        <h3 className="text-white text-sm md:text-base font-semibold text-center mb-2 bg-gradient-to-r from-yellow-500 to-yellow-600 px-3 py-1 rounded-full">
                            TOP 3
                        </h3>
                        <ListaPontos teams={topTeams}/>
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="text-white text-sm md:text-base font-semibold text-center mb-2 bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1 rounded-full">
                            MEIO
                        </h3>
                        <ListaPontos teams={midTeams}/>
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="text-white text-sm md:text-base font-semibold text-center mb-2 bg-gradient-to-r from-gray-500 to-gray-600 px-3 py-1 rounded-full">
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