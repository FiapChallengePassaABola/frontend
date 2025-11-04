import { Box, Container, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ref, get, set } from "firebase/database";
import { realtimeDb } from "../../../../../../../config/firebase";
import { useEffect, useState } from "react";
import TeamData from "./TeamData";

function TeamsComponent() {
  const [refresh, setRefresh] = useState(0);
  const [clubesList, setClubesList] = useState([]);
  const [page, setPage] = useState("pendente");

  const handleChange = (evento, novaPagina) => {
    setPage(novaPagina);
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const snapshot = await get(ref(realtimeDb, "clubes"));
        if (snapshot.exists()) {
          const clubesList = Object.entries(snapshot.val()).map(
            ([key, value]) => ({ ...value, id: key })
          );
          setClubesList(clubesList);
        } else {
          setClubesList([]);
        }
      } catch (error) {
        console.error("Erro ao buscar times:", error);
      }
    };
    fetchTeams();
  }, [refresh]);

  // Filtragem por status para cada tab
  const pendentes = clubesList.filter(
    (c) => !c.status || c.status === "pendente"
  );
  const aprovadas = clubesList.filter((c) => c.status === "aprovada");
  const rejeitadas = clubesList.filter((c) => c.status === "rejeitada");

  return (
    <Container
      sx={{
        width: "100%",
        background: "#157259",
        minHeight: "25vw",
        borderRadius: 5,
        overflowY: "scroll",
        p: 2,
      }}
    >
      <TabContext value={page}>
        <TabList
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
          sx={{ mb: 2, "& .MuiTabs-indicator": { backgroundColor: "#B388FF" } }}
        >
          <Tab label="Pendentes" value="pendente" sx={{ color: "yellow" }} />
          <Tab
            label="Aprovadas"
            value="aprovada"
            sx={{ color: "lightgreen" }}
          />
          <Tab label="Rejeitadas" value="rejeitada" sx={{ color: "red" }} />
        </TabList>
        <TabPanel value="pendente" sx={{ p: 0 }}>
          {pendentes.map((clube) => (
            <TeamData
              key={clube.id}
              name={clube.nome}
              email={clube.email}
              responsable={clube.responsavel}
              phone={clube.telefone}
              status={clube.status}
              clubeId={clube.id}
              setRefresh={setRefresh}
            />
          ))}
        </TabPanel>
        <TabPanel value="aprovada" sx={{ p: 0 }}>
          {aprovadas.map((clube) => (
            <TeamData
              key={clube.id}
              name={clube.nome}
              email={clube.email}
              responsable={clube.responsavel}
              phone={clube.telefone}
              status={clube.status}
              clubeId={clube.id}
              setRefresh={setRefresh}
            />
          ))}
        </TabPanel>
        <TabPanel value="rejeitada" sx={{ p: 0 }}>
          {rejeitadas.map((clube) => (
            <TeamData
              key={clube.id}
              name={clube.nome}
              email={clube.email}
              responsable={clube.responsavel}
              phone={clube.telefone}
              status={clube.status}
              clubeId={clube.id}
              setRefresh={setRefresh}
            />
          ))}
        </TabPanel>
      </TabContext>
    </Container>
  );
}

export default TeamsComponent;
