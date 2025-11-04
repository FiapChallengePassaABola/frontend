import { Box, Container } from "@mui/material";
import SearchBar from "./components/SearchBar";
import TeamsComponent from "./components/TeamsComponent";
function TeamsRoute() {
  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        maxHeight: "90vh",
      }}
    >
      <SearchBar></SearchBar>
      <TeamsComponent></TeamsComponent>
    </Container>
  );
}

export default TeamsRoute;
