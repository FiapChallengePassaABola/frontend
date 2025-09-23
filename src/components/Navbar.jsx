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
            navigate('/profile');
        } else {
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
        <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 2xl:justify-center 2xl:px-0 pt-4 sm:pt-6 lg:pt-12 drop-shadow-xl drop-shadow-[#9c0528d4] relative z-50">
            <Link to="/" className="md:hidden">
                <img src={Logo} alt="Logo" className="w-12 sm:w-16" />
            </Link>

            <ul className="hidden md:flex items-center justify-center text-lg text-white font-bold gap-4 lg:gap-6 flex-1 2xl:flex-none 2xl:gap-8">
                <li><Link to="/noticias" className="hover:text-gray-300 transition-colors">NOTICIAS</Link></li>
                <li><Link to="/campeonato" className="hover:text-gray-300 transition-colors">CAMPEONATO</Link></li>
                <li><Link to="/"><img src={Logo} alt="Logo" className="w-16 lg:w-20 2xl:w-24" /></Link></li>
                <li><Link to="/jogar" className="hover:text-gray-300 transition-colors">JOGAR</Link></li>
                <li>
                    <a href="https://www.youtube.com/@passabola" target="_blank" className="flex items-center hover:text-gray-300 transition-colors">
                        YOUTUBE
                    </a>
                </li>
            </ul>

            <div className="flex items-center gap-2 sm:gap-3 2xl:absolute 2xl:right-8">
                {isAuthenticated && (
                    <div className="hidden sm:flex items-center gap-2">
                        <span className="text-white text-sm lg:text-base font-medium">
                            Olá, {user?.displayName || user?.email || 'Usuário'}
                        </span>
                        <button 
                            onClick={handleLogout}
                            className="text-red-400 hover:text-red-300 transition-colors p-1"
                            title="Sair da conta"
                        >
                            <FaSignOutAlt size={20} />
                        </button>
                    </div>
                )}
                <button 
                    onClick={handleUserClick}
                    className={`hover:opacity-80 transition-opacity relative p-1 ${isAuthenticated ? 'text-green-400' : 'text-white'}`}
                    title={isAuthenticated ? `Ver perfil de ${user?.displayName || user?.email || 'Usuário'}` : 'Fazer login'}
                >
                    <AiOutlineUser size={28} color={isAuthenticated ? '#4ade80' : 'white'} className="sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                    {isAuthenticated && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                </button>
            </div>

            <button 
                className="md:hidden text-white p-1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                {isMenuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>

            {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-sm z-[9999] md:hidden border-t border-gray-600">
                    {isAuthenticated && (
                        <div className="text-center py-4 border-b border-gray-600">
                            <span className="text-white text-base font-medium">
                                Olá, {user?.displayName || user?.email || 'Usuário'}
                            </span>
                            <div className="flex justify-center gap-3 mt-3">
                                <button 
                                    onClick={() => {
                                        navigate('/profile');
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                                >
                                    <AiOutlineUser size={16} />
                                    Meu Perfil
                                </button>
                                <button 
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                                >
                                    <FaSignOutAlt size={16} />
                                    Sair
                                </button>
                            </div>
                        </div>
                    )}
                    <ul className="flex flex-col items-center text-base text-white font-bold gap-4 py-6">
                        <li><Link to="/noticias" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300 transition-colors">NOTICIAS</Link></li>
                        <li><Link to="/campeonato" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300 transition-colors">CAMPEONATO</Link></li>
                        <li><Link to="/jogar" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300 transition-colors">JOGAR</Link></li>
                        <li>
                            <a href="https://www.youtube.com/@passabola" target="_blank" className="flex items-center hover:text-gray-300 transition-colors">
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
