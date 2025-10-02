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
      
      gradient.addColorStop(0, '#741976');
      gradient.addColorStop(0.3, '#6A1B6C');
      gradient.addColorStop(0.6, '#6A1B6C');
      gradient.addColorStop(1, '#360F33');
      
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
        
        const alpha = 0.1 + 0.05 * Math.sin(time * 0.002 + i);
        waveGradient.addColorStop(0, `rgba(255, ${50 + i * 20}, ${30 + i * 10}, ${alpha})`);
        waveGradient.addColorStop(0.5, `rgba(200, ${30 + i * 15}, ${20 + i * 5}, ${alpha * 0.5})`);
        waveGradient.addColorStop(1, 'rgba(100, 10, 10, 0)');
        
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
