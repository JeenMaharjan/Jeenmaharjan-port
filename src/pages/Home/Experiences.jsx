import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionTitle from "../../components/SectionTitle";
import { experiences } from "../../resources/experiences";

function Experiences() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { ref, inView } = useInView();
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
    } else {
      controls.start({ opacity: 0, x: "-100%" });
    }
  }, [controls, inView]);

  return (
    <div>
      <SectionTitle title="Experience" />

      <div ref={ref}>
        <motion.div
          className="flex py-10 gap-20 sm:flex-col"
          style={{ opacity: 0, x: "-100%" }}
          initial={{ opacity: 0, x: "-100%" }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
            {experiences.map((experience, index) => (
              <div
                onClick={() => {
                  setSelectedItemIndex(index);
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
                  {experience.period}
                </motion.h1>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <motion.h1
              className="text-secondary text-xl"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {experiences[selectedItemIndex].title}
            </motion.h1>
            <motion.h1
              className="text-tertiary text-xl"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {experiences[selectedItemIndex].company}
            </motion.h1>
           
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Experiences;
