import { Box, Container, Typography, Card, CardContent } from "@mui/material";

const debitors = [
  { name: "marlon", date: "10/03/2025",  receber: 20},
  { name: "teresa", date: "08/03/2025",  receber: 108 },
  { name: "yuri", date: "05/03/2025",  receber: 10 },
  { name: "tailer", date: "03/03/2025", receber: 35 }
];

const totalReceber = debitors.reduce((acc, curr) => acc + curr.receber, 0);

const Home = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography sx={{margin: '30px 0px 30px 0px'}}>olá Marlon Santana</Typography>
      <Card sx={{ mb: 3, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>Total a Receber</Typography>
          <Typography variant="h5" color="red">R$ {totalReceber.toFixed(2)}</Typography>
        </CardContent>
      </Card>
      <Typography  variant="h6" fontWeight={600}>Vendas recentes</Typography>
      {debitors.map((item, index) => (
        <>
       
        <Card key={index} sx={{ mt: 3, p: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600}>{item.name}</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              <Typography variant="body2" color="text.secondary">{item.date}</Typography>
              {item.receber !== undefined && (
                <Typography variant="body2" color="error" fontWeight={600} fontSize={ '1.875rem'}>
                  R$ {item.receber}
                </Typography>
              )}
            </Box>
           
          </CardContent>
        </Card>
        </>
      ))}
    </Container>
  );
};

export default Home;