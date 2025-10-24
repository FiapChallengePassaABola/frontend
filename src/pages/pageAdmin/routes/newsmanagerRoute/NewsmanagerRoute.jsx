import { Box, Container, Button, Paper, styled } from "@mui/material"; 



function NewsManagerRoute() {
    const Card = styled(Paper)({
    backgroundColor: "#157259",
    color: "#fff",
    borderRadius: 12,
    padding: 16,
    boxShadow: "none",
  });

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
            display:"flex",
            flexDirection:"row",
          }}
        >
          <Box
            sx={{
            flex:1,
            width:"100%",
            height:"100%",
          }}
          >
          <Card
          >
            {/* Box abaixo são para montar o card, o de cima vai ser a foto e o de baixo o gauge*/}
            <Box
            sx={{
              display:"flex",
              flexDirection:"row"
            }}
            >
              <Box>
                <Card>
                  
                </Card>
                </Box> 
              <Box>
                                <Card>
                  
                </Card>
                </Box> 

            </Box>
          </Card>
          </Box>
          <Box
            sx={{
            flex:1,
            width:"100%",
            height:"100%",
          }}
          >
          <Card
          >

          </Card>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default NewsManagerRoute;
