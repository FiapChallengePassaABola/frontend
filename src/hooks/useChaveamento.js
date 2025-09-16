import { useEffect, useState } from 'react';

export const useChaveamento = (campeonatoId) => {
  const [chaveamento, setChaveamento] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);

  useEffect(() => {
    // Simular carregamento
    setLoading(true);
    setTimeout(() => {
      setChaveamento({ id: campeonatoId, teams: [] });
      setLoading(false);
    }, 1000);
  }, [campeonatoId]);

  return {
    chaveamento,
    loading,
    error,
    refetch: () => {}
  };
};

export const useJogos = (campeonatoId) => {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);

  useEffect(() => {
    // Simular carregamento
    setLoading(true);
    setTimeout(() => {
      setJogos([]);
      setLoading(false);
    }, 1000);
  }, [campeonatoId]);

  return {
    jogos,
    loading,
    error,
    refetch: () => {}
  };
};
