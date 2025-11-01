import { Box, Container, Typography } from "@mui/material";
import Players from "./components/Players";
import SearchBar from "./components/SearchBar";

function SignInRoute() {
  return (
    <>
      <Container
        sx={{
          width: "100%",
          height: "90%",
          display: "flex",
          flexDirection: "row",
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flex: 1.5,
          }}
        >
          <SearchBar></SearchBar>
          <Players></Players>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flex: 1,
            borderRadius: 5,
            backgroundColor: "#157259",
          }}
        ></Box>
      </Container>
    </>
  );
}

export default SignInRoute;
