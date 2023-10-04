import React, { useState } from 'react';
import { Link as ScrollLink, animateScroll } from 'react-scroll';
import './MobileHeader.css'; // Create a new CSS file for MobileHeader styles

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDockActive, setIsDockActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const toggleClasses = () => {
    setIsDockActive(prevState => !prevState);
    document.body.classList.toggle('oy-hidden');
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    toggleClasses();

    // Get the href attribute from the clicked anchor tag
    const href = e.target.getAttribute('href');

    // Check if the href attribute is not empty before scrolling
    if (href) {
      const destination = document.querySelector(href);
      if (destination) {
        destination.scrollIntoView({
          behavior: "smooth",
          block: "start", // Adjust the alignment as needed
        });
      }
    }
  };

  return (
    <div className="mobile-header-container bg-primary"> {/* Update the class name here */}
      <div className="mobile-header-content"> {/* Update the class name here */}
        <h1 className="logo hover-effect" style={{marginLeft : "10px"}} onClick={animateScroll.scrollToTop}>
          Jeen Maharjan
        </h1>
        <div
          className={`navbar-action ${isMenuOpen ? 'navbar-action--active' : ''}`}
          id="navbar-action"
          onClick={toggleMenu}
        >
          <span className="navbar-icon"></span>
          <span className="navbar-icon"></span>
        </div>
      </div>
      {isMenuOpen && (
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
                style={{ cursor: "pointer" }}
                onClick={handleLinkClick}
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
                style={{ cursor: "pointer" }}
                onClick={handleLinkClick}
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
                style={{ cursor: "pointer" }}
                onClick={handleLinkClick}
              >
                Experiences
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
                style={{ cursor: "pointer" }}
                onClick={handleLinkClick}
              >
                Contact
              </ScrollLink>
            </li>
            

            {/* Add other menu items here */}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default MobileHeader;
