import { useChaveamento } from "../hooks/useChaveamento.js";
import TimesChaveamento from "./campeonato/TimesChaveamento";

function Chaveamento({ campeonatoId = "1" }){
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

    const mockTeams = [
        { id: 1, name: "Flamengo", points: 15, logo: "🦅", image: null },
        { id: 2, name: "Palmeiras", points: 12, logo: "🌿", image: null },
        { id: 3, name: "São Paulo", points: 10, logo: "⚽", image: null },
        { id: 4, name: "Santos", points: 8, logo: "🐋", image: null },
        { id: 5, name: "Corinthians", points: 7, logo: "⚡", image: null },
        { id: 6, name: "Vasco", points: 6, logo: "⚓", image: null },
        { id: 7, name: "Botafogo", points: 5, logo: "⭐", image: null },
        { id: 8, name: "Fluminense", points: 4, logo: "🌊", image: null },
        { id: 9, name: "Grêmio", points: 13, logo: "🦊", image: null },
        { id: 10, name: "Internacional", points: 11, logo: "🔴", image: null },
        { id: 11, name: "Atlético-MG", points: 9, logo: "⚫", image: null },
        { id: 12, name: "Cruzeiro", points: 7, logo: "🔵", image: null },
        { id: 13, name: "Bahia", points: 6, logo: "🟢", image: null },
        { id: 14, name: "Fortaleza", points: 5, logo: "🦁", image: null },
        { id: 15, name: "Ceará", points: 4, logo: "🦅", image: null },
        { id: 16, name: "Sport", points: 3, logo: "⚽", image: null }
    ];

    return(
        <div className="w-full max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-[#521E2B] to-[#3A1520] p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl m-2 sm:m-4 shadow-2xl border border-[#6B2A3A]">
                <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-center mb-4 sm:mb-6 lg:mb-8 text-white">
                    Chaveamento do Torneio
                </h2>
                
                <div className="w-full">
                    <div className="block lg:hidden">
                        <div className="space-y-4 sm:space-y-6">
                            <div>
                                <h3 className="text-white text-base sm:text-lg font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-[#6B2A3A] to-[#8B3A4A] px-3 sm:px-4 py-1 sm:py-2 rounded-full">
                                    OITAVAS DE FINAL
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {/* Chave A */}
                                    <div className="space-y-1">
                                        <h4 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-2 py-1 rounded-full">
                                            Chave A
                                        </h4>
                                        {mockTeams.slice(0, 4).map((team, index) => (
                                            <TimesChaveamento 
                                                key={team.id}
                                                team={team} 
                                                isWinner={index % 2 === 0}
                                                position={index}
                                            />
                                        ))}
                                    </div>

                                    {/* Chave B */}
                                    <div className="space-y-1">
                                        <h4 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-2 py-1 rounded-full">
                                            Chave B
                                        </h4>
                                        {mockTeams.slice(4, 8).map((team, index) => (
                                            <TimesChaveamento 
                                                key={team.id}
                                                team={team} 
                                                isWinner={index % 2 === 0}
                                                position={index + 4}
                                            />
                                        ))}
                                    </div>

                                    <div className="space-y-1">
                                        <h4 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-2 py-1 rounded-full">
                                            Chave C
                                        </h4>
                                        {mockTeams.slice(8, 12).map((team, index) => (
                                            <TimesChaveamento 
                                                key={team.id}
                                                team={team} 
                                                isWinner={index % 2 === 0}
                                                position={index + 8}
                                            />
                                        ))}
                                    </div>

                                    <div className="space-y-1">
                                        <h4 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-2 py-1 rounded-full">
                                            Chave D
                                        </h4>
                                        {mockTeams.slice(12, 16).map((team, index) => (
                                            <TimesChaveamento 
                                                key={team.id}
                                                team={team} 
                                                isWinner={index % 2 === 0}
                                                position={index + 12}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white text-base sm:text-lg font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-[#6B2A3A] to-[#8B3A4A] px-3 sm:px-4 py-1 sm:py-2 rounded-full">
                                    QUARTAS DE FINAL
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {/* Chave A */}
                                    <div className="space-y-1">
                                        <h4 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-2 py-1 rounded-full">
                                            Chave A vs B
                                        </h4>
                                        {[0, 2, 4, 6].map((index) => (
                                            <TimesChaveamento 
                                                key={index}
                                                team={mockTeams[index]} 
                                                isWinner={index % 2 === 0}
                                                position={index}
                                            />
                                        ))}
                                    </div>

                                    {/* Chave B */}
                                    <div className="space-y-1">
                                        <h4 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-2 py-1 rounded-full">
                                            Chave C vs D
                                        </h4>
                                        {[8, 10, 12, 14].map((index) => (
                                            <TimesChaveamento 
                                                key={index}
                                                team={mockTeams[index]} 
                                                isWinner={index % 2 === 0}
                                                position={index}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white text-base sm:text-lg font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-[#6B2A3A] to-[#8B3A4A] px-3 sm:px-4 py-1 sm:py-2 rounded-full">
                                    SEMIFINAIS
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div className="space-y-1">
                                        <h4 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-2 py-1 rounded-full">
                                            Semifinal 1
                                        </h4>
                                        {[0, 4].map((index) => (
                                            <TimesChaveamento 
                                                key={index}
                                                team={mockTeams[index]} 
                                                isWinner={index === 0}
                                                position={index}
                                            />
                                        ))}
                                    </div>

                                    <div className="space-y-1">
                                        <h4 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-2 py-1 rounded-full">
                                            Semifinal 2
                                        </h4>
                                        {[8, 12].map((index) => (
                                            <TimesChaveamento 
                                                key={index}
                                                team={mockTeams[index]} 
                                                isWinner={index === 8}
                                                position={index}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white text-base sm:text-lg font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-black">
                                    FINAL
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div className="space-y-1">
                                        <h4 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-2 py-1 rounded-full">
                                            Competidores
                                        </h4>
                                        <TimesChaveamento 
                                            team={mockTeams[0]} 
                                            isWinner={false}
                                            position={0}
                                        />
                                        <TimesChaveamento 
                                            team={mockTeams[8]} 
                                            isWinner={false}
                                            position={8}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-white text-xs font-semibold text-center mb-1 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full text-black">
                                            CAMPEÃO
                                        </h4>
                                        <TimesChaveamento 
                                            team={mockTeams[0]} 
                                            isWinner={true}
                                            position={0}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex lg:flex-nowrap justify-center gap-2 xl:gap-4 items-center">
                        <div className="flex flex-col space-y-2 xl:space-y-1 min-w-[120px] xl:min-w-[130px]">
                            <h3 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-2 py-1 rounded-full">
                                Oitavas
                            </h3>
                            {mockTeams.slice(0, 8).map((team, index) => (
                                <TimesChaveamento 
                                    key={team.id}
                                    team={team} 
                                    isWinner={index % 2 === 0}
                                    position={index}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col justify-center space-y-2 xl:space-y-1 min-w-[120px] xl:min-w-[130px]">
                            <h3 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-2 py-1 rounded-full">
                                Quartas
                            </h3>
                            {[0, 2, 4, 6].map((index) => (
                                <TimesChaveamento 
                                    key={index}
                                    team={mockTeams[index]} 
                                    isWinner={index % 2 === 0}
                                    position={index}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col justify-center space-y-4 xl:space-y-2 min-w-[120px] xl:min-w-[130px]">
                            <h3 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-2 py-1 rounded-full">
                                Semifinal
                            </h3>
                            {[0, 4].map((index) => (
                                <TimesChaveamento 
                                    key={index}
                                    team={mockTeams[index]} 
                                    isWinner={index === 0}
                                    position={index}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col justify-center min-w-[120px] xl:min-w-[130px] relative">
                            <div className="absolute inset-0 flex items-center justify-center z-0">
                                <img 
                                    src="/src/assets/logoBranca.png" 
                                    alt="PassaBola" 
                                    className="w-32 h-32 xl:w-48 xl:h-48 rounded-full opacity-30"
                                />
                            </div>
                            <h3 className="text-white text-xs font-semibold text-center mb-1 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full relative z-10">
                                FINAL
                            </h3>
                            <div className="relative z-10">
                            <TimesChaveamento 
                                team={mockTeams[0]} 
                                isWinner={true}
                                position={0}
                            />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center space-y-4 xl:space-y-2 min-w-[120px] xl:min-w-[130px]">
                            <h3 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-2 py-1 rounded-full">
                                Semifinal
                            </h3>
                            {[8, 12].map((index) => (
                                <TimesChaveamento 
                                    key={index}
                                    team={mockTeams[index]} 
                                    isWinner={index === 8}
                                    position={index}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col justify-center space-y-2 xl:space-y-1 min-w-[120px] xl:min-w-[130px]">
                            <h3 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-2 py-1 rounded-full">
                                Quartas
                            </h3>
                            {[8, 10, 12, 14].map((index) => (
                                <TimesChaveamento 
                                    key={index}
                                    team={mockTeams[index]} 
                                    isWinner={index % 2 === 0}
                                    position={index}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col space-y-2 xl:space-y-1 min-w-[120px] xl:min-w-[130px]">
                            <h3 className="text-white text-xs font-semibold text-center mb-1 bg-[#6B2A3A] px-2 py-1 rounded-full">
                                Oitavas
                            </h3>
                            {mockTeams.slice(8, 16).map((team, index) => (
                                <TimesChaveamento 
                                    key={team.id}
                                    team={team} 
                                    isWinner={index % 2 === 0}
                                    position={index + 8}
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