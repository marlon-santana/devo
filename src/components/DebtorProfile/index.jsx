import React, { useState } from 'react';
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import AddButton from '../AddButton';
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useDebtors } from '../../DebtorsContext'; // Importa o contexto de devedores

export const DebtorProfile = () => {
    const { debitors, setDebitors } = useDebtors(); // Usa o contexto de devedores
    const navigate = useNavigate();

    const Voltar = () => {
        navigate("/home");
    };

    const totalReceber = debitors.reduce((acc, debtor) => {
        return acc + debtor.products.reduce((sum, product) => {
            return !product.pago ? sum + product.value : sum;
        }, 0);
    }, 0);

    const markAsPaid = (debtorId, productIndex) => {
        setDebitors(debitors.map(debtor => {
            if (debtor.id === debtorId) {
                const updatedProducts = [...debtor.products];
                updatedProducts[productIndex].pago = true;
                return { ...debtor, products: updatedProducts };
            }
            return debtor;
        }));
    };

    const markAllAsPaid = () => {
        setDebitors(debitors.map(debtor => ({
            ...debtor,
            products: debtor.products.map(product => ({ ...product, pago: true }))
        })));
    };

    const saveAsPDF = () => {
        const doc = new jsPDF();
        doc.text("Descrição de Vendas", 10, 10);

        debitors.forEach(debtor => {
            doc.text(`Nome: ${debtor.name}`, 10, doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 20);

            const tableColumn = ["Produto", "Data", "Valor", "Status"];
            const tableRows = debtor.products.map(product => [
                product.productName,
                product.date,
                `R$ ${product.value.toFixed(2)}`,
                product.pago ? 'Pago' : 'Não Pago'
            ]);

            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 30,
            });
        });

        doc.save('debtor-profile.pdf');
    };

    const handleDeletePaid = () => {
        setDebitors(debitors.map(debtor => ({
            ...debtor,
            products: debtor.products.filter(product => !product.pago)
        })).filter(debtor => debtor.products.length > 0));
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, position: 'relative' }}>
            {/* Botão de Nova Compra */}
            <AddButton onSubmit={(newDebtor) => setDebitors([...debitors, newDebtor])} />

            {/* Botão Voltar */}
            <Box display="flex" justifyContent="flex-end" alignItems="center" style={{ marginBottom: 20 }}>
                <Button onClick={Voltar} variant="contained" color="success">Voltar</Button>
            </Box>

            {/* Nome e Total */}
            <Typography sx={{ color: 'green' }}>Descrição de Vendas</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography style={{ fontSize: 24 }}>Total:</Typography>
                <Typography><span style={{ color: 'red', fontSize: 24 }}>R$ {totalReceber.toFixed(2)}</span></Typography>
            </Box>

            {/* Lista de Devedores e Produtos */}
            <Box sx={{ mb: 3, p: 1 }}>
                {debitors.map((debtor) => (
                    <Box key={debtor.id} sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>{debtor.name}</Typography>
                        {debtor.products.map((product, index) => (
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
                                        onClick={() => markAsPaid(debtor.id, index)}
                                    >
                                        Marcar como Pago
                                    </Button>
                                )}
                            </Stack>
                        ))}
                    </Box>
                ))}
            </Box>

            {/* Ações */}
            <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
                <Button variant="contained" color="primary" sx={{ fontSize: 12, padding: '20px 15px' }} onClick={markAllAsPaid}>Pagar Total</Button>
                <Button variant="contained" color="secondary" sx={{ fontSize: 12 }} onClick={saveAsPDF}>Salvar PDF</Button>
                <Button variant="contained" color="error" sx={{ fontSize: 12 }} onClick={handleDeletePaid}>Deletar Pagas</Button>
            </Box>
        </Container>
    );
};