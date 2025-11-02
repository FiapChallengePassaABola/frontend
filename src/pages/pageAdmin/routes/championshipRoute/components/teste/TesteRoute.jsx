import useButton from "../../store/state";
import {Button, Box} from "@mui/material"
function TesteRoute() {
  const { componentChange } = useButton();
    
  
  
  return (
    <Box display="flex" flexDirection="column">
        <Button
            onClick={() => {
            componentChange(false);
            }}
            sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            maxWidth: "15%",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            textTransform: "none",
            }}
        >
            Voltar
        </Button>

       

    </Box>
  )
}

export default TesteRoute