import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { clubeServiceRealtime } from "../services/clubeServiceRealtime";
import PlasmaBackground from "./PlasmaBackground";
import { Box, IconButton, Typography } from "@mui/material";
import { realtimeDb } from "../config/firebase";
import { ref, get, set, update } from "firebase/database";
import CloseIcon from "@mui/icons-material/Close";

export default function InscricaoClube({ onClose, onSuccess }) {
  const [membrosList, setMembrosList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nomesExistentes, setNomesExistentes] = useState([]); // ✅ lista dos nomes já existentes
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    membros: [],
    responsavelId: null,
  });
  const [errors, setErrors] = useState({});

  // ✅ Faz snap dos clubes atuais e guarda nomes
  useEffect(() => {
    const fetchClubes = async () => {
      try {
        const snapshot = await get(ref(realtimeDb, "clubes"));
        if (snapshot.exists()) {
          const clubes = snapshot.val();
          const nomes = Object.values(clubes).map((c) =>
            c.nome?.toLowerCase().trim()
          );
          setNomesExistentes(nomes);
        }
      } catch (err) {
        console.error("Erro ao buscar clubes existentes:", err);
      }
    };
    fetchClubes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(
        6
      )}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
      7,
      11
    )}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, telefone: formatted }));
  };

  const validateForm = () => {
    const required = ["nome", "telefone"];
    for (const field of required) {
      if (!formData[field]) {
        setErrors((prev) => ({ ...prev, [field]: "Campo obrigatório" }));
        return false;
      }
    }
    return true;
  };

  // --- 🚀 Envio do formulário ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // ✅ Verifica se já existe um clube com o mesmo nome direto do snapshot
      const nomeLower = formData.nome.toLowerCase().trim();
      if (nomesExistentes.includes(nomeLower)) {
        setErrors({ nome: "Já existe um jogador com este nome" });
        setIsLoading(false);
        return;
      }

      // cria o clube
      const resultado = await clubeServiceRealtime.createClube(formData);
      if (!resultado?.id) throw new Error("ID do clube não retornado.");

      // salva membros
      const clubeRef = ref(realtimeDb, `clubes/${resultado.id}/membros`);
      await set(clubeRef, formData.membros ?? []);

      // atualiza jogadoras
      try {
        const jogadorasSnap = await get(ref(realtimeDb, "jogadoras"));
        if (jogadorasSnap.exists()) {
          const jogadorasObj = jogadorasSnap.val();
          const lookupByEmail = Object.fromEntries(
            Object.entries(jogadorasObj).map(([k, v]) => [v.email, k])
          );

          for (const member of formData.membros ?? []) {
            const key = lookupByEmail[member.email];
            if (key) {
              await update(ref(realtimeDb, `jogadoras/${key}`), {
                status: "on-clube",
                clubeAtual: formData.nome,
                updatedAt: new Date().toISOString(),
              });
            }
          }
        }
      } catch (err) {
        console.error("Erro ao atualizar jogadoras:", err);
      }

      Swal.fire("Sucesso!", "Clube inscrito com sucesso!", "success").then(
        () => {
          onSuccess?.(resultado.id);
          onClose();
        }
      );
    } catch (error) {
      console.error("Erro ao inscrever clube:", error);
      Swal.fire("Erro!", error.message || "Falha ao inscrever clube.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // --- JSX ---
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 gap-5">
      <PlasmaBackground />

      {membrosList.length > 0 && (
        <Box
          sx={{
            height: "90%",
            minWidth: "20%",
            border: "1px solid white",
            borderRadius: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "transparent",
          }}
        >
          <Box sx={{ height: "90%", width: "100%", padding: 4 }}>
            {membrosList.map((membro, index) => (
              <Box
                key={membro.id ?? membro.email ?? index}
                sx={{
                  border: "1px solid white",
                  padding: "1rem",
                  borderRadius: 4,
                  mt: 1,
                  color: "white",
                  background: "#592b78",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>{membro.nome}</Typography>
                <IconButton onClick={() => handleRemoveMember?.(membro)}>
                  <CloseIcon
                    sx={{
                      color: "white",
                      borderRadius: 4,
                      border: "1px solid white",
                      fontSize: "2rem",
                      padding: 0.4,
                    }}
                  />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <div className="bg-white rounded-lg w-[60%] max-h-[90vh] overflow-y-auto relative z-10">
        <div className="p-6">
          <div className="relative mb-6 flex flex-col items-center">
            <div className="w-16 h-16 mb-3 bg-[#521E2B] rounded-full flex items-center justify-center shadow-lg">
              <img
                src={new URL("../assets/logoBranca.png", import.meta.url).href}
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-[#521E2B]">
              Inscrição de Jogadoras
            </h2>
            <button
              onClick={onClose}
              className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da jogadora *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#521E2B] ${
                    errors.nome ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="nome"
                />
                {errors.nome && (
                  <p className="text-red-500 text-xs mt-1">{errors.nome}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone *
                </label>
                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handlePhoneChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#521E2B] ${
                    errors.telefone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="(XX) XXXXX-XXXX"
                  maxLength={15}
                />
                {errors.telefone && (
                  <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-[#521E2B] text-white rounded-md hover:bg-[#3a1520] transition-colors disabled:opacity-50"
              >
                {isLoading ? "Enviando..." : "Inscrever Clube"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
