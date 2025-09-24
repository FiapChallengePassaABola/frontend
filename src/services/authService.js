import {
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import { get, ref, set } from 'firebase/database';
import { auth, realtimeDb } from '../config/firebase';

export const authService = {
  async signUp(email, password, displayName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (displayName) {
        await updateProfile(user, {
          displayName: displayName
        });
      }

      await sendEmailVerification(user);

      const userRef = ref(realtimeDb, `users/${user.uid}`);
      await set(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || displayName || '',
        createdAt: new Date().toISOString()
      });

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified
      };
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      throw this.handleAuthError(error);
    }
  },

  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = ref(realtimeDb, `users/${user.uid}`);
      const snapshot = await get(userRef);
      if (!snapshot.exists()) {
        await set(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          createdAt: new Date().toISOString()
        });
      }

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified
      };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw this.handleAuthError(error);
    }
  },

  async signOut() {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw this.handleAuthError(error);
    }
  },

  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Erro ao enviar email de reset:', error);
      throw this.handleAuthError(error);
    }
  },

  async sendEmailVerification() {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      } else {
        throw new Error('Usuário não está logado');
      }
    } catch (error) {
      console.error('Erro ao enviar email de verificação:', error);
      throw this.handleAuthError(error);
    }
  },

  async checkEmailExists(email) {
    try {
      return false;
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return false;
    }
  },

  async checkUserExists(email, password) {
    try {
      return null;
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      return null;
    }
  },

  async addUser(userData) {
    try {
      return await this.signUp(userData.email, userData.password, userData.name);
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      throw error;
    }
  },

  handleAuthError(error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return new Error('Este email já está sendo usado por outra conta.');
      case 'auth/weak-password':
        return new Error('A senha deve ter pelo menos 6 caracteres.');
      case 'auth/invalid-email':
        return new Error('Email inválido.');
      case 'auth/user-disabled':
        return new Error('Esta conta foi desabilitada.');
      case 'auth/user-not-found':
        return new Error('Nenhuma conta encontrada com este email.');
      case 'auth/wrong-password':
        return new Error('Senha incorreta.');
      case 'auth/invalid-credential':
        return new Error('Credenciais inválidas.');
      case 'auth/too-many-requests':
        return new Error('Muitas tentativas. Tente novamente mais tarde.');
      case 'auth/network-request-failed':
        return new Error('Erro de conexão. Verifique sua internet.');
      case 'auth/requires-recent-login':
        return new Error('Esta operação requer login recente. Faça login novamente.');
      default:
        return new Error(error.message || 'Erro de autenticação desconhecido.');
    }
  }
};