import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useNoticiasStore } from "../store/store";
import FormularioNoticias from "./AddNoticia";

/**
 * Modal que exibe todas as notícias e permite editar cada uma.
 *
 * Props:
 * - open (bool)
 * - onClose (func)
 */
export default function AllNewsModal({ open, onClose }) {
  const noticias = useNoticiasStore((s) => s.noticias);
  const updateNoticia = useNoticiasStore((s) => s.updateNoticia);

  const [editingIndex, setEditingIndex] = useState(null);

  const handleStartEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = (index, updated) => {
    updateNoticia(index, updated);
    setEditingIndex(null);
  };

  const handleCancelEdit = () => setEditingIndex(null);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Todas as Notícias
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ backgroundColor: "#f7faf7" }}>
        {editingIndex === null ? (
          <>
            <List>
              {noticias.map((n, idx) => (
                <React.Fragment key={idx}>
                  <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          width: 120,
                          height: 70,
                          overflow: "hidden",
                          borderRadius: 1,
                        }}
                      >
                        <img
                          src={n.img}
                          alt={n.titulo}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </Box>

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 700 }}>
                          {n.titulo}
                        </Typography>
                        <Typography sx={{ color: "gray", fontSize: 13 }}>
                          {n.fonte} — {n.tempoAtras} — {n.categoria}
                        </Typography>
                        <Typography
                          sx={{ mt: 1, fontSize: 14, color: "#333" }}
                          noWrap
                        >
                          {n.descricao}
                        </Typography>
                      </Box>

                      <ListItemSecondaryAction>
                        <Button
                          startIcon={<EditIcon />}
                          variant="outlined"
                          onClick={() => handleStartEdit(idx)}
                        >
                          Editar
                        </Button>
                      </ListItemSecondaryAction>
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </>
        ) : (
          // abre o formulário para editar a notícia selecionada
          <Box sx={{ py: 2 }}>
            <FormularioNoticias
              noticia={noticias[editingIndex]}
              index={editingIndex}
              onSave={handleSave}
              onCancel={handleCancelEdit}
            />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
