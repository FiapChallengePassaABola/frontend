import Footer from "../components/Footer";
import Jogar from "../components/Jogar";
import Navbar from "../components/NavbarProfessional";
import MapNominatim from "../components/MapNominatim";

function PageJogar() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Jogar />
        <div className="max-w-5xl mx-auto p-4">
          <MapNominatim />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default PageJogar;
