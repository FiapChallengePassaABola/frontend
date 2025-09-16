import { FaExclamationTriangle, FaSpinner, FaRedo } from 'react-icons/fa';

const LoadingWithError = ({ 
  loading, 
  error, 
  onRetry, 
  children, 
  loadingText = 'Carregando...',
  errorTitle = 'Erro ao carregar',
  className = ''
}) => {
  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
        <FaSpinner className="animate-spin text-4xl text-gray-400 mb-4" />
        <p className="text-gray-300 text-lg">{loadingText}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
        <FaExclamationTriangle className="text-4xl text-red-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">{errorTitle}</h3>
        <p className="text-gray-300 text-center mb-6 max-w-md">
          {error}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
          >
            <FaRedo />
            Tentar Novamente
          </button>
        )}
      </div>
    );
  }

  return children;
};

export default LoadingWithError;
