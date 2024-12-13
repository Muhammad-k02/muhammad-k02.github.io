import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WebGLBackground = () => {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const meshRef = useRef(null);

  useEffect(() => {
    class Stage {
      constructor(canvas) {
        this.renderParam = {
          clearColor: 0x666666,
          width: window.innerWidth,
          height: window.innerHeight
        };

        this.cameraParam = {
          left: -1,
          right: 1,
          top: 1,
          bottom: 1,
          near: 0,
          far: -1
        };

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.canvas = canvas;

        this.isInitialized = false;
      }

      init() {
        this._setScene();
        this._setRender();
        this._setCamera();

        this.isInitialized = true;
      }

      _setScene() {
        this.scene = new THREE.Scene();
      }

      _setRender() {
        this.renderer = new THREE.WebGLRenderer({
          canvas: this.canvas,
          alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(new THREE.Color(this.renderParam.clearColor));
        this.renderer.setSize(this.renderParam.width, this.renderParam.height);
      }

      _setCamera() {
        this.camera = new THREE.OrthographicCamera(
          this.cameraParam.left,
          this.cameraParam.right,
          this.cameraParam.top,
          this.cameraParam.bottom,
          this.cameraParam.near,
          this.cameraParam.far
        );
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        this.camera.aspect = windowWidth / windowHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(windowWidth, windowHeight);
      }

      _render(scene, camera) {
        this.renderer.render(scene, camera);
      }

      onResize() {
        this._setCamera();
      }
    }

    class Mesh {
      constructor(stage) {
        this.stage = stage;
        this.canvas = stage.canvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        this.uniforms = {
          resolution: { type: "v2", value: [ this.canvasWidth, this.canvasHeight ] },
          time: { type: "f", value: 0.0 },
          xScale: { type: "f", value: 0.8 },  
          yScale: { type: "f", value: 0.8 },  
          distortion: { type: "f", value: 0.035 }  
        };

        this.mesh = null;
      }

      init() {
        this._setMesh();
      }

      _setMesh() {
        const position = [
          -1.0, -1.0, 0.0,
           1.0, -1.0, 0.0,
          -1.0,  1.0, 0.0,
           1.0, -1.0, 0.0,
          -1.0,  1.0, 0.0,
           1.0,  1.0, 0.0
        ];

        const positions = new THREE.BufferAttribute(new Float32Array(position), 3);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", positions);

        const vertexShader = `
          attribute vec3 position;

          void main()	{
            gl_Position = vec4(position, 1.0);
          }
        `;

        const fragmentShader = `
          precision highp float;
          uniform vec2 resolution;
          uniform float time;
          uniform float xScale;
          uniform float yScale;
          uniform float distortion;

          float smootherstep(float edge0, float edge1, float x) {
            float x2 = x * x;
            float x3 = x2 * x;
            float x4 = x3 * x;
            float x5 = x4 * x;
            return edge0 + (edge1 - edge0) * (6.0 * x5 - 15.0 * x4 + 10.0 * x3);
          }

          void main() {
            vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
            
            float d = length(p) * distortion;
            
            float rx = p.x * (1.0 + d);
            float gx = p.x;
            float bx = p.x * (1.0 - d);

            float timeProgression = time * 0.8;
            
            float r = 0.08 / abs(p.y + sin((rx + timeProgression) * xScale) * yScale);
            float g = 0.08 / abs(p.y + sin((gx + timeProgression * 1.1) * xScale) * yScale);
            float b = 0.08 / abs(p.y + sin((bx + timeProgression * 0.9) * xScale) * yScale);
            
            r *= 1.5;
            g *= 1.3;
            b *= 1.4;
            
            gl_FragColor = vec4(r, g, b, 1.0);
          }
        `;

        const material = new THREE.RawShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: this.uniforms,
          side: THREE.DoubleSide
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.stage.scene.add(this.mesh);
      }
      
      _render() {
        this.uniforms.time.value += 0.005;  
      }

      onRaf() {
        this._render();
      }
    }

    const canvas = canvasRef.current;
    const stage = new Stage(canvas);
    stageRef.current = stage;

    stage.init();

    const mesh = new Mesh(stage);
    meshRef.current = mesh;

    mesh.init();

    const handleResize = () => {
      stage.onResize();
    };

    const animate = () => {
      requestAnimationFrame(animate);
      stage.renderer.render(stage.scene, stage.camera);
      mesh.onRaf();
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="webgl-canvas" 
      style={{
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: -1, 
        width: '100vw', 
        height: '100vh'
      }} 
    />
  );
};

export default WebGLBackground;
