
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
      
      return [
        { id: 1, timeCasa: "Flamengo", timeVisitante: "Palmeiras", resultado: "2-1", status: "finalizado" },
        { id: 2, timeCasa: "São Paulo", timeVisitante: "Santos", resultado: "1-0", status: "finalizado" },
        { id: 3, timeCasa: "Corinthians", timeVisitante: "Vasco", resultado: "0-0", status: "finalizado" },
        { id: 4, timeCasa: "Botafogo", timeVisitante: "Fluminense", resultado: "3-2", status: "finalizado" }
      ];
      
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
      throw error;
    }
  },

};
