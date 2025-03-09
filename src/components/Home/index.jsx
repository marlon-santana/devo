import { Box, Container, Typography, Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const debitors = [
  { name: "marlon", date: "10/03/2025", receber: 20 },
  { name: "teresa", date: "08/03/2025", receber: 108 },
  { name: "yuri", date: "05/03/2025", receber: 10 },
  { name: "tailer", date: "03/03/2025", receber: 35 }
];

const totalReceber = debitors.reduce((acc, curr) => acc + curr.receber, 0);

const Home = () => {
  const navigate = useNavigate();

  const openCard = (debitor) => {
    navigate("/debtor-profile", { state: { debitor } });
  };

  const exit = () => {
    navigate("/login");
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography sx={{ margin: "30px 0px 30px 0px" }} fontSize={24}>
          Olá Marlon Santana
        </Typography>
        <Button sx={{fontSize: 18}} onClick={() => exit()}>sair</Button>
      </Box>
      

      <Card sx={{ mb: 3, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>Total a Receber</Typography>
          <Typography variant="h5" color="red" fontSize={32}>
            R$ {totalReceber.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" fontWeight={600}>Vendas recentes</Typography>

      {debitors.map((item, index) => (
        <Card
          key={index}
          onClick={() => openCard(item)}
          sx={{
            mt: 3,
            p: 2,
            boxShadow: 3,
            borderRadius: 2,
            cursor: "pointer",
            "&:hover": { boxShadow: 6 }
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight={600}>{item.name}</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              <Typography variant="body2" color="text.secondary">{item.date}</Typography>
              {item.receber !== undefined && (
                <Typography variant="body2" color="error" fontWeight={600} fontSize="1.875rem">
                  R$ {item.receber.toFixed(2)}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Home;
