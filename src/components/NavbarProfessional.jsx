import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Logo from "../assets/logoBranca.png";
import { useAuth } from "../contexts/AuthContext";

function NavbarProfessional() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sim, sair',
            cancelButtonText: 'Cancelar',
            background: '#0f172a',
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
                background: '#0f172a',
                color: '#ffffff'
            });
        }
    };

    const navItems = [
        { name: 'NOTÍCIAS', path: '/noticias' },
        { name: 'CAMPEONATO', path: '/campeonato' },
        { name: 'JOGAR', path: '/jogar' },
        { name: 'YOUTUBE', path: '/youtube' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`w-full transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="relative">
                                <img 
                                    src={Logo} 
                                    alt="Logo" 
                                    className={`transition-all duration-500 group-hover:scale-110 ${
                                        scrolled ? 'h-10 w-10' : 'h-12 w-12'
                                    }`}
                                />
                                <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl group-hover:bg-primary-400/30 transition-all duration-500"></div>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                                        isActive(item.path)
                                            ? 'text-white'
                                            : 'text-white hover:text-gray-300'
                                    }`}
                                >
                                    {item.name}
                                    <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 ${
                                        isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                    }`}></span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {isAuthenticated ? (
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-white">
                                                Olá, {user?.nome || 'Usuário'}
                                            </p>
                                            <p className="text-xs text-gray-300">
                                                {user?.isJogadora ? 'Jogadora' : 'Administrador'}
                                            </p>
                                        </div>
                                        <div className="relative">
                                            <button
                                                onClick={handleUserClick}
                                                className="flex items-center space-x-2 bg-dark-800/50 hover:bg-dark-700/70 px-4 py-2 rounded-xl border border-dark-600/50 hover:border-primary-500/50 transition-all duration-300 group"
                                            >
                                                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                                                    <AiOutlineUser className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-white group-hover:text-gray-300 transition-colors duration-300">Perfil</span>
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 rounded-xl bg-dark-800/50 hover:bg-red-600/20 border border-dark-600/50 hover:border-red-500/50 transition-all duration-300 group"
                                        title="Sair"
                                    >
                                        <FaSignOutAlt className="w-4 h-4 text-white group-hover:text-red-400 transition-colors duration-300" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleUserClick}
                                    className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Entrar
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-xl text-white hover:text-gray-300 hover:bg-dark-800/50 transition-all duration-300"
                        >
                            {isMenuOpen ? (
                                <HiX className="block h-6 w-6" />
                            ) : (
                                <HiMenuAlt3 className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-900/95 backdrop-blur-xl border-t border-dark-700/50">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`block px-3 py-2 rounded-xl text-base font-medium transition-all duration-300 ${
                                    isActive(item.path)
                                        ? 'text-white bg-primary-600/10'
                                        : 'text-white hover:text-gray-300 hover:bg-dark-800/50'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="border-t border-dark-700/50 pt-4 pb-3">
                            {isAuthenticated ? (
                                <div className="flex items-center px-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                                            <AiOutlineUser className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-white">
                                            {user?.nome || 'Usuário'}
                                        </div>
                                        <div className="text-sm font-medium text-gray-300">
                                            {user?.email}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        handleUserClick();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                                >
                                    Entrar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavbarProfessional;
