import { useState } from "react";
import { PiCourtBasketballBold } from "react-icons/pi";
import { TbPlayFootball } from "react-icons/tb";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";
import { userServiceRealtime } from "../services/userServiceRealtime";
import InscricaoClube from "./InscricaoClube";
import InscricaoJogadora from "./InscricaoJogadora";
import Titulos from "./Titulos";
import MapNominatim from "../components/MapNominatim";

function Jogar() {
  const { isAuthenticated, user } = useAuth();
  const [showInscricaoClube, setShowInscricaoClube] = useState(false);
  const [showInscricaoJogadora, setShowInscricaoJogadora] = useState(false);

  const handleInscricaoClube = () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "Login Necessário",
        text: "Você precisa estar logado para inscrever um clube.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    setShowInscricaoClube(true);
  };

  const handleInscricaoJogadora = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "Login Necessário",
        text: "Você precisa estar logado para se inscrever como jogadora.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    try {
      const hasProfile = user?.uid
        ? await userServiceRealtime.hasUserJogadora(user.uid)
        : false;
      if (hasProfile) {
        window.location.href = "/jogos";
        return;
      }
    } catch (e) {}
    setShowInscricaoJogadora(true);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-15 mb-15">
      <Titulos titulo="JOGAR" />

      <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 lg:gap-20 w-full max-w-4xl">
        <div
          onClick={handleInscricaoClube}
          className="flex flex-col justify-center items-center bg-[#a065a46c] w-full sm:w-80 lg:w-96 xl:w-[30rem] h-48 sm:h-64 lg:h-80 xl:h-[20rem] rounded-xl sm:rounded-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          <h1 className="text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold mb-4 sm:mb-6 lg:mb-10 text-center px-4">
            Inscrição de clube
          </h1>
          <PiCourtBasketballBold
            size={80}
            color="white"
            className="sm:w-24 sm:h-24 lg:w-32 lg:h-32 xl:w-[150px] xl:h-[150px]"
          />
        </div>
        <div
          onClick={handleInscricaoJogadora}
          className="flex flex-col justify-center items-center bg-[#a065a46c] w-full sm:w-80 lg:w-96 xl:w-[30rem] h-48 sm:h-64 lg:h-80 xl:h-[20rem] rounded-xl sm:rounded-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          <h1 className="text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold mb-4 sm:mb-6 lg:mb-10 text-center px-4">
            Inscrição de Jogadora
          </h1>
          <TbPlayFootball
            size={80}
            color="white"
            className="sm:w-24 sm:h-24 lg:w-32 lg:h-32 xl:w-[150px] xl:h-[150px]"
          />
        </div>
      </div>

      {showInscricaoClube && (
        <InscricaoClube
          onClose={() => setShowInscricaoClube(false)}
          onSuccess={() => {
            setShowInscricaoClube(false);
          }}
        />
      )}

      {showInscricaoJogadora && (
        <InscricaoJogadora
          onClose={() => setShowInscricaoJogadora(false)}
          onSuccess={() => {
            setShowInscricaoJogadora(false);
          }}
        />
      )}
    </div>
  );
}
export default Jogar;
