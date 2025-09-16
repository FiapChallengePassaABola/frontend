import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import PlasmaBackground from "./components/PlasmaBackground";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import PageCampeonato from "./pages/PageCampeonato";
import PageLogin from "./pages/PageLogin";
import PageNoticias from "./pages/PageNoticias";
import PageProfile from "./pages/PageProfile";
import PageRegister from "./pages/PageRegister";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <PlasmaBackground />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campeonato" element={<PageCampeonato />} />
            <Route path="/noticias" element={<PageNoticias />} />
            <Route path="/login" element={<PageLogin />} />
            <Route path="/register" element={<PageRegister />} />
            <Route path="/profile" element={<PageProfile />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
