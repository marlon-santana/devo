import React, { useState } from 'react';
import { Button, TextField } from "@mui/material";
import BottomSheet from '../BottomSheet/index.jsx'; // Importa o componente BottomSheet

const AddButton = ({ onSubmit }) => {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    product: '',
    receber: '',
    date: new Date().toLocaleDateString(),
  });

  const handleOpen = () => setOpenBottomSheet(true);
  const handleClose = () => setOpenBottomSheet(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Passa os dados do formulário para o componente pai
    setFormData({
      name: '',
      product: '',
      receber: '',
      date: new Date().toLocaleDateString(),
    });
   
    handleClose();
  };

  return (
    <>
      {/* Botão flutuante */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '1.5rem',
          boxShadow: 3,
          position: 'fixed',
          right: 20,
          bottom: 100,
          zIndex: 1000,
        }}
      >
        +
      </Button>

      {/* BottomSheet */}
      <BottomSheet open={openBottomSheet} onClose={handleClose} title="Adicionar Nova Compra">
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nome do Comprador"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Descrição do Produto"
            name="product"
            value={formData.product}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Valor do Produto"
            name="receber"
            type="number"
            value={formData.receber}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Data"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            disabled // Data é preenchida automaticamente
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Adicionar
          </Button>
        </form>
      </BottomSheet>
    </>
  );
};

export default AddButton;