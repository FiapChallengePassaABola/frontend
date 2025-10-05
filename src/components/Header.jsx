import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import imgBackgroundMobile from "../assets/taça.png"
import imgBackgroundDesktop from "../assets/taça2.png"
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
          ? 'bg-[#4A1A4A] border-b border-[#6B2A8B]/50 shadow-lg backdrop-blur-0' 
          : 'bg-transparent backdrop-blur-0 md:backdrop-blur-md'
      }`}>
        <NavbarProfessional />
      </div>

      <div className="relative w-full">
        <Link to="/jogar">
          <picture>
            <source media="(max-width: 767px)" srcSet={imgBackgroundMobile} />
            <img src={imgBackgroundDesktop} alt="background" className="w-full h-screen object-cover"/>
          </picture>
        </Link>
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/15 to-black/25"></div>
      </div>
    </>
  )
}

export default Header
