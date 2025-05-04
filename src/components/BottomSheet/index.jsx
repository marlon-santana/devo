import React from 'react';
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const BottomSheet = ({ open, onClose, title, children }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: open ? 0 : '-100%',
        left: 0,
        right: 0,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '16px 16px 0 0',
        transition: 'bottom 0.3s ease-in-out',
        zIndex: 1100,
      }}
    >
      {/* Botão de fechar */}
      <IconButton
        aria-label="fechar"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'text.secondary',
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Título */}
      {title && (
        <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}

      {/* Conteúdo */}
      {children}
    </Box>
  );
};

export default BottomSheet;