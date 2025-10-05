import { useEffect, useRef } from 'react';

const PlasmaBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = (time) => {
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      );
      
      gradient.addColorStop(0, '#2A052A');
      gradient.addColorStop(0.3, '#3F0A3F');
      gradient.addColorStop(0.6, '#1F051F');
      gradient.addColorStop(1, '#0F030F');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      for (let i = 0; i < 3; i++) {
        const waveGradient = ctx.createRadialGradient(
          width * (0.3 + 0.4 * Math.sin(time * 0.001 + i * 2)),
          height * (0.3 + 0.4 * Math.cos(time * 0.0008 + i * 1.5)),
          0,
          width * (0.3 + 0.4 * Math.sin(time * 0.001 + i * 2)),
          height * (0.3 + 0.4 * Math.cos(time * 0.0008 + i * 1.5)),
          width * 0.3
        );
        
        const alpha = 0.06 + 0.03 * Math.sin(time * 0.002 + i);
        const purpleIntensity = 100 + i * 12;
        waveGradient.addColorStop(0, `rgba(${purpleIntensity}, ${25 + i * 10}, ${70 + i * 18}, ${alpha})`);
        waveGradient.addColorStop(0.5, `rgba(${purpleIntensity - 35}, ${18 + i * 4}, ${50 + i * 12}, ${alpha * 0.4})`);
        waveGradient.addColorStop(1, 'rgba(40, 3, 40, 0)');
        
        ctx.fillStyle = waveGradient;
        ctx.fillRect(0, 0, width, height);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default PlasmaBackground;
