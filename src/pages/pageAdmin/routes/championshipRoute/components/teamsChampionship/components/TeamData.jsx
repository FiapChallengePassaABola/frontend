import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Reject, Approved } from "../store";

function TeamData({
  name,
  email,
  responsable,
  phone,
  status,
  clubeId,
  setRefresh,
}) {
  // Mapeamento de cor e label para status
  const statusMap = {
    aprovada: { color: "#3af011", label: "Aprovada" },
    rejeitada: { color: "#af3636", label: "Rejeitada" },
    pendente: { color: "#f5a623", label: "Pendente" },
    "pré-selecionada": { color: "#f5a623", label: "Pré-selecionada" },
  };
  const statusInfo = statusMap[status?.toLowerCase()] || statusMap["pendente"];
  const handleApprove = async (id) => {
    await Approved(id);
    setRefresh((r) => r + 1);
  };
  const handleReject = async (id) => {
    await Reject(id);
    setRefresh((r) => r + 1);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        background: "#157259",
        p: 1.5,
        mb: 1,
        width: "100%",
        minHeight: 56,
        color: "white",
        gap: 2,
        borderBottom: "0.06rem solid #B388FF",
      }}
    >
      {/* Avatar */}
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#d9d9d9",
          mr: 2,
          border: "2px solid #fff2",
        }}
      />
      {/* Nome e posição */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" sx={{ color: "white", lineHeight: 1 }}>
          <span style={{ fontWeight: 700 }}>Time:</span> {name}
        </Typography>
        <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
          <Typography
            component="span"
            variant="body2"
            sx={{ color: "white", fontWeight: 400, ml: 0.5 }}
          >
            <span style={{ fontWeight: 700 }}>Email:</span> {email}
          </Typography>
          <Typography variant="body2" sx={{ color: "white", fontWeight: 500 }}>
            <span style={{ fontWeight: 700 }}>Responsavel:</span>{" "}
            <span style={{ fontWeight: 400 }}>{responsable}</span>
          </Typography>
          <Typography variant="body2" sx={{ color: "white", fontWeight: 500 }}>
            <span style={{ fontWeight: 700 }}>Telefone:</span>{" "}
            <span style={{ fontWeight: 400 }}>{phone}</span>
          </Typography>
        </Box>
        {(!status || status.toLowerCase() === "pendente") && (
          <Box mt={1}>
            <IconButton
              sx={{
                textTransform: "none",
                color: "white",
                fontSize: "1vmax",
                border: "none",
                borderRadius: 0,
              }}
              onClick={() => handleReject(clubeId)}
            >
              Rejeitar
              <CloseIcon sx={{ color: "#af3636" }} />
            </IconButton>
            <IconButton
              color="white"
              sx={{
                textTransform: "none",
                color: "white",
                fontSize: "1vmax",
                border: "none",
                borderRadius: 0,
              }}
              onClick={() => handleApprove(clubeId)}
            >
              Aprovar
              <DoneIcon sx={{ color: "#3af011" }} />
            </IconButton>
          </Box>
        )}
      </Box>
      {/* Status */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 2 }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: statusInfo.color,
            mr: 1,
          }}
        />
        <Typography variant="body2" sx={{ color: "white", fontSize: 13 }}>
          {statusInfo.label}
        </Typography>
      </Box>
    </Box>
  );
}

export default TeamData;
