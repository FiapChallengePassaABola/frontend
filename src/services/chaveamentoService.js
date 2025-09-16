import { apiClient } from '../api/client.js';

export const chaveamentoService = {
  async getChaveamento(campeonatoId) {
    try {
      if (!campeonatoId || typeof campeonatoId !== 'string' || !campeonatoId.trim()) {
        throw new Error('ID do campeonato é obrigatório');
      }
      return await apiClient.get(`/chaveamento/${campeonatoId}`);
    } catch (error) {
      console.error('Erro ao buscar chaveamento:', error);
      throw error;
    }
  },

  async getJogos(campeonatoId) {
    try {
      if (!campeonatoId || typeof campeonatoId !== 'string' || !campeonatoId.trim()) {
        throw new Error('ID do campeonato é obrigatório');
      }
      return await apiClient.get(`/jogos/${campeonatoId}`);
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
