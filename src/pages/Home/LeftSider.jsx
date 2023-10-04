import React from "react";
import { motion } from "framer-motion";

function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 sm:flex-row">
          <motion.a
            href="https://www.facebook.com/shadowfiend6"
            target="_blank"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <i className="ri-facebook-circle-line text-gray-400"></i>
          </motion.a>

          
           <motion.a
            href="https://www.instagram.com/jeen_mhrzn/"
            target="_blank"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <i className="ri-instagram-line text-gray-400"></i>
          </motion.a>
         
             <motion.a
            href="https://www.linkedin.com/in/jeen-maharjan-905a97255/"
            target="_blank"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <i className="ri-linkedin-box-line text-gray-400"></i>
          </motion.a>
         
          
          <motion.a
            href="https://github.com/JeenMaharjan"
            target="_blank"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <i className="ri-github-line text-gray-400"></i>
          </motion.a>
         
          

        </div>
        <div className="w-[1px] h-32 bg-[#125f63] sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
