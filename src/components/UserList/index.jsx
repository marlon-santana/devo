import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Stack, TextField } from "@mui/material";

export const UserList = () => {
    const debitors = [
        { id: 1, pago: false, name: "Teresa", date: "10/03/2025", product: "coca-cola 2l", receber: 20.00 },
        { id: 2, pago: true, name: "Yuri", date: "08/03/2025", product: "pao de quijo", receber: 108.00 },
        { id: 3, pago: true, name: "Thiago", date: "05/03/2025", product: "biscoito recheado, suco, chocolate", receber: 10.00 },
        { id: 4, pago: false, name: "Tailer", date: "03/03/2025", product: "refrigerante 2l, doce, miojo", receber: 35.00 },
        { id: 5, pago: true, name: "Elaine", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 },
        { id: 6, pago: false, name: "Fernada", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 },
        { id: 7, pago: true, name: "Luiz Gordao", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 },
        { id: 8, pago: false, name: "Fabricia", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 },
        { id: 9, pago: false, name: "Teresa", date: "10/03/2025", product: "coca-cola 2l", receber: 20.00 },
        { id: 10, pago: false, name: "Yuri", date: "08/03/2025", product: "pao de quijo", receber: 108.00 },
        { id: 11, pago: false, name: "Thiago", date: "05/03/2025", product: "biscoito recheado, suco, chocolate", receber: 10.00 },
        { id: 12, pago: false, name: "Tailer", date: "03/03/2025", product: "refrigerante 2l, doce, miojo", receber: 35.00 },
        { id: 13, pago: true, name: "Elaine", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 },
        { id: 14, pago: true, name: "Fernada", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 },
        { id: 15, pago: true, name: "Luiz Gordao", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 },
        { id: 16, pago: false, name: "Fabricia", date: "08/08/2025", product: "salsicha, queijo", receber: 35.00 }
    ];

    // Estado para armazenar o valor da busca
    const [searchTerm, setSearchTerm] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');


    // Filtrar a lista de devedores com base no termo de busca
    const filteredDebitors = debitors.filter(debitor =>
        debitor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const total = debitors.length
    const show = filteredDebitors.length > 0 && filteredDebitors.length < total
    const noShow = filteredDebitors.length === 0

 


    useEffect(() => {
        if (noShow || show) {
            setShowToast(true);
            setToastMessage(noShow ? 'Devedor não encontrado' : 'Devedor encontrado com sucesso!!');
            setToastType(noShow ? 'error' : 'success');

            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [noShow, show]);

    const Tost = (type, message) => {
        return (
            <Stack
                sx={{
                    backgroundColor: type === 'error' ? '#F44336' : '#4CAF50',
                    height: '60px',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    padding: '10px',
                    minWidth: '200px',
                    animation: showToast ? 'slideIn 0.5s ease-out forwards' : 'slideOut 0.5s ease-in forwards',
                    '@keyframes slideIn': {
                        from: {
                            transform: 'translateX(-100%)',
                            opacity: 0,
                        },
                        to: {
                            transform: 'translateX(0)',
                            opacity: 1,
                        },
                    },
                    '@keyframes slideOut': {
                        from: {
                            transform: 'translateX(0)',
                            opacity: 1,
                        },
                        to: {
                            transform: 'translateX(-100%)',
                            opacity: 0,
                        },
                    },
                }}
            >
                <Typography sx={{ color: 'white' }}>{message}</Typography>
            </Stack>
        );
    };

   


    console.log(showToast)

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography sx={{ color: 'green' }}>Lista de Devedores</Typography>

            {/* Campo de busca */}
            <TextField
                fullWidth
                label="buscar por nome"
                variant="outlined"
                value={searchTerm}
                size='small'
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mt: 2, mb: 3, }}
            />

            <Box sx={{ mb: 3, p: 1 }}>
               
                {(!filteredDebitors.length > 0) || (filteredDebitors.length < total)   && 
                filteredDebitors.map((debitor, index) => (
                   
                    <Stack
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            border: `2px solid ${debitor.pago ? 'green' : 'red'}`, 
                            borderRadius: "8px",
                            padding: '10px',
                            margin: '10px 0'
                        }}
                    >
                        <Typography> {debitor.name}</Typography>
                        {debitor.pago && <Typography variant="body2" color="green">• Pago</Typography>}
                        {!debitor.pago && <Typography variant="body2" color="red">• deve</Typography>}
                        
                    </Stack>
                ))}
               
                {showToast && Tost(toastType, toastMessage)}              
            </Box>
        </Container>
    );
};