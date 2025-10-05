import { useState } from "react";
import VideoYT from "../assets/VideoYT.jpg";
import Footer from "../components/Footer";
import HeaderBar from "../components/HeaderBar";
import NewsCard from "../components/NewsCard";
import NewsFilter from "../components/NewsFilter";
import Titulos from "../components/Titulos";

function PageNoticias() {
  const [activeFilter, setActiveFilter] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("todas");

  const noticias = [
    {
      img: VideoYT,
      titulo:
        "Gol de Haaland garante vitória apertada do City sobre o Brentford",
      descricao:
        "O Manchester City superou o Brentford com uma vitória por 1-0 no Gtech Community Stadium, graças ao gol cedo de Erling Haaland. O atacante norueguês finalizou com precisão aos nove minutos.",
      fonte: "PassaBola",
      tempoAtras: "há 8 minutos",
      temDescricao: true,
      categoria: "Internacional",
    },
    {
      img: VideoYT,
      titulo:
        "Será o protagonista da Seleção? Vini Jr ressurge no Real e vira capa",
      descricao:
        "Vini Jr tem protagonizado uma REDENÇÃO no Real Madrid. Após uma reta final discreta em 2024/25, ele parece ter retomado o alto nível. Já são NOVE participações diretas em gol em apenas.",
      fonte: "PassaBola",
      tempoAtras: "há 3 horas",
      temDescricao: true,
      categoria: "Internacional",
    },
    {
      img: VideoYT,
      titulo: "Cruzeiro monitora ex-jogador do Palmeiras; saiba",
      fonte: "Mercado do Fut",
      tempoAtras: "há 50 min",
      temDescricao: false,
      categoria: "Mercado",
    },
    {
      img: VideoYT,
      titulo:
        "Arrascaeta e Varela não serão convocados pelo Uruguai; veja as situações",
      fonte: "MundoBola",
      tempoAtras: "há 5 horas",
      temDescricao: false,
      categoria: "Seleções",
    },
    {
      img: VideoYT,
      titulo:
        "Agenda de DOMINGO: BR25 pega fogo, BuLi no OF, dérbis na Europa e +",
      fonte: "PassaBola",
      tempoAtras: "há 9 horas",
      temDescricao: false,
      categoria: "Agenda",
    },
    {
      img: VideoYT,
      titulo: "São Paulo não marca gols contra o Palmeiras há mais de um ano",
      fonte: "Gazeta Esportiva",
      tempoAtras: "há 8 horas",
      temDescricao: false,
      categoria: "Brasileirão",
    },
  ];

  const categories = [
    "Internacional",
    "Mercado",
    "Seleções",
    "Agenda",
    "Brasileirão",
  ];

  const verificarTempoFiltro = (tempoAtras, filtro) => {
    if (filtro === "todas") return true;
    if (filtro === "hoje" && tempoAtras.includes("minutos")) return true;
    if (filtro === "hoje" && tempoAtras.includes("horas")) return true;
    if (
      filtro === "ontem" &&
      tempoAtras.includes("horas") &&
      parseInt(tempoAtras) > 12
    )
      return true;
    if (filtro === "semana") return true;
    if (filtro === "mes") return true;
    return false;
  };

  const filteredNoticias = noticias.filter((noticia) => {
    const categoriaMatch =
      activeFilter === "todas" || noticia.categoria === activeFilter;
    const buscaMatch =
      searchTerm === "" ||
      noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (noticia.descricao &&
        noticia.descricao.toLowerCase().includes(searchTerm.toLowerCase()));
    const tempoMatch =
      timeFilter === "todas" ||
      verificarTempoFiltro(noticia.tempoAtras, timeFilter);

    return categoriaMatch && buscaMatch && tempoMatch;
  });

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (search) => {
    setSearchTerm(search);
  };

  const handleTimeFilterChange = (time) => {
    setTimeFilter(time);
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28">
      <HeaderBar triggerElementId="page-title" />
      <div className="px-4 sm:px-6 lg:px-8">
        <Titulos id="page-title" titulo="ÚLTIMAS NOTÍCIAS" />

        <div className="w-full max-w-7xl mx-auto">
          <NewsFilter
            categories={categories}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            onTimeFilterChange={handleTimeFilterChange}
          />
        </div>

        <div className="w-full max-w-7xl mx-auto">
          <div className="p-4 sm:p-6">
            {filteredNoticias.length >= 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {filteredNoticias.slice(0, 2).map((noticia, index) => (
                  <NewsCard
                    key={`large-${index}`}
                    imgNoticia={noticia.img}
                    tituloNoticia={noticia.titulo}
                    descricaoNoticia={noticia.descricao}
                    fonte={noticia.fonte}
                    tempoAtras={noticia.tempoAtras}
                    temDescricao={noticia.temDescricao}
                    isLarge={true}
                  />
                ))}
              </div>
            )}

            {filteredNoticias.length > 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredNoticias.slice(2).map((noticia, index) => (
                  <NewsCard
                    key={`small-${index + 2}`}
                    imgNoticia={noticia.img}
                    tituloNoticia={noticia.titulo}
                    descricaoNoticia={noticia.descricao}
                    fonte={noticia.fonte}
                    tempoAtras={noticia.tempoAtras}
                    temDescricao={noticia.temDescricao}
                    isLarge={false}
                  />
                ))}
              </div>
            )}

            {filteredNoticias.length <= 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNoticias.map((noticia, index) => (
                  <NewsCard
                    key={`normal-${index}`}
                    imgNoticia={noticia.img}
                    tituloNoticia={noticia.titulo}
                    descricaoNoticia={noticia.descricao}
                    fonte={noticia.fonte}
                    tempoAtras={noticia.tempoAtras}
                    temDescricao={noticia.temDescricao}
                    isLarge={false}
                  />
                ))}
              </div>
            )}

            {filteredNoticias.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#B0AFAF] text-lg">
                  Nenhuma notícia encontrada para esta categoria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default PageNoticias;
