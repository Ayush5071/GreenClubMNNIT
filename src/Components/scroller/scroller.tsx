"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './scroller.module.css';

const Scroller = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const scrollItemsTop = [
    "SUSTAINABLE",
    "FUTURE", 
    "GREEN",
    "CAMPUS",
    "ECO-FRIENDLY"
  ];

  const scrollItemsBottom = [
    "NATURE",
    "EARTH",
    "CONSERVATION",
    "RENEWABLE",
    "PLANET"
  ];

  return (
    <motion.section
      ref={containerRef}
      className={styles.scrollerSection}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      {/* First Line - Moving Right */}
      <div className={styles.scrollerContainer}>
        <div className={`${styles.scrollerTrack} ${styles.scrollRight}`}>
          {[...scrollItemsTop, ...scrollItemsTop, ...scrollItemsTop].map((item, index) => (
            <motion.div
              key={`top-${index}`}
              className={styles.scrollerItem}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: (index % scrollItemsTop.length) * 0.08,
                ease: "easeOut"
              }}
            >
              <motion.span 
                className={`${styles.scrollerText} ${styles.topLine}`}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
              >
                {item}
              </motion.span>
              <motion.div 
                className={styles.underline}
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5 + (index % scrollItemsTop.length) * 0.08 
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Second Line - Moving Left */}
      <div className={styles.scrollerContainer}>
        <div className={`${styles.scrollerTrack} ${styles.scrollLeft}`}>
          {[...scrollItemsBottom, ...scrollItemsBottom, ...scrollItemsBottom].map((item, index) => (
            <motion.div
              key={`bottom-${index}`}
              className={styles.scrollerItem}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.3 + (index % scrollItemsBottom.length) * 0.08,
                ease: "easeOut"
              }}
            >
              <motion.span 
                className={`${styles.scrollerText} ${styles.bottomLine}`}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
              >
                {item}
              </motion.span>
              <motion.div 
                className={styles.underline}
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8 + (index % scrollItemsBottom.length) * 0.08 
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Scroller;
