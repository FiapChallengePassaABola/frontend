import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Background from './pages/Background'
import Navbar from './pages/Navbar'

import Logo from "./assets/logoBranca.png"

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Depois de 1 segundo, troca para a tela principal
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center text-white">
      {loading ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8 }}
          className="flex flex-col items-center justify-center"
        >
          <img src={Logo} alt="Logo" className="w-32 h-32 mb-4" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
         
        >
          <Navbar/>

        </motion.div>
      )}
    </div>



  )
}

export default App
