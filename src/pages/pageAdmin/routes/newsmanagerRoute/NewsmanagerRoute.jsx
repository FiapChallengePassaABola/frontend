// src/pages/pageAdmin/routes/newsmanagerRoute/NewsManagerRoute.jsx
import React, { useState } from "react";
import {
  Container,
  Box,
  Paper,
  styled,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
} from "@mui/material";
import src1 from "./assets/Foto1.jpg";
import src2 from "./assets/Foto2.jpg";
import { useNoticiasStore } from "./store/store";
import CustomButton from "./components/CustomButton";
import NoticiasComponent from "./components/Noticias";
import InstagramIcon from "@mui/icons-material/Instagram";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FormularioNoticias from "./components/AddNoticia";
import Botao from "./components/Botao";
import CloseIcon from "@mui/icons-material/Close";

function NewsManagerRoute() {
  const Card = styled(Paper)({
    backgroundColor: "#157259",
    color: "#fff",
    borderRadius: 12,
    padding: 16,
    boxShadow: "none",
  });

  const noticias = useNoticiasStore((state) => state.noticias);
  const updateNoticia = useNoticiasStore((state) => state.updateNoticia);

  const lastnews = noticias[0];
  const randomNews = noticias[Math.floor(Math.random() * noticias.length)];

  const [editingIndex, setEditingIndex] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setOpenEditDialog(true);
  };

  const handleCloseEdit = () => {
    setEditingIndex(null);
    setOpenEditDialog(false);
  };

  const handleSave = (index, updated) => {
    // updated already contains the fields we want (titulo, descricao, img, etc.)
    updateNoticia(index, updated);
    handleCloseEdit();
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 2, sm: 3 },
          p: { xs: 1, sm: 2 },
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 2, sm: 3 },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "1.5vmax",
                color: "white",
              }}
            >
              Ultimas Noticias
            </Typography>
            {lastnews ? (
              <NoticiasComponent
                text={lastnews.titulo}
                description={lastnews.descricao}
                imageSrc={lastnews.img}
                valueParam={lastnews.views}
                maxParam={80}
                OnClickParams={() => handleEdit(0)}
                nome={"Editar"}
              />
            ) : null}
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "1.5vmax",
                color: "white",
              }}
            >
              Gerir Noticias
            </Typography>
            <NoticiasComponent
              text={randomNews.titulo}
              description={randomNews.descricao}
              imageSrc={randomNews.img}
              valueParam={randomNews.views}
              maxParam={110}
              nome={"Ver Todas"}
              OnClickParams={() => {}}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box
            sx={{
              width: "40%",
              height: "0.2px",
              backgroundColor: "gray",
            }}
          ></Box>
          <Typography
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem" },
              fontWeight: "700",
              color: "white",
              marginBottom: { xs: 1, sm: 2 },
              textAlign: "center",
            }}
          >
            Novo Post
          </Typography>
          <Box
            sx={{
              width: "40%",
              height: "0.2px",
              backgroundColor: "gray",
            }}
          ></Box>
        </Box>

        <Box
          sx={{
            width: { xs: "95%", sm: "90%", md: "80%" },
            borderRadius: 2,
            backgroundColor: "#19745c",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            padding: { xs: 1.5, sm: 2 },
            gap: { xs: 2, sm: 3 },
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <CustomButton
            icon={
              <InstagramIcon
                sx={{
                  color: "white",
                  fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
                }}
              />
            }
            text={"Post do Instagram"}
          ></CustomButton>
          <CustomButton
            icon={
              <AddCircleOutlineIcon
                sx={{
                  color: "white",
                  fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
                }}
              />
            }
            text={"Nova Noticia"}
          ></CustomButton>
          <CustomButton
            icon={
              <YouTubeIcon
                sx={{
                  color: "white",
                  fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
                }}
              />
            }
            text={"Video do Youtube"}
          ></CustomButton>
        </Box>
      </Container>

      {/* Dialog para edição */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEdit}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            backgroundColor: "#13654F",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Editar Última Notícia
          <IconButton onClick={handleCloseEdit} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ backgroundColor: "#13654F" }}>
          {editingIndex !== null && (
            <FormularioNoticias
              noticia={noticias[editingIndex]}
              index={editingIndex}
              onSave={handleSave}
              onCancel={handleCloseEdit}
            />
          )}
        </DialogContent>

        <DialogActions sx={{ backgroundColor: "#13654F" }}>
          <Botao onClick={handleCloseEdit}>Fechar</Botao>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NewsManagerRoute;
