import { useEffect, useState } from 'react';

export const useFootballGames = () => {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingApi, setUsingApi] = useState(false);

  // Dados mockados como fallback
  const getMockJogos = () => [
    {
      id: 1,
      data: "2025-01-20",
      horario: "16:00",
      local: "Maracanã",
      status: "agendado",
      timeCasa: { name: "Flamengo", logo: "🦅" },
      timeFora: { name: "Palmeiras", logo: "🌿" }
    },
    {
      id: 2,
      data: "2025-01-22",
      horario: "19:00",
      local: "Morumbi",
      status: "agendado",
      timeCasa: { name: "São Paulo", logo: "⚽" },
      timeFora: { name: "Santos", logo: "🐋" }
    },
    {
      id: 3,
      data: "2025-01-25",
      horario: "18:30",
      local: "Neo Química Arena",
      status: "agendado",
      timeCasa: { name: "Corinthians", logo: "⚡" },
      timeFora: { name: "Vasco", logo: "⚓" }
    },
    {
      id: 4,
      data: "2025-01-28",
      horario: "21:00",
      local: "Nilton Santos",
      status: "agendado",
      timeCasa: { name: "Botafogo", logo: "⭐" },
      timeFora: { name: "Fluminense", logo: "🌊" }
    }
  ];

  const fetchJogos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📋 Carregando dados de exemplo...');
      
      // Simular carregamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Usar dados mockados
      setUsingApi(false);
      setJogos(getMockJogos());
      
    } catch (err) {
      console.error('Erro ao carregar jogos:', err);
      setError('Erro ao carregar jogos');
      setUsingApi(false);
      setJogos(getMockJogos());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJogos();
  }, []);

  const refetch = () => {
    fetchJogos();
  };

  return {
    jogos,
    loading,
    error,
    usingApi,
    refetch
  };
};
