import { useState } from "react";
import Footer from "../components/Footer";
import HeaderBar from "../components/HeaderBar";
import Jogar from "../components/Jogar";
import MapNominatim from "../components/MapNominatim";

function PageJogar() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col pt-24 sm:pt-28">
      <HeaderBar />
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
