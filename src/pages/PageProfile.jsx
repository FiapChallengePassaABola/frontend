import { useRef, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaCamera, FaFutbol, FaHome, FaRunning, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';

const PageProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('profileImage') || null;
  });
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          icon: 'error',
          title: 'Arquivo inválido',
          text: 'Por favor, selecione apenas arquivos de imagem.',
          background: '#1a1a1a',
          color: '#ffffff'
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'Arquivo muito grande',
          text: 'A imagem deve ter no máximo 5MB.',
          background: '#1a1a1a',
          color: '#ffffff'
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setProfileImage(imageData);
        localStorage.setItem('profileImage', imageData);
        
        Swal.fire({
          icon: 'success',
          title: 'Foto atualizada!',
          text: 'Sua foto de perfil foi atualizada com sucesso.',
          timer: 2000,
          showConfirmButton: false,
          background: '#1a1a1a',
          color: '#ffffff'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    Swal.fire({
      title: 'Remover foto',
      text: 'Tem certeza que deseja remover sua foto de perfil?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sim, remover',
      cancelButtonText: 'Cancelar',
      background: '#1a1a1a',
      color: '#ffffff'
    }).then((result) => {
      if (result.isConfirmed) {
        setProfileImage(null);
        localStorage.removeItem('profileImage');
        Swal.fire({
          icon: 'success',
          title: 'Foto removida!',
          text: 'Sua foto de perfil foi removida.',
          timer: 2000,
          showConfirmButton: false,
          background: '#1a1a1a',
          color: '#ffffff'
        });
      }
    });
  };

  const handleTrainingClick = () => {
    Swal.fire({
      title: '',
      html: `
        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="background:linear-gradient(135deg,#6B2A3A 0%, #521E2B 100%);border-radius:16px;padding:16px;border:1px solid #6B2A3A">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="width:40px;height:40px;border-radius:10px;background:#16a34a;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700">🏃‍♀️</div>
              <div>
                <div style="color:#fff;font-weight:700;font-size:16px;line-height:1.2">Treinos no App</div>
                <div style="color:rgba(255,255,255,0.7);font-size:13px">Para ver e acompanhar seus treinos, baixe nosso aplicativo.</div>
              </div>
            </div>
          </div>

          <div style="display:flex;gap:10px">
            <button style="flex:1;background:#16a34a;color:#fff;padding:10px 14px;border-radius:10px;cursor:pointer;border:1px solid #15803d;font-weight:600;outline:none;">
              Baixar app
            </button>
          </div>
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'Fechar',
      background: '#1a1a1a',
      color: '#ffffff',
      cancelButtonColor: '#6b7280',
      width: 480,
      backdrop: 'rgba(0,0,0,0.6)'
    });
  };

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
    { icon: FaFutbol, label: 'Meus Jogos', path: '/games' },
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-80 bg-[#521E2B] p-4 sm:p-6 flex flex-col border-r border-[#6B2A3A]">
        {/* Profile Avatar */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative">
            <div 
              onClick={handleAvatarClick}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-[#521E2B] rounded-full flex items-center justify-center border border-[#6B2A3A] cursor-pointer hover:bg-[#6B2A3A] transition-colors group"
            >
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <AiOutlineUser size={40} className="text-white sm:w-12 sm:h-12" />
              )}
              
              <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded-full flex items-center justify-center border-2 border-white group-hover:bg-green-700 transition-colors">
                <FaCamera size={10} className="text-white sm:w-3 sm:h-3" />
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            {profileImage && (
              <button
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center border-2 border-white transition-colors"
                title="Remover foto"
              >
                <span className="text-white text-xs font-bold">×</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 sm:space-y-3 lg:space-y-4">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.path === '/profile';
            return (
              <button
                key={index}
                onClick={() => item.label === 'Treino' ? handleTrainingClick() : navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-left ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="font-medium text-sm sm:text-base">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-4 sm:pt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-white/70 hover:text-white hover:bg-red-600/20 transition-colors text-left"
          >
            <FaSignOutAlt size={16} className="sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Sair</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Status da Jogadora */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">Status da Jogadora</h1>
          
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              {/* Chart Area */}
              <div className="flex-1">
                <div className="h-40 sm:h-48 bg-gray-100 rounded-lg p-3 sm:p-4 relative overflow-hidden">
                  {/* Grid lines */}
                  <div className="absolute inset-0">
                    <div className="h-full flex flex-col justify-between px-3 sm:px-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="border-t border-gray-300"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Area Chart SVG */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Dark green area (bottom) */}
                    <path
                      d="M 10 70 Q 30 65 50 60 T 90 55 L 90 100 L 10 100 Z"
                      fill="#065f46"
                      opacity="0.8"
                    />
                    {/* Medium green area (middle) */}
                    <path
                      d="M 10 50 Q 30 45 50 40 T 90 35 L 90 100 L 10 100 Z"
                      fill="#047857"
                      opacity="0.8"
                    />
                    {/* Light green area (top) */}
                    <path
                      d="M 10 30 Q 30 25 50 20 T 90 15 L 90 100 L 10 100 Z"
                      fill="#059669"
                      opacity="0.8"
                    />
                  </svg>
                  
                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-around px-3 sm:px-4 pb-2">
                    <span className="text-xs text-gray-600">Item 1</span>
                    <span className="text-xs text-gray-600">Item 2</span>
                    <span className="text-xs text-gray-600">Item 3</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="w-full lg:w-80 grid grid-cols-2 gap-3 sm:gap-4">
                {playerStats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas do Campeonato */}
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4">Estatísticas do Campeonato</h2>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {championshipStats.map((stat, index) => (
              <div key={index} className="bg-[#521E2B] border border-[#6B2A3A] rounded-lg sm:rounded-xl p-4 sm:p-6 text-center flex-1 shadow-lg">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/70 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageProfile;