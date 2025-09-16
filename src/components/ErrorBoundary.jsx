import React from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o state para mostrar a UI de erro
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log do erro para debugging
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Aqui você pode enviar o erro para um serviço de monitoramento
    // como Sentry, LogRocket, etc.
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      // UI de fallback personalizada
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
          <div className="max-w-md w-full bg-[#521E2B] rounded-3xl p-8 shadow-2xl border border-[#6B2A3A] text-center">
            <div className="flex justify-center mb-6">
              <FaExclamationTriangle className="text-red-400 text-6xl" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              Ops! Algo deu errado
            </h1>
            
            <p className="text-gray-300 mb-6">
              Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver o problema.
            </p>

            <div className="space-y-4">
              <button
                onClick={this.handleRetry}
                className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-medium hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FaRedo />
                Tentar Novamente
              </button>

              <button
                onClick={() => window.location.reload()}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-red-700 transition-colors duration-200"
              >
                Recarregar Página
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-gray-400 cursor-pointer hover:text-white transition-colors">
                  Detalhes do erro (desenvolvimento)
                </summary>
                <div className="mt-2 p-4 bg-gray-800 rounded-lg text-sm text-gray-300 overflow-auto max-h-40">
                  <div className="mb-2">
                    <strong>Erro:</strong> {this.state.error.toString()}
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Stack trace:</strong>
                      <pre className="whitespace-pre-wrap text-xs mt-1">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
