import { userServiceRealtime } from './userServiceRealtime';

export const authService = {
  async checkUserExists(email, password) {
    try {
      const user = await userServiceRealtime.checkUserExists(email, password);
      return user;
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      return null;
    }
  },

  async checkEmailExists(email) {
    try {
      return await userServiceRealtime.checkEmailExists(email);
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return false;
    }
  },

  async addUser(userData) {
    try {
      const newUser = await userServiceRealtime.addUser(userData);
      return newUser;
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      throw error;
    }
  }
};