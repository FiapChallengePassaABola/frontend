const API_BASE_URL = 'http://localhost:3000';

export const jogadoraService = {
  async getJogadoras() {
    try {
      const response = await fetch(`${API_BASE_URL}/jogadoras`);
      if (!response.ok) {
        throw new Error('Erro ao buscar jogadoras');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar jogadoras:', error);
      throw error;
    }
  },

  async getJogadoraById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/jogadoras/${id}`);
      if (!response.ok) {
        throw new Error('Jogadora não encontrada');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar jogadora:', error);
      throw error;
    }
  },

  async createJogadora(jogadoraData) {
    try {
      const response = await fetch(`${API_BASE_URL}/jogadoras`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...jogadoraData,
          dataInscricao: new Date().toISOString().split('T')[0],
          status: 'pendente'
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar jogadora');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar jogadora:', error);
      throw error;
    }
  },

  async updateJogadora(id, jogadoraData) {
    try {
      const response = await fetch(`${API_BASE_URL}/jogadoras/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jogadoraData),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar jogadora');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar jogadora:', error);
      throw error;
    }
  },

  async deleteJogadora(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/jogadoras/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar jogadora');
      }
      return true;
    } catch (error) {
      console.error('Erro ao deletar jogadora:', error);
      throw error;
    }
  },

  async verificarEmailExistente(email, idExcluir = null) {
    try {
      const jogadoras = await this.getJogadoras();
      const jogadoraExistente = jogadoras.find(jogadora => 
        jogadora.email.toLowerCase() === email.toLowerCase() && 
        jogadora.id !== idExcluir
      );
      return !!jogadoraExistente;
    } catch (error) {
      console.error('Erro ao verificar email da jogadora:', error);
      return false;
    }
  }
};
