import { useEffect, useState } from "react"
import img1 from "../assets/bannerpassabola.png"
import img2 from "../assets/passabola2.png"

function Caroucel() {
  const imgs = [img1, img2]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imgs.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [imgs.length])

  const prev = () => setIndex(index === 0 ? imgs.length - 1 : index - 1)
  const next = () => setIndex((index + 1) % imgs.length)

    return (
        <div className="relative w-full max-w-400 mx-auto my-8 md:my-20 px-4 md:px-0">
            <img
                src={imgs[index]}
                alt="carousel"
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-96 2xl:h-120 object-cover rounded-xl sm:rounded-2xl shadow-lg"
            />
        </div>
    )
}
export default Caroucel
