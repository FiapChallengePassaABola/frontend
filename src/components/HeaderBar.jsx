import { useEffect, useMemo, useState } from "react"
import NavbarProfessional from "./NavbarProfessional"

function HeaderBar({ triggerElementId, triggerOffset = 0 }) {
  const [hasBackground, setHasBackground] = useState(false)
  const [triggerY, setTriggerY] = useState(null)

  const recomputeTrigger = useMemo(() => {
    return () => {
      if (triggerElementId) {
        const el = document.getElementById(triggerElementId)
        if (el) {
          const rect = el.getBoundingClientRect()
          const absoluteBottom = rect.top + window.scrollY + rect.height
          setTriggerY(absoluteBottom + triggerOffset)
          return
        }
      }
      setTriggerY(null)
    }
  }, [triggerElementId, triggerOffset])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (triggerY != null) {
        setHasBackground(scrollPosition > triggerY)
      } else {
        const fallback = window.innerHeight * 0.8
        setHasBackground(scrollPosition > fallback)
      }
    }

    const handleResize = () => {
      recomputeTrigger()
      requestAnimationFrame(handleScroll)
    }

    recomputeTrigger()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [recomputeTrigger, triggerY])

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
      hasBackground 
        ? 'bg-[#1F051F] border-b border-[#3F0A3F]/50' 
        : 'bg-transparent backdrop-blur-md'
    }`}>
      <NavbarProfessional />
    </div>
  )
}

export default HeaderBar


