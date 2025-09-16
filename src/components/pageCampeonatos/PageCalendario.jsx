import React from "react";

function PageCalendario() {
    const jogosMock = [
        {
            id: 1,
            data: "2025-09-20",
            horario: "16:00",
            local: "Maracanã",
            status: "agendado",
            timeCasa: { name: "Flamengo", logo: "🦅" },
            timeFora: { name: "Palmeiras", logo: "🌿" }
        },
        {
            id: 2,
            data: "2025-09-20",
            horario: "19:00",
            local: "Morumbi",
            status: "agendado",
            timeCasa: { name: "São Paulo", logo: "⚽" },
            timeFora: { name: "Santos", logo: "🐋" }
        },
        {
            id: 3,
            data: "2025-09-22",
            horario: "18:30",
            local: "Neo Química Arena",
            status: "agendado",
            timeCasa: { name: "Corinthians", logo: "⚡" },
            timeFora: { name: "Vasco", logo: "⚓" }
        },
        {
            id: 4,
            data: "2025-09-25",
            horario: "21:00",
            local: "Nilton Santos",
            status: "agendado",
            timeCasa: { name: "Botafogo", logo: "⭐" },
            timeFora: { name: "Fluminense", logo: "🌊" }
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "agendado":
                return "bg-blue-500";
            case "em_andamento":
                return "bg-green-500";
            case "finalizado":
                return "bg-gray-500";
            default:
                return "bg-gray-500";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "agendado":
                return "Agendado";
            case "em_andamento":
                return "Em Andamento";
            case "finalizado":
                return "Finalizado";
            default:
                return "Desconhecido";
        }
    };

    const jogosOrdenados = [...jogosMock].sort((a, b) => {
        const da = `${a.data} ${a.horario}`;
        const db = `${b.data} ${b.horario}`;
        return new Date(da) - new Date(db);
    });

    const jogosLoop = [...jogosOrdenados, ...jogosOrdenados];

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-[#521E2B] to-[#3A1520] p-4 md:p-8 rounded-2xl m-2 md:m-4 shadow-2xl border border-[#6B2A3A] overflow-hidden">
                <style>
                    {`
                    @keyframes scroll-horizontal {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .marquee-track { animation: scroll-horizontal 32s linear infinite; }
                    @media (max-width: 640px) {
                        .marquee-track { animation-duration: 20s; }
                    }
                    @media (max-width: 420px) {
                        .marquee-track { animation-duration: 16s; }
                    }
                    `}
                </style>

                {jogosLoop.length === 0 ? (
                    <div className="text-center text-white/70 py-8">
                        Nenhum jogo agendado no momento
                    </div>
                ) : (
                    <div className="relative w-full overflow-hidden">
                        <div className="flex w-max marquee-track">
                            {jogosLoop.map((jogo, idx) => (
                                <div
                                    key={`${jogo.id}-${idx}`}
                                    className="w-72 shrink-0 mx-2 bg-gradient-to-r from-[#14020A] to-[#2A0A15] rounded-lg p-4 border border-[#6B2A3A] hover:border-[#8B3A4A] transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-3 h-3 rounded-full ${getStatusColor(jogo.status)}`}></div>
                                            <span className="text-white/70 text-xs md:text-sm">{getStatusText(jogo.status)}</span>
                                        </div>
                                        <div className="text-white/70 text-xs md:text-sm">{jogo.horario}</div>
                                    </div>

                                    <div className="text-center text-white/60 text-xs mb-3">
                                        {new Date(jogo.data).toLocaleDateString("pt-BR")}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                                {jogo.timeCasa.logo}
                                            </div>
                                            <span className="text-white font-medium truncate max-w-[110px]">{jogo.timeCasa.name}</span>
                                        </div>
                                        <div className="text-white/70 text-lg font-bold">VS</div>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-white font-medium truncate max-w-[110px]">{jogo.timeFora.name}</span>
                                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                                {jogo.timeFora.logo}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3 text-center">
                                        <span className="text-white/60 text-sm">{jogo.local}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PageCalendario;


