import NavBar from "./components/Nav";
import { Container } from "@mui/material";
import PlasmaBackground from "../../components/PlasmaBackground";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

function AdminPage() {
  return (
    <>
      <PlasmaBackground
        color1={"#0E261F"}
        color2={"#0E392B"}
        color3={"#0C2C22"}
        color4={"#041C14"}
      />

      <NavBar />
    </>
  );
}

export default AdminPage;
