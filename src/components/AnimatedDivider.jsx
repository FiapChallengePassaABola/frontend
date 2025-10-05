import { Separator } from "./ui/separator"

const AnimatedDivider = () => {
  return (
    <div className="relative py-12 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#521E2B]/10 to-transparent"></div>
      
      {/* Main animated line */}
      <div className="relative">
        <Separator className="bg-gradient-to-r from-transparent via-[#521E2B]/80 to-transparent h-[1px]" />
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#521E2B]/30 to-transparent h-[1px] animate-pulse"></div>
        
        {/* Minimal moving elements */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="flex space-x-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-[#521E2B]/60 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Subtle center decoration */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-8 h-8 border border-[#521E2B]/30 rounded-full animate-spin" style={{ animationDuration: '10s' }}>
          <div className="w-full h-full border border-[#521E2B]/20 rounded-full"></div>
        </div>
      </div>
      
      {/* Minimal corner accents */}
      <div className="absolute top-6 left-12 w-4 h-4 border-l border-t border-[#521E2B]/30"></div>
      <div className="absolute top-6 right-12 w-4 h-4 border-r border-t border-[#521E2B]/30"></div>
      <div className="absolute bottom-6 left-12 w-4 h-4 border-l border-b border-[#521E2B]/30"></div>
      <div className="absolute bottom-6 right-12 w-4 h-4 border-r border-b border-[#521E2B]/30"></div>
    </div>
  )
}

export default AnimatedDivider
