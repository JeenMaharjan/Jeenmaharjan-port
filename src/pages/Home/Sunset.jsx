import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { saveAs } from "file-saver";
import "./sunriseSunset.css";

const Sunset = () => {
   const controls = useAnimation();
  const [ref, inView] = useInView();
  const canvasRef = useRef(null);
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
  const handleDownload = () => {
    // Replace the URL with the actual URL of your CV file
    const cvUrl = "https://drive.google.com/file/d/14wUzm5FFF2qvR9kbxUsbOQVl3I6G9Xkc/view?usp=drive_link";
    saveAs(cvUrl, "Jeen_Maharjan_CV.pdf");
  };
  useEffect(() => {
    const ss = {
      ctx: null,
      canvas: null,
      w: window.innerWidth,
      h: window.innerHeight,
      xS: undefined,
      yS: undefined,
      xM: undefined,
      yM: undefined,
      angle: 180,
      angleInc: 0.1,
      grd: null,
      alphaChannel: 0.1,
      gradInRad: Math.PI / 180,
      timerId: undefined,
    
      init() {
        this.canvas = document.getElementById('canvas1');
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.ctx = this.canvas.getContext('2d');
      },
    
      LinearGradient() {
        this.grd = this.ctx.createLinearGradient(0, 0, 0, this.h);
        this.grd.addColorStop(0, "rgba(0,4,85," + this.alphaChannel + ")");
        this.grd.addColorStop(0.7, "rgba(0,0,0," + this.alphaChannel + ")");
        this.grd.addColorStop(0.95, "rgba(17,0,36," + this.alphaChannel + ")");
        this.grd.addColorStop(1, "rgba(0,0,0," + this.alphaChannel + ")");
        this.ctx.fillStyle = this.grd;
        this.ctx.fillRect(0, 0, this.w, this.h);
      },
    
      sunMun(xCoord, yCoord, r, colour) {
        this.ctx.beginPath();
        this.ctx.fillStyle = colour;
        this.ctx.arc(xCoord, yCoord, r, 0, 2 * Math.PI);
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowBlur = 100;
        this.ctx.shadowColor = colour;
        this.ctx.fill();
        this.ctx.closePath();
      },
    
      sunMunPosition(phi) {
        this.xS = this.w * (0.3 + 0.7 * Math.cos(phi * this.gradInRad));
        this.yS = this.h * (1.2 + Math.sin(phi * this.gradInRad));
        this.xM = this.w * (0.4 + 0.7 * Math.cos((phi - 180) * this.gradInRad));
        this.yM = this.h * (1.2 + Math.sin((phi - 180) * this.gradInRad));
      },
    
      sunriseSunset() {
        this.canvas.width = this.canvas.width;
        this.sunMunPosition(this.angle);
        if (this.yS <= this.h) {
          this.alphaChannel = this.yS / this.h;
        } else {
          this.alphaChannel = 1 - 10 / this.yM;
        }
        this.LinearGradient();
        this.sunMun(this.xS, this.yS, this.w / 15 + this.yS / 20, "yellow");
        this.sunMun(this.xM, this.yM, this.w / 30 + this.yM / 20, "white");
        this.angle += this.angleInc;
      }
    };
    
    ss.init();
    ss.timerId = setInterval(() => ss.sunriseSunset(), 5);

    return () => {
      clearInterval(ss.timerId);
    };
  }, []);

return (
  <div className="sunsetmain">
    <canvas id="canvas1"></canvas>
    <div className="sunset">
      <div className="teext">
        <div
          className="h-[80vh] flex items-center py-3 introContainer"
          
        >
          <div className="introContent">
            <h1
              className="text-white"
              
            >
              I am
            </h1>
            <h1
              className="text-7xl sm:text-3xl text-secondary font-semibold"
             
            >
              Jeen Maharjan
            </h1>
            <h1
              className="text-7xl sm:text-3xl text-white font-semibold"
              
            >
              Computer Engineer
            </h1>
            <p className="text-white"
              
            >
              Let's go
            </p>
            {/* <button
              className="border-2 bg-primary border-tertiary text-tertiary px-10 py-3 rounded btn-get-started"
              
              onClick={handleDownload}
            >
              Download CV
            </button> */}
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default Sunset;
