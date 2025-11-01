import { Box } from "@mui/material";
import InputCustom from "./CustomTextField";
import Botao from "./Botao";
import useButton from "../../../store/state";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const { componentChange } = useButton();
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value.toLowerCase());
  };

  return (
    <>
      <Botao
        children="Voltar"
        className="p-1"
        onClick={() => componentChange(false)}
      />

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
        <InputCustom
          text="Buscar"
          className="w-full"
          value={search}
          onChange={handleChange}
        />
      </Box>
    </>
  );
}

export default SearchBar;
