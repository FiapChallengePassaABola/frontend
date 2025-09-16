import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PlasmaBackground from "./components/PlasmaBackground";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import PageCampeonato from "./pages/PageCampeonato";
import PageLogin from "./pages/PageLogin";
import PageNoticias from "./pages/PageNoticias";
import PageRegister from "./pages/PageRegister";

function App() {
  return (
    <AuthProvider>
      <Router>
        <PlasmaBackground />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campeonato" element={<PageCampeonato />} />
          <Route path="/noticias" element={<PageNoticias />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/register" element={<PageRegister />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
