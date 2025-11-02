import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";
import CustomButton from "./components/CustomButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import quadraIconPng from "./assets/quadraIcon.png";
import playerIconPng from "./assets/playerIcon.png";
import useButton from "./store/state";
import SignInRoute from "./components/signInChampionship/signInRoute";
import EditChampionShipRoute from "./components/editChampionShip/EditChampionShipRoute";
import TeamsRoute from "./components/teamsChampionship/TeamsRoute";
import TesteRoute from "./components/teste/TesteRoute";

function ChampionshipRoute() {
  const { componentState, componentChange } = useButton();

  if (componentState == "players") {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <SignInRoute></SignInRoute>
      </Container>
    );
  } else if (componentState == "teams") {
    return <TeamsRoute></TeamsRoute>;
  } else if (componentState == "createCS") {
    return <div></div>;
  } else if (componentState == "editCS") {
    return <EditChampionShipRoute></EditChampionShipRoute>;
  } else if (componentState == "teste") {
    return <TesteRoute/>;
  }
  return (
    <Container
      sx={{
        display: "flex",
        width: "80%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            padding: 0,
            margin: 0,
          }}
        >
          <Box
            sx={{
              width: "35%",
              height: "0.2px",
              backgroundColor: "gray",
            }}
          ></Box>
          <Typography
            sx={{
              fontSize: "2vmax",
              fontWeight: "700",
              color: "white",
            }}
          >
            Ver Inscrições
          </Typography>
          <Box
            sx={{
              width: "35%",
              height: "0.2px",
              backgroundColor: "gray",
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            padding: 2,
            backgroundColor: "#157259",
            borderRadius: 2.6,
          }}
        >
          <CustomButton
            icon={
              <img
                src={playerIconPng}
                style={{
                  width: "5vw",
                  height: "5vw",
                  maxWidth: "88px",
                  maxHeight: "88px",
                  minWidth: "32px",
                  minHeight: "32px",
                  objectFit: "contain",
                }}
              />
            }
            onClickParams={() => componentChange("players")}
            text="Jogadores"
          />
          <CustomButton
            icon={
              <img
                src={quadraIconPng}
                alt="Jogador"
                style={{
                  width: "5vw",
                  height: "5vw",
                  maxWidth: "88px",
                  maxHeight: "88px",
                  minWidth: "32px",
                  minHeight: "32px",
                  objectFit: "contain",
                }}
              />
            }
            text="Times"
            onClickParams={() => componentChange("teams")}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          gap: 5,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            padding: 0,
            margin: 0,
          }}
        >
          <Box
            sx={{
              width: "35%",
              height: "0.2px",
              backgroundColor: "gray",
            }}
          ></Box>
          <Typography
            sx={{
              fontSize: "2vmax",
              fontWeight: "700",
              color: "white",
            }}
          >
            Campeonatos
          </Typography>
          <Box
            sx={{
              width: "35%",
              height: "0.2px",
              backgroundColor: "gray",
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <CustomButton
            sxBox={{
              backgroundColor: "#157259",
              borderRadius: 2.6,
              width: "18%",
            }}
            sxIconButton={{
              border: "0px",
              width: "100%",
              height: "100%",
              fontSize: "1.2vmax",
              textTransform: "none",
              color: "white",
              gap: 2,
              padding: 1,
            }}
            icon={
              <AddCircleOutlineIcon
                sx={{
                  color: "white",
                  fontSize: "3.8vmax",
                }}
              />
            }
            buttonText={"Criar Novo Campeonato"}
            onClickParams={() => componentChange("createCS")}
          ></CustomButton>
          <CustomButton
            sxBox={{
              backgroundColor: "#157259",
              borderRadius: 2.6,
              width: "18%",
            }}
            sxIconButton={{
              border: "0px",
              width: "100%",
              height: "100%",
              fontSize: "1.2vmax",
              textTransform: "none",
              color: "white",
              gap: 1,
              padding: 1,
            }}
            icon={
              <EditSquareIcon
                sx={{
                  color: "white",
                  fontSize: "3.8vmax",
                }}
              />
            }
            buttonText={"Editar Campeonatos"}
            onClickParams={() => componentChange("editCS")}
          ></CustomButton>

          {/* -------------- */}
          <CustomButton
            sxBox={{
              backgroundColor: "#157259",
              borderRadius: 2.6,
              width: "18%",
            }}
            sxIconButton={{
              border: "0px",
              width: "100%",
              height: "100%",
              fontSize: "1.2vmax",
              textTransform: "none",
              color: "white",
              gap: 1,
              padding: 1,
            }}
            icon={
              <EditSquareIcon
                sx={{
                  color: "white",
                  fontSize: "3.8vmax",
                }}
              />
            }
            buttonText={"Teste"}
            onClickParams={() => componentChange("teste")}
          ></CustomButton>
        </Box>
      </Box>
    </Container>
  );
}

export default ChampionshipRoute;
