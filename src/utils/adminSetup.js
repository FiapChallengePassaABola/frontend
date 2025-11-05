import { get, ref, set } from 'firebase/database';
import { realtimeDb } from '../config/firebase';

export const adminUtils = {
  async makeUserAdmin(userUid) {
    try {
      const userRef = ref(realtimeDb, `users/${userUid}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const userData = snapshot.val();
        await set(userRef, {
          ...userData,
          isAdmin: true,
          updatedAt: new Date().toISOString()
        });
        console.log('Usuário configurado como administrador com sucesso!');
        return true;
      } else {
        console.error('Usuário não encontrado no banco de dados');
        return false;
      }
    } catch (error) {
      console.error('Erro ao configurar usuário como administrador:', error);
      return false;
    }
  },

  async removeAdminPrivileges(userUid) {
    try {
      const userRef = ref(realtimeDb, `users/${userUid}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const userData = snapshot.val();
        await set(userRef, {
          ...userData,
          isAdmin: false,
          updatedAt: new Date().toISOString()
        });
        console.log('Privilégios de administrador removidos com sucesso!');
        return true;
      } else {
        console.error('Usuário não encontrado no banco de dados');
        return false;
      }
    } catch (error) {
      console.error('Erro ao remover privilégios de administrador:', error);
      return false;
    }
  },

  async isUserAdmin(userUid) {
    try {
      const userRef = ref(realtimeDb, `users/${userUid}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const userData = snapshot.val();
        return userData.isAdmin || false;
      }
      return false;
    } catch (error) {
      console.error('Erro ao verificar se usuário é administrador:', error);
      return false;
    }
  }
};

