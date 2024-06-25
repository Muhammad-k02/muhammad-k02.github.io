import React from 'react';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'; // Assuming these are components from a custom library
import * as reactSpring from '@react-spring/three'; // React Spring for animations
import * as drei from '@react-three/drei'; // Drei library for Three.js components
import * as fiber from '@react-three/fiber'; // React Three Fiber for Three.js integration
import { motion } from 'framer-motion'; // Framer Motion for animations
import './App.css'; // Import your CSS file for global styles
import './styles.css'; // Import your CSS file for specific component styles

function App() {
  const name = ["Muhammad", "Khan"]; // Example name array for animation
  const welcomeText = ["Welcome", "to", "My", "Portfolio!"]; // Example text array for animation

  return (
    <div className="app-container">
      {/* Overlay */}
      <div className="overlay"></div>

      {/* ShaderGradientCanvas */}
      <ShaderGradientCanvas
        importedFiber={{ ...fiber, ...drei, ...reactSpring }} // Importing necessary components for ShaderGradientCanvas
        style={{
          position: 'absolute',
          top: 0,
          pointerEvents: 'none', // Disable pointer events on the canvas
          zIndex: -1, // Move the background to the bottom layer
        }}
      >
        {/* ShaderGradient */}
        <ShaderGradient
          control='query'
          urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=0.8&cAzimuthAngle=270&cDistance=0.5&cPolarAngle=180&cameraZoom=15.1&color1=%23b5001e&color2=%230015ff&color3=%23000000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=env&pixelDensity=1&positionX=-0.1&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.4&rotationX=0&rotationY=130&rotationZ=70&shader=defaults&type=sphere&uAmplitude=3.2&uDensity=0.8&uFrequency=5.5&uSpeed=0.3&uStrength=0.3&uTime=0&wireframe=false'
        />
      </ShaderGradientCanvas>

      {/* Welcome text */}
      <div className="welcome-text">
        {/* Display Name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {name.map((el, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i / 4 }}
            >
              {el}{" "}
            </motion.span>
          ))}
        </motion.div>

        {/* Display Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {welcomeText.map((el, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: name.length / 4 + i / 4 }}
            >
              {el}{" "}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default App;
