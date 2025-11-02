import edit from "../../assets/edit.png";
import Times from "./components/Times";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";
import useButton from "../../store/state";
function CreateChampionShip() {
  const { componentChange } = useButton();
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Button
        onClick={() => {
          componentChange(false);
        }}
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          maxWidth: "15%",
          color: "white",
          fontWeight: "bold",
          fontSize: "1rem",
          textTransform: "none",
        }}
      >
        Voltar
      </Button>
      {/* Cabeçalho */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={4}
      >
        {/* Título */}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent={"space-between"}
          sx={{
            width: "88%",
          }}
        >
          <Typography variant="h3" fontWeight="bold" color="#D9D9D9">
            Campeonato Passa a bola
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Select
              defaultValue="4Times"
              sx={{
                background: "#288F73",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: "12px",
                "& .MuiSvgIcon-root": { color: "white" },
              }}
            >
              <MenuItem value="4Times">4 Times</MenuItem>
              <MenuItem value="8Times">8 Times</MenuItem>
              <MenuItem value="16Times">16 Times</MenuItem>
              <MenuItem value="pontosCorridos">Pontos corridos</MenuItem>
            </Select>
          </Box>
        </Box>
        <Divider
          sx={{
            width: "100%",
            backgroundColor: "#828282",
            height: "1px",
            mt: 2,
          }}
        />
        {/* Select do formato */}
      </Box>
      {/* Divs de Times e Jogadoras Livres acima */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 280, mr: 2 }}>
          {/* Times */}
          <Box
            sx={{
              background: "#157259",
              borderRadius: 2.6,
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "1.5rem",
                mb: 2,
              }}
            >
              Times
            </Typography>
            <Divider
              sx={{
                width: "70%",
                backgroundColor: "white",
                height: "1px",
                mb: 2,
              }}
            />
            {/* ...pode adicionar lista de times aqui... */}
          </Box>
        </Box>
        <Box sx={{ flex: 1, minWidth: 280, ml: 2 }}>
          {/* Jogadoras Livres */}
          <Box
            sx={{
              background: "#157259",
              borderRadius: 2.6,
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "1.5rem",
                mb: 2,
              }}
            >
              Jogadoras Livres
            </Typography>
            <Divider
              sx={{
                width: "70%",
                backgroundColor: "white",
                height: "1px",
                mb: 2,
              }}
            />
            {/* ...pode adicionar lista de jogadoras aqui... */}
          </Box>
        </Box>
      </Box>
      {/* Chaveamento ocupa toda a tela */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* Linha 1: 4 times */}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          gap={2}
          sx={{ width: "100%" }}
        >
          <Times name="Time 1" points="3" />
          <Times name="Time 2" points="6" />
          <Times name="Time 3" points="6" />
          <Times name="Time 4" points="6" />
        </Box>
        {/* Linha 2: 2 times */}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          gap={2}
          sx={{ width: "100%" }}
        >
          <Times name="Time 5" points="9" />
          <Times name="Time 6" points="12" />
        </Box>
        {/* Linha 3: 1 time centralizado */}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          gap={2}
          sx={{ width: "100%" }}
        >
          <Times name="Time Campeão" points="15" />
        </Box>
      </Box>
    </Box>
  );
}
export default CreateChampionShip;
