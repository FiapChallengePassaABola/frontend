import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderBar from "../components/HeaderBar";

function PageTime() {
  const { id } = useParams();
  const navigate = useNavigate();

  const allTeams = [
    { id: 1, name: "Flamengo", points: 15, logo: "🦅", image: null, description: "Um dos clubes mais populares do Brasil", estadio: "Maracanã", fundacao: "1895" },
    { id: 2, name: "Palmeiras", points: 12, logo: "🌿", image: null, description: "Maior campeão nacional brasileiro", estadio: "Allianz Parque", fundacao: "1914" },
    { id: 3, name: "São Paulo", points: 10, logo: "⚽", image: null, description: "Tricolor paulista com grande história", estadio: "Morumbi", fundacao: "1930" },
    { id: 4, name: "Santos", points: 8, logo: "🐋", image: null, description: "Clube que revelou Pelé", estadio: "Vila Belmiro", fundacao: "1912" },
    { id: 5, name: "Corinthians", points: 7, logo: "⚡", image: null, description: "O Timão, clube do povo", estadio: "Neo Química Arena", fundacao: "1910" },
    { id: 6, name: "Vasco", points: 6, logo: "⚓", image: null, description: "Gigante da Colina", estadio: "São Januário", fundacao: "1898" },
    { id: 7, name: "Botafogo", points: 5, logo: "⭐", image: null, description: "Glorioso do futebol brasileiro", estadio: "Nilton Santos", fundacao: "1894" },
    { id: 8, name: "Fluminense", points: 4, logo: "🌊", image: null, description: "Tricolor carioca tradicional", estadio: "Maracanã", fundacao: "1902" },
    { id: 9, name: "Grêmio", points: 13, logo: "🦊", image: null, description: "Imortal tricolor gaúcho", estadio: "Arena do Grêmio", fundacao: "1903" },
    { id: 10, name: "Internacional", points: 11, logo: "🔴", image: null, description: "Colorado do sul do Brasil", estadio: "Beira-Rio", fundacao: "1909" },
    { id: 11, name: "Atlético-MG", points: 9, logo: "⚫", image: null, description: "Galo forte de Minas Gerais", estadio: "Arena MRV", fundacao: "1908" },
    { id: 12, name: "Cruzeiro", points: 7, logo: "🔵", image: null, description: "Raposa com grande história", estadio: "Mineirão", fundacao: "1921" },
    { id: 13, name: "Bahia", points: 6, logo: "🟢", image: null, description: "Tricolor de aço baiano", estadio: "Arena Fonte Nova", fundacao: "1931" },
    { id: 14, name: "Fortaleza", points: 5, logo: "🦁", image: null, description: "Leão do Pici", estadio: "Castelão", fundacao: "1918" },
    { id: 15, name: "Ceará", points: 4, logo: "🦅", image: null, description: "Vovô do futebol cearense", estadio: "Castelão", fundacao: "1914" },
    { id: 16, name: "Sport", points: 3, logo: "⚽", image: null, description: "Leão da Ilha", estadio: "Ilha do Retiro", fundacao: "1905" },
  ];

  const team = allTeams.find((t) => t.id === parseInt(id));

  if (!team) {
    return (
      <div className="min-h-screen pt-24 sm:pt-28">
        <HeaderBar />
        <div className="container mx-auto px-4 py-20">
          <div className="bg-red-500/20 border border-red-500 rounded-xl p-8 text-center">
            <h2 className="text-white text-2xl font-bold">Time não encontrado</h2>
            <button
              onClick={() => navigate("/campeonato")}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Voltar ao Campeonato
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28">
      <HeaderBar />
      
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors mb-6 bg-[#13061A]/50 px-4 py-2 rounded-lg hover:bg-[#13061A] border border-white/10"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="bg-gradient-to-br from-[#381d3c97] to-[#200f23ad] rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full flex items-center justify-center border-4 border-purple-500/50 shadow-lg">
              {team.image ? (
                <img
                  src={team.image}
                  alt={team.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="text-6xl md:text-7xl">{team.logo}</div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {team.name}
              </h1>
              <p className="text-white/80 text-lg mb-4">{team.description}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-purple-600/30 px-4 py-2 rounded-lg border border-purple-500/50">
                  <p className="text-white/60 text-sm">Pontos</p>
                  <p className="text-white text-2xl font-bold">{team.points}</p>
                </div>
                <div className="bg-purple-600/30 px-4 py-2 rounded-lg border border-purple-500/50">
                  <p className="text-white/60 text-sm">Fundação</p>
                  <p className="text-white text-2xl font-bold">{team.fundacao}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#13061A]/50 rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Informações</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Estádio:</span>
                  <span className="text-white font-semibold">{team.estadio}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Fundado em:</span>
                  <span className="text-white font-semibold">{team.fundacao}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Pontos no campeonato:</span>
                  <span className="text-white font-semibold">{team.points}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#13061A]/50 rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Últimos Jogos</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-green-600/20 p-3 rounded-lg border border-green-500/30">
                  <span className="text-white">{team.name} 3 x 1 Adversário</span>
                  <span className="text-green-400 font-bold">V</span>
                </div>
                <div className="flex justify-between items-center bg-green-600/20 p-3 rounded-lg border border-green-500/30">
                  <span className="text-white">{team.name} 2 x 0 Adversário</span>
                  <span className="text-green-400 font-bold">V</span>
                </div>
                <div className="flex justify-between items-center bg-red-600/20 p-3 rounded-lg border border-red-500/30">
                  <span className="text-white">{team.name} 0 x 2 Adversário</span>
                  <span className="text-red-400 font-bold">D</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-[#13061A]/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Estatísticas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-white/60 text-sm mb-1">Jogos</p>
                <p className="text-white text-3xl font-bold">10</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-sm mb-1">Vitórias</p>
                <p className="text-green-400 text-3xl font-bold">7</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-sm mb-1">Empates</p>
                <p className="text-yellow-400 text-3xl font-bold">1</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-sm mb-1">Derrotas</p>
                <p className="text-red-400 text-3xl font-bold">2</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PageTime;

