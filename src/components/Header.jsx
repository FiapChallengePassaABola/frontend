import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import imgBackground from "../assets/background.png"
import NavbarProfessional from "./NavbarProfessional"

function Header() {
  const [hasBackground, setHasBackground] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const firstSectionHeight = window.innerHeight
      const scrollPosition = window.scrollY
      
      if (scrollPosition > firstSectionHeight * 0.8) {
        setHasBackground(true)
      } else {
        setHasBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        hasBackground 
          ? 'bg-[#1F051F] border-b border-[#3F0A3F]/50' 
          : 'bg-transparent backdrop-blur-md'
      }`}>
        <NavbarProfessional />
      </div>

      <div className="relative w-full">
        <Link to="/jogar">
          <img src={imgBackground} alt="background" className="w-full h-screen object-cover"/>
        </Link>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
      </div>
    </>
  )
}

export default Header
