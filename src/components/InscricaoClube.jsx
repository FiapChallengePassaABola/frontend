import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";
import { clubeServiceRealtime } from "../services/clubeServiceRealtime";
import PlasmaBackground from "./PlasmaBackground";
import { Box, IconButton, Typography } from "@mui/material";
import { realtimeDb } from "../config/firebase";
import { ref, get, set, update } from "firebase/database";
import JogadoraComponent from "./RenderJogadoras";
import CloseIcon from "@mui/icons-material/Close";

const InscricaoClube = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const [jogadorasList, setJogadorasList] = useState([]);
  const [membrosList, setMembrosList] = useState([]); // array of member objects
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cidade: "",
    estado: "",
    responsavel: user?.displayName || "",
    email: user?.email || "",
    telefone: "",
    observacoes: "",
    responsavelId: user?.uid || "",
    membros: [], // will hold array of member objects (dictionaries)
  });
  const [errors, setErrors] = useState({});

  const estados = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const snapshot = await get(ref(realtimeDb, "jogadoras"));
        if (snapshot.exists()) {
          // preserve the keys as id so we can reference them later
          const obj = snapshot.val();
          const list = Object.entries(obj).map(([key, val]) => ({
            id: key,
            ...val,
          }));
          setJogadorasList(list);
        } else {
          console.log("Nenhuma jogadora encontrada");
        }
      } catch (err) {
        console.error("Erro ao buscar jogadoras:", err);
      }
    };
    fetchPlayers();
  }, []);

  const handleAddJogadoraAoClube = async (jogadora) => {
    try {
      // build a member object (dictionary) with useful fields
      const newMember = {
        id: jogadora?.id || null,
        userId: jogadora?.userId || null,
        nome: jogadora?.nome || jogadora?.email || "Sem nome",
        email: jogadora?.email || null,
        posicao: jogadora?.posicao || null,
        telefone: jogadora?.telefone || null,
      };

      // avoid duplicates by id, userId or email
      const alreadyAdded = membrosList.some((m) => {
        if (m.id && newMember.id) return m.id === newMember.id;
        if (m.userId && newMember.userId) return m.userId === newMember.userId;
        if (m.email && newMember.email) return m.email === newMember.email;
        return m.nome === newMember.nome; // fallback
      });

      if (alreadyAdded) {
        Swal.fire({
          title: "Aviso",
          text: "Esta jogadora já foi adicionada ao clube.",
          icon: "info",
          confirmButtonText: "OK",
        });
        return;
      }

      // add to local membrosList (objects) and to formData.membros (dictionaries)
      // add to local membrosList (objects) and to formData.membros (dictionaries)
      setMembrosList((prev) => [...prev, newMember]);
      setFormData((prev) => ({
        ...prev,
        membros: [...prev.membros, newMember],
      }));

      // remove jogadora da lista visível
      setJogadorasList((prev) =>
        prev.filter(
          (j) =>
            j.id !== jogadora.id &&
            j.userId !== jogadora.userId &&
            j.email !== jogadora.email
        )
      );
    } catch (error) {
      console.error("Erro ao adicionar jogadora ao clube:", error);
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível adicionar a jogadora.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleRemoveMember = (jogadora) => {
    // remove da lista de membros
    setMembrosList((prev) =>
      prev.filter((m) => m.id !== jogadora.id && m.email !== jogadora.email)
    );
    setFormData((prev) => ({
      ...prev,
      membros: prev.membros.filter(
        (m) => m.id !== jogadora.id && m.email !== jogadora.email
      ),
    }));

    // adiciona novamente à lista de jogadoras disponíveis,
    // garantindo que tenha status "aprovada" e que não gere duplicatas
    setJogadorasList((prev) => {
      const alreadyExists = prev.some(
        (j) =>
          (j.id && jogadora.id && j.id === jogadora.id) ||
          (j.email && jogadora.email && j.email === jogadora.email) ||
          (j.userId && jogadora.userId && j.userId === jogadora.userId)
      );
      if (alreadyExists) return prev;
      return [{ ...jogadora, status: "aprovada" }, ...prev];
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome do clube é obrigatório";
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = "Nome do clube deve ter pelo menos 2 caracteres";
    }

    if (!formData.cidade.trim()) {
      newErrors.cidade = "Cidade é obrigatória";
    }

    if (!formData.estado) {
      newErrors.estado = "Estado é obrigatório";
    }

    if (!formData.responsavel.trim()) {
      newErrors.responsavel = "Nome do responsável é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = "Telefone é obrigatório";
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = "Telefone deve estar no formato (XX) XXXXX-XXXX";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(
        6
      )}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
        7,
        11
      )}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      telefone: formatted,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      console.log("Formulário já está sendo enviado, ignorando...");
      return;
    }

    if (!validateForm()) {
      return;
    }

    console.log("Iniciando envio do formulário de clube...");
    setIsLoading(true);

    try {
      console.log("Verificando se nome já existe...");
      const nomeExiste = await clubeServiceRealtime.verificarNomeExistente(
        formData.nome
      );
      if (nomeExiste) {
        setErrors({ nome: "Já existe um clube com este nome" });
        setIsLoading(false);
        return;
      }

      console.log("Criando clube no Firebase...");
      const resultado = await clubeServiceRealtime.createClube(formData);

      // Salva as jogadoras dentro do clube recém-criado no banco (membros como array de dicionários)
      const clubeRef = ref(realtimeDb, `clubes/${resultado.id}/membros`);
      await set(clubeRef, formData.membros);

      console.log("Membros adicionados ao clube com sucesso!");

      // Atualiza o status das jogadoras para "on-clube"
      try {
        const jogadorasSnap = await get(ref(realtimeDb, "jogadoras"));
        if (jogadorasSnap.exists()) {
          const jogadorasObj = jogadorasSnap.val();
          // build lookup tables
          const lookupById = {};
          const lookupByEmail = {};
          for (const [key, val] of Object.entries(jogadorasObj)) {
            if (val.userId) lookupById[val.userId] = key;
            if (val.email) lookupByEmail[val.email] = key;
          }

          // iterate members and update corresponding jogadora node
          for (const member of formData.membros) {
            let jogadoraKey = null;
            if (member.id && jogadorasObj[member.id]) jogadoraKey = member.id;
            else if (member.userId && lookupById[member.userId])
              jogadoraKey = lookupById[member.userId];
            else if (member.email && lookupByEmail[member.email])
              jogadoraKey = lookupByEmail[member.email];

            if (jogadoraKey) {
              const jogadoraRef = ref(realtimeDb, `jogadoras/${jogadoraKey}`);
              // update status and clubeAtual and updatedAt
              await update(jogadoraRef, {
                status: "on-clube",
                clubeAtual: formData.nome,
                updatedAt: new Date().toISOString(),
              });
            } else {
              console.warn(
                `Não encontrou jogadora para atualizar (nome/email/userId):`,
                member
              );
            }
          }
        } else {
          console.warn("Nenhuma jogadora encontrada para atualizar status.");
        }
      } catch (errUpdate) {
        console.error("Erro ao atualizar status das jogadoras:", errUpdate);
        // não interrompe o fluxo principal de criação do clube
      }

      console.log("Clube criado com sucesso:", resultado);

      Swal.fire({
        title: "Sucesso!",
        text: "Inscrição do clube realizada com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        onSuccess?.(resultado.id);
      });
    } catch (error) {
      console.error("Erro ao inscrever clube:", error);
      Swal.fire({
        title: "Erro!",
        text: `Erro ao realizar inscrição: ${error.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 gap-5">
      <PlasmaBackground />
      {membrosList.length > 0 && (
        <Box
          sx={{
            height: "90%",
            minWidth: "20%",
            background: "transparent",
            border: "1px solid white",
            borderRadius: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "90%",
              width: "100%",
              borderRadius: 4,
              background: "transparent",
              padding: 4,
            }}
          >
            {membrosList.map((membro, index) => (
              <Box
                key={membro.id ?? membro.email ?? membro.nome + index}
                sx={{
                  border: "1px solid white",
                  padding: "1rem 1rem",
                  borderRadius: 4,
                  mt: 1,
                  color: "white",
                  background: "#592b78",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography>{membro.nome}</Typography>
                <IconButton
                  onClick={() => handleRemoveMember(membro)}
                  aria-label="Remover membro"
                >
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
          <div className="relative mb-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-3 bg-[#521E2B] rounded-full flex items-center justify-center shadow-lg">
                <img
                  src={
                    new URL("../assets/logoBranca.png", import.meta.url).href
                  }
                  alt="Logo PassaBola"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-[#521E2B]">
                Inscrição de Clube
              </h2>
            </div>
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
                  Nome do Clube *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.nome ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Ex: Flamengo"
                />
                {errors.nome && (
                  <p className="text-red-500 text-xs mt-1">{errors.nome}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade *
                </label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.cidade ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Ex: Rio de Janeiro"
                />
                {errors.cidade && (
                  <p className="text-red-500 text-xs mt-1">{errors.cidade}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado *
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.estado ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Selecione o estado</option>
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
                {errors.estado && (
                  <p className="text-red-500 text-xs mt-1">{errors.estado}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Responsável *
                </label>
                <input
                  type="text"
                  name="responsavel"
                  value={formData.responsavel}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.responsavel ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Ex: João Silva"
                />
                {errors.responsavel && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.responsavel}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Ex: joao@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
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
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B] ${
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                name="observacoes"
                value={formData.observacoes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#521E2B]"
                placeholder="Informações adicionais sobre o clube..."
              />
            </div>
            <Box
              sx={{
                overflowY: "scroll",
                maxHeight: "26vh",
              }}
            >
              {jogadorasList.map((jogadora) =>
                jogadora.status === "aprovada" ? (
                  <JogadoraComponent
                    key={jogadora.id}
                    jogadora={jogadora}
                    onClickParam={handleAddJogadoraAoClube}
                  />
                ) : null
              )}
            </Box>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-[#521E2B] text-white rounded-md hover:bg-[#3a1520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Enviando..." : "Inscrever Clube"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InscricaoClube;
