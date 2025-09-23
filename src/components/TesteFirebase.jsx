import { useEffect, useState } from 'react';
import { clubeServiceRealtime } from '../services/clubeServiceRealtime';
import { jogadoraServiceRealtime } from '../services/jogadoraServiceRealtime';

const TesteFirebase = () => {
  const [clubes, setClubes] = useState([]);
  const [jogadoras, setJogadoras] = useState([]);
  const [loading, setLoading] = useState(false);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [clubesData, jogadorasData] = await Promise.all([
        clubeServiceRealtime.getClubes(),
        jogadoraServiceRealtime.getJogadoras()
      ]);
      setClubes(clubesData);
      setJogadoras(jogadorasData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const criarClubeTeste = async () => {
    const dadosClube = {
      nome: `Clube Teste ${Date.now()}`,
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      responsavel: 'João Silva',
      email: `teste${Date.now()}@email.com`,
      telefone: '(21) 99999-9999',
      observacoes: 'Clube de teste'
    };

    try {
      await clubeServiceRealtime.createClube(dadosClube);
      carregarDados();
      alert('Clube criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar clube:', error);
      alert('Erro ao criar clube');
    }
  };

  const criarJogadoraTeste = async () => {
    const dadosJogadora = {
      nome: `Jogadora Teste ${Date.now()}`,
      email: `jogadora${Date.now()}@email.com`,
      telefone: '(21) 88888-8888',
      dataNascimento: '1995-05-15',
      altura: 165,
      peso: 60,
      posicao: 'Atacante',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      experiencia: 'Intermediário',
      clubeAtual: 'Flamengo',
      observacoes: 'Jogadora de teste'
    };

    try {
      await jogadoraServiceRealtime.createJogadora(dadosJogadora);
      carregarDados();
      alert('Jogadora criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar jogadora:', error);
      alert('Erro ao criar jogadora');
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-[#521E2B] mb-6">
        Teste de Integração Firebase
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Teste de Clubes</h2>
          <button
            onClick={criarClubeTeste}
            className="bg-[#521E2B] text-white px-4 py-2 rounded hover:bg-[#3a1520] transition-colors mb-4"
          >
            Criar Clube Teste
          </button>
          <div className="space-y-2">
            <h3 className="font-medium">Clubes Cadastrados ({clubes.length})</h3>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <div className="max-h-40 overflow-y-auto">
                {clubes.map((clube) => (
                  <div key={clube.id} className="text-sm border-b pb-1">
                    <strong>{clube.nome}</strong> - {clube.cidade}/{clube.estado}
                    <br />
                    <span className="text-gray-600">
                      Status: {clube.status} | 
                      Data: {clube.dataInscricao?.toDate?.()?.toLocaleDateString() || 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Teste de Jogadoras</h2>
          <button
            onClick={criarJogadoraTeste}
            className="bg-[#521E2B] text-white px-4 py-2 rounded hover:bg-[#3a1520] transition-colors mb-4"
          >
            Criar Jogadora Teste
          </button>
          <div className="space-y-2">
            <h3 className="font-medium">Jogadoras Cadastradas ({jogadoras.length})</h3>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <div className="max-h-40 overflow-y-auto">
                {jogadoras.map((jogadora) => (
                  <div key={jogadora.id} className="text-sm border-b pb-1">
                    <strong>{jogadora.nome}</strong> - {jogadora.posicao}
                    <br />
                    <span className="text-gray-600">
                      Status: {jogadora.status} | 
                      Data: {jogadora.dataInscricao?.toDate?.()?.toLocaleDateString() || 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">Instruções:</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Certifique-se de que o Firebase está configurado corretamente</li>
          <li>• Verifique se as regras de segurança do Firestore permitem leitura/escrita</li>
          <li>• Os dados de teste serão salvos no Firebase Firestore</li>
          <li>• Use os botões para criar dados de teste e verificar a integração</li>
        </ul>
      </div>
    </div>
  );
};

export default TesteFirebase;
