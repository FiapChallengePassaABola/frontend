import { useState } from 'react';
import { FaArrowLeft, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../assets/logoBranca.png';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';

const PageRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }
    
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
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
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
      const userData = await authService.signUp(
        formData.email, 
        formData.password, 
        formData.name.trim()
      );
      
      // O AuthContext vai detectar automaticamente a mudança de estado
      // Não precisamos chamar login() manualmente
      
      await Swal.fire({
        icon: 'success',
        title: 'Conta criada!',
        text: `Bem-vindo(a), ${userData.displayName}! Verifique seu email para confirmar a conta.`,
        timer: 3000,
        showConfirmButton: false,
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#dc2626'
      });
      
      navigate('/');
    } catch (error) {
      console.error('Erro detalhado no registro:', error);
      
      let errorMessage = 'Erro ao criar conta. Tente novamente.';
      
      if (error.message) {
        errorMessage = error.message;
      }

      await Swal.fire({
        icon: 'error',
        title: 'Erro no Cadastro',
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
      <header className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button 
          onClick={() => navigate('/login')}
          className="text-white text-lg sm:text-xl lg:text-2xl hover:text-gray-300 transition-colors flex items-center gap-2"
        >
          <FaArrowLeft size={20} className="sm:w-6 sm:h-6" />
          Voltar ao Login
        </button>
        <button 
          onClick={() => navigate('/')}
          className="text-white text-lg sm:text-xl lg:text-2xl hover:text-gray-300 transition-colors flex items-center gap-2"
        >
          <FaArrowLeft size={20} className="sm:w-6 sm:h-6" />
          Página Principal
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

            <div className="text-center mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                Criar conta
              </h1>
              <p className="text-gray-300 text-xs sm:text-sm">
                Preencha os dados para se cadastrar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {errors.general && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm">
                  {errors.general}
                </div>
              )}

              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nome completo"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-200 rounded-lg sm:rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 text-sm sm:text-base ${
                    errors.name ? 'border-2 border-red-500 focus:ring-red-500' : 'focus:ring-red-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>
                )}
              </div>

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

              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirmar senha"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 bg-gray-200 rounded-lg sm:rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 text-sm sm:text-base ${
                    errors.confirmPassword ? 'border-2 border-red-500 focus:ring-red-500' : 'focus:ring-red-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <FaEyeSlash size={16} className="sm:w-5 sm:h-5" /> : <FaEye size={16} className="sm:w-5 sm:h-5" />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4 sm:mt-6 flex items-center justify-center text-sm sm:text-base ${
                  isLoading 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" size={16} />
                    Criando conta...
                  </>
                ) : (
                  'Criar conta'
                )}
              </button>

              <div className="text-center pt-2 sm:pt-4">
                <div className="text-gray-300 text-xs sm:text-sm">
                  Já tem uma conta?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-red-400 hover:text-red-300 underline font-medium transition-colors duration-200"
                  >
                    Faça login aqui
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

export default PageRegister;
