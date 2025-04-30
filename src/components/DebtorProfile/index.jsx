import React, { useState } from 'react';
import { Box, Container, Typography, Button, Stack, TextField, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'; 
import AddButton from '../AddButton';
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const initialDebitor = [
    { id: 1, pago: false, name: "Teresa", date: "10/03/2025", product: "coca-cola 2l", receber: 20.00 },
    { id: 2, pago: true, name: "Teresa", date: "08/03/2025", product: "pao de quijo", receber: 108.00 },
    { id: 3, pago: true, name: "Teresa", date: "05/03/2025", product: "biscoito recheado, suco, chocolate", receber: 10.00 },
    { id: 4, pago: false, name: "Teresa", date: "03/03/2025", product: "refrigerante 2l, doce, miojo", receber: 35.00 },
    { id: 5, pago: true, name: "Teresa", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 },
    { id: 6, pago: false, name: "Teresa", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 },
    { id: 7, pago: true, name: "Teresa", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 },
    { id: 8, pago: false, name: "Teresa", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 },
    { id: 9, pago: false, name: "Teresa", date: "10/03/2025", product: "coca-cola 2l", receber: 20.00 },
    { id: 10, pago: false, name: "Teresa", date: "08/03/2025", product: "pao de quijo", receber: 108.00 },
    { id: 11, pago: false, name: "Teresa", date: "05/03/2025", product: "biscoito recheado, suco, chocolate", receber: 10.00 },
    { id: 12, pago: false, name: "Tailer", date: "03/03/2025", product: "refrigerante 2l, doce, miojo", receber: 35.00 },
    { id: 13, pago: true, name: "Elaine", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 },
    { id: 14, pago: true, name: "Fernada", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 },
    { id: 15, pago: true, name: "Luiz Gordao", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 },
    { id: 16, pago: false, name: "Fabricia", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 }
];

export const DebtorProfile = () => {
    const initialValue = 
        {
            name: '',
            product: '',
            date: new Date().toLocaleDateString('pt-BR'),
            receber: '' // Novo campo para o valor do produto
        }

    const name = initialDebitor[0].name;
    
    const [debitor, setDebitor] = useState(initialDebitor);
    const [openBottomSheet, setOpenBottomSheet] = useState(false); // Estado para controlar a abertura do Bottom Sheet
    const [newDebitor, setNewDebitor] = useState(initialValue); 

    const navigate = useNavigate();

  const Voltar = () => {
    navigate("/home");
  };

    const totalReceber = debitor.reduce((acc, curr) => {
        if (!curr.pago) {
            return acc + curr.receber;
        }
        return acc;
    }, 0);

    const markAsPaid = (id) => {
        setDebitor(debitor.map(item => item.id === id ? { ...item, pago: true } : item));
    };

    const markAllAsPaid = () => {
        setDebitor(debitor.map(item => ({ ...item, pago: true })));
    };

    const saveAsPDF = () => {
        const doc = new jsPDF();
        doc.text("Descrição de Vendas", 10, 10);
        doc.text(`Nome: ${debitor[0].name}`, 10, 20);

        // Definir a cor do texto como vermelho para o total
        doc.setTextColor(255, 0, 0); // Vermelho
        doc.text(`Total: R$ ${totalReceber.toFixed(2)}`, 10, 30);

        // Resetar a cor do texto para preto (opcional, para o restante do conteúdo)
        doc.setTextColor(0, 0, 0);

        const tableColumn = ["Produto", "Data", "Valor", "Status"];
        const tableRows = [];

        debitor.forEach(sale => {
            const status = sale.pago ? 'Pago' : 'Não Pago';
            const textColor = sale.pago ? [0, 128, 0] : [255, 0, 0]; // Verde para "Pago", Vermelho para "Não Pago"

            const saleData = [
                { content: sale.product, styles: { textColor: [0, 0, 0] } }, // Preto para o produto
                { content: sale.date, styles: { textColor: [0, 0, 0] } }, // Preto para a data
                { content: `R$ ${sale.receber.toFixed(2)}`, styles: { textColor: [0, 0, 0] } }, // Preto para o valor
                { content: status, styles: { textColor } } // Cor dinâmica para o status
            ];
            tableRows.push(saleData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 40,
            headStyles: {
                fillColor: [34, 139, 34], // Verde escuro para o cabeçalho
                textColor: [255, 255, 255] // Branco para o texto do cabeçalho
            },
            bodyStyles: {
                textColor: [0, 0, 0] // Preto para o texto do corpo
            }
        });

        doc.save('debtor-profile.pdf');
    };

    const handleOpenBottomSheet = () => {
        setOpenBottomSheet(true); // Abre o Bottom Sheet
    };

    const handleCloseBottomSheet = () => {
        setOpenBottomSheet(false); // Fecha o Bottom Sheet
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDebitor({ ...newDebitor, [name]: value }); // Atualiza o estado do novo devedor
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newId = debitor.length + 1; // Gera um novo ID
        const newItem = {
            id: newId,
            pago: false,
            name: newDebitor.name,
            date: newDebitor.date,
            product: newDebitor.product,
            receber: parseFloat(newDebitor.receber) || 0.00 // Converte o valor para número
        };
        setDebitor([...debitor, newItem]); // Adiciona o novo item à lista
        setNewDebitor({ name: '', product: '', date: new Date().toLocaleDateString('pt-BR'), receber: '' }); // Reseta o formulário
        handleCloseBottomSheet(); // Fecha o Bottom Sheet
    };

    const handleDeletePaid = () => {
        // Filtra a lista para manter apenas os itens não pagos
        const updatedDebitor = debitor.filter(item => !item.pago);
        setDebitor(updatedDebitor); // Atualiza a lista de devedores
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, position: 'relative' }}>
            {/* Botão de Nova Compra fixo na lateral direita */}
           <AddButton onClick={handleOpenBottomSheet} />

            <Box display="flex" justifyContent="flex-end" alignItems="center" style={{ marginBottom: 20 }}>
           
            <Button onClick={() => Voltar()} variant="contained" color="success">voltar</Button>
            </Box>
           
            
            <Typography sx={{ color: 'green' }}>Descrição de Vendas</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography style={{ fontSize: 24 }}>{name}</Typography>
                <Typography>Total: <span style={{ color: 'red', fontSize: 24 }}>R$ {totalReceber.toFixed(2)}</span></Typography>
            </Box>
            <Box sx={{ mb: 3, p: 1 }}>
                {debitor.map((sale, index) => (
                    <Stack key={index} style={{ border: '1px solid #ccc', borderRadius: "8px", padding: '10px', margin: '10px 0' }}>
                        <Typography>Produto: {sale.product}</Typography>
                        <Typography>Vendido no dia: {sale.date}</Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" fontWeight={600} fontSize={'1.875rem'} color={sale.pago ? 'green' : 'error'}>
                                R$ {sale.receber.toFixed(2)}
                            </Typography>
                            {sale.pago && <Typography variant="body2" color="green">• Pago</Typography>}
                        </Box>
                        {!sale.pago && <Button variant="contained" color="success" onClick={() => markAsPaid(sale.id)}>Marcar como Pago</Button>}
                    </Stack>
                ))}
            </Box>
            <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
                <Button variant="contained" color="primary" sx={{ fontSize: 12, padding: '20px 15px' }} onClick={markAllAsPaid}>Pagar Total</Button>
                <Button variant="contained" color="secondary" sx={{ fontSize: 12 }} onClick={saveAsPDF}>Salvar PDF</Button>
                <Button variant="contained" color="error" sx={{ fontSize: 12 }} onClick={handleDeletePaid}>Deletar Pagas</Button>
            </Box>
        </Container>
    );
};