import React from 'react';
import Faq from './Faq'; 

const SobreNos = () => {
  return (

    <div className="min-h-screen bg-[#0E7252] text-white">
      
    
      <section className="relative py-20 md:py-32 overflow-hidden">
        
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
        
          <div className="text-center mb-16">
            <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
              Nossa História
            </h1>
            <p className="mt-4 text-xl max-w-2xl mx-auto text-gray-200">
              Conheça o Passa a Bola — o epicentro do futebol feminino com informação, entretenimento e muita zoeira!
            </p>
          </div>
          
          <hr className="w-1/3 mx-auto border-t-2 border-white/30 my-10" />

          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            
          
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6 border-l-4 border-white pl-4">
                Sobre O Passa a Bola
              </h2>
              <p className="mt-4 text-lg text-gray-100 leading-relaxed font-light">
                O Passa a Bola é um coletivo de futebol de mulheres. Com a <span className='font-bold'>Alê Xavier</span> e <span className='font-bold'>Luana Maluf</span>, você vai ver entretenimento, informação, eventos e <span className='font-bold'>MUITA zoeira!</span>.
              </p>
              
              <div className="mt-6 p-6 bg-[#0B5C44] rounded-xl shadow-2xl">
                 <p className="text-lg text-white leading-relaxed">
                  Somos uma comunidade vibrante presente no YouTube, Twitter, Instagram e no GE. Promovemos campeonatos, informação, conteúdo e representatividade. 
                </p>
                <p className="mt-4 text-lg text-white leading-relaxed">
                  Com o <span className='font-bold'>PABcast</span> e o nosso canal no YouTube, mostramos o futebol sob a perspectiva feminina — com informação, entretenimento e, claro, muita resenha e bom humor.
                </p>
              </div>

              <p className="mt-6 text-lg text-gray-100 leading-relaxed font-light italic">
                Nosso propósito é impulsionar o futebol feminino, dando visibilidade às atletas, promovendo eventos e criando espaços onde mulheres possam se expressar, competir e se divertir.
              </p>

              <p className="mt-6 text-xl font-bold text-white">
                Aqui, todas jogam. Todas têm voz. Todas passam a bola.
              </p>

            </div>

          
            <div className="mt-12 lg:mt-0">
              <div className="relative pt-[75%] rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition duration-300">
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                  <p className="text-[#0E7252] font-extrabold text-2xl p-4 text-center">
                    [IMAGEM]
                  </p>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-center text-gray-400">
                Alê Xavier e Luana Maluf, criadoras do Passa a Bola, em ação.
              </p>

              <div className="mt-8 p-4 bg-white rounded-lg shadow-xl text-center">
                 <p className="text-[#0E7252] font-bold text-lg">
                    MAIS DE 80 MILHÕES DE VIEWS!
                 </p>
                 <p className="text-gray-600 text-sm">
                    Conteúdo que engaja e informa a comunidade.
                 </p>
              </div>

            </div>
          </div>
        </div>
      </section>


      <div className="border-t border-b border-white/10 my-4"></div>


      <div className="bg-[#0B5C44] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
              Dúvidas Frequentes
            </h2>
            <p className="mt-2 text-xl text-gray-200">
              Tudo o que você precisa saber sobre o Passa a Bola.
            </p>
          </div>
          <Faq />
        </div>
      </div>

    </div>
  );
};

export default SobreNos;