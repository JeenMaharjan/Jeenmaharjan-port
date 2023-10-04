import React, { useEffect, useRef, useState } from 'react';
import card from './card.jpg';

const Cards = () => {
  const canvasRef = useRef(null);
  let c = null;
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    class Pixel {
      constructor(x, y, color) {
        this.x = this.oldX = x;
        this.y = this.oldY = y;
        this.color = color;
        this.deltaX = this.deltaY = undefined;
        this.dx = this.dy = undefined;
        this.angle = undefined;
        this.shift = undefined;
        this.gravity = 0.1;
      }

      update() {
        this.deltaX = this.x - c.mouse.x;
        this.deltaY = this.y - c.mouse.y;
        this.shift = (this.deltaX ** 2 + this.deltaY ** 2) ** 0.7;
        this.angle = Math.atan2(this.deltaY, this.deltaX);
        this.dx = c.size / this.shift * Math.cos(this.angle);
        this.dy = c.size / this.shift * Math.sin(this.angle);
        this.x += this.dx + (this.oldX - this.x) * this.gravity;
        this.y += this.dy + (this.oldY - this.y) * this.gravity;
      }
    }

    c = {
      canvas: null,
      ctx: null,
      w: undefined, // Adjust the canvas width
      h: undefined,
      image: new Image(),
      imageX: null,
      imageY: null,
      pix: [],
      step: 4,
      size: undefined,
      timerId: undefined,
      mouse: {
        x: undefined,
        y: undefined,
      },

     init() {
        this.canvas = canvasRef.current;
        if (!this.canvas) return; // Check if canvas element exists
        this.w = this.canvas.width = window.innerWidth;
        this.h = this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.imageX = this.w / 2 - this.image.width / 2;
        this.imageY = this.h / 2 - this.image.height / 2;
        this.size = (this.image.width + this.image.width) * 10;
        this.ctx.drawImage(this.image, this.imageX, this.imageY);

        let p = this.ctx.getImageData(0, 0, this.w, this.h).data;
        for (let m = 0; m < this.h; m += this.step) {
          for (let n = 0; n < this.w; n += this.step) {
            let i = (m * this.w + n) * 4;
            let color = `rgb(${p[i]}, ${p[i + 1]}, ${p[i + 2]})`;
            if (p[i + 3] > 0) {
              this.pix.push(new Pixel(n, m, color));
            }
          }
        }
      },

  draw() {
        if (!this.ctx) return; // Check if ctx exists
        this.ctx.clearRect(0, 0, this.w, this.h); // Clear the canvas
        for (let i = 0; i < this.pix.length; i += 1) {
          this.pix[i].update();
          this.ctx.fillStyle = this.pix[i].color;
          this.ctx.fillRect(
            this.pix[i].x,
            this.pix[i].y,
            this.step,
            this.step
          );
        }
      },

      main() {
        this.image.onload = () => {
          this.init();
          this.timerId = setInterval(() => {
            this.draw();
          }, 1000 / 60);
          setImageLoaded(true);
        };

        this.image.src = card;
      },
    };

    window.addEventListener(
      'mousemove',
      function (e) {
        c.mouse.x = e.clientX;
        c.mouse.y = e.clientY;
      },
      false
    );

    c.canvas = canvasRef.current;
    c.main();

    return () => {
      clearInterval(c.timerId);
    };
  }, []);

  return (
    <div>
      {imageLoaded && <canvas ref={canvasRef}></canvas>}
    </div>
  );
};

export default Cards;
