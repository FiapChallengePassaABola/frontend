import { useState } from 'react';
import { FaArrowLeft, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../assets/logoBranca.png';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const user = await authService.checkUserExists(formData.email, formData.password);
      
      if (user) {
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email
        };
        
        login(userData);
        
        await Swal.fire({
          icon: 'success',
          title: 'Login realizado!',
          text: `Bem-vindo(a), ${user.name}!`,
          timer: 2000,
          showConfirmButton: false,
          background: '#1a1a1a',
          color: '#ffffff',
          confirmButtonColor: '#dc2626'
        });
        
        navigate('/');
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Login inexistente',
          text: 'Email ou senha incorretos. Verifique suas credenciais.',
          background: '#1a1a1a',
          color: '#ffffff',
          confirmButtonColor: '#dc2626'
        });
      }
    } catch (error) {
      console.error('Erro detalhado no login:', error);
      
      let errorMessage = 'Erro ao fazer login. Tente novamente.';
      
      if (error.message) {
        if (error.message.includes('Email é obrigatório')) {
          errorMessage = 'Por favor, informe seu email.';
        } else if (error.message.includes('Senha é obrigatória')) {
          errorMessage = 'Por favor, informe sua senha.';
        } else if (error.message.includes('Formato de email inválido')) {
          errorMessage = 'Por favor, informe um email válido.';
        } else if (error.message.includes('Dados de usuário inválidos')) {
          errorMessage = 'Dados de usuário inválidos. Tente fazer login novamente.';
        } else if (error.message.includes('Tempo limite')) {
          errorMessage = 'Tempo limite excedido. Verifique sua conexão e tente novamente.';
        } else if (error.message.includes('Erro de conexão')) {
          errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
        } else if (error.message.includes('Não autorizado')) {
          errorMessage = 'Sessão expirada. Faça login novamente.';
        } else if (error.message.includes('Erro interno do servidor')) {
          errorMessage = 'Servidor temporariamente indisponível. Tente novamente em alguns minutos.';
        } else {
          errorMessage = error.message;
        }
      }

      await Swal.fire({
        icon: 'error',
        title: 'Erro no Login',
        text: errorMessage,
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#dc2626'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 sm:p-6">
        <button 
          onClick={() => navigate('/')}
          className="text-white text-lg sm:text-xl lg:text-2xl hover:text-gray-300 transition-colors flex items-center gap-2"
        >
          <FaArrowLeft size={20} className="sm:w-6 sm:h-6" />
          Voltar
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="bg-[#521E2B] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#6B2A3A]">
            <div className="flex justify-center mb-6 sm:mb-8">
              <img 
                src={Logo} 
                alt="Logo" 
                className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {errors.general && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm">
                  {errors.general}
                </div>
              )}

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-200 rounded-lg sm:rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 text-sm sm:text-base ${
                    errors.email ? 'border-2 border-red-500 focus:ring-red-500' : 'focus:ring-red-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Senha"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 bg-gray-200 rounded-lg sm:rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 text-sm sm:text-base ${
                    errors.password ? 'border-2 border-red-500 focus:ring-red-500' : 'focus:ring-red-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash size={16} className="sm:w-5 sm:h-5" /> : <FaEye size={16} className="sm:w-5 sm:h-5" />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center text-sm sm:text-base ${
                    isLoading 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" size={16} />
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  disabled={isLoading}
                  className={`flex-1 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base ${
                    isLoading 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Cadastrar
                </button>
              </div>

              <div className="flex flex-col items-center space-y-2 sm:space-y-3 pt-2 sm:pt-4">
                <div className="text-gray-300 text-xs sm:text-sm text-center">
                  Ainda não tem conta?{' '}
                  <button
                    type="button"
                    className="text-red-400 hover:text-red-300 underline font-medium transition-colors duration-200"
                    onClick={() => navigate('/register')}
                  >
                    Cadastre-se aqui
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
