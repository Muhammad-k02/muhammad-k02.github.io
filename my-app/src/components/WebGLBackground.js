import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const generateRandomColors = () => ({
  r: 0.8 + Math.random() * 1.2,
  g: 0.8 + Math.random() * 1.2,
  b: 0.8 + Math.random() * 1.2
});

const WebGLBackground = ({ isHome = false }) => {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const meshRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const colors = isHome ? 
      { r: 2.5, g: 2.5, b: 2.5 } : 
      generateRandomColors();

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      xScale: { value: 0.7 },  // Decreased from 0.8 to make bands wider
      yScale: { value: 0.8 },  // Decreased from 0.8 to make bands taller
      distortion: { value: 0.1 },
      colorR: { value: colors.r },
      colorG: { value: colors.g },
      colorB: { value: colors.b }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform vec2 resolution;
        uniform float time;
        uniform float xScale;
        uniform float yScale;
        uniform float distortion;
        uniform float colorR;
        uniform float colorG;
        uniform float colorB;

        void main() {
          vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
          
          // Move the bands up by shifting the y coordinate (negative value moves up)
          p.y = p.y - 0.3;
          
          float d = length(p) * distortion;
          
          float rx = p.x * (1.0 + d);
          float gx = p.x;
          float bx = p.x * (1.0 - d);

          float timeProgression = time * 0.8;
          
          float baseIntensity = 0.08;
          float r = baseIntensity / abs(p.y + sin((rx + timeProgression) * xScale) * yScale);
          float g = baseIntensity / abs(p.y + sin((gx + timeProgression * 1.1) * xScale) * yScale);
          float b = baseIntensity / abs(p.y + sin((bx + timeProgression * 0.9) * xScale) * yScale);
          
          r *= colorR;
          g *= colorG;
          b *= colorB;
          
          gl_FragColor = vec4(r, g, b, 1.0);
        }
      `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      uniforms.time.value += 0.02; // Increased from 0.005 to make animation faster
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [isHome]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'transparent'
      }}
    />
  );
};

export default WebGLBackground;
