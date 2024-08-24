import React from 'react';
import styles from './scroller.module.css';

const Scroller = () => {
  return (
    <div className={styles.scroller}>
      <div className={styles['scroller-in']}>
        <h4>MNNIT GREEN CLUB</h4>
        <h4>MNNIT GREEN CLUB</h4>
        <h4>MNNIT GREEN CLUB</h4>
      </div>
      <div className={styles['scroller-in']}>
        <h4>MNNIT GREEN CLUB</h4>
        <h4>MNNIT GREEN CLUB</h4>
        <h4>MNNIT GREEN CLUB</h4>
      </div>
    </div>
  );
};

export default Scroller;
