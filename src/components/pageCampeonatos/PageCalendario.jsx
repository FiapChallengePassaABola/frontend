import React from "react";
import { useFootballGames } from "../../hooks/useFootballGames";

function PageCalendario() {
  const { jogos, loading, error, refetch } = useFootballGames();

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

  const jogosOrdenados = [...jogos].sort((a, b) => {
    const da = `${a.data} ${a.horario}`;
    const db = `${b.data} ${b.horario}`;
    return new Date(da) - new Date(db);
  });

  const jogosLoop = [...jogosOrdenados, ...jogosOrdenados];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-gradient-to-br bg-[#6d4291] p-1 sm:p-1 lg:p-4 m-2 sm:m-4 shadow-2xl border border-[#3a0944] overflow-hidden">
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

        {loading ? (
          <div className="text-center text-white/70 py-6 sm:py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            Carregando jogos...
          </div>
        ) : error ? (
          <div className="text-center text-white/70 py-6 sm:py-8">
            <div className="mb-4">
              <p className="text-slate-400 mb-2">Erro ao carregar jogos</p>
              <p className="text-sm text-white/50">{error}</p>
            </div>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        ) : jogosLoop.length === 0 ? (
          <div className="text-center text-white/70 py-6 sm:py-8">
            Nenhum jogo agendado no momento
          </div>
        ) : (
          <div className="relative w-full overflow-hidden">
            <div className="flex w-max marquee-track">
              {jogosLoop.map((jogo, idx) => (
                <div
                  key={`${jogo.id}-${idx}`}
                  className="w-64 sm:w-72 shrink-0 mx-1 sm:mx-2 bg-[#13061A] rounded-lg p-3 sm:p-4 border border-[#f358d9] hover:border-[#ffffff] transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getStatusColor(
                          jogo.status
                        )}`}
                      ></div>
                      <span className="text-white/70 text-xs sm:text-sm">
                        {getStatusText(jogo.status)}
                      </span>
                    </div>
                    <div className="text-white/70 text-xs sm:text-sm">
                      {jogo.horario}
                    </div>
                  </div>

                  <div className="text-center text-white/60 text-xs mb-2 sm:mb-3">
                    {new Date(jogo.data).toLocaleDateString("pt-BR")}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-xs sm:text-sm">
                          {jogo.timeCasa.logo}
                        </span>
                      </div>
                      <span className="text-white font-medium truncate max-w-[80px] sm:max-w-[110px] text-xs sm:text-sm">
                        {jogo.timeCasa.name}
                      </span>
                    </div>
                    <div className="text-white/70 text-sm sm:text-lg font-bold">
                      VS
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-white font-medium truncate max-w-[80px] sm:max-w-[110px] text-xs sm:text-sm">
                        {jogo.timeFora.name}
                      </span>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-xs sm:text-sm">
                          {jogo.timeFora.logo}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 sm:mt-3 text-center">
                    <span className="text-white/60 text-xs sm:text-sm">
                      {jogo.local}
                    </span>
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
