import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { clubeServiceRealtime } from "../services/clubeServiceRealtime";
import { jogadoraServiceRealtime } from "../services/jogadoraServiceRealtime";
import InscricaoClube from "./InscricaoClube";
// import DesafioTimes from "./DesafioTimes"; // 👈 Comentado
// import ConviteJogadoras from "./ConviteJogadoras"; // 👈 Comentado

const ETAPAS = {
  INSCRICAO_CLUBE: "inscricao_clube",
  // CONVITE_JOGADORAS: "convite_jogadoras", // 👈 Comentado
  // DESAFIO_TIMES: "desafio_times", // 👈 Comentado
};

function FluxoInscricaoClube({ onClose }) {
  const { user } = useAuth();
  const [etapaAtual, setEtapaAtual] = useState(ETAPAS.INSCRICAO_CLUBE);
  const [clubeId, setClubeId] = useState(null);
  const [jogadorasConvidadas, setJogadorasConvidadas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const verificarClubeExistente = async () => {
      if (!user?.uid) return;

      try {
        setIsLoading(true);
        console.log("Verificando clube existente para usuário:", user.uid);
        const clube = await clubeServiceRealtime.getClubeByResponsavel(
          user.uid
        );
        console.log("Clube encontrado:", clube);

        if (clube) {
          setClubeId(clube.id);
          const jogadoras = await jogadoraServiceRealtime.getJogadorasByClube(
            clube.id
          );
          console.log("Jogadoras encontradas:", jogadoras);
          setJogadorasConvidadas(jogadoras);

          // 👇 Antes: passava para desafios
          // setEtapaAtual(ETAPAS.DESAFIO_TIMES);

          // 👇 Agora mantém apenas inscrição
          setEtapaAtual(ETAPAS.INSCRICAO_CLUBE);
        } else {
          console.log(
            "Nenhum clube encontrado, iniciando na etapa de inscrição"
          );
          setEtapaAtual(ETAPAS.INSCRICAO_CLUBE);
        }
      } catch (error) {
        console.error("Erro ao verificar clube existente:", error);
        setEtapaAtual(ETAPAS.INSCRICAO_CLUBE);
      } finally {
        setIsLoading(false);
      }
    };

    verificarClubeExistente();
  }, [user?.uid]);

  const handleInscricaoClubeSuccess = (novoClubeId) => {
    console.log("Inscrição do clube bem-sucedida, ID:", novoClubeId);
    setClubeId(novoClubeId);

    // 👇 Antes: passava para desafios
    // setEtapaAtual(ETAPAS.DESAFIO_TIMES);

    // 👇 Agora mantém apenas inscrição
    setEtapaAtual(ETAPAS.INSCRICAO_CLUBE);
  };

  const handleVoltarEtapa = () => {
    switch (etapaAtual) {
      // case ETAPAS.CONVITE_JOGADORAS:
      //   setEtapaAtual(ETAPAS.INSCRICAO_CLUBE);
      //   break;
      // case ETAPAS.DESAFIO_TIMES:
      //   setEtapaAtual(ETAPAS.INSCRICAO_CLUBE);
      //   break;
      default:
        onClose();
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#521E2B]"></div>
            <span className="text-lg">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleVoltarEtapa}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ←
              </button>
              <h2 className="text-xl font-bold text-[#521E2B]">
                Inscrição do Clube
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full bg-[#521E2B]`}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Clube</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 p-2 bg-gray-100 rounded text-xs text-gray-600">
            Debug: Etapa atual: {etapaAtual} | ClubeId: {clubeId || "null"} |
            Jogadoras: {jogadorasConvidadas.length}
          </div>

          {etapaAtual === ETAPAS.INSCRICAO_CLUBE && (
            <InscricaoClube
              onClose={() => onClose()}
              onSuccess={handleInscricaoClubeSuccess}
            />
          )}

          {/* {etapaAtual === ETAPAS.DESAFIO_TIMES && clubeId && (
            <DesafioTimes
              clubeId={clubeId}
              jogadorasConvidadas={jogadorasConvidadas}
            />
          )} */}

          {etapaAtual !== ETAPAS.INSCRICAO_CLUBE && !clubeId && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Erro: Clube não encontrado. Voltando para inscrição...
              </p>
              <button
                onClick={() => setEtapaAtual(ETAPAS.INSCRICAO_CLUBE)}
                className="mt-4 px-4 py-2 bg-[#521E2B] text-white rounded-lg hover:bg-[#3a1520]"
              >
                Voltar para Inscrição
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FluxoInscricaoClube;
