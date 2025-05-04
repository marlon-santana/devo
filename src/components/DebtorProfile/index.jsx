import React, { useState } from 'react';
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import AddButton from '../AddButton';
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useDebtors } from '../../DebtorsContext';

export const DebtorProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { debitor } = location.state; // Extrai o devedor passado pelo Home
  const [products, setProducts] = useState(debitor.products); // Estado local para os produtos do devedor
  const { setDebitors } = useDebtors();

  const Voltar = () => {
    navigate("/home");
  };

  const totalReceber = products.reduce((sum, product) => {
    return !product.pago ? parseFloat(sum) + parseFloat(product.value) : parseFloat(sum);
  }, 0);


  const markAsPaid = (productIndex) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].pago = true;
    setProducts(updatedProducts);

    // Atualiza o contexto global
    setDebitors((prevDebitors) =>
      prevDebitors.map((deb) =>
        deb.id === debitor.id ? { ...deb, products: updatedProducts } : deb
      )
    );
  };

  const markAllAsPaid = () => {
    const updatedProducts = products.map(product => ({ ...product, pago: true }));
    setProducts(updatedProducts);

    // Atualiza o contexto global
    setDebitors((prevDebitors) =>
      prevDebitors.map((deb) =>
        deb.id === debitor.id ? { ...deb, products: updatedProducts } : deb
      )
    );
  };

  const handleDeletePaid = () => {
    const updatedProducts = products.filter(product => !product.pago);
    setProducts(updatedProducts);

    // Atualiza o contexto global
    setDebitors((prevDebitors) =>
      prevDebitors.map((deb) =>
        deb.id === debitor.id ? { ...deb, products: updatedProducts } : deb
      )
    );
  };

  const saveAsPDF = () => {
    const doc = new jsPDF();
    doc.text("Descrição de Vendas", 10, 10);
    doc.text(`Nome: ${debitor.name}`, 10, 20);
    doc.setTextColor(255, 0, 0);
    doc.text(`Total: R$ ${totalReceber}`, 10, 30);
    doc.setTextColor(0, 0, 0);

    const tableColumn = ["Produto", "Data", "Valor", "Status"];
    const tableRows = products.map(product => [
      product.productName,
      product.date,
      `R$ ${product.value}`,
      product.pago ? 'Pago' : 'Não Pago'
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    doc.save('debtor-profile.pdf');
  };

  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...products, { ...newProduct, pago: false }];
    setProducts(updatedProducts); // Atualiza o estado local imediatamente

    // Atualiza o contexto global
    setDebitors((prevDebitors) =>
      prevDebitors.map((deb) =>
        deb.id === debitor.id ? { ...deb, products: updatedProducts } : deb
      )
    );
  };

  console.log('products', products);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Botão Voltar */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" style={{ marginBottom: 20 }}>
        <Button onClick={Voltar} variant="contained" color="success">Voltar</Button>
      </Box>

      {/* Nome e Total */}
      <Typography sx={{ color: 'green' }}>Descrição de Vendas</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography style={{ fontSize: 24 }}>{debitor.name}</Typography>
        <Typography>Total: <span style={{ color: 'red', fontSize: 24 }}>R$ {totalReceber}</span></Typography>
      </Box>

      {/* Lista de Produtos */}
      <Box sx={{ mb: 3, p: 1 }}>
        {products.map((product, index) => (
          <Stack key={index} style={{ border: '1px solid #ccc', borderRadius: "8px", padding: '10px', margin: '10px 0' }}>
            <Typography>Produto: {product.productName}</Typography>
            <Typography>Vendido no dia: {product.date}</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" fontWeight={600} fontSize={'1.875rem'} color={product.pago ? 'green' : 'error'}>
                R$ {product.value.toFixed(2)}
              </Typography>
              {product.pago && <Typography variant="body2" color="green">• Pago</Typography>}
            </Box>
            {!product.pago && (
              <Button
                variant="contained"
                color="success"
                onClick={() => markAsPaid(index)}
              >
                Marcar como Pago
              </Button>
            )}
          </Stack>
        ))}
      </Box>

      {/* Botão de Nova Compra */}
      <AddButton onSubmit={handleAddProduct} />

      {/* Ações */}
      <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
        <Button variant="contained" color="primary" sx={{ fontSize: 12, padding: '20px 15px' }} onClick={markAllAsPaid}>Pagar Total</Button>
        <Button variant="contained" color="secondary" sx={{ fontSize: 12 }} onClick={saveAsPDF}>Salvar PDF</Button>
        <Button variant="contained" color="error" sx={{ fontSize: 12 }} onClick={handleDeletePaid}>Deletar Pagas</Button>
      </Box>
    </Container>
  );
};