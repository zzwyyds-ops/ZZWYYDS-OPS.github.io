import { memo, useEffect, useRef, useState } from "react";

const TWO_PI = Math.PI * 2;

function shouldEnableDotField() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    window.matchMedia("(min-width: 900px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const DotField = memo(function DotField({
  bulgeStrength = 42,
  cursorRadius = 360,
  dotRadius = 1.2,
  dotSpacing = 18,
  glowColor = "rgba(216, 255, 63, 0.16)",
  glowRadius = 180,
  gradientFrom = "rgba(216, 255, 63, 0.26)",
  gradientTo = "rgba(246, 255, 209, 0.1)",
}) {
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const frameRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const sizeRef = useRef({ dpr: 1, h: 0, offsetX: 0, offsetY: 0, w: 0 });
  const engagementRef = useRef(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(shouldEnableDotField());
  }, []);

  useEffect(() => {
    if (!enabled || !canvasRef.current) {
      return undefined;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    let resizeTimer;
    let disposed = false;

    const buildDots = (w, h) => {
      const step = dotRadius + dotSpacing;
      const cols = Math.max(1, Math.floor(w / step));
      const rows = Math.max(1, Math.floor(h / step));
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots = [];

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots.push({ ax, ay, sx: ax, sy: ay });
        }
      }

      dotsRef.current = dots;
    };

    const draw = () => {
      const { h, w } = sizeRef.current;
      const dots = dotsRef.current;
      const mouse = mouseRef.current;
      const radiusSq = cursorRadius * cursorRadius;
      const drawRadius = dotRadius / 2;
      let activeEnergy = 0;

      ctx.clearRect(0, 0, w, h);
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, gradientFrom);
      gradient.addColorStop(1, gradientTo);
      ctx.fillStyle = gradient;
      ctx.beginPath();

      for (const dot of dots) {
        const dx = mouse.x - dot.ax;
        const dy = mouse.y - dot.ay;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < radiusSq && engagementRef.current > 0.01) {
          const distance = Math.max(1, Math.sqrt(distanceSq));
          const influence = 1 - distance / cursorRadius;
          const push = influence * influence * bulgeStrength * engagementRef.current;
          const angle = Math.atan2(dy, dx);
          dot.sx += (dot.ax - Math.cos(angle) * push - dot.sx) * 0.16;
          dot.sy += (dot.ay - Math.sin(angle) * push - dot.sy) * 0.16;
        } else {
          dot.sx += (dot.ax - dot.sx) * 0.12;
          dot.sy += (dot.ay - dot.sy) * 0.12;
        }

        activeEnergy += Math.abs(dot.sx - dot.ax) + Math.abs(dot.sy - dot.ay);
        ctx.moveTo(dot.sx + drawRadius, dot.sy);
        ctx.arc(dot.sx, dot.sy, drawRadius, 0, TWO_PI);
      }

      ctx.fill();

      const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
      glow.addColorStop(0, glowColor);
      glow.addColorStop(1, "rgba(216, 255, 63, 0)");
      ctx.fillStyle = glow;
      ctx.globalAlpha = Math.min(engagementRef.current * 0.75, 0.7);
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;

      return activeEnergy;
    };

    const animate = () => {
      const mouse = mouseRef.current;
      const dx = mouse.prevX - mouse.x;
      const dy = mouse.prevY - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      mouse.speed += (distance - mouse.speed) * 0.35;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      engagementRef.current += (Math.min(mouse.speed / 7, 1) - engagementRef.current) * 0.08;

      const energy = draw();
      if (!disposed && (engagementRef.current > 0.004 || energy > 0.4)) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        engagementRef.current = 0;
        frameRef.current = null;
        draw();
      }
    };

    const startAnimation = () => {
      if (frameRef.current == null) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = {
        dpr,
        h: rect.height,
        offsetX: rect.left + window.scrollX,
        offsetY: rect.top + window.scrollY,
        w: rect.width,
      };
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots(rect.width, rect.height);
      draw();
    };

    const scheduleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 100);
    };

    const onMouseMove = (event) => {
      const size = sizeRef.current;
      mouseRef.current.x = event.pageX - size.offsetX;
      mouseRef.current.y = event.pageY - size.offsetY;
      startAnimation();
    };

    const onVisibilityChange = () => {
      if (document.hidden && frameRef.current != null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    resize();
    window.addEventListener("resize", scheduleResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      disposed = true;
      window.clearTimeout(resizeTimer);
      if (frameRef.current != null) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("resize", scheduleResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [bulgeStrength, cursorRadius, dotRadius, dotSpacing, enabled, glowColor, glowRadius, gradientFrom, gradientTo]);

  if (!enabled) {
    return null;
  }

  return <canvas aria-hidden="true" className="dot-field-canvas" ref={canvasRef} />;
});

export default DotField;
