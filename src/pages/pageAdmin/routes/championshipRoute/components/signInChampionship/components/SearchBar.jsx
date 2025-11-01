import { Box } from "@mui/material";
import InputCustom from "./CustomTextField";
import Botao from "./Botao";
import useButton from "../../../store/state";

function SearchBar() {
  const { componentChange } = useButton();
  return (
    <>
      <Botao
        children="Voltar"
        className="p-1"
        onClick={() => componentChange(false)}
      ></Botao>

      <Box
        sx={{
          backgroundColor: "#157259",
          display: "flex",
          flexDirection: "row",
          gap: 1,
          padding: 2,
          borderRadius: 5,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <InputCustom text="Buscar" className="w-full"></InputCustom>
      </Box>
    </>
  );
}

export default SearchBar;
