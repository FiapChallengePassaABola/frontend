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
function EditChampionShipRoute() {
  const { componentChange } = useButton();
  return (
    <Box display="flex" flexDirection="column">
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
        mb={2}
      >
        {/* Título */}
        <Box display="flex" flexDirection="row" gap={8}>
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

      {/* 4 Times */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "150px" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          sx={{ width: "80%" }}
        >
          <Box>
            <Box display="flex" flexDirection="column" mb={4}>
              <Times name="nome foda" points="3" />
              <Times name="nome foda2" points="6" />
            </Box>
            <Box display="flex" flexDirection="column">
              <Times name="nome foda3" points="6" />
              <Times name="nome foda4" points="6" />
            </Box>
          </Box>

          <Box display="flex" flexDirection="column">
            <Times name="nome foda3" points="6" />
            <Times name="nome foda4" points="6" />
          </Box>

          <Times name="nome foda4" points="6" />
        </Box>
      </Box>
    </Box>
  );
}

export default EditChampionShipRoute;
