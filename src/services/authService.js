import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const authService = {
  // Criar conta com email e senha
  async signUp(email, password, displayName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Atualizar o perfil do usuário com o nome
      if (displayName) {
        await updateProfile(user, {
          displayName: displayName
        });
      }

      // Enviar email de verificação
      await sendEmailVerification(user);

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

  // Fazer login com email e senha
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

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

  // Fazer logout
  async signOut() {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw this.handleAuthError(error);
    }
  },

  // Enviar email de reset de senha
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Erro ao enviar email de reset:', error);
      throw this.handleAuthError(error);
    }
  },

  // Enviar email de verificação
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

  // Verificar se email já existe (para compatibilidade com código existente)
  async checkEmailExists(email) {
    try {
      // No Firebase Auth, não podemos verificar se um email existe sem tentar criar uma conta
      // Esta função é mantida para compatibilidade, mas retorna false
      // A verificação real acontece no momento do signUp
      return false;
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return false;
    }
  },

  // Verificar se usuário existe (para compatibilidade com código existente)
  async checkUserExists(email, password) {
    try {
      // No Firebase Auth, não podemos verificar credenciais sem tentar fazer login
      // Esta função é mantida para compatibilidade, mas retorna null
      // A verificação real acontece no momento do signIn
      return null;
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      return null;
    }
  },

  // Adicionar usuário (para compatibilidade com código existente)
  async addUser(userData) {
    try {
      return await this.signUp(userData.email, userData.password, userData.name);
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      throw error;
    }
  },

  // Tratar erros do Firebase Auth
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