import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uEnableWaves;

void main() {
  vUv = uv;
  float time = uTime * 4.0;
  vec3 transformed = position;
  transformed.x += sin(time + position.y) * 0.28 * uEnableWaves;
  transformed.y += cos(time + position.z) * 0.08 * uEnableWaves;
  transformed.z += sin(time + position.x) * 0.45 * uEnableWaves;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
  vec2 pos = vUv;
  float r = texture2D(uTexture, pos + cos(uTime + pos.x) * 0.006).r;
  float g = texture2D(uTexture, pos).g;
  float b = texture2D(uTexture, pos - sin(uTime + pos.y) * 0.006).b;
  float a = texture2D(uTexture, pos).a;
  gl_FragColor = vec4(r, g, b, a);
}
`;

const CHARSET = " .'`^,:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

function mapRange(value, start, stop, outStart, outStop) {
  return ((value - start) / (stop - start)) * (outStop - outStart) + outStart;
}

class CanvasText {
  constructor(text, { fontSize = 180, color = "#d8ff3f" } = {}) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.text = text;
    this.fontSize = fontSize;
    this.color = color;
    this.font = `800 ${this.fontSize}px "SF Mono", "Cascadia Code", Consolas, monospace`;
  }

  resize() {
    this.context.font = this.font;
    const metrics = this.context.measureText(this.text);
    this.canvas.width = Math.ceil(metrics.width) + 24;
    this.canvas.height = Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) + 24;
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.color;
    this.context.font = this.font;
    const metrics = this.context.measureText(this.text);
    this.context.fillText(this.text, 12, 12 + metrics.actualBoundingBoxAscent);
  }
}

class AsciiOverlay {
  constructor(renderer, { fontSize = 9 } = {}) {
    this.renderer = renderer;
    this.fontSize = fontSize;
    this.domElement = document.createElement("div");
    this.domElement.className = "ascii-output";
    this.pre = document.createElement("pre");
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d", { willReadFrequently: true });
    this.domElement.append(this.canvas, this.pre);
  }

  setSize(width, height) {
    this.width = Math.max(1, Math.floor(width));
    this.height = Math.max(1, Math.floor(height));
    this.renderer.setSize(this.width, this.height, false);
    this.context.font = `${this.fontSize}px "SF Mono", "Cascadia Code", Consolas, monospace`;
    const charWidth = Math.max(1, this.context.measureText("A").width);
    this.cols = Math.max(1, Math.floor(this.width / charWidth));
    this.rows = Math.max(1, Math.floor(this.height / this.fontSize));
    this.canvas.width = this.cols;
    this.canvas.height = this.rows;
    this.pre.style.fontSize = `${this.fontSize}px`;
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.renderer.domElement, 0, 0, this.canvas.width, this.canvas.height);
    const img = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    let output = "";

    for (let y = 0; y < this.canvas.height; y += 1) {
      for (let x = 0; x < this.canvas.width; x += 1) {
        const index = (x + y * this.canvas.width) * 4;
        const alpha = img[index + 3];
        if (alpha === 0) {
          output += " ";
          continue;
        }
        const gray = (0.3 * img[index] + 0.6 * img[index + 1] + 0.1 * img[index + 2]) / 255;
        output += CHARSET[Math.floor(gray * (CHARSET.length - 1))];
      }
      output += "\n";
    }

    this.pre.textContent = output;
  }
}

class AsciiScene {
  constructor({ text, asciiFontSize, textFontSize, textColor, enableWaves }, container, width, height) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.mouse = { x: width / 2, y: height / 2 };
    this.textCanvas = new CanvasText(text, { fontSize: textFontSize, color: textColor });
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    this.camera.position.z = 30;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0x000000, 0);
    this.overlay = new AsciiOverlay(this.renderer, { fontSize: asciiFontSize });
    this.enableWaves = enableWaves;
    this.onPointerMove = this.onPointerMove.bind(this);
  }

  init() {
    this.textCanvas.resize();
    this.textCanvas.render();
    this.texture = new THREE.CanvasTexture(this.textCanvas.canvas);
    this.texture.minFilter = THREE.NearestFilter;

    const aspect = this.textCanvas.canvas.width / this.textCanvas.canvas.height;
    const planeHeight = 7.2;
    const geometry = new THREE.PlaneGeometry(planeHeight * aspect, planeHeight, 28, 28);
    const material = new THREE.ShaderMaterial({
      fragmentShader,
      transparent: true,
      uniforms: {
        uEnableWaves: { value: this.enableWaves ? 1 : 0 },
        uTexture: { value: this.texture },
        uTime: { value: 0 },
      },
      vertexShader,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
    this.container.appendChild(this.overlay.domElement);
    this.setSize(this.width, this.height);
    this.container.addEventListener("pointermove", this.onPointerMove);
  }

  setSize(width, height) {
    this.width = Math.max(1, Math.floor(width));
    this.height = Math.max(1, Math.floor(height));
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.overlay.setSize(this.width, this.height);
  }

  onPointerMove(event) {
    const bounds = this.container.getBoundingClientRect();
    this.mouse = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
  }

  start() {
    const frame = () => {
      this.frameId = requestAnimationFrame(frame);
      this.render();
    };
    frame();
  }

  render() {
    const time = performance.now() * 0.001;
    this.mesh.material.uniforms.uTime.value = Math.sin(time);
    this.mesh.rotation.x += (mapRange(this.mouse.y, 0, this.height, 0.42, -0.42) - this.mesh.rotation.x) * 0.05;
    this.mesh.rotation.y += (mapRange(this.mouse.x, 0, this.width, -0.42, 0.42) - this.mesh.rotation.y) * 0.05;
    this.overlay.render(this.scene, this.camera);
  }

  dispose() {
    cancelAnimationFrame(this.frameId);
    this.container.removeEventListener("pointermove", this.onPointerMove);
    this.scene.traverse((object) => {
      if (!object.isMesh) return;
      object.geometry?.dispose();
      object.material?.dispose();
    });
    this.scene.clear();
    this.texture?.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.overlay.domElement.remove();
  }
}

export function ASCIIText({
  asciiFontSize = 9,
  className = "",
  enableWaves = true,
  text = "EMBEDVISION",
  textColor = "#d8ff3f",
  textFontSize = 180,
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canRun =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(canRun);
  }, []);

  useEffect(() => {
    if (!enabled || !containerRef.current) return undefined;

    let cancelled = false;
    let resizeObserver;
    const container = containerRef.current;

    const setup = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width < 80 || height < 40 || cancelled) return;

      sceneRef.current?.dispose();
      sceneRef.current = new AsciiScene(
        { asciiFontSize, enableWaves, text, textColor, textFontSize },
        container,
        width,
        height,
      );
      sceneRef.current.init();
      sceneRef.current.start();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || sceneRef.current || cancelled) return;
        setup();
      },
      { threshold: 0.35 },
    );

    observer.observe(container);
    resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry || !sceneRef.current) return;
      sceneRef.current.setSize(entry.contentRect.width, entry.contentRect.height);
    });
    resizeObserver.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
      resizeObserver?.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [asciiFontSize, enableWaves, enabled, text, textColor, textFontSize]);

  return (
    <div className={`ascii-text-container ${className}`} ref={containerRef}>
      {!enabled ? <span className="ascii-static">{text}</span> : null}
    </div>
  );
}
