import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';
import { clubeServiceRealtime } from '../services/clubeServiceRealtime';
import PlasmaBackground from './PlasmaBackground';

const InscricaoClube = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    estado: '',
    responsavel: user?.displayName || '',
    email: user?.email || '',
    telefone: '',
    observacoes: ''
  });
  const [errors, setErrors] = useState({});

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome do clube é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome do clube deve ter pelo menos 2 caracteres';
    }

    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória';
    }

    if (!formData.estado) {
      newErrors.estado = 'Estado é obrigatório';
    }

    if (!formData.responsavel.trim()) {
      newErrors.responsavel = 'Nome do responsável é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Telefone deve estar no formato (XX) XXXXX-XXXX';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      telefone: formatted
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLoading) {
      console.log('Formulário já está sendo enviado, ignorando...');
      return;
    }
    
    if (!validateForm()) {
      return;
    }

    console.log('Iniciando envio do formulário de clube...');
    setIsLoading(true);

    try {
      console.log('Verificando se nome já existe...');
      const nomeExiste = await clubeServiceRealtime.verificarNomeExistente(formData.nome);
      if (nomeExiste) {
        setErrors({ nome: 'Já existe um clube com este nome' });
        setIsLoading(false);
        return;
      }

      console.log('Criando clube no Firebase...');
      const resultado = await clubeServiceRealtime.createClube(formData);
      console.log('Clube criado com sucesso:', resultado);
      
      Swal.fire({
        title: 'Sucesso!',
        text: 'Inscrição do clube realizada com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        onSuccess?.();
        onClose();
      });

    } catch (error) {
      console.error('Erro ao inscrever clube:', error);
      Swal.fire({
        title: 'Erro!',
        text: `Erro ao realizar inscrição: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <PlasmaBackground />
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10">
        <div className="p-6">
          <div className="relative mb-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-3 bg-[#521E2B] rounded-full flex items-center justify-center shadow-lg">
                <img 
                  src={new URL('../assets/logoBranca.png', import.meta.url).href} 
                  alt="Logo PassaBola" 
                  className="w-10 h-10 object-contain" 
                />
              </div>
              <h2 className="text-2xl font-bold text-[#521E2B]">Inscrição de Clube</h2>
            </div>
            <button
              onClick={onClose}
              className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Clube *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.nome ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Flamengo"
                />
                {errors.nome && (
                  <p className="text-red-500 text-xs mt-1">{errors.nome}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade *
                </label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.cidade ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Rio de Janeiro"
                />
                {errors.cidade && (
                  <p className="text-red-500 text-xs mt-1">{errors.cidade}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado *
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.estado ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione o estado</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
                {errors.estado && (
                  <p className="text-red-500 text-xs mt-1">{errors.estado}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Responsável *
                </label>
                <input
                  type="text"
                  name="responsavel"
                  value={formData.responsavel}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.responsavel ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: João Silva"
                />
                {errors.responsavel && (
                  <p className="text-red-500 text-xs mt-1">{errors.responsavel}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: joao@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone *
                </label>
                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handlePhoneChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.telefone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="(XX) XXXXX-XXXX"
                  maxLength={15}
                />
                {errors.telefone && (
                  <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                name="observacoes"
                value={formData.observacoes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B]"
                placeholder="Informações adicionais sobre o clube..."
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-[#521E2B] text-white rounded-md hover:bg-[#3a1520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Enviando...' : 'Inscrever Clube'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InscricaoClube;
