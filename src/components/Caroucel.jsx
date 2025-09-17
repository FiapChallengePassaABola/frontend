import { useEffect, useMemo, useState } from "react"
import img1 from "../assets/bannerpassabola.png"
import img2 from "../assets/passabola2.png"
import imgMobile1 from "../assets/passabola22.png"

function Caroucel() {
  const imgs = useMemo(() => [img1, img2], [])
  const imgsMobile = useMemo(() => [imgMobile1], [])

  const [index, setIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const currentImgs = isMobile ? imgsMobile : imgs
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % currentImgs.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [isMobile, imgs, imgsMobile])

  const currentImgs = isMobile ? imgsMobile : imgs

    return (
        <div className="relative w-full max-w-400 mx-auto my-8 md:my-20 px-4 md:px-0">
            <img
                src={currentImgs[index]}
                alt="carousel"
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-96 2xl:h-120 object-cover rounded-xl sm:rounded-2xl shadow-lg"
            />
        </div>
    )
}
export default Caroucel
