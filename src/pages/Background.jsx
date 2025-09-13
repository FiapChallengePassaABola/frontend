import Logo from "../assets/logoBranca.png"
import { motion } from "motion/react"

function Background(){
    return(
        <div >
            {/* <img src={Logo} alt="Logo" className="w-1/6 " /> */}
            
        <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 5 }}
            className="flex flex-col items-center justify-center"
            >
            <div className="h-screen w-screen bg-gradient-to-br from-[#000000] via-[#1F000E] to-black flex items-center justify-center">
                <img src={Logo} alt="Logo" className="w-1/6 mb-4" />
            </div>
            
        </motion.div>
        
        </div>
    )
}
export default Background