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

const COLLECTION_NAME = 'jogadoras';

export const jogadoraServiceFirebase = {
  async getJogadoras() {
    try {
      const jogadorasRef = collection(db, COLLECTION_NAME);
      const q = query(jogadorasRef, orderBy('dataInscricao', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar jogadoras:', error);
      throw error;
    }
  },

  async getJogadoraById(id) {
    try {
      const jogadoraRef = doc(db, COLLECTION_NAME, id);
      const jogadoraSnap = await getDoc(jogadoraRef);
      
      if (!jogadoraSnap.exists()) {
        throw new Error('Jogadora não encontrada');
      }
      
      return {
        id: jogadoraSnap.id,
        ...jogadoraSnap.data()
      };
    } catch (error) {
      console.error('Erro ao buscar jogadora:', error);
      throw error;
    }
  },

  async createJogadora(jogadoraData) {
    try {
      console.log('Iniciando criação da jogadora:', jogadoraData);
      
      if (!db) {
        throw new Error('Firebase não está configurado corretamente');
      }
      
      const jogadorasRef = collection(db, COLLECTION_NAME);
      
      const novaJogadora = {
        ...jogadoraData,
        dataInscricao: serverTimestamp(),
        status: 'pendente',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      console.log('Dados da jogadora a serem salvos:', novaJogadora);
      
      const docRef = await addDoc(jogadorasRef, novaJogadora);
      
      console.log('Jogadora criada com sucesso, ID:', docRef.id);
      
      return {
        id: docRef.id,
        ...novaJogadora
      };
    } catch (error) {
      console.error('Erro detalhado ao criar jogadora:', error);
      console.error('Código do erro:', error.code);
      console.error('Mensagem do erro:', error.message);
      throw new Error(`Erro ao criar jogadora: ${error.message}`);
    }
  },

  async updateJogadora(id, jogadoraData) {
    try {
      const jogadoraRef = doc(db, COLLECTION_NAME, id);
      
      const dadosAtualizados = {
        ...jogadoraData,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(jogadoraRef, dadosAtualizados);
      
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
      const jogadoraRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(jogadoraRef);
      return true;
    } catch (error) {
      console.error('Erro ao deletar jogadora:', error);
      throw error;
    }
  },

  async verificarEmailExistente(email, idExcluir = null) {
    try {
      const jogadorasRef = collection(db, COLLECTION_NAME);
      const q = query(jogadorasRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      const jogadoraExistente = querySnapshot.docs.find(doc => 
        doc.id !== idExcluir
      );
      
      return !!jogadoraExistente;
    } catch (error) {
      console.error('Erro ao verificar email da jogadora:', error);
      return false;
    }
  },

  async getJogadorasPorStatus(status) {
    try {
      const jogadorasRef = collection(db, COLLECTION_NAME);
      const q = query(
        jogadorasRef, 
        where('status', '==', status),
        orderBy('dataInscricao', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar jogadoras por status:', error);
      throw error;
    }
  },

  async getJogadorasPorPosicao(posicao) {
    try {
      const jogadorasRef = collection(db, COLLECTION_NAME);
      const q = query(
        jogadorasRef, 
        where('posicao', '==', posicao),
        orderBy('dataInscricao', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar jogadoras por posição:', error);
      throw error;
    }
  },

  async getJogadorasPorExperiencia(experiencia) {
    try {
      const jogadorasRef = collection(db, COLLECTION_NAME);
      const q = query(
        jogadorasRef, 
        where('experiencia', '==', experiencia),
        orderBy('dataInscricao', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar jogadoras por experiência:', error);
      throw error;
    }
  },

  async atualizarStatusJogadora(id, status) {
    try {
      const jogadoraRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(jogadoraRef, {
        status,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Erro ao atualizar status da jogadora:', error);
      throw error;
    }
  }
};
