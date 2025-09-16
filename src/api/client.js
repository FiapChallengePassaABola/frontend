import { apiConfig } from './config.js';

class ApiClient {
  constructor(config) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout;
    this.defaultHeaders = config.headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Tratamento específico para diferentes códigos de status
        if (response.status === 401) {
          throw new Error('Não autorizado. Faça login novamente.');
        } else if (response.status === 403) {
          throw new Error('Acesso negado. Você não tem permissão para esta ação.');
        } else if (response.status === 404) {
          throw new Error('Recurso não encontrado.');
        } else if (response.status === 422) {
          throw new Error('Dados inválidos. Verifique as informações enviadas.');
        } else if (response.status >= 500) {
          throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
        } else {
          throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }
      }

      // Verificar se a resposta tem conteúdo antes de tentar fazer parse JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        
        // Validação básica da estrutura de resposta
        if (data === null || data === undefined) {
          throw new Error('Resposta inválida do servidor');
        }
        
        return data;
      } else {
        // Se não for JSON, retornar o texto da resposta
        return await response.text();
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Tempo limite da requisição excedido. Verifique sua conexão.');
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
      } else if (error.name === 'SyntaxError') {
        throw new Error('Resposta inválida do servidor. Tente novamente.');
      }
      throw error;
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data, options = {}) {
    // Validação básica dos dados antes de enviar
    if (data !== null && data !== undefined) {
      try {
        JSON.stringify(data);
      } catch (error) {
        throw new Error('Dados inválidos para envio. Verifique os dados fornecidos.');
      }
    }

    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data, options = {}) {
    // Validação básica dos dados antes de enviar
    if (data !== null && data !== undefined) {
      try {
        JSON.stringify(data);
      } catch (error) {
        throw new Error('Dados inválidos para envio. Verifique os dados fornecidos.');
      }
    }

    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(apiConfig);
