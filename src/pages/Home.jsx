import Campeonato from "../components/Campeonato";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Noticias from "../components/Noticias";
import Jogar from "../components/Jogar";

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Campeonato />
      <Jogar />
      <Noticias />
      <Footer />
    </div>
  );
}
export default Home;
