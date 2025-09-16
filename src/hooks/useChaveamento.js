import { useCallback, useEffect, useState } from 'react';
import { chaveamentoService } from '../services/chaveamentoService';

export const useChaveamento = (campeonatoId) => {
  const [chaveamento, setChaveamento] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChaveamento = useCallback(async () => {
    if (!campeonatoId) {
      setError('ID do campeonato é obrigatório');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await chaveamentoService.getChaveamento(campeonatoId);
      setChaveamento(data);
    } catch (err) {
      console.error('Erro ao buscar chaveamento:', err);
      setError(err.message || 'Erro ao carregar chaveamento');
    } finally {
      setLoading(false);
    }
  }, [campeonatoId]);

  useEffect(() => {
    fetchChaveamento();
  }, [fetchChaveamento]);

  return {
    chaveamento,
    loading,
    error,
    refetch: fetchChaveamento
  };
};

export const useJogos = (campeonatoId) => {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJogos = useCallback(async () => {
    if (!campeonatoId) {
      setError('ID do campeonato é obrigatório');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await chaveamentoService.getJogos(campeonatoId);
      setJogos(data || []);
    } catch (err) {
      console.error('Erro ao buscar jogos:', err);
      setError(err.message || 'Erro ao carregar jogos');
    } finally {
      setLoading(false);
    }
  }, [campeonatoId]);

  useEffect(() => {
    fetchJogos();
  }, [fetchJogos]);

  return {
    jogos,
    loading,
    error,
    refetch: fetchJogos
  };
};
