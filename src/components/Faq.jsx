import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Instale 'lucide-react' para esses ícones: npm install lucide-react

// Estrutura de dados para as FAQs
const faqData = [
  {
    id: 1,
    question: "Como posso entrar em contato com o suporte?",
    answer: "**[ADICIONE A RESPOSTA AQUI]** Nossa equipe de suporte está disponível 24 horas por dia, 7 dias por semana, através do e-mail suporte@suaempresa.com.br ou pelo telefone (XX) XXXX-XXXX.",
  },
  {
    id: 2,
    question: "Quais são os principais valores da nossa empresa?",
    answer: "**[ADICIONE A RESPOSTA AQUI]** Foco no cliente, Inovação contínua e Transparência em todas as ações são a base do nosso trabalho.",
  },
  {
    id: 3,
    question: "Vocês oferecem garantia nos produtos/serviços?",
    answer: "**[ADICIONE A RESPOSTA AQUI]** Sim, todos os nossos produtos/serviços contam com uma garantia de [X] dias. Consulte nossos termos e condições para mais detalhes.",
  },

];

const Faq = () => {
  // Estado para controlar qual pergunta está aberta. Inicialmente, nenhuma (null).
  const [openId, setOpenId] = useState(null);

  // Função para alternar o estado de abertura/fechamento
  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-white-300 sm:text-4xl mb-12">
          Perguntas Frequentes (FAQ)
        </h2>

        <div className="divide-y divide-gray-200">
          {faqData.map((item) => (
            <div key={item.id} className="py-6">
              <button
                className="flex justify-between items-center w-full text-left text-xl font-medium text-whitw-300 hover:text-purple-400 focus:outline-none"
                onClick={() => toggleFaq(item.id)}
                aria-expanded={openId === item.id}
                aria-controls={`faq-panel-${item.id}`}
              >
                <span>{item.question}</span>
                {openId === item.id ? (
                  <ChevronUp className="w-6 h-6 text-purple-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>
              
              {/* Painel da Resposta (apenas visível se o id corresponder ao openId) */}
              {openId === item.id && (
                <div 
                  id={`faq-panel-${item.id}`} 
                  className="mt-4 pr-12 text-lg text-white-300 transition-all duration-300 ease-in-out"
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;