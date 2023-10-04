import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useScroll } from "react-router-scroll";
import Home from "./pages/Home/Home.jsx";
import Demo from "./pages/Home/demos/Demo.jsx";

import { FaMoon, FaSun } from "react-icons/fa";
import Loaders from "./components/drawer/Loader.jsx";


const ThemeToggleButton = ({ toggleCelestialObject }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    toggleCelestialObject();
  };

  useEffect(() => {
    const body = document.body;
    if (theme === "light") {
      body.classList.remove("dark");
    } else {
      body.classList.add("dark");
    }

    // Change Tailwind colors
    const root = document.documentElement;
    if (theme === "light") {
      root.style.setProperty("--color-primary", "#009B8F");
      root.style.setProperty("--color-secondary", "#00E0D9");
      root.style.setProperty("--color-tertiary", "#00C4E0");
    } else {
      root.style.setProperty("--color-primary", "#343434");
      root.style.setProperty("--color-secondary", "#00A5E0");
      root.style.setProperty("--color-tertiary", "#32CBFF");
    }
  }, [theme]);

  return (
    <button
      className="fixed top-28 sm:top-36 right-10 sm:right-auto sm:left-80 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300" 
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <FaMoon size={20} />
      ) : (
        <FaSun size={20} color="#FFD700" />
      )}
    </button>
  );
};

function App() {
  const scroll = useScroll();
  const [celestialObject, setCelestialObject] = useState("moon");
  const [loadingg, setloadingg] = useState(true);






  const toggleCelestialObject = () => {
    setCelestialObject((prevObject) =>
      prevObject === "moon" ? "venus" : "moon"
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setloadingg(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {loadingg ? (
        <Loaders />
      ) : (
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes scroll={scroll}>
              <Route
                path="/"
                element={
                  <>
                    <Home
                      celestialObject={celestialObject}
                      setCelestialObject={setCelestialObject}
                    />
                    <ThemeToggleButton
                      toggleCelestialObject={toggleCelestialObject}
                    />
                  </>
                }
              />
             
              {/* <Route path="/demo" element={<Demo />} /> */}
              
            </Routes>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
