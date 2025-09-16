import { apiClient } from '../api/client.js';

export const chaveamentoService = {
  async getChaveamento(campeonatoId) {
    try {
      if (!campeonatoId || (typeof campeonatoId !== 'string' && typeof campeonatoId !== 'number')) {
        throw new Error('ID do campeonato é obrigatório');
      }
      const id = String(campeonatoId).trim();
      if (!id) {
        throw new Error('ID do campeonato é obrigatório');
      }
      
      // Retornar dados mock por enquanto
      return {
        id: id,
        nome: 'Campeonato Passa a Bola',
        status: 'ativo',
        times: [
          { id: 1, nome: "Flamengo", pontos: 15 },
          { id: 2, nome: "Palmeiras", pontos: 12 },
          { id: 3, nome: "São Paulo", pontos: 10 },
          { id: 4, nome: "Santos", pontos: 8 },
          { id: 5, nome: "Corinthians", pontos: 7 },
          { id: 6, nome: "Vasco", pontos: 6 },
          { id: 7, nome: "Botafogo", pontos: 5 },
          { id: 8, nome: "Fluminense", pontos: 4 }
        ]
      };
      
      // Código original comentado para evitar erro de conexão
      // return await apiClient.get(`/chaveamento/${id}`);
    } catch (error) {
      console.error('Erro ao buscar chaveamento:', error);
      throw error;
    }
  },

  async getJogos(campeonatoId) {
    try {
      if (!campeonatoId || (typeof campeonatoId !== 'string' && typeof campeonatoId !== 'number')) {
        throw new Error('ID do campeonato é obrigatório');
      }
      const id = String(campeonatoId).trim();
      if (!id) {
        throw new Error('ID do campeonato é obrigatório');
      }
      
      // Retornar dados mock por enquanto
      return [
        { id: 1, timeCasa: "Flamengo", timeVisitante: "Palmeiras", resultado: "2-1", status: "finalizado" },
        { id: 2, timeCasa: "São Paulo", timeVisitante: "Santos", resultado: "1-0", status: "finalizado" },
        { id: 3, timeCasa: "Corinthians", timeVisitante: "Vasco", resultado: "0-0", status: "finalizado" },
        { id: 4, timeCasa: "Botafogo", timeVisitante: "Fluminense", resultado: "3-2", status: "finalizado" }
      ];
      
      // Código original comentado para evitar erro de conexão
      // return await apiClient.get(`/jogos/${id}`);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
      throw error;
    }
  },

  async getJogoById(jogoId) {
    try {
      if (!jogoId || typeof jogoId !== 'string' || !jogoId.trim()) {
        throw new Error('ID do jogo é obrigatório');
      }
      return await apiClient.get(`/jogos/${jogoId}`);
    } catch (error) {
      console.error('Erro ao buscar jogo:', error);
      throw error;
    }
  },

  async criarJogo(data) {
    try {
      if (!data || typeof data !== 'object') {
        throw new Error('Dados do jogo são obrigatórios');
      }
      return await apiClient.post('/jogos', data);
    } catch (error) {
      console.error('Erro ao criar jogo:', error);
      throw error;
    }
  },

  async atualizarJogo(jogoId, data) {
    try {
      if (!jogoId || typeof jogoId !== 'string' || !jogoId.trim()) {
        throw new Error('ID do jogo é obrigatório');
      }
      if (!data || typeof data !== 'object') {
        throw new Error('Dados do jogo são obrigatórios');
      }
      return await apiClient.put(`/jogos/${jogoId}`, data);
    } catch (error) {
      console.error('Erro ao atualizar jogo:', error);
      throw error;
    }
  },

  async deletarJogo(jogoId) {
    try {
      if (!jogoId || typeof jogoId !== 'string' || !jogoId.trim()) {
        throw new Error('ID do jogo é obrigatório');
      }
      return await apiClient.delete(`/jogos/${jogoId}`);
    } catch (error) {
      console.error('Erro ao deletar jogo:', error);
      throw error;
    }
  },

  async atualizarResultado(jogoId, resultado) {
    try {
      if (!jogoId || typeof jogoId !== 'string' || !jogoId.trim()) {
        throw new Error('ID do jogo é obrigatório');
      }
      if (!resultado || typeof resultado !== 'object') {
        throw new Error('Dados do resultado são obrigatórios');
      }
      return await apiClient.put(`/jogos/${jogoId}/resultado`, resultado);
    } catch (error) {
      console.error('Erro ao atualizar resultado:', error);
      throw error;
    }
  }
};
