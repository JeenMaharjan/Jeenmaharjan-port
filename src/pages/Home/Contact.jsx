import React, { useState, useEffect } from "react";

import SectionTitle from "../../components/SectionTitle";

function TypewriterEffect({ text }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentText += text[currentIndex];
      setDisplayText(currentText);
      currentIndex++;

      if (currentIndex === text.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  return <span style={{color : "red" , paddingLeft : "10px"}}> {displayText}</span>;
}

function Contact() {
  const user = {
    name: "Jeen Maharjan",
    age: 23,
    gender: "male",
    email: "jeenmaharjan08@gmail.com",
    mobile: "9845397005",
    country: "NEPAL",
  };

  const [loopingIndex, setLoopingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoopingIndex((prevIndex) => (prevIndex + 1) % Object.keys(user).length);
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, [user]);

  return (
    <div>
      <SectionTitle title="Say Hello" />

      <div className="flex sm:flex-col items-center justify-between">
        <div className="relative">
          <div className="absolute top-0 right-0 flex mt-2 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2 cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"></div>
          </div>
          <div className="flex flex-col border border-gray-300 rounded-md p-4">
            <div className="border-b border-gray-300 mb-2">
              <p className="text-tertiary">&nbsp;{"{"}</p>
            </div>
            {Object.keys(user).map((key, index) => (
              <div key={index} className="flex items-center mb-2">
                <p className="text-tertiary mr-2">&nbsp;</p>
                <p className="text-tertiary">{key} :</p>
                {index === loopingIndex ? (
                  <TypewriterEffect text={String(user[key])} />
                ) : (
                  <p className="text-tertiary ml-2">{user[key]}</p>
                )}
              </div>
            ))}
            <div className="border-t border-gray-300 mt-2">
              <p className="text-tertiary">&nbsp;{"}"}</p>
            </div>
          </div>
        </div>
        <div className="h-[400px]">
          <lottie-player
            src="https://assets7.lottiefiles.com/packages/lf20_zj3qnsfs.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
