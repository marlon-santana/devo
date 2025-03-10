import { Box, Container, Typography, Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserList } from "../UserList";
// import { debitors } from "../../dadosMock";
import { useDebtors } from "../../DebtorsContext"; 



const Home = () => {
  const navigate = useNavigate();

  const openCard = (debitor) => {
    navigate("/debtor-profile", { state: { debitor } });
  };

  const exit = () => {
    navigate("/login");
  };

  const { debitors } = useDebtors();


  const totalReceber = debitors.reduce((acc, debitor) => {
    return acc + debitor.products.reduce((sum, product) => sum + product.value, 0);
  }, 0);

  return (
    <Container maxWidth="sm" sx={{ mt: 4, paddingBottom: "40px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography sx={{ margin: "30px 0px 30px 0px" }} fontSize={24}>
          Olá Marlon Santana
        </Typography>
        <Button sx={{ fontSize: 18 }} onClick={() => exit()}>sair</Button>
      </Box>

      <Card sx={{ mb: 3, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>Total a Receber</Typography>
          <Typography variant="h5" color="red" fontSize={32}>
            R$ {totalReceber.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>

      <UserList />

      <Typography variant="h6" fontWeight={600}>Vendas recentes</Typography>

      {debitors.map((debitor) => (
        <Card
          key={debitor.id}
          onClick={() => openCard(debitor)}
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
            <Typography variant="h6" fontWeight={600}>{debitor.name}</Typography>
            {debitor.products.map((product, index) => (
              <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                <Typography variant="body2" color="text.secondary">{product.date}</Typography>
                <Typography variant="body2" color="error" fontWeight={600} fontSize="1.875rem">
                  R$ {product.value.toFixed(2)}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Home;