import { apiClient } from '../api/client.js';

export const chaveamentoService = {
  async getChaveamento(campeonatoId) {
    try {
      return await apiClient.get(`/chaveamento/${campeonatoId}`);
    } catch (error) {
      console.error('Erro ao buscar chaveamento:', error);
      throw error;
    }
  },

  async getJogos(campeonatoId) {
    try {
      return await apiClient.get(`/jogos/${campeonatoId}`);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
      throw error;
    }
  },

  async getJogoById(jogoId) {
    try {
      return await apiClient.get(`/jogos/${jogoId}`);
    } catch (error) {
      console.error('Erro ao buscar jogo:', error);
      throw error;
    }
  },

  async criarJogo(data) {
    try {
      return await apiClient.post('/jogos', data);
    } catch (error) {
      console.error('Erro ao criar jogo:', error);
      throw error;
    }
  },

  async atualizarJogo(jogoId, data) {
    try {
      return await apiClient.put(`/jogos/${jogoId}`, data);
    } catch (error) {
      console.error('Erro ao atualizar jogo:', error);
      throw error;
    }
  },

  async deletarJogo(jogoId) {
    try {
      return await apiClient.delete(`/jogos/${jogoId}`);
    } catch (error) {
      console.error('Erro ao deletar jogo:', error);
      throw error;
    }
  },

  async atualizarResultado(jogoId, resultado) {
    try {
      return await apiClient.put(`/jogos/${jogoId}/resultado`, resultado);
    } catch (error) {
      console.error('Erro ao atualizar resultado:', error);
      throw error;
    }
  }
};
