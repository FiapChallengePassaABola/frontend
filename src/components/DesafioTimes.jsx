import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { clubeServiceRealtime } from '../services/clubeServiceRealtime';

function DesafioTimes({ clubeId, jogadorasConvidadas }) {
  const [timesDisponiveis, setTimesDisponiveis] = useState([]);
  const [meuClube, setMeuClube] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDesafiando, setIsDesafiando] = useState(false);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    carregarDados();
  }, [clubeId]);

  const carregarDados = async () => {
    try {
      setIsLoading(true);
      
      const clube = await clubeServiceRealtime.getClubeById(clubeId);
      setMeuClube(clube);
      
      const todosClubes = await clubeServiceRealtime.getAllClubes();
      const outrosClubes = todosClubes.filter(clube => clube.id !== clubeId);
      setTimesDisponiveis(outrosClubes);
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao carregar times disponíveis',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDesafiarTime = async (timeDesafiado) => {
    try {
      setIsDesafiando(true);
      
      await clubeServiceRealtime.criarDesafio(clubeId, timeDesafiado.id);
      
      Swal.fire({
        title: 'Desafio Enviado!',
        text: `Desafio enviado para ${timeDesafiado.nome}`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      
    } catch (error) {
      console.error('Erro ao desafiar time:', error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao enviar desafio para o time',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsDesafiando(false);
    }
  };

  const timesFiltrados = timesDisponiveis.filter(time =>
    time.nome.toLowerCase().includes(busca.toLowerCase()) ||
    time.cidade.toLowerCase().includes(busca.toLowerCase()) ||
    time.estado.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-green-800 mb-3">Meu Time</h3>
        {meuClube && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-green-800">{meuClube.nome}</p>
                <p className="text-sm text-green-600">{meuClube.cidade}, {meuClube.estado}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-800">
                  {jogadorasConvidadas.length} jogadoras
                </div>
                <div className="text-xs text-green-600">Time completo</div>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-sm font-medium text-green-700 mb-2">Jogadoras:</p>
              <div className="flex flex-wrap gap-2">
                {jogadorasConvidadas.map(jogadora => (
                  <span 
                    key={jogadora.id}
                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                  >
                    {jogadora.nome}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#521E2B] mb-3">Desafiar Times</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por nome, cidade ou estado..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#521E2B]"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#521E2B]"></div>
          </div>
        ) : timesFiltrados.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {busca ? 'Nenhum time encontrado com esse filtro' : 'Nenhum time disponível para desafio'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {timesFiltrados.map(time => (
              <div key={time.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">{time.nome}</h4>
                    <p className="text-sm text-gray-600">{time.cidade}, {time.estado}</p>
                    <p className="text-xs text-gray-500">Responsável: {time.responsavel}</p>
                  </div>
                  
                  {time.observacoes && (
                    <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      {time.observacoes}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Criado em: {new Date(time.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                    <button
                      onClick={() => handleDesafiarTime(time)}
                      disabled={isDesafiando}
                      className="px-4 py-2 bg-[#521E2B] text-white rounded-lg hover:bg-[#3a1520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {isDesafiando ? 'Enviando...' : 'Desafiar'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600 mt-0.5">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800">Como Funcionam os Desafios</h4>
            <ul className="text-sm text-blue-700 mt-1 space-y-1">
              <li>• Envie desafios para outros times</li>
              <li>• O time desafiado receberá uma notificação</li>
              <li>• Após aceitar, vocês podem agendar o jogo</li>
              <li>• Os resultados serão registrados no sistema</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#521E2B]">{timesDisponiveis.length}</div>
          <div className="text-sm text-gray-600">Times Disponíveis</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#521E2B]">{jogadorasConvidadas.length}</div>
          <div className="text-sm text-gray-600">Jogadoras no Time</div>
        </div>
      </div>
    </div>
  );
}

export default DesafioTimes;


