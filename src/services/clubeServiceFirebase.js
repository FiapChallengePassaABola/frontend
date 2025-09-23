import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'clubes';

export const clubeServiceFirebase = {
  async getClubes() {
    try {
      const clubesRef = collection(db, COLLECTION_NAME);
      const q = query(clubesRef, orderBy('dataInscricao', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar clubes:', error);
      throw error;
    }
  },

  async getClubeById(id) {
    try {
      const clubeRef = doc(db, COLLECTION_NAME, id);
      const clubeSnap = await getDoc(clubeRef);
      
      if (!clubeSnap.exists()) {
        throw new Error('Clube não encontrado');
      }
      
      return {
        id: clubeSnap.id,
        ...clubeSnap.data()
      };
    } catch (error) {
      console.error('Erro ao buscar clube:', error);
      throw error;
    }
  },

  async createClube(clubeData) {
    try {
      console.log('Iniciando criação do clube:', clubeData);
      
      if (!db) {
        throw new Error('Firebase não está configurado corretamente');
      }
      
      const clubesRef = collection(db, COLLECTION_NAME);
      
      const novoClube = {
        ...clubeData,
        dataInscricao: serverTimestamp(),
        status: 'pendente',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      console.log('Dados do clube a serem salvos:', novoClube);
      
      const docRef = await addDoc(clubesRef, novoClube);
      
      console.log('Clube criado com sucesso, ID:', docRef.id);
      
      return {
        id: docRef.id,
        ...novoClube
      };
    } catch (error) {
      console.error('Erro detalhado ao criar clube:', error);
      console.error('Código do erro:', error.code);
      console.error('Mensagem do erro:', error.message);
      throw new Error(`Erro ao criar clube: ${error.message}`);
    }
  },

  async updateClube(id, clubeData) {
    try {
      const clubeRef = doc(db, COLLECTION_NAME, id);
      
      const dadosAtualizados = {
        ...clubeData,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(clubeRef, dadosAtualizados);
      
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
      const clubeRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(clubeRef);
      return true;
    } catch (error) {
      console.error('Erro ao deletar clube:', error);
      throw error;
    }
  },

  async verificarNomeExistente(nome, idExcluir = null) {
    try {
      const clubesRef = collection(db, COLLECTION_NAME);
      const q = query(clubesRef, where('nome', '==', nome));
      const querySnapshot = await getDocs(q);
      
      const clubeExistente = querySnapshot.docs.find(doc => 
        doc.id !== idExcluir
      );
      
      return !!clubeExistente;
    } catch (error) {
      console.error('Erro ao verificar nome do clube:', error);
      return false;
    }
  },

  async getClubesPorStatus(status) {
    try {
      const clubesRef = collection(db, COLLECTION_NAME);
      const q = query(
        clubesRef, 
        where('status', '==', status),
        orderBy('dataInscricao', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar clubes por status:', error);
      throw error;
    }
  },

  async atualizarStatusClube(id, status) {
    try {
      const clubeRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(clubeRef, {
        status,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Erro ao atualizar status do clube:', error);
      throw error;
    }
  }
};
