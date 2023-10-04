import React, { useEffect, useRef } from 'react';
import tim from './tim.png';
import './MotionAnimate.css';

function MotionAnimate() {
  const canvasRef = useRef(null);
  const spriteSheetRef = useRef(null);
  const spriteRef = useRef(null);
  const sSwRef = useRef(undefined);
  const sShRef = useRef(undefined);
  const sWRef = useRef(undefined);
  const directionRef = useRef('right');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
    const spriteSheet = new Image();
    spriteSheet.src = tim;
    spriteSheet.onload = () => {
      sSwRef.current = spriteSheet.width;
      sShRef.current = spriteSheet.height;
      spriteRef.current = new Sprite({ totalSprites: 27, ticksPerFrame: 4, stepSize: 2 });
      sWRef.current = sSwRef.current / spriteRef.current.totalSprites;
      animate(); // Start the animation loop
    };

    function Sprite(options) {
      this.totalSprites = options.totalSprites;
      this.stepSize = options.stepSize;
      this.tickCount = 0;
      this.ticksPerFrame = options.ticksPerFrame || 0;
      this.currentFrame = 0;
      this.shift = 0;
    }

    Sprite.prototype.update = function () {
      this.tickCount++;
      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
        if (this.currentFrame < this.totalSprites - 1) {
          this.currentFrame++;
        } else {
          this.currentFrame = 0;
        }
      }
    };

    Sprite.prototype.animate = function () {
      if (directionRef.current === 'right') {
        this.rightRun();
        if (this.shift > canvas.width) {
          this.shift = -sWRef.current; // Reset the shift position to start from the left
        }
      } else {
        this.leftRun();
        if (this.shift < -sWRef.current) {
          this.shift = canvas.width; // Reset the shift position to start from the right
        }
      }
    };

    Sprite.prototype.rightRun = function () {
      this.update();
      ctx.clearRect(0, 0, sSwRef.current, sShRef.current);
      ctx.drawImage(
        spriteSheet,
        this.currentFrame * sWRef.current,
        0,
        sWRef.current,
        sShRef.current,
        this.shift,
        0,
        sWRef.current,
        sShRef.current
      );
      this.shift += this.stepSize;
    };

    Sprite.prototype.leftRun = function () {
      this.update();
      ctx.clearRect(0, 0, sSwRef.current, sShRef.current);
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(
        spriteSheet,
        this.currentFrame * sWRef.current,
        0,
        sWRef.current,
        sShRef.current,
        -this.shift - sWRef.current,
        0,
        sWRef.current,
        sShRef.current
      );
      ctx.restore();
      this.shift -= this.stepSize;
    };

    function animate() {
      if (!canvasRef.current || !spriteRef.current) return; // Stop animation if canvas or sprite is not available
      spriteRef.current.animate(); // Call the new animate() method of the sprite

      // Reverse the direction if the sprite reaches the right or left corner
      if (spriteRef.current.shift >= canvas.width - sWRef.current) {
        directionRef.current = 'left';
      } else if (spriteRef.current.shift <= 0) {
        directionRef.current = 'right';
      }

      requestAnimationFrame(animate);
    }

    // Handle window resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(animate);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='canvas-container' style={{overflow:"hidden"}}>
      <canvas className='bg-primary' ref={canvasRef} id='canvas1'></canvas>
    </div>
  );
}

export default MotionAnimate;
