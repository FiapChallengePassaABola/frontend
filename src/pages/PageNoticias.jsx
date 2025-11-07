import { useState } from "react";
import VideoYT from "../assets/VideoYT.jpg";
import Foto1 from "../assets/Foto1.jpg";
import Foto2 from "../assets/Foto2.jpg";
import Foto3 from "../assets/Foto3.jpg";
import Foto4 from "../assets/Foto4.jpg";
import Foto5 from "../assets/Foto5.jpg";
import Footer from "../components/Footer";
import HeaderBar from "../components/HeaderBar";
import NewsCard from "../components/NewsCard";
import NewsFilter from "../components/NewsFilter";
import Titulos from "../components/Titulos";
import { useNoticiasStore } from "./pageAdmin/routes/newsmanagerRoute/store/store";

function PageNoticias() {
  const [activeFilter, setActiveFilter] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("todas");

  const noticias = useNoticiasStore((s) => s.noticias); // componente re-renderiza automaticamente

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
