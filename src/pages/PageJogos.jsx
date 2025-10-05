import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import HeaderBar from "../components/HeaderBar"
import PlasmaBackground from "../components/PlasmaBackground"
import Titulos from "../components/Titulos"

function PageJogos(){
    const [jogos, setJogos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const mockJogos = [
            {
                id: 1,
                titulo: "Copa das Estrelas",
                data: "2024-01-15",
                horario: "14:00",
                local: "Campo Central",
                status: "agendado",
                vagasTotal: 15,
                vagasOcupadas: 11,
                descricao: "Torneio de futebol feminino com premiação especial",
                categoria: "Feminino",
                nivel: "Intermediário"
            },
            {
                id: 2,
                titulo: "Liga dos Campeões",
                data: "2024-01-20",
                horario: "16:30",
                local: "Arena Esportiva",
                status: "agendado",
                vagasTotal: 20,
                vagasOcupadas: 8,
                descricao: "Competição de alto nível com times profissionais",
                categoria: "Feminino",
                nivel: "Avançado"
            },
            {
                id: 3,
                titulo: "Copa da Amizade",
                data: "2024-01-18",
                horario: "10:00",
                local: "Campo Municipal",
                status: "em_andamento",
                vagasTotal: 12,
                vagasOcupadas: 12,
                descricao: "Torneio recreativo para todas as idades",
                categoria: "Feminino",
                nivel: "Iniciante"
            },
            {
                id: 4,
                titulo: "Super Liga",
                data: "2024-01-22",
                horario: "19:00",
                local: "Estádio Principal",
                status: "agendado",
                vagasTotal: 18,
                vagasOcupadas: 5,
                descricao: "Competição noturna com iluminação especial",
                categoria: "Feminino",
                nivel: "Intermediário"
            },
            {
                id: 5,
                titulo: "Copa da Comunidade",
                data: "2024-01-25",
                horario: "15:00",
                local: "Campo do Bairro",
                status: "em_andamento",
                vagasTotal: 16,
                vagasOcupadas: 14,
                descricao: "Evento comunitário com premiação local",
                categoria: "Feminino",
                nivel: "Iniciante"
            }
        ]
        
        setTimeout(() => {
            setJogos(mockJogos)
            setLoading(false)
        }, 1000)
    }, [])

    const disponiveis = jogos.filter(j => j.status === 'agendado')
    const emAndamento = jogos.filter(j => j.status === 'em_andamento')

    const formatarData = (data) => {
        const date = new Date(data)
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    const getStatusColor = (status) => {
        return status === 'agendado' ? 'bg-green-500' : 'bg-blue-500'
    }

    const getStatusText = (status) => {
        return status === 'agendado' ? 'Disponível' : 'Em Andamento'
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col pt-24 sm:pt-28">
                <PlasmaBackground />
                <HeaderBar triggerElementId="page-title"/>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-white/80 text-xl">Carregando jogos...</div>
                </div>
                <Footer/>
            </div>
        )
    }

    return(
        <div className="min-h-screen flex flex-col pt-24 sm:pt-28">
            <PlasmaBackground />
            <HeaderBar triggerElementId="page-title"/>
            
            <div className="flex-1 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
                <Titulos id="page-title" titulo="JOGOS"/>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">
                            🏆 Disponíveis para Inscrição
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {disponiveis.map(jogo => (
                                <div key={jogo.id} className="bg-[#521E2B]/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-[#521E2B] transition-all duration-300 transform hover:scale-105">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold text-white">{jogo.titulo}</h3>
                                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-500">
                                            {getStatusText(jogo.status)}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-white/80">
                                            <span className="text-lg">📅</span>
                                            <span className="ml-2">{formatarData(jogo.data)} às {jogo.horario}</span>
                                        </div>
                                        <div className="flex items-center text-white/80">
                                            <span className="text-lg">📍</span>
                                            <span className="ml-2">{jogo.local}</span>
                                        </div>
                                        <div className="flex items-center text-white/80">
                                            <span className="text-lg">👥</span>
                                            <span className="ml-2">{jogo.categoria} - {jogo.nivel}</span>
                                        </div>
                                    </div>

                                    <div className="bg-white/10 rounded-xl p-4 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-white/80">Vagas:</span>
                                            <span className="text-2xl font-bold text-white">
                                                {jogo.vagasOcupadas}/{jogo.vagasTotal}
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                                            <div 
                                                className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${(jogo.vagasOcupadas / jogo.vagasTotal) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <p className="text-white/70 mb-6 text-sm leading-relaxed">
                                        {jogo.descricao}
                                    </p>

                                    <button className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                                        Inscrever-se
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">
                            ⚽ Em Andamento
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {emAndamento.map(jogo => (
                                <div key={jogo.id} className="bg-[#521E2B]/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-[#521E2B] transition-all duration-300 transform hover:scale-105">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold text-white">{jogo.titulo}</h3>
                                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-500">
                                            {getStatusText(jogo.status)}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-white/80">
                                            <span className="text-lg">📅</span>
                                            <span className="ml-2">{formatarData(jogo.data)} às {jogo.horario}</span>
                                        </div>
                                        <div className="flex items-center text-white/80">
                                            <span className="text-lg">📍</span>
                                            <span className="ml-2">{jogo.local}</span>
                                        </div>
                                        <div className="flex items-center text-white/80">
                                            <span className="text-lg">👥</span>
                                            <span className="ml-2">{jogo.categoria} - {jogo.nivel}</span>
                                        </div>
                                    </div>

                                    <div className="bg-white/10 rounded-xl p-4 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-white/80">Participantes:</span>
                                            <span className="text-2xl font-bold text-white">
                                                {jogo.vagasOcupadas}/{jogo.vagasTotal}
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                                            <div 
                                                className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${(jogo.vagasOcupadas / jogo.vagasTotal) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <p className="text-white/70 mb-6 text-sm leading-relaxed">
                                        {jogo.descricao}
                                    </p>

                                    <button className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                                        Acompanhar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default PageJogos