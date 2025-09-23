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

const COLLECTION_NAME = 'clubes';

export const clubeServiceRealtime = {
  async getClubes() {
    try {
      console.log('Buscando clubes no Realtime Database...');
      
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const clubesRef = ref(realtimeDb, COLLECTION_NAME);
      const snapshot = await get(clubesRef);
      
      if (snapshot.exists()) {
        const clubes = [];
        snapshot.forEach((childSnapshot) => {
          clubes.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        clubes.sort((a, b) => {
          const dateA = new Date(a.dataInscricao || 0);
          const dateB = new Date(b.dataInscricao || 0);
          return dateB - dateA;
        });
        
        console.log('Clubes encontrados:', clubes.length);
        return clubes;
      } else {
        console.log('Nenhum clube encontrado');
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar clubes no Realtime Database:', error);
      throw error;
    }
  },

  async getClubeById(id) {
    try {
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const clubeRef = ref(realtimeDb, `${COLLECTION_NAME}/${id}`);
      const snapshot = await get(clubeRef);
      
      if (snapshot.exists()) {
        return {
          id: snapshot.key,
          ...snapshot.val()
        };
      } else {
        throw new Error('Clube não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar clube:', error);
      throw error;
    }
  },

  async createClube(clubeData) {
    try {
      console.log('Iniciando criação do clube no Realtime Database:', clubeData);
      
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const clubesRef = ref(realtimeDb, COLLECTION_NAME);
      const novoClubeRef = push(clubesRef);
      
      const novoClube = {
        ...clubeData,
        dataInscricao: new Date().toISOString(),
        status: 'pendente',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      console.log('Dados do clube a serem salvos:', novoClube);
      
      await set(novoClubeRef, novoClube);
      
      const clubeId = novoClubeRef.key;
      console.log('Clube criado com sucesso no Realtime Database, ID:', clubeId);
      
      return {
        id: clubeId,
        ...novoClube
      };
    } catch (error) {
      console.error('Erro detalhado ao criar clube no Realtime Database:', error);
      console.error('Código do erro:', error.code);
      console.error('Mensagem do erro:', error.message);
      throw new Error(`Erro ao criar clube: ${error.message}`);
    }
  },

  async updateClube(id, clubeData) {
    try {
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const clubeRef = ref(realtimeDb, `${COLLECTION_NAME}/${id}`);
      
      const dadosAtualizados = {
        ...clubeData,
        updatedAt: new Date().toISOString()
      };
      
      await set(clubeRef, dadosAtualizados);
      
      return {
        id,
        ...dadosAtualizados
      };
    } catch (error) {
      console.error('Erro ao atualizar clube:', error);
      throw error;
    }
  },

  async deleteClube(id) {
    try {
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const clubeRef = ref(realtimeDb, `${COLLECTION_NAME}/${id}`);
      await remove(clubeRef);
      return true;
    } catch (error) {
      console.error('Erro ao deletar clube:', error);
      throw error;
    }
  },

  async verificarNomeExistente(nome, idExcluir = null) {
    try {
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const clubesRef = ref(realtimeDb, COLLECTION_NAME);
      const nomeQuery = query(clubesRef, orderByChild('nome'), equalTo(nome));
      const snapshot = await get(nomeQuery);
      
      if (snapshot.exists()) {
        const clubeExistente = snapshot.val();
        const clubeId = Object.keys(clubeExistente)[0];
        return clubeId !== idExcluir;
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao verificar nome do clube:', error);
      return false;
    }
  },

  async getClubesPorStatus(status) {
    try {
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const clubesRef = ref(realtimeDb, COLLECTION_NAME);
      const statusQuery = query(clubesRef, orderByChild('status'), equalTo(status));
      const snapshot = await get(statusQuery);
      
      if (snapshot.exists()) {
        const clubes = [];
        snapshot.forEach((childSnapshot) => {
          clubes.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        clubes.sort((a, b) => {
          const dateA = new Date(a.dataInscricao || 0);
          const dateB = new Date(b.dataInscricao || 0);
          return dateB - dateA;
        });
        
        return clubes;
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao buscar clubes por status:', error);
      throw error;
    }
  },

  async atualizarStatusClube(id, status) {
    try {
      if (!realtimeDb) {
        throw new Error('Firebase Realtime Database não está configurado');
      }
      
      const clubeRef = ref(realtimeDb, `${COLLECTION_NAME}/${id}/status`);
      await set(clubeRef, status);
      
      const updatedAtRef = ref(realtimeDb, `${COLLECTION_NAME}/${id}/updatedAt`);
      await set(updatedAtRef, new Date().toISOString());
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar status do clube:', error);
      throw error;
    }
  }
};
