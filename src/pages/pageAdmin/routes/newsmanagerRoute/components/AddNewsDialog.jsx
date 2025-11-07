import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNoticiasStore } from "../store/store";
import FormularioNoticias from "./AddNoticia";

/**
 * Dialog para adicionar nova notícia.
 * Props:
 * - open (bool)
 * - onClose (func)
 */
export default function AddNewsDialog({ open, onClose }) {
  const addNoticia = useNoticiasStore((s) => s.addNoticia);

  const handleAdd = (updated) => {
    // updated é um objeto com os campos (titulo, descricao, img, ...)
    addNoticia(updated);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Adicionar Nova Notícia
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: "#13654F" }}>
        <FormularioNoticias
          noticia={null}
          onSave={handleAdd}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
