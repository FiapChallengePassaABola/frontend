import { useChaveamento } from "../hooks/useChaveamento.js";
import TimesChaveamento from "./campeonato/TimesChaveamento";

function Chaveamento({ campeonatoId = 1 }){
    const { chaveamento, loading, error } = useChaveamento(campeonatoId);

    if (loading) {
        return (
            <div className="flex justify-center items-center bg-[#521E2B] p-4 md:p-10 rounded-2xl m-2 md:m-16">
                <div className="text-white text-xl">Carregando chaveamento...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center bg-[#521E2B] p-4 md:p-10 rounded-2xl m-2 md:m-16">
                <div className="text-red-500 text-xl">Erro: {error}</div>
            </div>
        );
    }

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

    return(
        <div className="w-full max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-[#521E2B] to-[#3A1520] p-4 md:p-8 rounded-2xl m-2 md:m-4 shadow-2xl border border-[#6B2A3A]">
                <h2 className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-white">
                    Chaveamento do Torneio
                </h2>
                
                {/* Bracket Container */}
                <div className="w-full">
                    <div className="flex flex-wrap md:flex-nowrap justify-center gap-2 md:gap-1 lg:gap-2 items-center">
                        
                        {/* Oitavas de Final - Lado Esquerdo */}
                        <div className="flex flex-col space-y-2 md:space-y-1 w-full sm:w-auto min-w-[150px] md:min-w-[120px] lg:min-w-[130px]">
                            <h3 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-1 py-0.5 rounded-full">
                                Oitavas
                            </h3>
                            {mockTeams.slice(0, 4).map((team, index) => (
                                <TimesChaveamento 
                                    key={team.id}
                                    team={team} 
                                    isWinner={index % 2 === 0}
                                    position={index}
                                />
                            ))}
                        </div>

                        {/* Quartas de Final - Lado Esquerdo */}
                        <div className="flex flex-col justify-center space-y-4 md:space-y-2 w-full sm:w-auto min-w-[150px] md:min-w-[120px] lg:min-w-[130px]">
                            <h3 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-1 py-0.5 rounded-full">
                                Quartas
                            </h3>
                            {[0, 1].map((index) => (
                                <TimesChaveamento 
                                    key={index}
                                    team={mockTeams[index * 2]} 
                                    isWinner={index === 0}
                                    position={index}
                                />
                            ))}
                        </div>

                        {/* Semifinal */}
                        <div className="flex flex-col justify-center space-y-6 md:space-y-3 w-full sm:w-auto min-w-[150px] md:min-w-[120px] lg:min-w-[130px]">
                            <h3 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-1 py-0.5 rounded-full">
                                Semifinal
                            </h3>
                            {[0, 1].map((index) => (
                                <TimesChaveamento 
                                    key={index}
                                    team={mockTeams[index * 4]} 
                                    isWinner={index === 0}
                                    position={index}
                                />
                            ))}
                        </div>

                        {/* Final */}
                        <div className="flex flex-col justify-center w-full sm:w-auto min-w-[150px] md:min-w-[120px] lg:min-w-[130px]">
                            <h3 className="text-white text-xs font-semibold text-center mb-1 bg-gradient-to-r from-yellow-400 to-orange-500 px-1 py-0.5 rounded-full">
                                FINAL
                            </h3>
                            <TimesChaveamento 
                                team={mockTeams[0]} 
                                isWinner={true}
                                position={0}
                            />
                        </div>

                        {/* Quartas de Final - Lado Direito */}
                        <div className="flex flex-col justify-center space-y-4 md:space-y-2 w-full sm:w-auto min-w-[150px] md:min-w-[120px] lg:min-w-[130px]">
                            <h3 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-1 py-0.5 rounded-full">
                                Quartas
                            </h3>
                            {[2, 3].map((index) => (
                                <TimesChaveamento 
                                    key={index}
                                    team={mockTeams[index * 2]} 
                                    isWinner={index === 2}
                                    position={index}
                                />
                            ))}
                        </div>

                        {/* Oitavas de Final - Lado Direito */}
                        <div className="flex flex-col space-y-2 md:space-y-1 w-full sm:w-auto min-w-[150px] md:min-w-[120px] lg:min-w-[130px]">
                            <h3 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-1 py-0.5 rounded-full">
                                Oitavas
                            </h3>
                            {mockTeams.slice(4, 8).map((team, index) => (
                                <TimesChaveamento 
                                    key={team.id}
                                    team={team} 
                                    isWinner={index % 2 === 0}
                                    position={index + 4}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Chaveamento