import { FaArrowLeft, FaEnvelope, FaIdCard, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../assets/logoBranca.png';
import { useAuth } from '../contexts/AuthContext';

const PageProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Sair da conta',
      text: 'Tem certeza que deseja sair da sua conta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Cancelar',
      background: '#1a1a1a',
      color: '#ffffff'
    });

    if (result.isConfirmed) {
      logout();
      await Swal.fire({
        icon: 'success',
        title: 'Logout realizado!',
        text: 'Você foi desconectado com sucesso.',
        timer: 2000,
        showConfirmButton: false,
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#dc2626'
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6">
        <button 
          onClick={() => navigate('/')}
          className="text-white text-2xl hover:text-gray-300 transition-colors flex items-center gap-2"
        >
          <FaArrowLeft />
          Voltar
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-[#521E2B] rounded-3xl p-8 shadow-2xl border border-[#6B2A3A]">
            <div className="flex justify-center mb-8">
              <img 
                src={Logo} 
                alt="Logo" 
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            </div>

            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUser size={48} className="text-gray-600" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Meu Perfil</h1>
              <p className="text-gray-300">Gerencie suas informações pessoais</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <FaIdCard className="text-red-400" size={20} />
                  <span className="text-white font-medium">Nome</span>
                </div>
                <p className="text-gray-300 text-lg">{user?.name || 'Nome não informado'}</p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <FaEnvelope className="text-red-400" size={20} />
                  <span className="text-white font-medium">Email</span>
                </div>
                <p className="text-gray-300 text-lg">{user?.email || 'Email não informado'}</p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <FaIdCard className="text-red-400" size={20} />
                  <span className="text-white font-medium">ID do Usuário</span>
                </div>
                <p className="text-gray-300 text-lg font-mono">{user?.id || 'ID não disponível'}</p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleLogout}
                className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <FaSignOutAlt />
                Sair da Conta
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PageProfile;
