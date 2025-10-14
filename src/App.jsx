import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import PlasmaBackground from "./components/PlasmaBackground";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import PageCampeonato from "./pages/PageCampeonato";
import PageJogar from "./pages/PageJogar";
import PageJogos from "./pages/PageJogos";
import PageLogin from "./pages/PageLogin";
import PageNoticias from "./pages/PageNoticias";
import PageProfile from "./pages/PageProfile";
import PageRegister from "./pages/PageRegister";
import AdminPage from "./pages/pageAdmin/PageAdmin"

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
 
          <PlasmaBackground 
          color1={"#2A052A"}
          color2={'#3F0A3F'}
          color3={ '#1F051F'}
          color4={'#0F030F'}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campeonato" element={<PageCampeonato />} />
            <Route path="/jogar" element={<PageJogar />} />
            <Route path="/noticias" element={<PageNoticias />} />
            <Route path="/login" element={<PageLogin />} />
            <Route path="/register" element={<PageRegister />} />
            <Route path="/profile" element={<PageProfile />} />
            <Route path="/jogos" element={<PageJogos />} />
            <Route path="/admin" element={<AdminPage />} />

          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
