import {Box, Typography} from "@mui/material"

function NavBar(){
    return(
        <Box
        sx={{
            backgroundColor: "#101110",
            width:"20vw",
            height: '100vh',
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}
        >
        <div className="rounded-full w-50 h-50 bg-[#431D46] overflow-hidden flex justify-center items-center">
            <Typography
            sx={{
                color:"white",
                fontFamily:"Inter",
                fontWeight:"bold",
                fontSize: "4.4rem"
            }}
            >
                ADM
            </Typography>
        </div>

        </Box>
    )
}

export default NavBar
