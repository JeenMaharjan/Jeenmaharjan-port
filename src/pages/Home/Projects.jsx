import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SectionTitle from "../../components/SectionTitle";
import { projects } from "../../resources/projects";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./project.css";
import ImageSlider from "./ImageSlider";
import { faEye } from "@fortawesome/free-solid-svg-icons";



function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const [isSliderOpen, setIsSliderOpen] = React.useState(false);
  const [title, setTitle] = useState("Mero Pasal")
  const { ref, inView } = useInView();
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
    } else {
      controls.start({ opacity: 0, x: "-100%" });
    }
  }, [controls, inView]);

  const handleLiveClick = (url) => {
    window.open(url, "_blank");
  };

  const handleCodeClick = (url) => {
    window.open(url, "_blank");
  };

    const handleSliderClick = (title) => {
     
    setIsSliderOpen(true);
  };

  return (
    <div>
      <SectionTitle title="Projects" />
      <motion.div
        className="flex py-10 gap-20 sm:flex-col"
        ref={ref}
        style={{ opacity: 0, x: "-100%" }}
        initial={{ opacity: 0, x: "-100%" }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {projects.map((project, index) => (
            <div
              key={project.title}
              onClick={() => {
                setSelectedItemIndex(index);
                setTitle(project.title)
                console.log(project.title)
              }}
              className="cursor-pointer"
            >
              <motion.h1
                className={`text-xl px-5
                 ${
                   selectedItemIndex === index
                     ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3"
                     : "text-white"
                 } `}
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {project.title}
              </motion.h1>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-1 sm:flex-col">
           
              <div className="flex flex-col gap-4 mr-10 sm:mr-0 items-center"   >
                 <motion.p
              className="text-secondary underline"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Click the image to see more {""} 
             <FontAwesomeIcon icon={faEye} style={{"color": "c21e1e", "--fa-secondary-color": "#511f1f", marginLeft : "10px"}} />
           

            </motion.p>
                <img
              src={projects[selectedItemIndex].image}
              alt=""
              className="h-80 sm:w-96  projectImage"
             
              onClick={() => handleSliderClick(projects[selectedItemIndex].title)}
            />
             <motion.h1
              className="text-secondary"
              style={{fontSize : "60px"}}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              .  .  .
            </motion.h1>
              </div>
          
          <div className="flex flex-col gap-5">
            <motion.h1
              className="text-secondary text-xl"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {projects[selectedItemIndex].title}
            </motion.h1>
            <motion.p
              className="text-white"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {projects[selectedItemIndex].description}
            </motion.p>
            <div className="flex gap-5">
              {
                title === "Mero Pasal" && (
                   <motion.button
                onClick={() =>
                  handleLiveClick(projects[selectedItemIndex].link)
                }
                className="btn-primary"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <span className="btn-content">Live</span>
              </motion.button>
                )
              }
              
            </div>
          </div>
        </div>
      </motion.div>
       {isSliderOpen && <ImageSlider title={title} onClose={() => setIsSliderOpen(false)} />}
    </div>
  );
}

export default Projects;
