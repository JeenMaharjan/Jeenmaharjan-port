import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as THREE from "three";
import moonImage from "./moon.jpg";
import venusImage from "./earth1.png";
import { saveAs } from "file-saver";
import "./intro.css"

function Intro({celestialObject ,setCelestialObject }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const canvasRef = useRef(null);
  
   const handleDownload = () => {
    // Replace the URL with the actual URL of your CV file
    const cvUrl = "https://drive.google.com/file/d/14wUzm5FFF2qvR9kbxUsbOQVl3I6G9Xkc/view?usp=drive_link";
    saveAs(cvUrl, "Jeen_Maharjan_CV.pdf");
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }

    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load(moonImage);
    const venusTexture = textureLoader.load(venusImage);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.5,
      100
    );
    camera.position.z = 11;
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setClearColor(0x000000, 0); // Set transparent background

    const celestialTexture =
      celestialObject === "venus" ? venusTexture : moonTexture;
    const celestialGeometry = new THREE.SphereGeometry(5, 64, 64);
    const celestialMaterial = new THREE.MeshStandardMaterial({
      map: celestialTexture,
    });
    const celestial = new THREE.Mesh(celestialGeometry, celestialMaterial);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(-23.5, 5, 8);
    scene.add(pointLight);
    scene.add(celestial);

    const animate = () => {
      requestAnimationFrame(animate);
      celestial.rotation.y += 0.003;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };

    animate();
  }, [controls, inView, celestialObject]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 1.5,
      },
    },
  };

  

  return (
    <motion.div
      className="h-[80vh] bg-primary flex items-center py-10 introContainer"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="introContent">
        <motion.h1
          className="text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          I am 
        </motion.h1>
        <motion.h1
          className="text-7xl sm:text-3xl text-secondary font-semibold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Jeen Maharjan
        </motion.h1>
        <motion.h1
          className="text-7xl sm:text-3xl text-white font-semibold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Computer Engineer
        </motion.h1>
        <motion.p
          className="text-white w-2/3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Let's go 
        </motion.p>
        <motion.button
          className="border-2 border-tertiary text-tertiary px-10 py-3 rounded btn-get-started"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={handleDownload}
        >
          Download CV
        </motion.button>
      </div>

      <div className="moonCanvasContainer">
        <canvas className="moonCanvas" ref={canvasRef}></canvas>
      </div>
    </motion.div>
  );
}

export default Intro;
