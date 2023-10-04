import React from "react";

import Header from "../../components/Header.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import Courses from "./Courses.jsx";
import Experiences from "./Experiences.jsx";
import Footer from "./Footer.jsx";
import Intro from "./Intro.jsx";
import LeftSider from "./LeftSider.jsx";
import Cards from "./Cards.jsx";
import Projects from "./Projects.jsx";
import Increment from "./Increment.jsx";
import Sunset from "./Sunset.jsx";
import MotionAnimate from "./MotionAnimate.jsx";
import {useInView} from "react-intersection-observer";

function Home({celestialObject , setCelestialObject}) {
   const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once when in view
    threshold: 0.1, // Adjust the threshold as needed
  });
  return (
    <div>
      <Header />

        {/* <div id="intro">
          <Intro celestialObject = {celestialObject} setCelestialObject = {setCelestialObject}/>
        </div> */}
        <div id="sunset">
          <Sunset />
        </div>
                                      
        
        <div className="bg-primary px-40 sm:px-5 overflow-x-hidden">
        <div id="about">
          <About />
          
        </div>

          <div id="increment" style={{marginTop: "70px" , marginBottom: "70px"}}>
            <hr style={{marginTop: "30px" , marginBottom: "30px"}}/>
          <Increment />
             <hr style={{marginTop: "30px" , marginBottom: "30px"}}/>
        </div>
          

        <div id="experiences">
        <Experiences />
          
        </div>
        <div id="projects">
          <Projects />
        </div>
       
        {/* <Courses /> */}
        <div id="contact">
          <Contact />
        </div>
        <LeftSider />
        <Footer />
      </div>

       <div id="motionanimate">
         
        <MotionAnimate/>
        </div>
    </div>
  );
}


export default Home;