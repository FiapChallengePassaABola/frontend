import VideoYT from "../assets/VideoYT.jpg"

function Noticias() {
  return (
    <div className="flex flex-col justify-center items-center m-40">

      <div className="flex items-center w-full mb-10">
        <div className="flex-grow h-px bg-gray-300"></div>
        <h1 className="text-6xl font-bold text-gray-200 mx-10">NOTÍCIAS</h1>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      <div className="flex w-full max-w-7xl gap-10">
        
        <div className="w-2/3">
          <img 
            src={VideoYT} 
            alt="VideoYt" 
            className="w-full rounded-2xl border-[#1B4509] border-4" 
          />
          <h2 className="text-3xl font-bold text-white mt-4">
            COMO TEM SIDO NOSSOS PRIMEIROS MESES? - FALA, BEBÊ #39
          </h2>
          <p className="text-lg text-[#B0AFAF] mt-2">
            Voltamos pra contar como tem sido nossos dias desde a chegada da Antonella. Foram muitos aprendizados e momentos especiais, e claro que viemos dividir aqui com vocês. Mais uma montanha russa de emoções. Vem conversar e debater com a gente 
          </p>
        </div>

        <div className="w-1/2 grid grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <img 
                src={VideoYT} 
                alt="VideoYt" 
                className="w-full rounded-2xl border-[#1B4509] border-4" 
              />
              <h3 className="text-sm font-bold text-white mt-2">
                Notícias sem destaque - Área para uma notícia ou comunicado sem destaque
              </h3>
              <p className="text-xs text-[#B0AFAF] mt-1">
                Breve descrição sobre a matéria ou comunicado. Também a data de quando a matéria foi postada —&gt; <span className="ml-1">30/02/2025</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Noticias
