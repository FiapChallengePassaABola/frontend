import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";
import CustomButton from "./components/CustomButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import quadraIconPng from "./assets/quadraIcon.png";
import playerIconPng from "./assets/playerIcon.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useButton from "./store/state";
import { useEffect } from "react";
import { color } from "motion";
import SignInRoute from "./components/signInChampionship/signInRoute";

function ChampionshipRoute() {
  const { componentState, componentChange } = useButton();

  return (
    <>
      {componentState ? (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <SignInRoute></SignInRoute>
        </Container>
      ) : (
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
                onClickParams={() => componentChange(!componentState)}
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
              ></CustomButton>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}

export default ChampionshipRoute;
