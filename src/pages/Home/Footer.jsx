import React from 'react';
import "./footer.css"

function Footer() {
  return (
    <div className="py-10">
      <div className="h-[1px] w-full bg-gray-700"></div>

      <div className="flex items-center justify-center flex-col mt-10 opacity-70">
        <h1 className="text-white">Designed and Developed By</h1>
        <h1 className="text-white">
          <span className="typewriter">
            <span>J</span>
            <span>e</span>
            <span>e</span>
            <span>n</span>
            <span>&nbsp;</span>
            <span>M</span>
            <span>a</span>
            <span>h</span>
            <span>a</span>
            <span>r</span>
            <span>j</span>
            <span>a</span>
            <span>n</span>
          </span>
        </h1>
      </div>
    </div>
  );
}

export default Footer;
