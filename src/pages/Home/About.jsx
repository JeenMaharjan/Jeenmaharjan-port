import React, { useState } from "react";
import css from "./tech/css.png";
import docker from "./tech/docker.png";
import figma from "./tech/figma.png";
import git from "./tech/git.png";
import html from "./tech/html.png";
import javascript from "./tech/javascript.png";
import mongodb from "./tech/mongodb.png";
import nodejs from "./tech/nodejs.png";
import reactjs from "./tech/reactjs.png";
import redux from "./tech/redux.png";
import tailwind from "./tech/tailwind.png";
import firebase from "./tech/firebase.png";
import mysql from "./tech/mysql.png";
import socketio from "./tech/socketio.png";

import typescript from "./tech/typescript.png";
import threejs from "./tech/threejs.svg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionTitle from "../../components/SectionTitle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import avatar from "./2.jpg"; // Import the image file
import ReactLogo from "./11.png";
import "./about.css"
import BallCanvas from "./Balls";
const technologies = [
  
  {
    name: "JavaScript",
    icon: javascript,
  },
  
  {
    name: "Docker",
    icon: docker,
  },
  {
    name: "Mysql",
    icon: mysql,
  },
  {
    name: "Socketio",
    icon: socketio,
  },
 
 
  {
    name: "React JS",
    icon: reactjs,
  },
  
  
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },

  {
    name: "figma",
    icon: figma,
  },
  
];
function About() {
  const { ref, inView } = useInView();
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 20 });
    }
  }, [controls, inView]);

  const [hearts, setHearts] = useState([]);

  const handleMouseDown = (e) => {
    createHeart(e);
  };

  const createHeart = (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const loveMeRect = e.target.getBoundingClientRect();
    const leftOffset = loveMeRect.left;
    const topOffset = loveMeRect.top;

    const xInside = x - leftOffset;
    const yInside = y - topOffset;

    const heart = {
      id: Date.now(),
      top: yInside,
      left: xInside,
    };

    setHearts((prevHearts) => [...prevHearts, heart]);

    setTimeout(() => {
      setHearts((prevHearts) =>
        prevHearts.filter((item) => item.id !== heart.id)
      );
    }, 1000);
  };

  return (
    <div ref={ref}>
      <motion.div
        className="py-10"
        style={{ opacity: 0, y: 20 }}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <SectionTitle title="About me" />

        <div className="flex w-full items-center sm:flex-col">
          <div className="h-[70vh] w-1/2 sm:w-full relative">
            <div className="absolute top-0 bottom-0 left-24 sm:left-2 right-0 rounded-md overflow-hidden">
              <h3
                className="text-white"
                style={{
                  marginBottom: "10px",
                  textAlign: "center" ,
                  textDecorationLine: "underline",
                }}
              >
                Click to spread love{" "}
                <FontAwesomeIcon icon={faHeart} /> 
              </h3>
             
                <div
                  className="loveMe"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
                >
                  <div className="loveMe-background"></div>
                  {hearts.map((heart) => (
                    <div
                      key={heart.id}
                      className="heart"
                      style={{ top: heart.top, left: heart.left }}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                  ))}
                </div>
            
            </div>
          </div>
          <div
            className="flex flex-col gap-5 w-1/2 sm:w-full mt-5 sm:mt-0"
            style={{ marginLeft: "30px" }}
          >
            <p className="text-white">
              I am a fullstack web developer. I love coding and being doing it for years. I use modern tools and trending design to make website more user friendly and awesome.
            </p>
            <p className="text-white">
              If you want an awesome website, then I am
              your guy. I will give you the best website money can buy. 
            </p>
          </div>
        </div>
      </motion.div>
      <div className="py-5">
        <h1 className="text-tertiary text-xl">
          Here are a few technologies I’ve been working with recently:
        </h1>
        <div className="flex flex-wrap gap-10 mt-5 sm:ml-9">
          {technologies.map((technology) => (
            <div className="w-28 h-28" key={technology.name}>
              <BallCanvas icon={technology.icon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
