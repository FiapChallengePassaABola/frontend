import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Logo from "../assets/logoBranca.png";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleUserClick = () => {
        if (isAuthenticated) {
            // Se estiver logado, redireciona para perfil
            navigate('/profile');
        } else {
            // Se não estiver logado, redireciona para login
            navigate('/login');
        }
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
        }
    };

    return (
        <header className="flex items-center justify-between px-4 md:px-8 pt-6 md:pt-12 drop-shadow-xl drop-shadow-[#9c0528d4] relative z-50">
            {/* Menu Desktop/Tablet - design original */}
            <ul className="hidden md:flex items-center justify-center text-lg text-white font-bold gap-6 flex-1">
                <li><Link to="/noticias">NOTICIAS</Link></li>
                <li><Link to="/campeonato">CAMPEONATO</Link></li>
                <li><Link to="/"><img src={Logo} alt="Logo" className="w-20" /></Link></li>
                <li>JOGAR</li>
                <li>
                    <a href="https://www.youtube.com/@passabola" target="_blank" className="flex items-center">
                        YOUTUBE
                    </a>
                </li>
            </ul>

            {/* Logo mobile - apenas para mobile */}
            <Link to="/" className="md:hidden">
                <img src={Logo} alt="Logo" className="w-16" />
            </Link>

            {/* Botão de usuário */}
            <div className="ml-auto flex items-center gap-3">
                {isAuthenticated && (
                    <div className="flex items-center gap-2">
                        <span className="text-white text-sm md:text-base font-medium hidden sm:block">
                            Olá, {user?.name || 'Usuário'}
                        </span>
                        <button 
                            onClick={handleLogout}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Sair da conta"
                        >
                            <FaSignOutAlt size={24} />
                        </button>
                    </div>
                )}
                <button 
                    onClick={handleUserClick}
                    className={`hover:opacity-80 transition-opacity relative ${isAuthenticated ? 'text-green-400' : 'text-white'}`}
                    title={isAuthenticated ? `Ver perfil de ${user?.name || 'Usuário'}` : 'Fazer login'}
                >
                    <AiOutlineUser size={32} color={isAuthenticated ? '#4ade80' : 'white'} className="md:w-10 md:h-10" />
                    {isAuthenticated && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                </button>
            </div>

            {/* Botão hambúrguer apenas para mobile */}
            <button 
                className="md:hidden ml-4 text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <HiX size={32} /> : <HiMenuAlt3 size={32} />}
            </button>

            {/* Menu mobile expandido */}
            {isMenuOpen && (
                <div className="absolute top-20 left-0 right-0 bg-black/90 backdrop-blur-sm z-[9999] md:hidden">
                    {isAuthenticated && (
                        <div className="text-center py-4 border-b border-gray-600">
                            <span className="text-white text-lg font-medium">
                                Olá, {user?.name || 'Usuário'}
                            </span>
                            <div className="flex justify-center gap-4 mt-4">
                                <button 
                                    onClick={() => {
                                        navigate('/profile');
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                >
                                    <AiOutlineUser />
                                    Meu Perfil
                                </button>
                                <button 
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                >
                                    <FaSignOutAlt />
                                    Sair
                                </button>
                            </div>
                        </div>
                    )}
                    <ul className="flex flex-col items-center text-lg text-white font-bold gap-6 py-8">
                        <li><Link to="/noticias" onClick={() => setIsMenuOpen(false)}>NOTICIAS</Link></li>
                        <li><Link to="/campeonato" onClick={() => setIsMenuOpen(false)}>CAMPEONATO</Link></li>
                        <li>JOGAR</li>
                        <li>
                            <a href="https://www.youtube.com/@passabola" target="_blank" className="flex items-center">
                                YOUTUBE
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    )
}
export default Navbar;
