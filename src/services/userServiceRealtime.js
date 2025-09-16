import {
    get,
    push,
    ref,
    remove,
    update
} from 'firebase/database';
import { realtimeDb } from '../config/firebase';

const USERS_PATH = 'users';

export const userServiceRealtime = {
  async getAllUsers() {
    try {
      const usersRef = ref(realtimeDb, USERS_PATH);
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const users = [];
        
        Object.keys(usersData).forEach(key => {
          users.push({ id: key, ...usersData[key] });
        });
        
        return users;
      }
      return [];
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return [];
    }
  },

  async getUserByEmail(email) {
    try {
      const users = await this.getAllUsers();
      const user = users.find(u => u.email === email);
      return user || null;
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      return null;
    }
  },

  async checkEmailExists(email) {
    try {
      const user = await this.getUserByEmail(email);
      return !!user;
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return false;
    }
  },

  async checkUserExists(email, password) {
    try {
      const user = await this.getUserByEmail(email);
      if (user && user.password === password) {
        return user;
      }
      return null;
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      return null;
    }
  },

  async addUser(userData) {
    try {
      const emailExists = await this.checkEmailExists(userData.email);
      if (emailExists) {
        throw new Error('Email já cadastrado');
      }

      const usersRef = ref(realtimeDb, USERS_PATH);
      const newUserRef = push(usersRef, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        createdAt: new Date().toISOString()
      });

      return { id: newUserRef.key, ...userData };
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      throw error;
    }
  },

  async updateUser(userId, userData) {
    try {
      const userRef = ref(realtimeDb, `${USERS_PATH}/${userId}`);
      await update(userRef, userData);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return false;
    }
  },

  async deleteUser(userId) {
    try {
      const userRef = ref(realtimeDb, `${USERS_PATH}/${userId}`);
      await remove(userRef);
      return true;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      return false;
    }
  }
};
