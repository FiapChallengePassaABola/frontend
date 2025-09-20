const API_BASE_URL = 'http://localhost:3000';

export const clubeService = {
  async getClubes() {
    try {
      const response = await fetch(`${API_BASE_URL}/clubes`);
      if (!response.ok) {
        throw new Error('Erro ao buscar clubes');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar clubes:', error);
      throw error;
    }
  },

  async getClubeById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/clubes/${id}`);
      if (!response.ok) {
        throw new Error('Clube não encontrado');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar clube:', error);
      throw error;
    }
  },

  async createClube(clubeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/clubes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...clubeData,
          dataInscricao: new Date().toISOString().split('T')[0],
          status: 'pendente'
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar clube');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar clube:', error);
      throw error;
    }
  },

  async updateClube(id, clubeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/clubes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clubeData),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar clube');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar clube:', error);
      throw error;
    }
  },

  async deleteClube(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/clubes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar clube');
      }
      return true;
    } catch (error) {
      console.error('Erro ao deletar clube:', error);
      throw error;
    }
  },

  async verificarNomeExistente(nome, idExcluir = null) {
    try {
      const clubes = await this.getClubes();
      const clubeExistente = clubes.find(clube => 
        clube.nome.toLowerCase() === nome.toLowerCase() && 
        clube.id !== idExcluir
      );
      return !!clubeExistente;
    } catch (error) {
      console.error('Erro ao verificar nome do clube:', error);
      return false;
    }
  }
};
