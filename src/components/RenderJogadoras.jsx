import { Box, Typography, IconButton, Icon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
function JogadoraComponent({ jogadora, onClickParam }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 3,
        background: "#1e7259",
        color: "white",
        border: "1px solid white",
        borderRadius: ".5rem",
        padding: "1rem",
        justifyContent: "space-between",
      }}
    >
      <Box flex={1}>
        <Typography>Nome: {jogadora.nome}</Typography>
        <Typography>Email: {jogadora.email}</Typography>
      </Box>
      <Box
        flex={0.5}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography>Status: {jogadora.status}</Typography>
        <IconButton onClick={() => onClickParam(jogadora)}>
          <AddIcon
            sx={{
              color: "white",
              border: "1px solid white",
              borderRadius: 4,
              fontSize: "2rem",
            }}
          ></AddIcon>
        </IconButton>
      </Box>
    </Box>
  );
}

export default JogadoraComponent;
