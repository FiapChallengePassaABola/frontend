import { Box, Container, Button, Paper, styled } from "@mui/material"; 

const Card = styled(Paper)({
  backgroundColor: "#157259",
  color: "#fff",
  borderRadius: 12,
  padding: 16,
  boxShadow: "none",
});

function NewsManagerRoute() {
  return (
    <>
      <Container
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            minHeight: "60%",
          }}
        >
          <Card
          sx={{
            flex:1
        
          }}
          >

          </Card>
        </Box>
      </Container>
    </>
  );
}

export default NewsManagerRoute;
