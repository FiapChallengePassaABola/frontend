
import { motion } from "motion/react"

function Background(){
    return(
        <div >
        <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 2 }}
            className="flex flex-col items-center justify-center"
            >
            <div className="h-screen w-screen flex items-center justify-center">
                <img src={Logo} alt="Logo" className="w-1/6 mb-4" />
            </div>
            
        </motion.div>
        
        </div>
    )
}
export default Background