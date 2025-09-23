import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';
import { jogadoraServiceRealtime } from '../services/jogadoraServiceRealtime';
import PlasmaBackground from './PlasmaBackground';

const InscricaoJogadora = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: user?.displayName || '',
    email: user?.email || '',
    telefone: '',
    tipoDocumento: 'CPF',
    documento: '',
    dataNascimento: '',
    altura: '',
    peso: '',
    posicao: '',
    cidade: '',
    estado: '',
    experiencia: '',
    clubeAtual: '',
    observacoes: ''
  });
  const [errors, setErrors] = useState({});

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const posicoes = [
    'Goleira',
    'Zagueira',
    'Lateral Direita',
    'Lateral Esquerda',
    'Volante',
    'Meio-campo',
    'Ponta Direita',
    'Ponta Esquerda',
    'Atacante',
    'Centroavante'
  ];

  const niveisExperiencia = [
    'Iniciante',
    'Intermediário',
    'Avançado',
    'Profissional'
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

  const formatCpf = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0,3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0,3)}.${numbers.slice(3,6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0,3)}.${numbers.slice(3,6)}.${numbers.slice(6,9)}-${numbers.slice(9,11)}`;
  };

  const formatCnpj = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0,2)}.${numbers.slice(2)}`;
    if (numbers.length <= 8) return `${numbers.slice(0,2)}.${numbers.slice(2,5)}.${numbers.slice(5)}`;
    if (numbers.length <= 12) return `${numbers.slice(0,2)}.${numbers.slice(2,5)}.${numbers.slice(5,8)}/${numbers.slice(8)}`;
    return `${numbers.slice(0,2)}.${numbers.slice(2,5)}.${numbers.slice(5,8)}/${numbers.slice(8,12)}-${numbers.slice(12,14)}`;
  };

  const handleDocumentoChange = (e) => {
    const raw = e.target.value;
    const formatted = formData.tipoDocumento === 'CPF' ? formatCpf(raw) : formatCnpj(raw);
    setFormData(prev => ({
      ...prev,
      documento: formatted
    }));
    if (errors.documento) {
      setErrors(prev => ({ ...prev, documento: '' }));
    }
  };

  const isValidCPF = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(digits)) return false;

    const calcCheckDigit = (base, factorStart) => {
      let sum = 0;
      for (let i = 0; i < base.length; i++) {
        sum += parseInt(base[i], 10) * (factorStart - i);
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstNine = digits.slice(0, 9);
    const firstDigit = calcCheckDigit(firstNine, 10);
    if (firstDigit !== parseInt(digits[9], 10)) return false;

    const firstTen = digits.slice(0, 10);
    const secondDigit = calcCheckDigit(firstTen, 11);
    if (secondDigit !== parseInt(digits[10], 10)) return false;

    return true;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
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

    if (!formData.documento.trim()) {
      newErrors.documento = `${formData.tipoDocumento} é obrigatório`;
    } else {
      if (formData.tipoDocumento === 'CPF' && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.documento)) {
        newErrors.documento = 'CPF deve estar no formato 000.000.000-00';
      } else if (formData.tipoDocumento === 'CPF') {
        if (!isValidCPF(formData.documento)) {
          newErrors.documento = 'CPF inválido';
        }
      }
      if (formData.tipoDocumento === 'CNPJ' && !/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(formData.documento)) {
        newErrors.documento = 'CNPJ deve estar no formato 00.000.000/0000-00';
      }
    }

    if (!formData.dataNascimento) {
      newErrors.dataNascimento = 'Data de nascimento é obrigatória';
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dataNascimento);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 16) {
        newErrors.dataNascimento = 'Idade mínima de 16 anos';
      } else if (age > 50) {
        newErrors.dataNascimento = 'Idade máxima de 50 anos';
      }
    }

    if (!formData.altura) {
      newErrors.altura = 'Altura é obrigatória';
    } else if (formData.altura < 140 || formData.altura > 200) {
      newErrors.altura = 'Altura deve estar entre 140cm e 200cm';
    }

    if (!formData.peso) {
      newErrors.peso = 'Peso é obrigatório';
    } else if (formData.peso < 40 || formData.peso > 120) {
      newErrors.peso = 'Peso deve estar entre 40kg e 120kg';
    }

    if (!formData.posicao) {
      newErrors.posicao = 'Posição é obrigatória';
    }


    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória';
    }

    if (!formData.estado) {
      newErrors.estado = 'Estado é obrigatório';
    }

    if (!formData.experiencia) {
      newErrors.experiencia = 'Nível de experiência é obrigatório';
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

    console.log('Iniciando envio do formulário de jogadora...');
    setIsLoading(true);

    try {
      console.log('Verificando se email já existe...');
      const emailExiste = await jogadoraServiceRealtime.verificarEmailExistente(formData.email);
      if (emailExiste) {
        setErrors({ email: 'Já existe uma jogadora com este email' });
        setIsLoading(false);
        return;
      }

      console.log('Criando jogadora no Firebase...');
      const resultado = await jogadoraServiceRealtime.createJogadora(formData);
      console.log('Jogadora criada com sucesso:', resultado);
      
      Swal.fire({
        title: 'Sucesso!',
        text: 'Inscrição da jogadora realizada com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        onSuccess?.();
        onClose();
      });

    } catch (error) {
      console.error('Erro ao inscrever jogadora:', error);
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
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-10">
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
              <h2 className="text-2xl font-bold text-[#521E2B]">Inscrição de Jogadora</h2>
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
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.nome ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Maria Silva"
                />
                {errors.nome && (
                  <p className="text-red-500 text-xs mt-1">{errors.nome}</p>
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
                  placeholder="Ex: maria@email.com"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Documento *
                </label>
                <div className="flex gap-2">
                  <select
                    name="tipoDocumento"
                    value={formData.tipoDocumento}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, tipoDocumento: e.target.value, documento: '' }));
                      if (errors.documento) setErrors(prev => ({ ...prev, documento: '' }));
                    }}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] border-gray-300"
                  >
                    <option value="CPF">CPF</option>
                    <option value="CNPJ">CNPJ</option>
                  </select>
                  <input
                    type="text"
                    name="documento"
                    value={formData.documento}
                    onChange={handleDocumentoChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                      errors.documento ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={formData.tipoDocumento === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00'}
                    maxLength={formData.tipoDocumento === 'CPF' ? 14 : 18}
                  />
                </div>
                {errors.documento && (
                  <p className="text-red-500 text-xs mt-1">{errors.documento}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Nascimento *
                </label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.dataNascimento ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dataNascimento && (
                  <p className="text-red-500 text-xs mt-1">{errors.dataNascimento}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Altura (cm) *
                </label>
                <input
                  type="number"
                  name="altura"
                  value={formData.altura}
                  onChange={handleInputChange}
                  min="140"
                  max="200"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.altura ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: 165"
                />
                {errors.altura && (
                  <p className="text-red-500 text-xs mt-1">{errors.altura}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Peso (kg) *
                </label>
                <input
                  type="number"
                  name="peso"
                  value={formData.peso}
                  onChange={handleInputChange}
                  min="40"
                  max="120"
                  step="0.1"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.peso ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: 60.5"
                />
                {errors.peso && (
                  <p className="text-red-500 text-xs mt-1">{errors.peso}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Posição *
                </label>
                <select
                  name="posicao"
                  value={formData.posicao}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.posicao ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione a posição</option>
                  {posicoes.map(posicao => (
                    <option key={posicao} value={posicao}>{posicao}</option>
                  ))}
                </select>
                {errors.posicao && (
                  <p className="text-red-500 text-xs mt-1">{errors.posicao}</p>
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
                  Nível de Experiência *
                </label>
                <select
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.experiencia ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione o nível</option>
                  {niveisExperiencia.map(nivel => (
                    <option key={nivel} value={nivel}>{nivel}</option>
                  ))}
                </select>
                {errors.experiencia && (
                  <p className="text-red-500 text-xs mt-1">{errors.experiencia}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clube Atual
                </label>
                <input
                  type="text"
                  name="clubeAtual"
                  value={formData.clubeAtual}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B]"
                  placeholder="Ex: Flamengo (opcional)"
                />
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
                placeholder="Informações adicionais sobre sua experiência no futebol..."
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
                {isLoading ? 'Enviando...' : 'Inscrever Jogadora'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InscricaoJogadora;
