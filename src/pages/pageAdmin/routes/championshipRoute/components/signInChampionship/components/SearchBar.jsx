import { Box } from "@mui/material";
import InputCustom from "./CustomTextField";
import Botao from "./Botao";
function SearchBar() {
  return (
    <Box
      sx={{
        backgroundColor: "#157259",
        display: "flex",
        flexDirection: "row",
        gap: 2,
        padding: 2,
        borderRadius: 5,
        width: "100%",
        justifyContent: "center",
      }}
    >
      <InputCustom text="Buscar" className="w-full"></InputCustom>
      <Botao children="Filtrar"></Botao>
    </Box>
  );
}

export default SearchBar;
