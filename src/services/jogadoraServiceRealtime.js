import {
    equalTo,
    get,
    orderByChild,
    push,
    query,
    ref,
    remove,
    set
} from 'firebase/database';
import { realtimeDb } from '../config/firebase';

const COLLECTION_NAME = 'jogadoras';

export const jogadoraServiceRealtime = {
  async getJogadoras() {
    try {
      console.log('Buscando jogadoras no Realtime Database...');
      
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const jogadorasRef = ref(realtimeDb, COLLECTION_NAME);
      const snapshot = await get(jogadorasRef);
      
      if (snapshot.exists()) {
        const jogadoras = [];
        snapshot.forEach((childSnapshot) => {
          jogadoras.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        jogadoras.sort((a, b) => {
          const dateA = new Date(a.dataInscricao || 0);
          const dateB = new Date(b.dataInscricao || 0);
          return dateB - dateA;
        });
        
        console.log('Jogadoras encontradas:', jogadoras.length);
        return jogadoras;
      } else {
        console.log('Nenhuma jogadora encontrada');
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar jogadoras no Realtime Database:', error);
      throw error;
    }
  },

  async getJogadoraById(id) {
    try {
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const jogadoraRef = ref(realtimeDb, `${COLLECTION_NAME}/${id}`);
      const snapshot = await get(jogadoraRef);
      
      if (snapshot.exists()) {
        return {
          id: snapshot.key,
          ...snapshot.val()
        };
      } else {
        throw new Error('Jogadora não encontrada');
      }
    } catch (error) {
      console.error('Erro ao buscar jogadora:', error);
      throw error;
    }
  },

  async createJogadora(jogadoraData) {
    try {
      console.log('Iniciando criação da jogadora no Realtime Database:', jogadoraData);
      
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const jogadorasRef = ref(realtimeDb, COLLECTION_NAME);
      const novaJogadoraRef = push(jogadorasRef);
      
      const novaJogadora = {
        ...jogadoraData,
        dataInscricao: new Date().toISOString(),
        status: 'pendente',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      console.log('Dados da jogadora a serem salvos:', novaJogadora);
      
      await set(novaJogadoraRef, novaJogadora);
      
      const jogadoraId = novaJogadoraRef.key;
      console.log('Jogadora criada com sucesso no Realtime Database, ID:', jogadoraId);
      
      return {
        id: jogadoraId,
        ...novaJogadora
      };
    } catch (error) {
      console.error('Erro detalhado ao criar jogadora no Realtime Database:', error);
      console.error('Código do erro:', error.code);
      console.error('Mensagem do erro:', error.message);
      throw new Error(`Erro ao criar jogadora: ${error.message}`);
    }
  },

  async updateJogadora(id, jogadoraData) {
    try {
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const jogadoraRef = ref(realtimeDb, `${COLLECTION_NAME}/${id}`);
      
      const dadosAtualizados = {
        ...jogadoraData,
        updatedAt: new Date().toISOString()
      };
      
      await set(jogadoraRef, dadosAtualizados);
      
      return {
        id,
        ...dadosAtualizados
      };
    } catch (error) {
      console.error('Erro ao atualizar jogadora:', error);
      throw error;
    }
  },

  async deleteJogadora(id) {
    try {
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const jogadoraRef = ref(realtimeDb, `${COLLECTION_NAME}/${id}`);
      await remove(jogadoraRef);
      return true;
    } catch (error) {
      console.error('Erro ao deletar jogadora:', error);
      throw error;
    }
  },

  async verificarEmailExistente(email, idExcluir = null) {
    try {
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const jogadorasRef = ref(realtimeDb, COLLECTION_NAME);
      const emailQuery = query(jogadorasRef, orderByChild('email'), equalTo(email));
      const snapshot = await get(emailQuery);
      
      if (snapshot.exists()) {
        const jogadoraExistente = snapshot.val();
        const jogadoraId = Object.keys(jogadoraExistente)[0];
        return jogadoraId !== idExcluir;
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao verificar email da jogadora:', error);
      return false;
    }
  },

  async getJogadorasPorStatus(status) {
    try {
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const jogadorasRef = ref(realtimeDb, COLLECTION_NAME);
      const statusQuery = query(jogadorasRef, orderByChild('status'), equalTo(status));
      const snapshot = await get(statusQuery);
      
      if (snapshot.exists()) {
        const jogadoras = [];
        snapshot.forEach((childSnapshot) => {
          jogadoras.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        jogadoras.sort((a, b) => {
          const dateA = new Date(a.dataInscricao || 0);
          const dateB = new Date(b.dataInscricao || 0);
          return dateB - dateA;
        });
        
        return jogadoras;
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao buscar jogadoras por status:', error);
      throw error;
    }
  },

  async getJogadorasPorPosicao(posicao) {
    try {
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const jogadorasRef = ref(realtimeDb, COLLECTION_NAME);
      const posicaoQuery = query(jogadorasRef, orderByChild('posicao'), equalTo(posicao));
      const snapshot = await get(posicaoQuery);
      
      if (snapshot.exists()) {
        const jogadoras = [];
        snapshot.forEach((childSnapshot) => {
          jogadoras.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        jogadoras.sort((a, b) => {
          const dateA = new Date(a.dataInscricao || 0);
          const dateB = new Date(b.dataInscricao || 0);
          return dateB - dateA;
        });
        
        return jogadoras;
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao buscar jogadoras por posição:', error);
      throw error;
    }
  },

  async getJogadorasPorExperiencia(experiencia) {
    try {
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const jogadorasRef = ref(realtimeDb, COLLECTION_NAME);
      const experienciaQuery = query(jogadorasRef, orderByChild('experiencia'), equalTo(experiencia));
      const snapshot = await get(experienciaQuery);
      
      if (snapshot.exists()) {
        const jogadoras = [];
        snapshot.forEach((childSnapshot) => {
          jogadoras.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        jogadoras.sort((a, b) => {
          const dateA = new Date(a.dataInscricao || 0);
          const dateB = new Date(b.dataInscricao || 0);
          return dateB - dateA;
        });
        
        return jogadoras;
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao buscar jogadoras por experiência:', error);
      throw error;
    }
  },

  async atualizarStatusJogadora(id, status) {
    try {
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const jogadoraRef = ref(realtimeDb, `${COLLECTION_NAME}/${id}/status`);
      await set(jogadoraRef, status);
      
      const updatedAtRef = ref(realtimeDb, `${COLLECTION_NAME}/${id}/updatedAt`);
      await set(updatedAtRef, new Date().toISOString());
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar status da jogadora:', error);
      throw error;
    }
  }
};
