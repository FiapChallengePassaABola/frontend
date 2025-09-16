import { useCallback } from 'react';
import Swal from 'sweetalert2';

export const useErrorHandler = () => {
  const handleError = useCallback((error, context = '') => {
    console.error(`Erro ${context}:`, error);
    
    let errorMessage = 'Ocorreu um erro inesperado. Tente novamente.';
    let errorTitle = 'Erro';
    
    // Mensagens de erro específicas baseadas no tipo de erro
    if (error.message) {
      const message = error.message.toLowerCase();
      
      // Erros de validação
      if (message.includes('obrigatório') || message.includes('obrigatória')) {
        errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
        errorTitle = 'Campos Obrigatórios';
      }
      // Erros de formato
      else if (message.includes('formato') || message.includes('inválido')) {
        errorMessage = 'Por favor, verifique o formato dos dados informados.';
        errorTitle = 'Formato Inválido';
      }
      // Erros de email
      else if (message.includes('email')) {
        if (message.includes('já cadastrado') || message.includes('já existe')) {
          errorMessage = 'Este email já está sendo usado. Tente fazer login ou use outro email.';
          errorTitle = 'Email Já Cadastrado';
        } else {
          errorMessage = 'Por favor, informe um email válido.';
          errorTitle = 'Email Inválido';
        }
      }
      // Erros de senha
      else if (message.includes('senha')) {
        if (message.includes('caracteres')) {
          errorMessage = 'Senha deve ter pelo menos 6 caracteres.';
          errorTitle = 'Senha Muito Curta';
        } else {
          errorMessage = 'Por favor, verifique sua senha.';
          errorTitle = 'Erro na Senha';
        }
      }
      // Erros de nome
      else if (message.includes('nome')) {
        errorMessage = 'Nome deve ter pelo menos 2 caracteres.';
        errorTitle = 'Nome Inválido';
      }
      // Erros de conexão
      else if (message.includes('tempo limite') || message.includes('timeout')) {
        errorMessage = 'Tempo limite excedido. Verifique sua conexão e tente novamente.';
        errorTitle = 'Tempo Limite';
      }
      else if (message.includes('conexão') || message.includes('network')) {
        errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
        errorTitle = 'Erro de Conexão';
      }
      // Erros de autenticação
      else if (message.includes('não autorizado') || message.includes('unauthorized')) {
        errorMessage = 'Sessão expirada. Faça login novamente.';
        errorTitle = 'Sessão Expirada';
      }
      else if (message.includes('acesso negado') || message.includes('forbidden')) {
        errorMessage = 'Você não tem permissão para esta ação.';
        errorTitle = 'Acesso Negado';
      }
      // Erros de servidor
      else if (message.includes('servidor') || message.includes('server')) {
        errorMessage = 'Servidor temporariamente indisponível. Tente novamente em alguns minutos.';
        errorTitle = 'Servidor Indisponível';
      }
      // Erros de dados
      else if (message.includes('dados') || message.includes('data')) {
        errorMessage = 'Dados inválidos. Verifique as informações fornecidas.';
        errorTitle = 'Dados Inválidos';
      }
      // Erros de recurso não encontrado
      else if (message.includes('não encontrado') || message.includes('not found')) {
        errorMessage = 'Recurso não encontrado.';
        errorTitle = 'Não Encontrado';
      }
      // Usar a mensagem original se não houver correspondência
      else {
        errorMessage = error.message;
        errorTitle = 'Erro';
      }
    }

    // Mostrar o erro usando SweetAlert2
    return Swal.fire({
      icon: 'error',
      title: errorTitle,
      text: errorMessage,
      background: '#1a1a1a',
      color: '#ffffff',
      confirmButtonColor: '#dc2626'
    });
  }, []);

  const handleSuccess = useCallback((message, title = 'Sucesso') => {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      background: '#1a1a1a',
      color: '#ffffff',
      confirmButtonColor: '#dc2626',
      timer: 2000,
      showConfirmButton: false
    });
  }, []);

  const handleWarning = useCallback((message, title = 'Atenção') => {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      background: '#1a1a1a',
      color: '#ffffff',
      confirmButtonColor: '#dc2626'
    });
  }, []);

  const handleInfo = useCallback((message, title = 'Informação') => {
    return Swal.fire({
      icon: 'info',
      title: title,
      text: message,
      background: '#1a1a1a',
      color: '#ffffff',
      confirmButtonColor: '#dc2626'
    });
  }, []);

  return {
    handleError,
    handleSuccess,
    handleWarning,
    handleInfo
  };
};
