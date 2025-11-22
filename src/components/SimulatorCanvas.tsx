import { useEffect, useRef, useState } from "react";

interface SimulatorCanvasProps {
  velocity: number;
  angle: number;
  gravity: number;
  isLaunched: boolean;
  onReset: () => void;
}

export const SimulatorCanvas = ({
  velocity,
  angle,
  gravity,
  isLaunched,
  onReset,
}: SimulatorCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [trajectory, setTrajectory] = useState<{ x: number; y: number }[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ground
      ctx.strokeStyle = "hsl(189, 95%, 58%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 40);
      ctx.lineTo(canvas.width, canvas.height - 40);
      ctx.stroke();

      // Draw trajectory path
      if (trajectory.length > 1) {
        ctx.strokeStyle = "hsl(189, 80%, 45%)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        trajectory.forEach((point, i) => {
          if (i === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();

        // Draw projectile
        const lastPoint = trajectory[trajectory.length - 1];
        ctx.fillStyle = "hsl(189, 95%, 58%)";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "hsl(189, 95%, 58%)";
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw launch angle indicator
      if (!isLaunched) {
        const startX = 50;
        const startY = canvas.height - 40;
        const lineLength = 60;
        const angleRad = (angle * Math.PI) / 180;

        ctx.strokeStyle = "hsl(189, 95%, 58%, 0.5)";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(
          startX + Math.cos(angleRad) * lineLength,
          startY - Math.sin(angleRad) * lineLength
        );
        ctx.stroke();
        ctx.setLineDash([]);
      }
    };

    draw();
  }, [trajectory, angle, isLaunched]);

  useEffect(() => {
    if (!isLaunched) {
      setTrajectory([]);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const startX = 50;
    const startY = canvas.height - 40;
    const angleRad = (angle * Math.PI) / 180;
    const vx = velocity * Math.cos(angleRad);
    const vy = velocity * Math.sin(angleRad);

    let time = 0;
    const newTrajectory: { x: number; y: number }[] = [];

    const animate = () => {
      time += 0.05;
      const x = startX + vx * time * 10;
      const y = startY - (vy * time * 10 - 0.5 * gravity * time * time * 10);

      if (y < canvas.height - 40 && x < canvas.width) {
        newTrajectory.push({ x, y });
        setTrajectory([...newTrajectory]);
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        newTrajectory.push({ x, y: canvas.height - 40 });
        setTrajectory([...newTrajectory]);
        setTimeout(onReset, 1000);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isLaunched, velocity, angle, gravity, onReset]);

  return (
    <div className="w-full h-full rounded-lg border border-border overflow-hidden bg-card glow">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
