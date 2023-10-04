import React from 'react';
import "./header.css"
import { Link } from 'react-router-dom';
import { Link as ScrollLink, animateScroll } from 'react-scroll';
import MobileHeader from './MobileHeader';
function Header() {
  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  return (
    <>
    <div className="header-container bg-primary">
      <div className="header-content">
        <h1 className="logo hover-effect" onClick={scrollToTop}>
          Jeen Maharjan
        </h1>
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <ScrollLink
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                style={{cursor : "pointer"}}
              >
                About
              </ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink
                to="projects"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                 style={{cursor : "pointer"}}
              >
                Projects
              </ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink
                to="experiences"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                 style={{cursor : "pointer"}}
              >
                Experiance
              </ScrollLink>
            </li>
            
            <li className="nav-item">
              <ScrollLink
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                 style={{cursor : "pointer"}}
              >
                Contact
              </ScrollLink>
            </li>
            
          </ul>
        </nav>
      </div>
    </div>
      <MobileHeader/>
    </>
  );
}

export default Header;
