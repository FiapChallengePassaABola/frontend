import { FaGamepad, FaHome, FaRunning, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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

  const navigationItems = [
    { icon: FaHome, label: 'Home', path: '/' },
    { icon: FaRunning, label: 'Status', path: '/profile' },
    { icon: FaRunning, label: 'Treino', path: '/training' },
    { icon: FaGamepad, label: 'Meus Jogos', path: '/games' },
    { icon: FaShoppingBag, label: 'Compras', path: '/shop' }
  ];

  const playerStats = [
    { label: 'Velocidade máxima', value: '10 km/h' },
    { label: 'Força do Chute', value: '26km/h' },
    { label: 'Distancia Corrida', value: '2 km' },
    { label: 'Idade', value: '18 anos' },
    { label: 'Altura', value: '1,70 m' },
    { label: 'Peso', value: '60kg' }
  ];

  const championshipStats = [
    { label: 'Gols', value: '12' },
    { label: 'Assistências', value: '7' },
    { label: 'Defesas', value: '3' }
  ];

  return (
    <div className="min-h-screen bg-[#2D1B2E] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-80 bg-[#2D1B2E] p-6 flex flex-col">
        {/* Profile Photo */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 lg:space-y-4">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.path === '/profile';
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-2 lg:py-3 rounded-lg transition-colors text-left ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} className="lg:w-5 lg:h-5" />
                <span className="font-medium text-sm lg:text-base">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-red-600/20 transition-colors text-left"
          >
            <FaSignOutAlt size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 bg-[#2D1B2E]">
        {/* Status da Jogadora */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6">Status da Jogadora</h1>
          
          <div className="bg-white rounded-2xl p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              {/* Chart Area */}
              <div className="flex-1">
                <div className="h-48 bg-gray-100 rounded-lg p-4 relative overflow-hidden">
                  {/* Grid lines */}
                  <div className="absolute inset-0">
                    <div className="h-full flex flex-col justify-between px-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="border-t border-gray-300"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Area Chart SVG */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Purple area (bottom) */}
                    <path
                      d="M 10 70 Q 30 65 50 60 T 90 55 L 90 100 L 10 100 Z"
                      fill="#8B5CF6"
                      opacity="0.8"
                    />
                    {/* Light purple area (middle) */}
                    <path
                      d="M 10 50 Q 30 45 50 40 T 90 35 L 90 100 L 10 100 Z"
                      fill="#A78BFA"
                      opacity="0.8"
                    />
                    {/* Pink area (top) */}
                    <path
                      d="M 10 30 Q 30 25 50 20 T 90 15 L 90 100 L 10 100 Z"
                      fill="#F472B6"
                      opacity="0.8"
                    />
                  </svg>
                  
                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-around px-4 pb-2">
                    <span className="text-xs text-gray-600">Item 1</span>
                    <span className="text-xs text-gray-600">Item 2</span>
                    <span className="text-xs text-gray-600">Item 3</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="w-full lg:w-80 grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4">
                {playerStats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-3 lg:p-4 text-center">
                    <div className="text-lg lg:text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-xs lg:text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas do Campeonato */}
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">Estatísticas do Campeonato</h2>
          
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            {championshipStats.map((stat, index) => (
              <div key={index} className="bg-[#2D1B2E] border border-[#4A2A4A] rounded-xl p-4 lg:p-6 text-center flex-1">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/70 text-sm lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageProfile;