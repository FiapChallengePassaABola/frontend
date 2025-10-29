import { useState } from "react";
import Footer from "../components/Footer";
import Jogar from "../components/Jogar";
import MapNominatim from "../components/MapNominatim";
import Navbar from "../components/NavbarProfessional";

function PageJogar() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Jogar onFormStateChange={setIsFormOpen} />
        {!isFormOpen && (
          <div className="max-w-5xl mx-auto p-4">
            <MapNominatim />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
export default PageJogar;
