import {
    get,
    push,
    ref,
    remove,
    set,
    update
} from 'firebase/database';
import { realtimeDb } from '../config/firebase';

const USERS_PATH = 'users';
const USER_PROFILES_PATH = 'user_profiles';

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
      if (!email || typeof email !== 'string' || !email.trim()) {
        throw new Error('Email é obrigatório e deve ser uma string válida');
      }

      const cleanEmail = email.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        throw new Error('Formato de email inválido');
      }

      const users = await this.getAllUsers();
      const user = users.find(u => u.email && u.email.toLowerCase() === cleanEmail);
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
      if (!email || typeof email !== 'string' || !email.trim()) {
        throw new Error('Email é obrigatório');
      }
      if (!password || typeof password !== 'string' || !password.trim()) {
        throw new Error('Senha é obrigatória');
      }

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
      if (!userData || typeof userData !== 'object') {
        throw new Error('Dados do usuário são obrigatórios');
      }

      const { name, email, password } = userData;

      if (!name || typeof name !== 'string' || !name.trim()) {
        throw new Error('Nome é obrigatório e deve ser uma string válida');
      }

      if (!email || typeof email !== 'string' || !email.trim()) {
        throw new Error('Email é obrigatório e deve ser uma string válida');
      }

      if (!password || typeof password !== 'string' || !password.trim()) {
        throw new Error('Senha é obrigatória e deve ser uma string válida');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        throw new Error('Formato de email inválido');
      }

      if (password.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      if (name.trim().length < 2) {
        throw new Error('Nome deve ter pelo menos 2 caracteres');
      }

      const emailExists = await this.checkEmailExists(email);
      if (emailExists) {
        throw new Error('Email já cadastrado');
      }

      const usersRef = ref(realtimeDb, USERS_PATH);
      const newUserRef = push(usersRef, {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        createdAt: new Date().toISOString()
      });

      return { id: newUserRef.key, name: name.trim(), email: email.trim().toLowerCase() };
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      throw error;
    }
  },

  async updateUser(userId, userData) {
    try {
      if (!userId || typeof userId !== 'string' || !userId.trim()) {
        throw new Error('ID do usuário é obrigatório');
      }

      if (!userData || typeof userData !== 'object') {
        throw new Error('Dados do usuário são obrigatórios');
      }

      if (userData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email.trim())) {
          throw new Error('Formato de email inválido');
        }
      }

      if (userData.name && userData.name.trim().length < 2) {
        throw new Error('Nome deve ter pelo menos 2 caracteres');
      }

      if (userData.password && userData.password.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

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
      if (!userId || typeof userId !== 'string' || !userId.trim()) {
        throw new Error('ID do usuário é obrigatório');
      }

      const userRef = ref(realtimeDb, `${USERS_PATH}/${userId}`);
      await remove(userRef);
      return true;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      return false;
    }
  }
  ,
  async getUserJogadora(uid) {
    try {
      if (!uid || typeof uid !== 'string' || !uid.trim()) {
        throw new Error('UID é obrigatório');
      }
      const profileRef = ref(realtimeDb, `${USER_PROFILES_PATH}/${uid}/jogadora`);
      const snapshot = await get(profileRef);
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar perfil de jogadora do usuário:', error);
      return null;
    }
  },
  async setUserJogadora(uid, jogadoraData) {
    try {
      if (!uid || typeof uid !== 'string' || !uid.trim()) {
        throw new Error('UID é obrigatório');
      }
      if (!jogadoraData || typeof jogadoraData !== 'object') {
        throw new Error('Dados da jogadora são obrigatórios');
      }
      const profileRef = ref(realtimeDb, `${USER_PROFILES_PATH}/${uid}/jogadora`);
      await set(profileRef, {
        ...jogadoraData,
        updatedAt: new Date().toISOString(),
        createdAt: jogadoraData.createdAt || new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Erro ao salvar perfil de jogadora do usuário:', error);
      return false;
    }
  },
  async hasUserJogadora(uid) {
    const data = await this.getUserJogadora(uid);
    return !!data;
  }
};
