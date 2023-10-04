import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './increment.css';

function Increment() {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      const counters = document.querySelectorAll('.counter');

      counters.forEach(counter => {
        counter.innerText = '0';

        const updateCounter = () => {
          const target = +counter.getAttribute('data-target');
          const c = +counter.innerText;

          const increment = target / 200;

          if (c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`;
            setTimeout(updateCounter, 10);
          } else {
            counter.innerText = target + "+";
          }
        };

        updateCounter();
      });
    }
  }, [inView]);

  return (
    <div className='body bg-primary'>
       <motion.div
        ref={ref}
        className={`counter-container ${inView ? 'show' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h1 className="text-secondary">More Than</h1>
        <div className="counter text-secondary" data-target="100"></div>
        <span className='text-secondary'>Small Project</span>
      </motion.div>
       <motion.div
        ref={ref}
        className={`counter-container ${inView ? 'show' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h1 className="text-secondary">Around</h1>
        <div className="counter text-secondary" data-target="40"></div>
        <span className='text-secondary'>Mid/large Project</span>
      </motion.div>
      <motion.div
        ref={ref}
        className={`counter-container ${inView ? 'show' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h1 className="text-secondary">More Than</h1>
        <div className="counter text-secondary" data-target="100"></div>
        <span className='text-secondary'>Major/Minor Designs</span>
      </motion.div>
      <motion.div
        ref={ref}
        className={`counter-container ${inView ? 'show' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h1 className="text-secondary">More Than</h1>
        <div className="counter text-secondary" data-target="10000"></div>
        <span className='text-secondary'>Codes Written</span>
      </motion.div>
    </div>
  );
}

export default Increment;
