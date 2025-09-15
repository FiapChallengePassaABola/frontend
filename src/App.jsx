import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PlasmaBackground from "./components/PlasmaBackground";
import Home from "./pages/Home";
import PageCampeonato from "./pages/PageCampeonato";
import PageNoticias from "./pages/PageNoticias";

function App() {
  return (
    <Router>
      <PlasmaBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campeonato" element={<PageCampeonato />} />
        <Route path="/noticias" element={<PageNoticias />} />
      </Routes>
    </Router>
  )
}

export default App
