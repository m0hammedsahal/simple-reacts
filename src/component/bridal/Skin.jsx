// src/App.js
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import axios from 'axios';
import './Skin.css';

function AnimatedSphere() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.position.x = Math.sin(t) * 2;
    meshRef.current.position.y = Math.cos(t) * 2;
    meshRef.current.rotation.x = t * 0.5;
    meshRef.current.rotation.y = t * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#00ffcc" wireframe />
    </mesh>
  );
}

function MovingBackground() {
  const groupRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z = t * 0.1;
    groupRef.current.position.z = Math.sin(t) * 0.5;
  });

  return (
    <group ref={groupRef}>
      {[...Array(50)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
          ]}
        >
          <tetrahedronGeometry args={[0.2]} />
          <meshBasicMaterial color={`hsl(${Math.random() * 360}, 100%, 75%)`} />
        </mesh>
      ))}
    </group>
  );
}

function Skin() {
  const [photo, setPhoto] = useState(null);
  const [skinColor, setSkinColor] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start webcam
  const startWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  // Take photo from webcam
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/png');
    setPhoto(imageData);
    setSkinColor(null); // Reset skin color until analyzed
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
      setSkinColor(null); // Reset skin color until analyzed
    };
    reader.readAsDataURL(file);
  };

  // Upload photo to backend and get skin color
  const analyzeSkin = async () => {
    if (!photo) {
      alert('Please take or choose a photo first!');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/skin/', { image: photo });
      if (response.data.skin_color_rgb) {
        setSkinColor(response.data.skin_color_rgb);
      } else {
        setSkinColor(null);
        alert(response.data.error || 'Skin analysis failed.');
      }
    } catch (error) {
      console.error('Error analyzing skin:', error);
      setSkinColor(null);
      alert('Error analyzing skin. Please try again.');
    }
  };

  return (
    <div className="App">
      <Canvas style={{ height: '100vh', background: '#1a1a2e' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedSphere />
        <MovingBackground />
        <OrbitControls />
      </Canvas>

      <div className="controls">
        <video ref={videoRef} autoPlay style={{ display: 'none' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        
        <button className="animated-btn" onClick={startWebcam}>
          Start Webcam
        </button>
        <button className="animated-btn" onClick={takePhoto}>
          Take Photo
        </button>
        <label className="animated-btn file-btn">
          Choose Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
        <button className="animated-btn" onClick={analyzeSkin}>
          Analyze Skin
        </button>
        
        {photo && <img src={photo} alt="Captured" className="preview" />}
        
        {skinColor && (
          <div className="skin-color-display">
            <h3>Detected Skin Color:</h3>
            <div
              className="color-box"
              style={{
                backgroundColor: `rgb(${skinColor.r}, ${skinColor.g}, ${skinColor.b})`,
              }}
            />
            <p>RGB: {skinColor.r}, {skinColor.g}, {skinColor.b}</p>
          </div>
        )}
      </div>

      <style>{`
        .custom-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          background: rgba(0, 255, 204, 0.7);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease;
          z-index: 1000;
        }
      `}</style>
      <div
        className="custom-cursor"
        style={{ left: '0px', top: '0px' }}
        ref={(el) => {
          if (el) {
            const updateCursor = (e) => {
              el.style.left = `${e.clientX}px`;
              el.style.top = `${e.clientY}px`;
            };
            window.addEventListener('mousemove', updateCursor);
            return () => window.removeEventListener('mousemove', updateCursor);
          }
        }}
      />
    </div>
  );
}

export default Skin;