// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { jogadoraServiceRealtime } from "../services/jogadoraServiceRealtime";

// function ConviteJogadoras({
//   clubeId,
//   jogadorasConvidadas,
//   onJogadorasAtualizadas,
// }) {
//   const [jogadorasDisponiveis, setJogadorasDisponiveis] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isConvidando, setIsConvidando] = useState(false);
//   const [busca, setBusca] = useState("");

//   useEffect(() => {
//     carregarJogadorasDisponiveis();
//   }, []);

//   const carregarJogadorasDisponiveis = async () => {
//     try {
//       setIsLoading(true);
//       const todasJogadoras = await jogadoraServiceRealtime.getAllJogadoras();

//       const jogadorasFiltradas = todasJogadoras.filter(
//         (jogadora) =>
//           !jogadorasConvidadas.some(
//             (convidadas) => convidadas.id === jogadora.id
//           )
//       );

//       setJogadorasDisponiveis(jogadorasFiltradas);
//     } catch (error) {
//       console.error("Erro ao carregar jogadoras:", error);
//       Swal.fire({
//         title: "Erro!",
//         text: "Erro ao carregar jogadoras disponíveis",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleConvidarJogadora = async (jogadora) => {
//     try {
//       setIsConvidando(true);

//       await jogadoraServiceRealtime.convidarJogadoraParaClube(
//         jogadora.id,
//         clubeId
//       );

//       const novaLista = [...jogadorasConvidadas, jogadora];
//       onJogadorasAtualizadas(novaLista);

//       setJogadorasDisponiveis((prev) =>
//         prev.filter((j) => j.id !== jogadora.id)
//       );

//       Swal.fire({
//         title: "Convite Enviado!",
//         text: `Convite enviado para ${jogadora.nome}`,
//         icon: "success",
//         confirmButtonText: "OK",
//       });
//     } catch (error) {
//       console.error("Erro ao convidar jogadora:", error);
//       Swal.fire({
//         title: "Erro!",
//         text: "Erro ao enviar convite para a jogadora",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     } finally {
//       setIsConvidando(false);
//     }
//   };

//   const jogadorasFiltradas = jogadorasDisponiveis.filter(
//     (jogadora) =>
//       jogadora.nome.toLowerCase().includes(busca.toLowerCase()) ||
//       jogadora.posicao.toLowerCase().includes(busca.toLowerCase())
//   );

//   const jogadorasRestantes = Math.max(0, 5 - jogadorasConvidadas.length);

//   return (
//     <div className="space-y-6">
//       <div className="bg-gray-50 rounded-lg p-4">
//         <h3 className="text-lg font-semibold text-[#521E2B] mb-2">
//           Status do Time
//         </h3>
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm text-gray-600">
//               Jogadoras convidadas:{" "}
//               <span className="font-semibold">
//                 {jogadorasConvidadas.length}/5
//               </span>
//             </p>
//             <p className="text-sm text-gray-600">
//               Restam:{" "}
//               <span className="font-semibold">{jogadorasRestantes}</span>{" "}
//               jogadoras
//             </p>
//           </div>
//           <div className="text-right">
//             <div className="text-2xl font-bold text-[#521E2B]">
//               {jogadorasConvidadas.length}/5
//             </div>
//             <div className="text-xs text-gray-500">Time completo</div>
//           </div>
//         </div>

//         <div className="mt-3">
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-[#521E2B] h-2 rounded-full transition-all duration-300"
//               style={{ width: `${(jogadorasConvidadas.length / 5) * 100}%` }}
//             ></div>
//           </div>
//         </div>
//       </div>

//       {jogadorasConvidadas.length > 0 && (
//         <div>
//           <h3 className="text-lg font-semibold text-[#521E2B] mb-3">
//             Jogadoras Convidadas
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             {jogadorasConvidadas.map((jogadora) => (
//               <div
//                 key={jogadora.id}
//                 className="bg-green-50 border border-green-200 rounded-lg p-3"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="font-semibold text-green-800">
//                       {jogadora.nome}
//                     </p>
//                     <p className="text-sm text-green-600">{jogadora.posicao}</p>
//                   </div>
//                   <div className="text-green-600">
//                     <svg
//                       className="w-5 h-5"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div>
//         <h3 className="text-lg font-semibold text-[#521E2B] mb-3">
//           Convidar Jogadoras
//         </h3>
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Buscar por nome ou posição..."
//             value={busca}
//             onChange={(e) => setBusca(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#521E2B]"
//           />
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center py-8">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#521E2B]"></div>
//           </div>
//         ) : jogadorasFiltradas.length === 0 ? (
//           <div className="text-center py-8 text-gray-500">
//             {busca
//               ? "Nenhuma jogadora encontrada com esse filtro"
//               : "Nenhuma jogadora disponível"}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
//             {jogadorasFiltradas.map((jogadora) => (
//               <div
//                 key={jogadora.id}
//                 className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-800">
//                       {jogadora.nome}
//                     </p>
//                     <p className="text-sm text-gray-600">{jogadora.posicao}</p>
//                     <p className="text-xs text-gray-500">
//                       {jogadora.cidade}, {jogadora.estado}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => handleConvidarJogadora(jogadora)}
//                     disabled={isConvidando || jogadorasConvidadas.length >= 5}
//                     className="ml-3 px-4 py-2 bg-[#521E2B] text-white rounded-lg hover:bg-[#3a1520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//                   >
//                     {isConvidando ? "Enviando..." : "Convidar"}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//         <div className="flex items-start space-x-3">
//           <div className="text-blue-600 mt-0.5">
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </div>
//           <div>
//             <h4 className="font-semibold text-blue-800">Informações</h4>
//             <p className="text-sm text-blue-700 mt-1">
//               Convide jogadoras para formar seu time. Você precisa de pelo menos
//               5 jogadoras para poder desafiar outros times.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ConviteJogadoras;
